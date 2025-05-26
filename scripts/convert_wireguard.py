#!/usr/bin/env python3
import sys
import os
from ruamel.yaml import YAML
from ruamel.yaml.comments import CommentedMap, CommentedSeq

# تنظیمات ثابت برای هر پراکسی
STATIC_OPTIONS = {
    'type': 'wireguard',
    'udp': True,
    'mtu': 1420,
    'remote-dns-resolve': True,
    # DNS پیش‌فرض داخل شبکه WireGuard
    'dns': ['10.2.0.1'],
    'amnezia-wg-option': {
        'jc': 4,
        'jmin': 40,
        'jmax': 70,
        's1': 0,
        's2': 0,
        'h1': 1,
        'h2': 2,
        'h3': 3,
        'h4': 4
    }
}

def numeric_key(filename):
    """
    کلید مرتب‌سازی عددی بر اساس عدد انتهای نام فایل
    """
    base = os.path.splitext(filename)[0]
    try:
        # استخراج بخش عددی انتهای نام فایل
        return int(base.split('-')[-1])
    except (ValueError, IndexError):
        # اگر فرمت مورد انتظار را نداشت، در انتهای لیست قرار بگیرد
        return float('inf')


def parse_wg_file(path):
    """
    ورودی: مسیر یک فایل WireGuard
    خروجی: CommentedMap با فیلدهای لازم برای YAML یا None در صورت خطا
    """
    data = {}
    try:
        with open(path, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                # نادیده گرفتن خطوط خالی و کامنت‌ها
                if not line or line.startswith('#') or not '=' in line:
                    continue
                key, val = [p.strip() for p in line.split('=', 1)]
                data[key] = val

        # بررسی وجود فیلدهای ضروری و استخراج آن‌ها
        if 'Endpoint' not in data or 'PrivateKey' not in data or 'PublicKey' not in data or 'Address' not in data:
            raise ValueError("Missing essential WireGuard fields (Endpoint, PrivateKey, PublicKey, Address)")

        server, port_str = data['Endpoint'].split(':')
        port = int(port_str)
        addr_ip = data['Address'].split('/')[0]
        name = os.path.splitext(os.path.basename(path))[0]

        # AllowedIPs
        allowed_ips_str = data.get('AllowedIPs', '0.0.0.0/0')
        if allowed_ips_str == '0.0.0.0/0':
            allowed_list = ['0.0.0.0/1', '128.0.0.0/1']
        else:
            allowed_list = [cidr.strip() for cidr in allowed_ips_str.split(',')]

        # ساخت CommentedMap با ترتیب کلیدها و تورفتگی مناسب
        cfg = CommentedMap()
        cfg['name'] = name
        cfg['type'] = STATIC_OPTIONS['type']
        cfg['server'] = server
        cfg['port'] = port
        cfg['ip'] = addr_ip
        cfg['private-key'] = data['PrivateKey']
        cfg['public-key'] = data['PublicKey']

        # inline کردن allowed-ips
        allowed_seq = CommentedSeq(allowed_list)
        allowed_seq.fa.set_flow_style()
        cfg['allowed-ips'] = allowed_seq

        # بقیه تنظیمات ثابت
        cfg['udp'] = STATIC_OPTIONS['udp']
        cfg['mtu'] = STATIC_OPTIONS['mtu']
        cfg['remote-dns-resolve'] = STATIC_OPTIONS['remote-dns-resolve']

        # inline کردن dns
        dns_seq = CommentedSeq(STATIC_OPTIONS['dns'])
        dns_seq.fa.set_flow_style()
        cfg['dns'] = dns_seq

        cfg['amnezia-wg-option'] = STATIC_OPTIONS['amnezia-wg-option']
        return cfg

    except Exception as e:
        print(f"⚠️ Error processing {os.path.basename(path)}: {e}", file=sys.stderr)
        return None


def main(input_dir, output_file):
    yaml = YAML()
    yaml.width = 4096  # جلوگیری از شکستن خطوط طولانی
    yaml.representer.ignore_aliases = lambda data: True # جلوگیری از ایجاد alias ها
    # تنظیم تورفتگی استاندارد: ۴ فاصله برای لیست و مپ، ۲ فاصله برای آیتم‌های لیست
    yaml.indent(mapping=4, sequence=4, offset=2)

    proxies = []
    if not os.path.isdir(input_dir):
        print(f"❌ Input directory not found: {input_dir}", file=sys.stderr)
        sys.exit(1)
        
    for fname in sorted(os.listdir(input_dir), key=numeric_key):
        full_path = os.path.join(input_dir, fname)
        # فقط فایل‌ها را پردازش کن (نه پوشه‌ها) و فایل‌های مخفی را نادیده بگیر
        if os.path.isfile(full_path) and not fname.startswith('.'):
            p = parse_wg_file(full_path)
            if p: # فقط پراکسی‌های معتبر را اضافه کن
                proxies.append(p)

    if not proxies:
        print("🚫 No valid WireGuard configurations found. Output file will not be generated.", file=sys.stderr)
        return # اگر پراکسی وجود ندارد، فایل را ایجاد نکن

    # ساخت گروه پراکسی با inline کردن لیست
    group = CommentedMap()
    group['name'] = 'Proton'
    group['type'] = 'select'
    group['icon'] = 'https://res.cloudinary.com/dbulfrlrz/image/upload/v1703162849/static/logos/icons/vpn_f9embt.svg'
    proxy_names = [p['name'] for p in proxies]
    proxies_seq = CommentedSeq(proxy_names)
    proxies_seq.fa.set_flow_style()
    group['proxies'] = proxies_seq
    group['url'] = 'http://speed.cloudflare.com/'
    group['unified-delay'] = True
    group['interval'] = 300

    # آبجکت خروجی
    out_obj = CommentedMap()
    out_obj['proxies'] = proxies
    out_obj['proxy-groups'] = [group]

    # ایجاد پوشه خروجی در صورت نیاز
    os.makedirs(os.path.dirname(output_file) or '.', exist_ok=True)
    with open(output_file, 'w', encoding='utf-8') as f:
        yaml.dump(out_obj, f)
    print(f"✅ Successfully wrote {len(proxies)} proxies to: {output_file}")


if __name__ == '__main__':
    if len(sys.argv) != 3:
        print("Usage: python convert_wireguard.py <input_folder> <output_yaml>", file=sys.stderr)
        sys.exit(1)
    main(sys.argv[1], sys.argv[2])

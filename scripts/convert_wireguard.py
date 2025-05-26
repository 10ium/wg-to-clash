#!/usr/bin/env python3
import sys
import os
from ruamel.yaml import YAML
from ruamel.yaml.comments import CommentedMap, CommentedSeq

# ... (STATIC_OPTIONS و numeric_key بدون تغییر) ...
STATIC_OPTIONS = {
    'type': 'wireguard', 'udp': True, 'mtu': 1420, 'remote-dns-resolve': True,
    'dns': ['10.2.0.1'], 'amnezia-wg-option': {
        'jc': 4, 'jmin': 40, 'jmax': 70, 's1': 0, 's2': 0,
        'h1': 1, 'h2': 2, 'h3': 3, 'h4': 4
    }
}
def numeric_key(filename):
    base = os.path.splitext(filename)[0]
    try: return int(base.split('-')[-1])
    except (ValueError, IndexError): return float('inf')
# ...

def parse_wg_file(path):
    # ... (داخل تابع بدون تغییر زیاد، فقط مدیریت خطا در بالا) ...
    data = {}
    try:
        with open(path, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if not line or line.startswith('#') or '=' not in line:
                    continue
                key, val = [p.strip() for p in line.split('=', 1)]
                data[key] = val

        if 'Endpoint' not in data or 'PrivateKey' not in data or 'PublicKey' not in data or 'Address' not in data:
            raise ValueError("Missing essential WireGuard fields")

        server, port_str = data['Endpoint'].split(':')
        port = int(port_str)
        addr_ip = data['Address'].split('/')[0]
        name = os.path.splitext(os.path.basename(path))[0]
        allowed_ips_str = data.get('AllowedIPs', '0.0.0.0/0')
        allowed_list = ['0.0.0.0/1', '128.0.0.0/1'] if allowed_ips_str == '0.0.0.0/0' else [cidr.strip() for cidr in allowed_ips_str.split(',')]

        cfg = CommentedMap()
        cfg['name'] = name; cfg['type'] = STATIC_OPTIONS['type']; cfg['server'] = server
        cfg['port'] = port; cfg['ip'] = addr_ip; cfg['private-key'] = data['PrivateKey']
        cfg['public-key'] = data['PublicKey']
        allowed_seq = CommentedSeq(allowed_list); allowed_seq.fa.set_flow_style()
        cfg['allowed-ips'] = allowed_seq; cfg['udp'] = STATIC_OPTIONS['udp']
        cfg['mtu'] = STATIC_OPTIONS['mtu']; cfg['remote-dns-resolve'] = STATIC_OPTIONS['remote-dns-resolve']
        dns_seq = CommentedSeq(STATIC_OPTIONS['dns']); dns_seq.fa.set_flow_style()
        cfg['dns'] = dns_seq; cfg['amnezia-wg-option'] = STATIC_OPTIONS['amnezia-wg-option']
        return cfg

    except Exception as e:
        print(f"⚠️ [WG Convert] Error processing {os.path.basename(path)}: {e}", file=sys.stderr) # <-- اضافه کردن پیشوند
        return None

def main(input_dir, output_file):
    print(f"ℹ️ [WG Convert] Starting WireGuard conversion process...") # <-- پیام شروع
    yaml = YAML()
    yaml.width = 4096
    yaml.representer.ignore_aliases = lambda data: True
    yaml.indent(mapping=4, sequence=4, offset=2)

    proxies = []
    if not os.path.isdir(input_dir):
        print(f"❌ [WG Convert] Input directory not found: {input_dir}", file=sys.stderr)
        sys.exit(1) # <-- خروج با خطا
        
    print(f"ℹ️ [WG Convert] Reading files from: {input_dir}") # <-- پیام
    for fname in sorted(os.listdir(input_dir), key=numeric_key):
        full_path = os.path.join(input_dir, fname)
        if os.path.isfile(full_path) and not fname.startswith('.'):
            print(f"ℹ️ [WG Convert] Processing file: {fname}") # <-- پیام
            p = parse_wg_file(full_path)
            if p:
                proxies.append(p)

    if not proxies:
        print("🚫 [WG Convert] No valid WireGuard configurations found. Output file will not be generated.", file=sys.stderr)
        print(f"ℹ️ [WG Convert] WireGuard conversion finished (No output).") # <-- پیام پایان
        return

    # ... (ساخت گروه بدون تغییر) ...
    group = CommentedMap()
    group['name'] = 'Proton'; group['type'] = 'select'
    group['icon'] = 'https://res.cloudinary.com/dbulfrlrz/image/upload/v1703162849/static/logos/icons/vpn_f9embt.svg'
    proxy_names = [p['name'] for p in proxies]
    proxies_seq = CommentedSeq(proxy_names); proxies_seq.fa.set_flow_style()
    group['proxies'] = proxies_seq; group['url'] = 'http://speed.cloudflare.com/'
    group['unified-delay'] = True; group['interval'] = 300
    # ...

    out_obj = CommentedMap()
    out_obj['proxies'] = proxies
    out_obj['proxy-groups'] = [group]

    os.makedirs(os.path.dirname(output_file) or '.', exist_ok=True)
    try:
        with open(output_file, 'w', encoding='utf-8') as f:
            yaml.dump(out_obj, f)
        print(f"✅ [WG Convert] Successfully wrote {len(proxies)} proxies to: {output_file}") # <-- پیام موفقیت
    except Exception as e:
        print(f"❌ [WG Convert] Error writing output file {output_file}: {e}", file=sys.stderr)
        sys.exit(1) # <-- خروج با خطا
    print(f"ℹ️ [WG Convert] WireGuard conversion finished.") # <-- پیام پایان

if __name__ == '__main__':
    if len(sys.argv) != 3:
        print("Usage: python convert_wireguard.py <input_folder> <output_yaml>", file=sys.stderr)
        sys.exit(1)
    main(sys.argv[1], sys.argv[2])
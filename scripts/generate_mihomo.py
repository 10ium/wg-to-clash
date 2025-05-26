#!/usr/bin/env python3
import os
import re
import urllib.parse
import logging
import sys
from typing import List, Tuple

# --- بخش لاگ (بدون تغییر) ---
logger = logging.getLogger()
logger.setLevel(logging.INFO)
formatter = logging.Formatter("%(asctime)s - %(levelname)s - %(message)s")
file_handler = logging.FileHandler("update.log", encoding="utf-8")
file_handler.setFormatter(formatter)
logger.addHandler(file_handler)
stream_handler = logging.StreamHandler(sys.stdout)
stream_handler.setFormatter(formatter)
logger.addHandler(stream_handler)
# --- پایان بخش لاگ ---

class ConfigProcessor:
    def __init__(self):
        self.template_path = "mihomo_template.txt"
        self.output_dir = "generated"
        self.readme_path = "README.md"
        # این URL پایه برای ساخت لینک‌های نهایی در README استفاده می‌شود
        self.base_url = "https://raw.githubusercontent.com/10ium/wg-to-clash/main/generated/" # <-- مطمئن شوید این آدرس درست است
        self.url_list_file = "Simple_URL_List.txt"

    def _load_entries(self, file_path: str) -> List[Tuple[str, str]]:
        # ... (بدون تغییر) ...
        entries = []
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                for line in f:
                    line = line.strip()
                    if not line or "|" not in line or line.startswith('#'):
                        continue
                    try:
                        filename, url = line.split("|", 1)
                        entries.append((filename.strip(), url.strip()))
                    except ValueError:
                        logger.warning(f"خط '{line}' در فایل {file_path} فرمت درستی ندارد و نادیده گرفته شد.")
            logger.info(f"تعداد {len(entries)} ورودی از {file_path} بارگذاری شد.")
        except FileNotFoundError:
            logger.error(f"فایل {file_path} یافت نشد!")
        return entries

    def _replace_proxy_url(self, template: str, new_url: str) -> str:
        # ... (بدون تغییر - از نسخه قبلی که wireguard و >- را پشتیبانی می‌کرد) ...
        pattern = re.compile(
            r'(\s+wireguard:\s*\n(?:[^\n]|\n)+?\s+type:\s*http\s*\n(?:[^\n]|\n)+?\s+url:\s*)(?:>-\s*\n\s*)?[^\n]+',
            re.IGNORECASE 
        )
        modified_template, count = pattern.subn(rf'\g<1>{new_url}', template)
        if count == 0:
             logger.warning(f"الگوی 'wireguard' با 'type: http' و 'url:' برای جایگزینی URL '{new_url}' در قالب یافت نشد. آیا قالب صحیح است؟")
        else:
            logger.info(f"URL با موفقیت به '{new_url}' جایگزین شد.")
        return modified_template

    # --- تابع _generate_readme اصلاح شده ---
    def _generate_readme(self, entries: List[Tuple[str, str]]) -> None:
        """فایل README.md را با دو دسته لینک ایجاد می‌کند."""
        logger.info("شروع ساخت فایل README.md با دسته‌بندی جدید...")
        md_content = [
            "# 📂 لیست کانفیگ‌ها",
            "### 🚦 انتخاب کنید:\n",
        ]

        # --- اضافه کردن لینک proxies.yaml (بدون قوانین) ---
        proxies_filename = "proxies.yaml"
        # بررسی اینکه آیا فایل proxies.yaml واقعا وجود دارد یا نه
        proxies_path = os.path.join(self.output_dir, proxies_filename)
        if os.path.exists(proxies_path):
            proxies_url = f"{self.base_url}{urllib.parse.quote(proxies_filename)}"
            md_content.append(f"### 📄 فقط لیست پراکسی‌ها (بدون قوانین)")
            md_content.append(f"- [🌐 **{proxies_filename}**]({proxies_url})\n")
        else:
            logger.warning(f"فایل {proxies_path} یافت نشد، لینک آن به README اضافه نمی‌شود.")

        # --- اضافه کردن لینک‌های Mihomo (با قوانین) ---
        if entries:
            md_content.append(f"### 🇮🇷 کانفیگ‌های کامل (با قوانین مخصوص ایران)")
            emojis = ["🚀", "🔒", "⚡", "🛡️"]
            for idx, (filename, _) in enumerate(entries): # <-- فقط از filename استفاده می‌کنیم
                emoji = emojis[idx % len(emojis)]
                # URL را بر اساس نام فایل و base_url می‌سازیم
                file_url = f"{self.base_url}{urllib.parse.quote(filename)}"
                md_content.append(f"- [{emoji} {filename}]({file_url})")
            md_content.append("") # افزودن یک خط خالی برای جداسازی

        # --- اضافه کردن راهنما و بقیه موارد (بدون تغییر) ---
        md_content.extend([
            "## 📖 راهنمای استفاده", "1. روی لینک مورد نظر **کلیک راست** کنید",
            "2. گزینه **«کپی لینک»** را انتخاب کنید", "3. لینک را در کلش متا **وارد کنید**\n",
            "## ⭐ ویژگی‌ها", "- 🚀 بهینه‌شده برای ایران", "- 🔄 فعال و غیر فعال کردن راحت قوانین",
            "- 📆 آپدیت روزانه\n", "## 📥 دریافت کلاینت", "### ویندوز",  
            "[Clash Verge Rev](https://github.com/clash-verge-rev/clash-verge-rev/releases)",
            "### اندروید", "[ClashMeta for Android](https://github.com/MetaCubeX/ClashMetaForAndroid/releases)"
        ])

        try:
            with open(self.readme_path, "w", encoding="utf-8") as f:
                f.write("\n".join(md_content))
            logger.info("فایل README.md با ساختار جدید با موفقیت ایجاد/به‌روز شد.")
        except Exception as e:
            logger.error(f"خطا در نوشتن README.md: {e}")
    # --- پایان تابع اصلاح شده ---

    def generate_configs(self):
        # ... (بدون تغییر) ...
        logger.info("شروع پردازش برای ساخت کانفیگ‌های Mihomo...")
        entries = self._load_entries(self.url_list_file)
        if not entries:
            logger.warning("هیچ URLی برای پردازش یافت نشد.")
            # اگر ورودی نباشد، ممکن است بخواهیم README را فقط با لینک proxies بسازیم
            # اما فعلا اجازه می‌دهیم فقط در صورت وجود entries ساخته شود
            # return # این خط را کامنت می‌کنیم تا حتی اگر ورودی نبود، README ساخته شود
        
        try:
            with open(self.template_path, "r", encoding="utf-8") as f:
                original_template = f.read()
            logger.info(f"فایل قالب {self.template_path} با موفقیت خوانده شد.")
        except FileNotFoundError:
            logger.critical(f"فایل قالب {self.template_path} یافت نشد! عملیات Mihomo متوقف شد.")
            # اگر قالب نباشد، نمی‌توان کانفیگ ساخت، اما شاید بتوان README را ساخت
            # sys.exit(1) # فعلا خروج نمی‌کنیم تا شاید README ساخته شود
            original_template = None # قالب را None می‌کنیم

        os.makedirs(self.output_dir, exist_ok=True)
        generated_files_for_readme = []

        if original_template and entries: # فقط اگر قالب و ورودی داریم، کانفیگ بساز
            for filename, url in entries:
                try:
                    logger.info(f"درحال ساخت {filename} با URL: {url}...")
                    modified_template = self._replace_proxy_url(original_template, url) 
                    output_path = os.path.join(self.output_dir, filename)
                    dir_path = os.path.dirname(output_path)
                    if dir_path and not os.path.exists(dir_path):
                        os.makedirs(dir_path, exist_ok=True)
                    with open(output_path, "w", encoding="utf-8") as f:
                        f.write(modified_template)
                    logger.info(f"فایل {output_path} با موفقیت ایجاد شد.")
                    generated_files_for_readme.append((filename, url))
                except Exception as e:
                    logger.error(f"خطا در پردازش {filename}: {e}")
        
        # همیشه سعی کن README را بسازی
        # اگر entries خالی باشد، فقط لینک proxies (اگر وجود داشته باشد) را می‌سازد
        self._generate_readme(entries) 
        
        logger.info("پردازش کانفیگ‌های Mihomo به پایان رسید.")

if __name__ == "__main__":
    # ... (بدون تغییر) ...
    try:
        processor = ConfigProcessor()
        processor.generate_configs()
        logger.info("✅ پردازش Mihomo با موفقیت کلی انجام شد!")
    except Exception as e:
        logger.critical(f"❌ خطای غیرمنتظره و حیاتی در پردازش Mihomo: {e}", exc_info=True)
        sys.exit(1)
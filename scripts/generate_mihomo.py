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
    # ... (بخش __init__ و _load_entries و _replace_proxy_url بدون تغییر) ...
    def __init__(self):
        self.template_path = "mihomo_template.txt"
        self.output_dir = "generated"
        self.readme_path = "README.md"
        self.base_url = "https://raw.githubusercontent.com/10ium/wg-to-clash/main/generated/"
        self.url_list_file = "Simple_URL_List.txt"

    def _load_entries(self, file_path: str) -> List[Tuple[str, str]]:
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

    # --- تابع _generate_readme با تغییر ایموجی ---
    def _generate_readme(self, entries: List[Tuple[str, str]]) -> None:
        """فایل README.md را با Markdown استاندارد و ایموجی جایگزین ایجاد می‌کند."""
        logger.info("شروع ساخت فایل README.md (تغییر ایموجی)...")
        md_content = [
            "# 📂 لیست کانفیگ‌ها\n",
            "### 🚦 انتخاب کنید:\n\n",
        ]

        proxies_filename = "proxies.yaml"
        proxies_path = os.path.join(self.output_dir, proxies_filename)
        if os.path.exists(proxies_path):
            proxies_url = f"{self.base_url}{urllib.parse.quote(proxies_filename)}"
            md_content.append(f"### 📄 فقط لیست پراکسی‌ها (بدون قوانین)\n")
            md_content.append(f"- [🌐 **{proxies_filename}**]({proxies_url})\n\n")
        else:
            logger.warning(f"فایل {proxies_path} یافت نشد، لینک آن به README اضافه نمی‌شود.")

        if entries:
            # --- این خط تغییر کرد ---
            md_content.append(f"### ⚙️ کانفیگ‌های کامل (با قوانین مخصوص ایران)\n") # <-- 🇮🇷 به ⚙️ تغییر یافت
            # ---------------------
            emojis = ["🚀", "🔒", "⚡", "🛡️"]
            for idx, (filename, _) in enumerate(entries):
                emoji = emojis[idx % len(emojis)]
                file_url = f"{self.base_url}{urllib.parse.quote(filename)}"
                md_content.append(f"- [{emoji} {filename}]({file_url})\n")
            md_content.append('\n')

        md_content.extend([
            "## 📖 راهنمای استفاده\n",
            "1. روی لینک مورد نظر **کلیک راست** کنید\n",
            "2. گزینه **«کپی لینک»** را انتخاب کنید\n",
            "3. لینک را در کلش متا **وارد کنید**\n\n",
            "## ⭐ ویژگی‌ها\n",
            "- 🚀 بهینه‌شده برای ایران\n",
            "- 🔄 فعال و غیر فعال کردن راحت قوانین\n",
            "- 📆 آپدیت روزانه\n\n",
            "## 📥 دریافت کلاینت\n",
            "### ویندوز\n",
            "[Clash Verge Rev](https://github.com/clash-verge-rev/clash-verge-rev/releases)\n\n",
            "### اندروید\n",
            "[ClashMeta for Android](https://github.com/MetaCubeX/ClashMetaForAndroid/releases)\n"
        ])

        try:
            with open(self.readme_path, "w", encoding="utf-8") as f:
                f.write("".join(md_content))
            logger.info("فایل README.md با ایموجی جدید ایجاد/به‌روز شد.")
        except Exception as e:
            logger.error(f"خطا در نوشتن README.md: {e}")
    # --- پایان تابع اصلاح شده ---

    def generate_configs(self):
        # ... (بدون تغییر) ...
        logger.info("شروع پردازش برای ساخت کانفیگ‌های Mihomo...")
        entries = self._load_entries(self.url_list_file)
        if not entries: logger.warning("هیچ URLی برای پردازش یافت نشد.")
        try:
            with open(self.template_path, "r", encoding="utf-8") as f: original_template = f.read()
            logger.info(f"فایل قالب {self.template_path} با موفقیت خوانده شد.")
        except FileNotFoundError:
            logger.critical(f"فایل قالب {self.template_path} یافت نشد! عملیات Mihomo متوقف شد.")
            original_template = None 
        os.makedirs(self.output_dir, exist_ok=True)
        generated_files_for_readme = []
        if original_template and entries:
            for filename, url in entries:
                try:
                    logger.info(f"درحال ساخت {filename} با URL: {url}...")
                    modified_template = self._replace_proxy_url(original_template, url) 
                    output_path = os.path.join(self.output_dir, filename)
                    dir_path = os.path.dirname(output_path)
                    if dir_path and not os.path.exists(dir_path): os.makedirs(dir_path, exist_ok=True)
                    with open(output_path, "w", encoding="utf-8") as f: f.write(modified_template)
                    logger.info(f"فایل {output_path} با موفقیت ایجاد شد.")
                    generated_files_for_readme.append((filename, url))
                except Exception as e: logger.error(f"خطا در پردازش {filename}: {e}")
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
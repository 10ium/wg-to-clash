#!/usr/bin/env python3
import os
import re
import urllib.parse
import logging
import sys # <-- اضافه شد
from typing import List, Tuple

# --- بخش لاگ بهبود یافته ---
# ایجاد logger اصلی
logger = logging.getLogger()
logger.setLevel(logging.INFO)

# فرمت لاگ
formatter = logging.Formatter("%(asctime)s - %(levelname)s - %(message)s")

# Handler برای نوشتن در فایل
file_handler = logging.FileHandler("update.log", encoding="utf-8")
file_handler.setFormatter(formatter)
logger.addHandler(file_handler)

# Handler برای چاپ در کنسول (GitHub Actions Log)
stream_handler = logging.StreamHandler(sys.stdout) # <-- اضافه شد
stream_handler.setFormatter(formatter)
logger.addHandler(stream_handler)
# --- پایان بخش لاگ بهبود یافته ---

class ConfigProcessor:
    def __init__(self):
        """مقادیر اولیه و مسیر فایل‌ها را تنظیم می‌کند."""
        self.template_path = "mihomo_template.txt"
        self.output_dir = "generated"
        self.readme_path = "README.md"
        self.base_url = "https://raw.githubusercontent.com/10ium/MihomoSaz/main/generated/" 
        self.url_list_file = "Simple_URL_List.txt"

    def _load_entries(self, file_path: str) -> List[Tuple[str, str]]:
        """بارگذاری لیست URLها از فایل مشخص شده."""
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
            logger.error(f"فایل {file_path} یافت نشد!") # <-- سطح به error تغییر کرد
        return entries

    def _replace_proxy_url(self, template: str, new_url: str) -> str:
        """URL موجود در بخش 'proxy-providers' قالب را با URL جدید جایگزین می‌کند."""
        pattern = re.compile(
            r'(proxy-providers:\s*\n\s+proxy:\s*\n\s+type:\s*http\s*\n\s+url:\s*)[^\n]+',
            re.IGNORECASE
        )
        modified_template, count = pattern.subn(rf'\g<1>{new_url}', template)
        if count == 0:
             logger.warning(f"الگوی 'proxy-providers' برای جایگزینی URL '{new_url}' در قالب یافت نشد.")
        return modified_template

    def _generate_readme(self, entries: List[Tuple[str, str]]) -> None:
        """فایل README.md را با لینک‌های مستقیم به کانفیگ‌های تولید شده، ایجاد می‌کند."""
        logger.info("شروع ساخت فایل README.md...")
        md_content = [
            "# 📂 لیست کانفیگ‌های کلش متا",
            "### با قوانین مخصوص ایران\n",
            "**فایل‌های پیکربندی آماده استفاده:**\n"
        ]
        
        emojis = ["🌐", "🚀", "🔒", "⚡", "🛡️"]
        for idx, (filename, _) in enumerate(entries):
            emoji = emojis[idx % len(emojis)]
            file_url = f"{self.base_url}{urllib.parse.quote(filename)}"
            md_content.append(f"- [{emoji} {filename}]({file_url})")

        md_content.extend([
            "\n## 📖 راهنمای استفاده", "1. روی لینک مورد نظر **کلیک راست** کنید",
            "2. گزینه **«کپی لینک»** را انتخاب کنید", "3. لینک را در کلش متا **وارد کنید**\n",
            "## ⭐ ویژگی‌ها", "- 🚀 بهینه‌شده برای ایران", "- 🔄 فعال و غیر فعال کردن راحت قوانین",
            "- 📆 آپدیت روزانه\n", "## 📥 دریافت کلاینت", "### ویندوز",  
            "[Clash Verge Rev](https://github.com/clash-verge-rev/clash-verge-rev/releases)",
            "### اندروید", "[ClashMeta for Android](https://github.com/MetaCubeX/ClashMetaForAndroid/releases)"
        ])

        try:
            with open(self.readme_path, "w", encoding="utf-8") as f:
                f.write("\n".join(md_content))
            logger.info("فایل README.md با موفقیت ایجاد/به‌روز شد.")
        except Exception as e:
            logger.error(f"خطا در نوشتن README.md: {e}")

    def generate_configs(self):
        """فرآیند اصلی تولید فایل‌های پیکربندی را مدیریت می‌کند."""
        logger.info("شروع پردازش برای ساخت کانفیگ‌های Mihomo...")
        entries = self._load_entries(self.url_list_file)
        
        if not entries:
            logger.warning("هیچ URLی برای پردازش یافت نشد. عملیات متوقف می‌شود.")
            return # <-- نیازی به خروج با خطا نیست، چون ممکن است طبیعی باشد

        try:
            with open(self.template_path, "r", encoding="utf-8") as f:
                original_template = f.read()
            logger.info(f"فایل قالب {self.template_path} با موفقیت خوانده شد.")
        except FileNotFoundError:
            logger.critical(f"فایل قالب {self.template_path} یافت نشد! عملیات متوقف شد.")
            sys.exit(1) # <-- خروج با خطا

        os.makedirs(self.output_dir, exist_ok=True)

        generated_files_for_readme = []
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

        if generated_files_for_readme:
            self._generate_readme(generated_files_for_readme)
        else:
            logger.warning("هیچ فایل کانفیگی ایجاد نشد، README.md تولید نمی‌شود.")
        logger.info("پردازش کانفیگ‌های Mihomo به پایان رسید.")

if __name__ == "__main__":
    try:
        processor = ConfigProcessor()
        processor.generate_configs()
        logger.info("✅ پردازش Mihomo با موفقیت کلی انجام شد!")
    except Exception as e:
        logger.critical(f"❌ خطای غیرمنتظره و حیاتی در پردازش Mihomo: {e}", exc_info=True)
        sys.exit(1) # <-- خروج با خطا
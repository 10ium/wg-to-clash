#!/usr/bin/env python3
import os
import re
import urllib.parse
import logging
from typing import List, Tuple

# تنظیمات لاگ
logging.basicConfig(
    filename="update.log",
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    encoding="utf-8"
)

class ConfigProcessor:
    def __init__(self):
        """مقادیر اولیه و مسیر فایل‌ها را تنظیم می‌کند."""
        self.template_path = "mihomo_template.txt"
        self.output_dir = "generated" # پوشه خروجی مشترک
        self.readme_path = "README.md"
        # URL پایه باید با نام کاربری و نام ریپازیتوری شما مطابقت داشته باشد
        self.base_url = "https://raw.githubusercontent.com/10ium/MihomoSaz/main/generated/" 
        self.url_list_file = "Simple_URL_List.txt"

    def _load_entries(self, file_path: str) -> List[Tuple[str, str]]:
        """بارگذاری لیست URLها از فایل مشخص شده."""
        entries = []
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                for line in f:
                    line = line.strip()
                    if not line or "|" not in line or line.startswith('#'): # نادیده گرفتن خطوط خالی، بدون | یا کامنت
                        continue
                    filename, url = line.split("|", 1)
                    entries.append((filename.strip(), url.strip()))
        except FileNotFoundError:
            logging.error(f"فایل {file_path} یافت نشد!")
        return entries

    def _replace_proxy_url(self, template: str, new_url: str) -> str:
        """URL موجود در بخش 'proxy-providers' قالب را با URL جدید جایگزین می‌کند."""
        # این الگو ممکن است نیاز به تنظیم دقیق‌تری بر اساس فایل قالب شما داشته باشد
        pattern = re.compile(
            r'(proxy-providers:\s*\n\s+proxy:\s*\n\s+type:\s*http\s*\n\s+url:\s*)[^\n]+',
            re.IGNORECASE # برای انعطاف بیشتر
        )
        # اطمینان از اینکه URL جایگزین شده به درستی فرمت شده است
        return pattern.sub(rf'\g{new_url}', template)

    def _generate_readme(self, entries: List[Tuple[str, str]]) -> None:
        """فایل README.md را با لینک‌های مستقیم به کانفیگ‌های تولید شده، ایجاد می‌کند."""
        md_content = [
            "# 📂 لیست کانفیگ‌های کلش متا",
            "### با قوانین مخصوص ایران\n",
            "**فایل‌های پیکربندی آماده استفاده:**\n"
        ]
        
        emojis = ["🌐", "🚀", "🔒", "⚡", "🛡️"]
        for idx, (filename, _) in enumerate(entries):
            emoji = emojis[idx % len(emojis)]
            # URL فایل با استفاده از base_url ساخته می‌شود
            file_url = f"{self.base_url}{urllib.parse.quote(filename)}"
            md_content.append(f"- [{emoji} {filename}]({file_url})")

        md_content.extend([
            "\n## 📖 راهنمای استفاده",
            "1. روی لینک مورد نظر **کلیک راست** کنید",
            "2. گزینه **«کپی لینک»** را انتخاب کنید",
            "3. لینک را در کلش متا **وارد کنید**\n",
            
            "## ⭐ ویژگی‌ها",
            "- 🚀 بهینه‌شده برای ایران",
            "- 🔄 فعال و غیر فعال کردن راحت قوانین",
            "- 📆 آپدیت روزانه\n",
            
            "## 📥 دریافت کلاینت",
            "### ویندوز",  
            "[Clash Verge Rev](https://github.com/clash-verge-rev/clash-verge-rev/releases)",
            
            "### اندروید",
            "[ClashMeta for Android](https://github.com/MetaCubeX/ClashMetaForAndroid/releases)"
        ])

        try:
            with open(self.readme_path, "w", encoding="utf-8") as f:
                f.write("\n".join(md_content))
            logging.info("فایل README.md با موفقیت ایجاد/به‌روز شد.")
        except Exception as e:
            logging.error(f"خطا در نوشتن README.md: {e}")


    def generate_configs(self):
        """فرآیند اصلی تولید فایل‌های پیکربندی را مدیریت می‌کند."""
        entries = self._load_entries(self.url_list_file)
        
        if not entries:
            logging.warning("هیچ URLی برای پردازش یافت نشد.")
            return

        try:
            with open(self.template_path, "r", encoding="utf-8") as f:
                original_template = f.read()
        except FileNotFoundError:
            logging.critical(f"فایل قالب {self.template_path} یافت نشد! عملیات متوقف شد.")
            return

        os.makedirs(self.output_dir, exist_ok=True)

        generated_files_for_readme = []
        for filename, url in entries:
            try:
                modified_template = self._replace_proxy_url(original_template, url)
                
                # بررسی اینکه آیا جایگزینی موفق بوده است
                if modified_template == original_template and url:
                     logging.warning(f"جایگزینی URL در قالب برای {filename} انجام نشد. آیا الگوی 'proxy-providers' در قالب وجود دارد؟")

                output_path = os.path.join(self.output_dir, filename)
                
                # اگر نام فایل شامل پوشه باشد، آن را ایجاد کن
                dir_path = os.path.dirname(output_path)
                if dir_path and not os.path.exists(dir_path):
                    os.makedirs(dir_path, exist_ok=True)

                with open(output_path, "w", encoding="utf-8") as f:
                    f.write(modified_template)
                logging.info(f"فایل {output_path} با موفقیت ایجاد شد.")
                generated_files_for_readme.append((filename, url))

            except Exception as e:
                logging.error(f"خطا در پردازش {filename}: {e}")


        # فقط در صورتی README را تولید کن که حداقل یک فایل ایجاد شده باشد
        if generated_files_for_readme:
            self._generate_readme(generated_files_for_readme)
        else:
            logging.warning("هیچ فایل کانفیگی ایجاد نشد، README.md تولید نمی‌شود.")


if __name__ == "__main__":
    try:
        processor = ConfigProcessor()
        processor.generate_configs()
        logging.info("✅ پردازش Mihomo با موفقیت انجام شد!")
    except Exception as e:
        logging.critical(f"❌ خطای غیرمنتظره در پردازش Mihomo: {e}", exc_info=True)
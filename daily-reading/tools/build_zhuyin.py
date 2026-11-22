"""重新產生 zhuyin.woff（注音秋茄字型的網站用子集）。
新增文章後執行：python3 tools/build_zhuyin.py
來源 tools/zhuyin-src.ttf 是「ㄅ曉聲通注音秋茄」（SIL OFL 1.1）的 Big5 常用字子集。"""
import re, subprocess, pathlib
here = pathlib.Path(__file__).resolve().parent
site = here.parent
html = (site / "index.html").read_text(encoding="utf-8")
data = html[html.index("const ARTICLES=["):html.index("const $=")]
chars = set(re.findall(r"[　-〿一-鿿＀-￯]", data))
chars |= set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz .,:;!?()-%—…‧·・／～")
txt = here / "_chars.txt"
txt.write_text("".join(sorted(chars)), encoding="utf-8")
subprocess.run(["pyftsubset", str(here / "zhuyin-src.ttf"), f"--text-file={txt}", "--unicodes=U+E01E0-E01EF",
                "--layout-features=*", "--no-hinting", "--flavor=woff", f"--output-file={site / 'zhuyin.woff'}"], check=True)
txt.unlink()
print("zhuyin.woff:", (site / "zhuyin.woff").stat().st_size // 1024, "KB,", len(chars), "chars")

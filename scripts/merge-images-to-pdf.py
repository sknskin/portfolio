#!/usr/bin/env python3
"""PNG 이미지들을 하나의 PDF로 합침 (macOS Quartz 사용)"""
import Quartz
from CoreFoundation import NSURL
import sys
import json

files = json.loads(sys.argv[1])
output = sys.argv[2]

out_url = NSURL.fileURLWithPath_(output)
ctx = Quartz.CGPDFContextCreateWithURL(out_url, None, None)

for fpath in files:
    url = NSURL.fileURLWithPath_(fpath)
    img_src = Quartz.CGImageSourceCreateWithURL(url, None)
    if img_src is None:
        continue
    img = Quartz.CGImageSourceCreateImageAtIndex(img_src, 0, None)
    if img is None:
        continue
    w = Quartz.CGImageGetWidth(img)
    h = Quartz.CGImageGetHeight(img)
    # Retina 2x 이므로 /2
    page_w = w / 2.0
    page_h = h / 2.0
    rect = Quartz.CGRectMake(0, 0, page_w, page_h)
    Quartz.CGContextBeginPage(ctx, rect)
    Quartz.CGContextDrawImage(ctx, rect, img)
    Quartz.CGContextEndPage(ctx)

Quartz.CGPDFContextClose(ctx)
print("OK")

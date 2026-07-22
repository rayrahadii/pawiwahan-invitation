"""Generates on-brand placeholder images for the Balinese theme (black/
charcoal + gold/yellow) so nothing looks broken out of the box. Swap these
out in /public/images for real photos — same filenames, any size works
since CSS crops to fit."""

import random
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ONYX = (16, 15, 13)
CHARCOAL = (32, 30, 26)
GRAPHITE = (58, 54, 47)
GOLD = (201, 162, 39)
GOLD_BRIGHT = (232, 196, 104)
CREAM = (237, 230, 214)

FONT_PATH = "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf"

random.seed(11)


def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def gradient(size, c1, c2, diagonal=True):
    w, h = size
    img = Image.new("RGB", size, c1)
    px = img.load()
    for y in range(h):
        for x in range(w):
            t = ((x / w) + (y / h)) / 2 if diagonal else y / h
            px[x, y] = lerp(c1, c2, t)
    return img


def add_grain(img, amount=6):
    px = img.load()
    w, h = img.size
    for _ in range(w * h // 16):
        x, y = random.randint(0, w - 1), random.randint(0, h - 1)
        r, g, b = px[x, y]
        d = random.randint(-amount, amount)
        px[x, y] = (max(0, min(255, r + d)), max(0, min(255, g + d)), max(0, min(255, b + d)))
    return img


def draw_gold_flecks(img, count, color=GOLD):
    draw = ImageDraw.Draw(img)
    w, h = img.size
    for _ in range(count):
        x, y = random.randint(0, w), random.randint(0, h)
        r = random.uniform(0.4, 1.6)
        draw.ellipse([x - r, y - r, x + r, y + r], fill=color)
    return img


def draw_ornament_corner(draw, cx, cy, scale, color, rotation=0):
    import math

    for i in range(2):
        angle = rotation + i * 90
        rad = math.radians(angle)
        x2 = cx + math.cos(rad) * 40 * scale
        y2 = cy + math.sin(rad) * 40 * scale
        draw.line([(cx, cy), (x2, y2)], fill=color, width=max(1, int(1.5 * scale)))


def make_gallery_image(path, label, c1, c2, size=(900, 900)):
    img = gradient(size, c1, c2)
    img = add_grain(img, amount=5)
    img = draw_gold_flecks(img, 140)
    draw = ImageDraw.Draw(img)
    w, h = size

    # vignette
    overlay = Image.new("RGBA", size, (0, 0, 0, 0))
    odraw = ImageDraw.Draw(overlay)
    odraw.ellipse([-w * 0.2, -h * 0.2, w * 0.7, h * 0.7], fill=(255, 255, 255, 10))
    odraw.rectangle([0, 0, w, h], outline=None)
    overlay = overlay.filter(ImageFilter.GaussianBlur(40))
    img = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")
    draw = ImageDraw.Draw(img)

    # dark vignette edges for depth
    vign = Image.new("L", size, 0)
    vdraw = ImageDraw.Draw(vign)
    vdraw.ellipse([w * 0.08, h * 0.08, w * 0.92, h * 0.92], fill=255)
    vign = vign.filter(ImageFilter.GaussianBlur(80))
    dark = Image.new("RGB", size, (5, 5, 4))
    img = Image.composite(img, dark, vign)
    draw = ImageDraw.Draw(img)

    draw_ornament_corner(draw, w * 0.1, h * 0.1, 2.2, GOLD, rotation=0)
    draw_ornament_corner(draw, w * 0.9, h * 0.9, 2.2, GOLD, rotation=180)

    margin = 26
    draw.rectangle([margin, margin, w - margin, h - margin], outline=GOLD, width=2)

    font_size = 50
    font = ImageFont.truetype(FONT_PATH, font_size)
    bbox = draw.textbbox((0, 0), label, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text(((w - tw) / 2, (h - th) / 2 - 10), label, font=font, fill=GOLD_BRIGHT)

    sub_font = ImageFont.truetype(FONT_PATH, 20)
    sub = "Ganti dengan foto asli"
    bbox2 = draw.textbbox((0, 0), sub, font=sub_font)
    tw2 = bbox2[2] - bbox2[0]
    draw.text(((w - tw2) / 2, (h + th) / 2 + 18), sub, font=sub_font, fill=(200, 190, 170))

    img.save(path, quality=90)


def make_portrait(path, size=(600, 600)):
    img = gradient(size, ONYX, GRAPHITE, diagonal=True)
    img = add_grain(img, amount=4)
    img = draw_gold_flecks(img, 60)
    draw = ImageDraw.Draw(img)
    w, h = size
    draw.ellipse([w * 0.36, h * 0.3, w * 0.64, h * 0.58], fill=(10, 10, 9))
    draw.ellipse([w * 0.2, h * 0.6, w * 0.8, h * 1.15], fill=(10, 10, 9))
    draw.ellipse([w * 0.18, h * 0.18, w * 0.82, h * 0.82], outline=GOLD, width=2)
    img.save(path, quality=90)


def make_favicon(path, size=(64, 64)):
    img = Image.new("RGB", size, ONYX)
    draw = ImageDraw.Draw(img)
    draw.ellipse([6, 6, 58, 58], outline=GOLD, width=3)
    font = ImageFont.truetype(FONT_PATH, 24)
    draw.text((17, 16), "&", font=font, fill=GOLD_BRIGHT)
    img.save(path)


def make_stone_texture(path, size=(1000, 1400)):
    """Dark carved-stone-like texture used as a CSS background-image on a
    few sections (Hero, Acara, Kado, Closing) for atmospheric depth."""
    img = gradient(size, (20, 19, 16), (10, 9, 8), diagonal=False)
    img = add_grain(img, amount=9)

    # subtle blotchy cloud layer to suggest weathered stone
    w, h = size
    blotch = Image.new("L", size, 0)
    bdraw = ImageDraw.Draw(blotch)
    for _ in range(50):
        x, y = random.randint(0, w), random.randint(0, h)
        r = random.randint(60, 220)
        bdraw.ellipse([x - r, y - r, x + r, y + r], fill=random.randint(10, 40))
    blotch = blotch.filter(ImageFilter.GaussianBlur(60))
    dark_overlay = Image.new("RGB", size, (0, 0, 0))
    img = Image.composite(dark_overlay, img, blotch)

    img = draw_gold_flecks(img, 90, color=(120, 95, 40))
    img = img.filter(ImageFilter.GaussianBlur(0.6))
    img.save(path, quality=85)


if __name__ == "__main__":
    import os

    out_dir = "/home/claude/undangan-pernikahan-bali/public/images"
    os.makedirs(out_dir, exist_ok=True)

    palette_pairs = [
        (ONYX, CHARCOAL),
        (CHARCOAL, GRAPHITE),
        (GRAPHITE, ONYX),
        (ONYX, (45, 38, 20)),
        (CHARCOAL, (40, 33, 18)),
        (GRAPHITE, CHARCOAL),
    ]

    for i in range(1, 7):
        c1, c2 = palette_pairs[i - 1]
        make_gallery_image(f"{out_dir}/gallery-{i}.jpg", f"Foto {i}", c1, c2)

    make_portrait(f"{out_dir}/portrait-placeholder.jpg")
    make_favicon(f"{out_dir}/favicon.png")
    make_stone_texture(f"{out_dir}/texture-stone.jpg")

    print("done")

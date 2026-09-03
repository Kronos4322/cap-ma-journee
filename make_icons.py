"""Genere les icones PWA de l'application Cap (fond degrade + coche)."""
from PIL import Image, ImageDraw
import math


def lerp(a, b, t):
    return tuple(round(a[i] + (b[i] - a[i]) * t) for i in range(3))


def make_icon(size, maskable=False):
    # Supersampling pour des bords nets
    ss = 4
    S = size * ss
    img = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    top = (99, 102, 241)     # indigo
    bottom = (139, 92, 246)  # violet

    # Zone du fond : pleine si maskable (safe area geree par l'OS), arrondie sinon
    margin = 0 if maskable else int(S * 0.085)
    radius = 0 if maskable else int(S * 0.235)

    # Degrade vertical
    for y in range(S):
        t = y / (S - 1)
        draw.line([(0, y), (S, y)], fill=lerp(top, bottom, t))

    if not maskable:
        # Masque arrondi
        mask = Image.new("L", (S, S), 0)
        ImageDraw.Draw(mask).rounded_rectangle(
            [margin, margin, S - margin, S - margin], radius=radius, fill=255
        )
        bg = img
        img = Image.new("RGBA", (S, S), (0, 0, 0, 0))
        img.paste(bg, (0, 0), mask)
        draw = ImageDraw.Draw(img)

    # Coche
    cx, cy = S * 0.5, S * 0.52
    scale = S * (0.30 if maskable else 0.34)
    p1 = (cx - scale * 0.95, cy + scale * 0.05)
    p2 = (cx - scale * 0.30, cy + scale * 0.70)
    p3 = (cx + scale * 1.00, cy - scale * 0.75)
    width = int(S * (0.085 if maskable else 0.095))
    draw.line([p1, p2, p3], fill=(255, 255, 255, 255), width=width, joint="curve")
    for p in (p1, p2, p3):
        draw.ellipse([p[0] - width / 2, p[1] - width / 2, p[0] + width / 2, p[1] + width / 2],
                     fill=(255, 255, 255, 255))

    return img.resize((size, size), Image.LANCZOS)


for s in (192, 512):
    make_icon(s).save(f"icon-{s}.png")
    make_icon(s, maskable=True).save(f"icon-{s}-maskable.png")
make_icon(180).save("apple-touch-icon.png")
make_icon(32).save("favicon-32.png")
print("Icones generees.")

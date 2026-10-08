import os
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_tesselator_logo(out_path):
    scale = 4
    target_w, target_h = 185, 42
    w = target_w * scale
    h = target_h * scale
    
    # 1. Base canvas: dark navy matching header #091834
    navy_color = (9, 24, 52, 255)
    img = Image.new("RGBA", (w, h), navy_color)
    draw = ImageDraw.Draw(img)
    
    # 2. White rectangle inside:
    # 4px border all around
    pad_top = int(3.5 * scale)
    pad_bottom = int(3.5 * scale)
    pad_left = int(4.0 * scale)
    pad_right = int(4.0 * scale)
    
    rect_box = [pad_left, pad_top, w - pad_right, h - pad_bottom]
    draw.rectangle(rect_box, fill=(255, 255, 255, 255))
    
    # 3. Text "TESSELATOR"
    font_path = "C:/Windows/Fonts/impact.ttf"
    if not os.path.exists(font_path):
        font_path = "C:/Windows/Fonts/ariblk.ttf"
        
    font_size = int(24 * scale)
    font = ImageFont.truetype(font_path, font_size)
    text = "TESSELATOR"
    
    bbox = font.getbbox(text)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    
    text_canvas_w = tw + 40 * scale
    text_canvas_h = th + 40 * scale
    text_canvas = Image.new("RGBA", (text_canvas_w, text_canvas_h), (0, 0, 0, 0))
    t_draw = ImageDraw.Draw(text_canvas)
    
    # Drop shadow
    shadow_offset = int(1.5 * scale)
    t_draw.text((20 * scale + shadow_offset, 15 * scale + shadow_offset - bbox[1]), text, fill=(140, 140, 140, 190), font=font)
    shadow_img = text_canvas.filter(ImageFilter.GaussianBlur(radius=scale * 0.7))
    
    # Main black text
    text_layer = Image.new("RGBA", (text_canvas_w, text_canvas_h), (0, 0, 0, 0))
    tl_draw = ImageDraw.Draw(text_layer)
    tl_draw.text((20 * scale, 15 * scale - bbox[1]), text, fill=(5, 5, 5, 255), font=font)
    
    combined_text = Image.alpha_composite(shadow_img, text_layer)
    
    # Shearing for italic:
    shear_val = 0.20
    transformed_text = combined_text.transform(
        (text_canvas_w, text_canvas_h),
        Image.AFFINE,
        (1, -shear_val, 0, 0, 1, 0),
        resample=Image.BICUBIC
    )
    
    trans_bbox = transformed_text.getbbox()
    cropped_text = transformed_text.crop(trans_bbox)
    
    # Available dimensions in white box with clean, equal margins
    avail_w = (rect_box[2] - rect_box[0]) - int(10 * scale)
    avail_h = (rect_box[3] - rect_box[1]) - int(4 * scale)
    
    text_ratio = min(avail_w / cropped_text.width, avail_h / cropped_text.height)
    new_tw = int(cropped_text.width * text_ratio)
    new_th = int(cropped_text.height * text_ratio)
    fitted_text = cropped_text.resize((new_tw, new_th), Image.LANCZOS)
    
    # Center text horizontally and vertically in white box
    tx = rect_box[0] + (rect_box[2] - rect_box[0] - new_tw) // 2
    ty = rect_box[1] + (rect_box[3] - rect_box[1] - new_th) // 2
    
    img.paste(fitted_text, (tx, ty), fitted_text)
    
    # 4. Slashes:
    slash_layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(slash_layer)
    
    num_slashes = 10
    step = new_tw / (num_slashes + 0.15)
    
    angle_rad = math.radians(22)
    # Height of slashes kept strictly within the white rectangle!
    max_allowed_h = (rect_box[3] - rect_box[1]) - int(2 * scale)
    slash_len = min(new_th * 1.02, max_allowed_h / math.cos(angle_rad))
    
    for i in range(num_slashes):
        cx = tx + int((i + 0.58) * step)
        cy = ty + new_th // 2
        
        dx = (slash_len / 2) * math.sin(angle_rad)
        dy = (slash_len / 2) * math.cos(angle_rad)
        
        x1 = cx + dx
        y1 = cy - dy
        x2 = cx - dx
        y2 = cy + dy
        
        # Ensure y1 and y2 do not exceed rect_box
        y1 = max(rect_box[1] + 1, min(y1, rect_box[3] - 1))
        y2 = max(rect_box[1] + 1, min(y2, rect_box[3] - 1))
        
        tip_w = 0.4 * scale
        mid_w = 2.0 * scale
        
        nx = -math.cos(angle_rad)
        ny = math.sin(angle_rad)
        
        # Outer vibrant orange glow
        poly_orange = [
            (x1 - nx * tip_w, y1 - ny * tip_w),
            (cx - nx * mid_w, cy - ny * mid_w),
            (x2 - nx * tip_w, y2 - ny * tip_w),
            (x2 + nx * tip_w, y2 + ny * tip_w),
            (cx + nx * mid_w, cy + ny * mid_w),
            (x1 + nx * tip_w, y1 + ny * tip_w)
        ]
        s_draw.polygon(poly_orange, fill=(255, 100, 0, 245))
        
        # Inner golden-yellow core
        mid_w_inner = 1.1 * scale
        poly_yellow = [
            (x1 - nx * 0.15 * scale, y1 - ny * 0.15 * scale),
            (cx - nx * mid_w_inner, cy - ny * mid_w_inner),
            (x2 - nx * 0.15 * scale, y2 - ny * 0.15 * scale),
            (x2 + nx * 0.15 * scale, y2 + ny * 0.15 * scale),
            (cx + nx * mid_w_inner, cy + ny * mid_w_inner),
            (x1 + nx * 0.15 * scale, y1 + ny * 0.15 * scale)
        ]
        s_draw.polygon(poly_yellow, fill=(255, 230, 20, 255))
        
        # Central white glint
        mid_w_white = 0.35 * scale
        poly_white = [
            (x1, y1),
            (cx - nx * mid_w_white, cy - ny * mid_w_white),
            (x2, y2),
            (cx + nx * mid_w_white, cy + ny * mid_w_white)
        ]
        s_draw.polygon(poly_white, fill=(255, 255, 220, 220))
        
    final_img = Image.alpha_composite(img, slash_layer)
    
    # 5. Save at target dimensions
    res = final_img.resize((target_w, target_h), Image.LANCZOS)
    res.save(out_path, format="PNG")
    print(f"Saved {out_path} ({res.size})")

if __name__ == "__main__":
    out = r"c:/Users/harik/OneDrive/Desktop/forexam/src/assets/tesselator_logo.png"
    create_tesselator_logo(out)

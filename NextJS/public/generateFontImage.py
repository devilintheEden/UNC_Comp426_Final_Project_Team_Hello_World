from PIL import Image, ImageFont, ImageDraw, ImageChops

def trim(im):
    bg = Image.new(im.mode, im.size, im.getpixel((0,0)))
    diff = ImageChops.difference(im, bg)
    diff = ImageChops.add(diff, diff, 2.0, -100)
    bbox = diff.getbbox()
    if bbox:
        return im.crop(bbox)

im = Image.new("RGB",(1000,300), (255, 255, 255))
draw = ImageDraw.Draw(im)
font = ImageFont.truetype("C:\\Users\\HP\\Desktop\\Ubuntu-C.ttf", 24)
draw.text((2, 5), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890", font=font,fill = "black", align = "center")
im=trim(im);
if(im.size[0] > 12 * im.size[1]):
    im = im.crop((0,0,im.size[1] * 12, im.size[1]))
else:
    img = im
    im = Image.new("RGB",(img.size[1] * 12, img.size[1]), (255, 255, 255))
    im.paste(img, (img.size[1] * 6 - int(img.size[0] / 2), 0))
img = im.resize((456,38))
im = Image.new("RGB",(480,40), (255, 255, 255))
im.paste(img, (12,1))
im.save("C:\\Users\\HP\\Desktop\\font_demo_0.jpg", "JPEG")
im = Image.new("RGB",(1000,800), (255, 255, 255))
draw = ImageDraw.Draw(im)
font = ImageFont.truetype("C:\\Users\\HP\\Desktop\\Ubuntu-C.ttf", 48)
draw.text((10, 20), "ABCDEFGHIJKLMNO", font=font,fill = "black", align = "center")
draw.text((10, 90), "PQRSTUVWXYZabc", font=font,fill = "black", align = "center")
draw.text((10, 160), "defghijklmnopqrst", font=font,fill = "black", align = "center")
draw.text((10, 230), "uvwxyz1234567890", font=font,fill = "black", align = "center")
im=trim(im);
if(3 * im.size[0] > 5 * im.size[1]):
    im = im.crop((0,0,int(im.size[1] * 5 / 3), im.size[1]))
else:
    img = im
    im = Image.new("RGB",(int(im.size[1] * 5 / 3), img.size[1]), (255, 255, 255))
    im.paste(img, (int(im.size[1] * 5 / 6) - int(img.size[0] / 2), 0))
img = im.resize((480,288))
im = Image.new("RGB",(500,300), (255, 255, 255))
im.paste(img, (10,6))
im.save("C:\\Users\\HP\\Desktop\\font_demo_1.jpg", "JPEG")

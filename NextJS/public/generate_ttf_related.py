from PIL import Image, ImageDraw, ImageFont
from pdf2image import convert_from_bytes
import os
import sys
import math
import subprocess
import fontforge

BASE_PATH = os.path.join(os.path.expanduser(
    "~"), "nextjs-blog", "public", "Backend")
UPPER_CASE = list(map(chr, range(65, 91)))
LOWER_CASE = list(map(chr, range(97, 123)))
NUMBERS = list(map(chr, range(48, 58)))
SYMBOLS = list(map(chr, range(32, 48))) + list(map(chr, range(58, 65))) + \
    list(map(chr, range(91, 97))) + list(map(chr, range(123, 127)))
ALL_CHARS = UPPER_CASE + LOWER_CASE + NUMBERS + SYMBOLS
USED_FONT = os.path.join(BASE_PATH, "Resources", "Ubuntu-C.ttf")

paper_width = 1000
paper_height = 1414
grid_edge = 170
grid_interval = 20
grids_num_w = 5
grids_num_h = 7
upper_padding = (paper_height - grids_num_h * (grid_edge + grid_interval)) / 2
left_padding = (paper_width - grids_num_w *
                (grid_edge + grid_interval) + grid_interval) / 2


def helper_create_path(file_path):
    if not os.path.exists(file_path):
        os.makedirs(file_path)


def generate_blank_pdf_sample(usr_id, project_name, w, h):
    w_offset = h_offset = 0

    if(w < h):
        w_offset = int((grid_edge - grid_edge / h * w) / 2)
    elif(w > h):
        h_offset = int((grid_edge - grid_edge / w * h) / 2)

    images = []
    k = 0
    while k < len(ALL_CHARS):
        img = Image.new('RGB', (paper_width, paper_height), 'white')
        draw = ImageDraw.Draw(img)
        draw.text((0, paper_height - 20), str(w) + ':' + str(h),
                  fill='black', font=ImageFont.truetype(USED_FONT, 18))
        for j in range(grids_num_h):
            for i in range(grids_num_w):
                if(k >= len(ALL_CHARS)):
                    break
                left_up_corner = (left_padding + i * (grid_edge + grid_interval),
                                  upper_padding + j * (grid_edge + grid_interval))
                draw.rectangle((left_up_corner[0] + w_offset, left_up_corner[1] + grid_interval + h_offset, left_up_corner[0] +
                                grid_edge - w_offset, left_up_corner[1] + grid_edge + grid_interval - h_offset), outline='black', width=1)
                temp = ALL_CHARS[k] if ALL_CHARS[k] != ' ' else 'space'
                draw.text(left_up_corner, temp, fill='black',
                          font=ImageFont.truetype(USED_FONT, 18))
                k = k + 1
            if(k >= len(ALL_CHARS)):
                break
        images.append(img)
    file_path = os.path.join(BASE_PATH, "Users", str(usr_id), "Projects", project_name, "Blank")
    helper_create_path(file_path)
    print(file_path)
    images[0].save(os.path.join(file_path, 'Sample_Latin_Alphabets_' + str(w) + '_' +
                                str(h) + '.pdf'), "PDF", resolution=100.0, save_all=True, append_images=images[1:])


def create_svg_from_pdf(usr_id, project_name, upload_file_name, w, h):
    upload_folder_path = os.path.join(BASE_PATH, "Users", str(
        usr_id), 'Projects', project_name, 'Uploads')
    helper_create_path(upload_folder_path)
    upload_pdf_path = os.path.join(upload_folder_path, upload_file_name)
    w_offset = h_offset = 0
    if(w < h):
        w_offset = int((grid_edge - grid_edge / h * w) / 2)
    elif(w > h):
        h_offset = int((grid_edge - grid_edge / w * h) / 2)
    images = convert_from_bytes(
        open(upload_pdf_path, 'rb').read(), size=(paper_width, paper_height))
    k = 0
    for image in images:
        for j in range(grids_num_h):
            for i in range(grids_num_w):
                if(k >= len(ALL_CHARS)):
                    break
                left_up_corner = (left_padding + i * (grid_edge + grid_interval),
                                  upper_padding + j * (grid_edge + grid_interval))
                cropped_image = image.crop((left_up_corner[0] + w_offset + 4, left_up_corner[1] + grid_interval + h_offset + 4,
                                            left_up_corner[0] + grid_edge - w_offset, left_up_corner[1] + grid_edge + grid_interval - h_offset))
                save_file_path = os.path.join(
                    upload_folder_path, 'Images_From_PDF')
                helper_create_path(save_file_path)
                cropped_image.save(os.path.join(
                    save_file_path, str(k) + '.bmp'))
                subprocess.run(["potrace", "-s", os.path.join(save_file_path, str(
                    k) + '.bmp'), "-o", os.path.join(save_file_path, str(k) + '.svg')])
                subprocess.run(
                    ["rm", os.path.join(save_file_path, str(k) + '.bmp')])
                k = k + 1
            if(k >= len(ALL_CHARS)):
                break


def generate_TTF_from_SVG(usr_id, project_name, font_name):
    file_path = os.path.join(BASE_PATH, "Users", str(
        usr_id), 'Projects', project_name, 'Uploads')
    new_font = fontforge.font()
    default_font = fontforge.open(USED_FONT)
    new_font.mergeFonts(default_font)
    for i in range(len(ALL_CHARS)):
        glyph = new_font.createMappedChar(ALL_CHARS[i])
        default_font.selection.select(" ")
        default_font.copy()
        new_font.selection.select(ALL_CHARS[i])
        new_font.paste()
        glyph.width = 1000
        glyph.importOutlines(os.path.join(
            file_path, 'Images_From_PDF', str(i) + '.svg'))
    new_font.familyname = font_name
    new_font.fontname = font_name + " Regular"
    new_font.fondname = font_name + " Regular"
    new_font.fullname = font_name + " Regular"
    output_path = os.path.join(BASE_PATH, "Users", str(
        usr_id), 'Projects', project_name, 'Output')
    helper_create_path(output_path)
    new_font.generate(os.path.join(output_path, font_name + '.ttf'))


if __name__ == '__main__':
    arguments = sys.argv[1:]
    if(arguments[0] == '0'):
        # mode=0,usr_id,project_name,grid_width,grid_height
        generate_blank_pdf_sample(int(arguments[1]), arguments[2], int(
            arguments[3]), int(arguments[4]))
    elif(arguments[0] == '1'):
        # mode=1,usr_id,project_name,upload_file_name,grid_width,grid_height
        create_svg_from_pdf(int(arguments[1]), arguments[2], arguments[3], int(
            arguments[4]), int(arguments[5]))
    elif(arguments[0] == '2'):
        # mode=2,usr_id,project_name,font_name
        generate_TTF_from_SVG(int(arguments[1]), arguments[2], arguments[3])

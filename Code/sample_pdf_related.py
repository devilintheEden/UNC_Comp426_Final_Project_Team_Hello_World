from PIL import Image, ImageDraw, ImageFont
from pdf2image import convert_from_bytes
import math

USED_FONT = "../Resources/Ubuntu-C.ttf"
UPPER_CASE = list(map(chr, range(65, 91)))
LOWER_CASE = list(map(chr, range(97, 123)))
NUMBERS = list(map(chr, range(48, 58)))
SYMBOLS = list(map(chr, range(32, 48))) + list(map(chr, range(58, 65))) + list(map(chr, range(91, 97))) + list(map(chr, range(123, 127)))
ALL_CHARS = UPPER_CASE + LOWER_CASE + NUMBERS + SYMBOLS

paper_width = 1000
paper_height = 1414
grid_edge = 170
grid_interval = 20
grids_num_w = 5
grids_num_h = 7
upper_padding = (paper_height - grids_num_h * (grid_edge + grid_interval)) / 2
left_padding = (paper_width - grids_num_w * (grid_edge + grid_interval) + grid_interval) / 2

def generate_blank_pdf_sample(w,h):
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
        draw.text((0, paper_height - 20), str(w) + ':' + str(h), fill='black',font=ImageFont.truetype(USED_FONT, 18))
        for j in range(grids_num_h):
            for i in range(grids_num_w):
                if(k >= len(ALL_CHARS)):
                    break
                left_up_corner = (left_padding + i * (grid_edge + grid_interval), upper_padding + j * (grid_edge + grid_interval))
                draw.rectangle((left_up_corner[0] + w_offset, left_up_corner[1] + grid_interval + h_offset, left_up_corner[0] + grid_edge - w_offset, left_up_corner[1] + grid_edge + grid_interval - h_offset), outline='black', width=1)
                temp = ALL_CHARS[k] if ALL_CHARS[k] != ' ' else 'space'
                draw.text(left_up_corner, temp, fill='black',font=ImageFont.truetype(USED_FONT, 18))
                k = k + 1
            if(k >= len(ALL_CHARS)):
                break
        images.append(img)
    images[0].save('./Desktop/Final_Project/Tests/Sample_Latin_Alphabets_' + str(w) + '_' + str(h) + '.pdf', "PDF" ,resolution=100.0, save_all=True,append_images=images[1:])

def analysis_upload_sample_pdf(pdf_path):
    w,h = [int(i) for i in pdf_path.rsplit('/', 1)[-1].split('.',1)[0].rsplit('_',2)[1:]]
    w_offset = h_offset = 0
    if(w < h):
        w_offset = int((grid_edge - grid_edge / h * w) / 2)
    elif(w > h):
        h_offset = int((grid_edge - grid_edge / w * h) / 2)

    images = convert_from_bytes(open(pdf_path, 'rb').read(),size=(paper_width, paper_height))
    k = 0
    for image in images:
        for j in range(grids_num_h):
            for i in range(grids_num_w):
                if(k >= len(ALL_CHARS)):
                    break
                left_up_corner = (left_padding + i * (grid_edge + grid_interval), upper_padding + j * (grid_edge + grid_interval))
                cropped_image = image.crop((left_up_corner[0] + w_offset, left_up_corner[1] + grid_interval + h_offset, left_up_corner[0] + grid_edge - w_offset, left_up_corner[1] + grid_edge + grid_interval - h_offset))
                cropped_image.save('./Desktop/Final_Project/Tests/Images_From_PDF/' + str(k) + '.png')
                k = k + 1
            if(k >= len(ALL_CHARS)):
                break
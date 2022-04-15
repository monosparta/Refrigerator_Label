from PIL import Image,ImageDraw,ImageFont
from datetime import datetime, timezone, timedelta
import qrcode

member_name = '鈕鈕鈕'
name_size = 96

if(len(member_name)>6):
    name_size = 60
# time setting
tz = timezone(timedelta(hours=+8))
dt = datetime.now(tz)

label_weight, label_hight = (991,413)
img=Image.new("RGB", (label_weight, label_hight),(255,255,255))

# words setting(just for pi)
font = ImageFont.truetype("/usr/share/fonts/opentype/cantarell/Cantarell-Bold.otf", 36)
font_name = ImageFont.truetype("/usr/share/fonts/truetype/wqy/wqy-microhei.ttc", name_size,encoding='utf-8')


draw = ImageDraw.Draw(img)
# date
draw.text((25, 25), dt.strftime("%Y-%m-%d"), (0,0,0), font=font)
# name
name_hight = draw.textsize(member_name, font=font_name)[1]
draw.text((25,(label_hight-name_hight)/2), member_name, (0,0,0), font=font_name)
# qr
qr = qrcode.QRCode(
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=7
    )
qr.add_data(dt.strftime("label:{data}".format(data = '042100')))

qr.make()
img_qr = qr.make_image()
pos = (label_weight-img_qr.size[0], label_hight-img_qr.size[1])
img.paste(img_qr, pos)
# ID
draw.text(((label_weight-img_qr.size[0])+30,  (label_hight-img_qr.size[1])-20), dt.strftime("%m%d001"), (0,0,0), font=font)

img.save("label.png")

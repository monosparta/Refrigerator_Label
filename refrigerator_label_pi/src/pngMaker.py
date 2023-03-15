from PIL import Image, ImageDraw, ImageFont
import qrcode


def pngMake(member_name, label_id, date):

    label_weight, label_hight = (991, 413)
    img = Image.new("RGB", (label_weight, label_hight), (255, 255, 255))

    # words setting(just for pi)
    name_size = 96
    if(len(member_name) > 6):
        name_size = 60
    font = ImageFont.truetype(
        "/usr/share/fonts/opentype/cantarell/Cantarell-Bold.otf", 36)
    font_name = ImageFont.truetype(
        "/usr/share/fonts/truetype/wqy/wqy-microhei.ttc", name_size, encoding='utf-8')

    draw = ImageDraw.Draw(img)
    # date
    draw.text((25, 25), date, (0, 0, 0), font=font)
    # name
    name_hight = draw.textsize(member_name, font=font_name)[1]  # just hight
    draw.text((25, (label_hight-name_hight)/2),
              member_name, (0, 0, 0), font=font_name)
    # qr
    qr = qrcode.QRCode(
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=7
    )
    qr.add_data("label:{label_id}".format(label_id=label_id))
    qr.make()
    img_qr = qr.make_image()
    pos = (label_weight-img_qr.size[0], label_hight-img_qr.size[1])
    img.paste(img_qr, pos)
    # ID
    draw.text(((label_weight-img_qr.size[0])+30,  (label_hight -
              img_qr.size[1])-20), label_id, (0, 0, 0), font=font)

    img.save("label.png")

import os
import time
import curses
import requests
import jwt
from dotenv import load_dotenv
from PIL import Image
from datetime import datetime, timezone, timedelta
from brother_ql.conversion import convert
from brother_ql.backends.helpers import send
from brother_ql.raster import BrotherQLRaster
from pngMaker import pngMake
# load env
load_dotenv()

os.system("sudo chmod 666 /dev/usb/lp0")

# time setting
tz = timezone(timedelta(hours=+8))
dt = datetime.now(tz)

# label printer check
while(True):
    if os.system("sudo chmod 666 /dev/usb/lp0") == 0:
        break
    else:
        print("please insert the label printer")
        time.sleep(5)

# curses wait(code wait)
screen = curses.initscr()


def stop(curse):
    curses.curs_set(0)
    print("Wait a moment...")
    time.sleep(5)
    curses.flushinp()


while True:
    # curses wait(code wait)
    curses.wrapper(stop)
    curses.curs_set(1)
    input_data = input("input data:")

    if input_data[:6] == 'label:':
        print("delete label start!")
        # http delete
        response = requests.delete(
            "{}{}".format(os.getenv("SERVER_URL"), "api/label"),
            headers={'token': jwt.encode(
                {"IoT": "delete"}, os.getenv("JWT_SECRET"), algorithm="HS256")},
            data={"labelId": input_data.replace("label:", "")}
        )
        print(response.json())
    else:
        print("print label start!")
        # now date
        date_now = dt.strftime("%Y-%m-%d %H:%M:%S")

        # http post
        response = requests.post(
            "{}{}".format(os.getenv("SERVER_URL"), "api/label"),
            headers={'token': jwt.encode(
                {"IoT": "print"}, os.getenv("JWT_SECRET"), algorithm="HS256")},
            data={"date": date_now, "cardId": input_data}
        )

        if(response.status_code == 201):  # is member
            # make png
            response_json = response.json()
            pngMake(member_name=response_json["name"],
                    label_id=response_json["labelId"], date=date_now.split(' ')[0])

            # QL print
            label_img = Image.open("label.png")
            backend = "linux_kernel"    # 'pyusb', 'linux_kernel', 'network'
            model = "QL-700"  # your printer model.
            # Get these values from the Windows usb driver filter.  Linux/Raspberry Pi uses '/dev/usb/lp0'.
            printer = "/dev/usb/lp0"

            qlr = BrotherQLRaster(model)
            qlr.exception_on_warning = True

            instructions = convert(
                qlr=qlr,
                # Takes a list of file names or PIL objects.
                images=[label_img],
                label="39x90",
                rotate="90",    # 'Auto', '0', '90', '270'
                threshold=70.0,    # Black and white threshold in percent.
                dither=False,
                compress=False,
                red=False,    # Only True if using Red/Black 62 mm label tape.
                dpi_600=False,
                hq=True,    # False for low quality.
                cut=True
            )

            try:
                action = send(instructions=instructions, printer_identifier=printer,
                              backend_identifier=backend, blocking=True)
                if not action['printer_state']['errors']:
                    print("print label successful")
                else:
                    # http post
                    response = requests.delete(
                        "{}{}".format(os.getenv("SERVER_URL"), "api/label"),
                        headers={"token": jwt.encode(
                            {"IoT": "print"}, os.getenv("JWT_SECRET"), algorithm="HS256")},
                        data={"labelId": response_json["labelId"]}
                    )
            except PermissionError:
                print("please checkout you have insert the label printer")
                os.system("sudo chmod 666 /dev/usb/lp0")
        else:  # not member
            print(response.json())

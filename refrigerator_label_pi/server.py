import os
import time
import curses
import requests
from dotenv import load_dotenv
from PIL import Image
from datetime import datetime, timezone, timedelta
from brother_ql.conversion import convert
from brother_ql.backends.helpers import send
from brother_ql.raster import BrotherQLRaster
from pngMaker import pngMake

# load env 
load_dotenv()

# time setting
tz = timezone(timedelta(hours=+8))
dt = datetime.now(tz)

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

    if input_data[:6] == 'label:': # delete
        print("delete label start!")
        path = 'output.txt'
        f = open(path, 'w')
        f.write(input_data.replace('label:','')+'已刪除')
        # http delete    
        response = requests.delete(
            "{}{}".format(os.getenv("SERVER_URL"), "/api/delete_fridge_label"),
            data = {'date_id':input_data.replace('label:','')}
        )
    else: # add
        print("print label start!")
        # now date
        date_now = dt.strftime("%Y-%m-%d %H:%M:%S")
        # http post    
        response = requests.post(
            "{}{}".format(os.getenv("SERVER_URL"), "/api/create_fridge_labels"),
            data = {'date':date_now,'card_id':input_data}
        )

        if(response.status_code==201): # is member
            # make png
            response_json = response.json()
            pngMake(member_name=response_json['name'], data_id=response_json['data_id'], date=date_now.split(' ')[0])

            
            # QL print
            im = Image.open("label.png")
            backend = "linux_kernel"    # 'pyusb', 'linux_kernel', 'network'
            model = "QL-700" # your printer model.
            printer = "/dev/usb/lp0"    # Get these values from the Windows usb driver filter.  Linux/Raspberry Pi uses '/dev/usb/lp0'.

            qlr = BrotherQLRaster(model)
            qlr.exception_on_warning = True

            instructions = convert(
                    qlr=qlr, 
                    images=[im],    #  Takes a list of file names or PIL objects.
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

            send(instructions=instructions, printer_identifier=printer, backend_identifier=backend, blocking=True)
            print("print label successful")
        else: # not member
            response_json = response.json()
            print(response_json)

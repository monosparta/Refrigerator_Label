from PIL import Image,ImageDraw,ImageFont
from brother_ql.conversion import convert
from brother_ql.backends.helpers import send
from brother_ql.raster import BrotherQLRaster
from pngMaker import pngMake
import time
import curses

# curses wait(code wait)
screen = curses.initscr()

def stop(curse):
    curses.curs_set(0)
    print("Wait a moment...")
    time.sleep(2)
    curses.flushinp()

while True:
    # curses wait(code wait)
    curses.wrapper(stop)
    curses.curs_set(1)
    print("code start!")
    input_data = input("input data:")
    curses.wrapper(stop)
    
    
    if input_data[0:2] == '###': # delete
        path = 'output.txt'
        f = open(path, 'w')
        f.write(input_data.replace('###','')+'已刪除')
        f.close()
    else: # add

        # label print
        if(input_data == "1255870309"): # is member
            # make png
            pngMake(member_name="Matthieu Bergeron", data_id="###042100")

            
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
            print("print successful")
        else: # not member
            print("error:not member!")

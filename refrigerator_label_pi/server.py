import os
import time
import curses
import signal
from dotenv import load_dotenv
from PIL import Image
from datetime import datetime, timezone, timedelta
from brother_ql.conversion import convert
from brother_ql.backends.helpers import send
from brother_ql.raster import BrotherQLRaster
from pngMaker import pngMake
from apiCaller import delete_label_api, new_label_api, change_printer_state_api

# Load .env
load_dotenv()

# State
printer_state = False

# QL Setting
backend = "linux_kernel"    # 'pyusb', 'linux_kernel', 'network'
# Get these values from the Windows usb driver filter.  Linux/Raspberry Pi uses '/dev/usb/lp0'.
printer = "/dev/usb/lp0"
printer_model = "QL-700"  # your printer model.

# timeout


def handle_timeout(signum, frame):
    raise TimeoutError('function timeout')


# curses wait(code wait)
screen = curses.initscr()


def stop(curse):
    curses.curs_set(0)
    print("Wait a moment...")
    time.sleep(5)
    curses.flushinp()


while True:
    # data clear check
    data_clear = False

    while True:
        result_code = os.system("sudo chmod 666 {}".format(printer))
        if result_code == 0:
            if not printer_state:
                printer_state = True
                change_printer_state_api("success")
            break
        else:
            print("please insert the label printer")
            if printer_state:
                printer_state = False
                change_printer_state_api("error")
            time.sleep(5)

    # curses wait(code wait)
    curses.wrapper(stop)
    curses.curs_set(1)

    # label printer ready
    input_data = input("input data:")

    if input_data[:6] == 'label:':
        print("delete label start!")
        # http delete
        delete_label_api(input_data)
    else:
        print("print label start!")
        # now date
        tz = timezone(timedelta(hours=+8))
        dt = datetime.now(tz)
        date_now = dt.strftime("%Y-%m-%d %H:%M:%S")

        # http post
        response = new_label_api(date_now, input_data)

        if(response.status_code == 201):  # is member
            # make png
            response_json = response.json()
            pngMake(member_name=response_json["name"],
                    label_id=response_json["labelId"], date=date_now.split(' ')[0])

            qlr = BrotherQLRaster(printer_model)
            qlr.exception_on_warning = True

            instructions = convert(
                qlr=qlr,
                # Takes a list of file names or PIL objects.
                images=[Image.open("label.png")],
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
            
            while True:
                signal.signal(signal.SIGALRM, handle_timeout)
                signal.alarm(10)
                try:
                    action = send(instructions=instructions, printer_identifier=printer,
                                  backend_identifier=backend, blocking=True)
                    if not action['printer_state']['errors']:
                        print("print label successful")
                    else:
                        data_clear = True
                except FileNotFoundError:
                    print("No printer! Please insert the label printer!")
                    data_clear = True
                except TimeoutError:
                    print("Please close your printer and checkout")
                    if printer_state:
                        printer_state = False
                        change_printer_state_api("error")
                    continue
                except PermissionError:
                    os.system("sudo chmod 666 {}".format(printer))
                    continue
                except TypeError:
                    print("System Error")
                    data_clear = True
                except OSError:
                    print("Printer printing! Don't pull it!")
                    data_clear = True
                finally:
                    signal.alarm(0)
                break

            # error data clear
            if data_clear:
                # http delete
                delete_label_api(response_json["labelId"])
                # http post state change
                if printer_state:
                    printer_state = False
                    change_printer_state_api("error")

        else:  # not member
            print(response.json())

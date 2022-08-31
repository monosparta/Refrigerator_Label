import os
import jwt
import requests


def delete_label_api(label_id):
    response = requests.delete(
        "{}{}".format(os.getenv("SERVER_URL"), "api/label"),
        headers={'token': jwt.encode(
                {"IoT": "delete"}, os.getenv("JWT_SECRET"), algorithm="HS256")},
        data={"labelId": label_id.replace("label:", "")}
    )

    return response


def new_label_api(date_now, input_data):
    response = requests.post(
        "{}{}".format(os.getenv("SERVER_URL"), "api/label"),
        headers={'token': jwt.encode(
                {"IoT": "print"}, os.getenv("JWT_SECRET"), algorithm="HS256")},
        data={"date": date_now, "cardId": input_data}
    )

    return response


def change_printer_state_api(state):
    response = requests.post(
        "{}{}".format(os.getenv("SERVER_URL"),
                      "api/printer_state_change"),
        headers={"token": jwt.encode(
            {"IoT": "post"}, os.getenv("JWT_SECRET"), algorithm="HS256")},
        data={"printerState": state, "name": "basic_printer"}
    )
    return response

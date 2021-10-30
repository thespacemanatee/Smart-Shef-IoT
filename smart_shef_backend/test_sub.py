import numpy as np

from utils import get_audio_data, get_img_data, setup


def on_connect(client, userdata, flags, rc):
    print('Connected with result code', rc)
    client.subscribe('smartshef/#')


def on_message(client, userdata, msg):
    if (msg.topic == "smartshef/image"):
        print("Received image...")
        img_data = get_img_data(msg.payload)

    elif (msg.topic == "smartshef/audio"):
        print("Received audio...")
        audio_data = get_audio_data(msg.payload)
        
    else:
        print(msg.topic, msg.payload.decode('utf-8'))



def main():
    client = setup(on_connect=on_connect, on_message=on_message)
    client.loop_forever()

    while True:
        pass


if __name__ == "__main__":
    main()
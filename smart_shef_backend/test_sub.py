import paho.mqtt.client as mqtt
from PIL import Image
import base64
import io
import numpy as np


def on_connect(client, userdata, flags, rc):
    print('Connected with result code', rc)
    client.subscribe('smartshef/#')


def on_message(client, userdata, msg):
    payload = msg.payload.decode('utf8')
    if (msg.topic == "smartshef/image"):
        print("Received image...")
        decoded_img = base64.b64decode(payload)
        img = Image.open(io.BytesIO(decoded_img))
        img_data = np.array(img)
        print(img_data)
    else:
        print(msg.topic, payload)


client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

client.username_pw_set(username='device', password='SmartShef')
print('Connecting...')
client.connect('localhost')
client.loop_forever()

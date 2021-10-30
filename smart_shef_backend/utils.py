import paho.mqtt.client as mqtt
import numpy as np
import io
from PIL import Image

def setup(on_connect, on_message):
    client = mqtt.Client()
    client.username_pw_set(username='device', password='SmartShef')
    client.on_connect = on_connect
    client.on_message = on_message
    client.connect('localhost')

    return client

def get_img_data(payload):
    img = Image.open(io.BytesIO(payload))
    return np.array(img)

def get_audio_data(payload):
    return np.frombuffer(payload)
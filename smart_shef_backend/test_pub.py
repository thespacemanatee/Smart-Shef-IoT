# Put this file on the phone/laptop which will connect to AWS

import paho.mqtt.client as mqtt
from time import sleep


def on_connect(client, userdata, flags, rc):
    print('Connected with result code', rc)
    print('Waiting for 2 seconds.')
    sleep(2)
    print('Sending message.')
    client.publish('smartshef/1', 'This is a test.')


client = mqtt.Client()
client.on_connect = on_connect

client.username_pw_set(username='device', password='SmartShef')
print('Connecting...')
client.connect('18.141.49.40')
client.loop_forever()

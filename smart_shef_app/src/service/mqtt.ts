import MQTT, { IMqttClient } from "tsm-react-native-mqtt";
import { v4 as uuidv4 } from "uuid";
import {
  MQTT_ENDPOINT,
  MQTT_USERNAME,
  MQTT_PASSWORD,
} from "react-native-dotenv";
import { store } from "../app/store";
import { addLog, setClientStatus } from "../features/settings/settingsSlice";

export enum MQTTStatus {
  CONNECTED = "Connected",
  CONNECTING = "Connecting",
  ERROR = "Connection Error",
  CLOSED = "Connection Closed",
}

export class MQTTWrapper {
  private static instance: MQTTWrapper;

  private static client: IMqttClient;

  constructor(client: IMqttClient) {
    if (typeof client === "undefined") {
      throw new Error(
        "Please use getInstance() method instead of calling constructor directly.",
      );
    }
  }

  static async getClientInstanceAsync() {
    if (MQTTWrapper.instance) {
      return MQTTWrapper.client;
    }
    MQTTWrapper.instance = this;
    store.dispatch(setClientStatus(MQTTStatus.CONNECTING));
    try {
      const sessionId = uuidv4();
      const client = await MQTT.createClient({
        uri: MQTT_ENDPOINT,
        clientId: sessionId,
        auth: true,
        user: MQTT_USERNAME,
        pass: MQTT_PASSWORD,
      });
      client.connect();
      client.on("connect", () => {
        console.log("Connection established");
        store.dispatch(setClientStatus(MQTTStatus.CONNECTED));
        client.subscribe("smartshef/#", 1);
      });
      client.on("message", msg => {
        store.dispatch(
          addLog({
            timestamp: new Date(),
            topic: msg.topic,
            qos: msg.qos,
            retain: msg.retain,
            message: msg.data,
          }),
        );
      });
      client.on("error", err => {
        console.log(`Connection error: ${err}`);
        store.dispatch(setClientStatus(MQTTStatus.ERROR));
      });
      client.on("closed", () => {
        console.log("Connection closed");
        store.dispatch(setClientStatus(MQTTStatus.CLOSED));
      });
      MQTTWrapper.client = client;
    } catch (err) {
      console.error(err);
    }
    return MQTTWrapper.client;
  }
}

export const publishImage = (client: IMqttClient, payload: string) => {
  client.publish("smartshef/image", payload, 1, false, true);
};

export const publishAudioChunk = (client: IMqttClient, payload: string) => {
  client.publish("smartshef/audio", payload, 1, false, true);
};

export const publishMessage = (client: IMqttClient, payload: string) => {
  client.publish("smartshef/1", payload, 1, false, false);
};

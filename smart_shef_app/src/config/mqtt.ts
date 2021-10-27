import MQTT, { IMqttClient } from "sp-react-native-mqtt";
import { v4 as uuidv4 } from "uuid";
import {
  MQTT_ENDPOINT,
  MQTT_USERNAME,
  MQTT_PASSWORD,
} from "react-native-dotenv";

class MQTTWrapper {
  private static instance: MQTTWrapper;

  private static client: IMqttClient;

  private static sessionId: string;

  constructor(client: IMqttClient) {
    if (typeof client === "undefined") {
      throw new Error(
        "Please use getInstance() method instead of calling constructor directly.",
      );
    }
  }

  static getCurrentSessionId() {
    return this.sessionId;
  }

  static async getClientInstanceAsync() {
    if (MQTTWrapper.instance) {
      return MQTTWrapper.client;
    }
    MQTTWrapper.instance = this;
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
        client.subscribe("smartshef/1", 1);
        console.log("Connection established");
      });
      client.on("message", msg => {
        console.log(`Message: ${msg.data}`);
      });
      client.on("error", err => {
        console.log(`Connection error: ${err}`);
      });
      client.on("closed", () => {
        console.log("Connection closed");
      });
      MQTTWrapper.client = client;
      MQTTWrapper.sessionId = sessionId;
    } catch (err) {
      console.error(err);
    }
    return MQTTWrapper.client;
  }
}

export default MQTTWrapper;

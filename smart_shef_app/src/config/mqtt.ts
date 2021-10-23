import MQTT, { IMqttClient } from "sp-react-native-mqtt";
import { v4 as uuidv4 } from "uuid";

class MQTTWrapper {
  static instance: MQTTWrapper;

  static client: IMqttClient;

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
    try {
      MQTTWrapper.client = await MQTT.createClient({
        uri: "mqtt://broker.hivemq.com:1883",
        clientId: uuidv4(),
      });
      MQTTWrapper.client.connect();
      MQTTWrapper.client.on("connect", () => {
        MQTTWrapper.client.publish("smartchef/1", "Hello, world!!", 2, true);
        console.log("Connection established");
      });
      MQTTWrapper.client.on("message", msg => {
        console.log(`Message: ${msg}`);
      });
      MQTTWrapper.client.on("error", err => {
        console.log(`Connection error: ${err}`);
      });
      MQTTWrapper.client.on("closed", () => {
        console.log("Connection closed");
      });
    } catch (err) {
      console.error(err);
    }
    return MQTTWrapper.client;
  }
}

export default MQTTWrapper;

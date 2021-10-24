import { useState, useEffect } from "react";
import { IMqttClient } from "sp-react-native-mqtt";

import MQTTWrapper from "../../config/mqtt";

const useMQTTClient = () => {
  const [mqttClient, setMqttClient] = useState<IMqttClient>();

  useEffect(() => {
    const getMQTTClient = async () => {
      const client = await MQTTWrapper.getClientInstanceAsync();

      setMqttClient(client);
    };
    getMQTTClient();
  }, []);

  return mqttClient;
};

export default useMQTTClient;

import React from "react";
import { ScrollView } from "react-native";
import { IMqttClient } from "tsm-react-native-mqtt";

import DebugEntry from "../../elements/DebugEntry";

interface MQTTClientDetailsProps {
  client?: IMqttClient;
}

const MQTTClientDetails = ({ client }: MQTTClientDetailsProps) => {
  return (
    <ScrollView>
      <DebugEntry entry="Client Ref" value={client?.clientRef} />
      <DebugEntry entry="Client ID" value={client?.options.clientId} />
      <DebugEntry entry="Host" value={client?.options.host} />
      <DebugEntry entry="Port" value={client?.options.port} />
      <DebugEntry entry="Protocol" value={client?.options.protocol} />
      <DebugEntry entry="URI" value={client?.options.uri} />
    </ScrollView>
  );
};

MQTTClientDetails.defaultProps = {
  client: null,
};

export default MQTTClientDetails;

import React from "react";
import { StyleSheet, View } from "react-native";
import { IMqttClient } from "sp-react-native-mqtt";

import { FONT_SIZE } from "../../resources/dimens";
import Paragraph from "../typography/Paragraph";
import SmallHeading from "../typography/SmallHeading";
import Title from "../typography/Title";

interface DebugEntryProps {
  entry: string;
  value: string;
}

interface DebugModalProps {
  client?: IMqttClient;
}

const DebugEntry = ({ entry, value }: DebugEntryProps): JSX.Element => {
  return (
    <View style={styles.entryContainer}>
      <SmallHeading>{`${entry}:`}</SmallHeading>
      <Paragraph>{value}</Paragraph>
    </View>
  );
};

const DebugModal = ({ client }: DebugModalProps): JSX.Element => {
  console.log(client);
  return (
    <View style={styles.screen}>
      <Title>Debug</Title>
      <DebugEntry entry="Client Ref" value={client?.clientRef} />
      <DebugEntry entry="Client ID" value={client?.options.clientId} />
      <DebugEntry entry="Host" value={client?.options.host} />
      <DebugEntry entry="Port" value={client?.options.port} />
      <DebugEntry entry="Protocol" value={client?.options.protocol} />
      <DebugEntry entry="URI" value={client?.options.uri} />
    </View>
  );
};

DebugModal.defaultProps = {
  client: null,
};

export default DebugModal;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  entryContainer: {
    justifyContent: "space-between",
  },
});

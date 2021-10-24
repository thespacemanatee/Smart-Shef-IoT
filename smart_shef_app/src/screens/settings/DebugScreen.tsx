import React from "react";
import { StyleSheet, View } from "react-native";
import { IMqttClient } from "sp-react-native-mqtt";

import Paragraph from "../../components/typography/Paragraph";
import SmallHeading from "../../components/typography/SmallHeading";
import Title from "../../components/typography/Title";
import { SPACING } from "../../resources/dimens";

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

const DebugScreen = ({ client }: DebugModalProps): JSX.Element => {
  console.log(client);
  return (
    <View style={styles.screen}>
      <View style={styles.titleContainer}>
        <Title>Debug</Title>
      </View>
      <DebugEntry entry="Client Ref" value={client?.clientRef} />
      <DebugEntry entry="Client ID" value={client?.options.clientId} />
      <DebugEntry entry="Host" value={client?.options.host} />
      <DebugEntry entry="Port" value={client?.options.port} />
      <DebugEntry entry="Protocol" value={client?.options.protocol} />
      <DebugEntry entry="URI" value={client?.options.uri} />
    </View>
  );
};

DebugScreen.defaultProps = {
  client: null,
};

export default DebugScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  entryContainer: {
    justifyContent: "space-between",
  },
  titleContainer: {
    flexDirection: "row",
    padding: SPACING.spacing_16,
    justifyContent: "space-between",
  },
});

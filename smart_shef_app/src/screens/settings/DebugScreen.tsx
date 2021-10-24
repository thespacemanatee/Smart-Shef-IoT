import React from "react";
import { StyleSheet, View } from "react-native";

import Paragraph from "../../components/typography/Paragraph";
import SmallHeading from "../../components/typography/SmallHeading";
import { SPACING } from "../../resources/dimens";
import useMQTTClient from "../../utils/hooks/useMQTTClient";

interface DebugEntryProps {
  entry: string;
  value: string;
}

const DebugEntry = ({ entry, value }: DebugEntryProps): JSX.Element => {
  return (
    <View style={styles.entryContainer}>
      <SmallHeading>{`${entry}:`}</SmallHeading>
      <Paragraph>{value}</Paragraph>
    </View>
  );
};

const DebugScreen = (): JSX.Element => {
  const client = useMQTTClient();

  console.log(client);
  return (
    <View style={styles.screen}>
      <View style={styles.debugInfoContainer}>
        <DebugEntry entry="Client Ref" value={client?.clientRef} />
        <DebugEntry entry="Client ID" value={client?.options.clientId} />
        <DebugEntry entry="Host" value={client?.options.host} />
        <DebugEntry entry="Port" value={client?.options.port} />
        <DebugEntry entry="Protocol" value={client?.options.protocol} />
        <DebugEntry entry="URI" value={client?.options.uri} />
      </View>
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
    backgroundColor: "white",
  },
  entryContainer: {
    justifyContent: "space-between",
  },
  debugInfoContainer: {
    padding: SPACING.spacing_16,
  },
});

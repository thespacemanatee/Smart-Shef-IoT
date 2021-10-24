import React from "react";
import { StyleSheet, View } from "react-native";

import DebugEntry from "../../components/elements/DebugEntry";
import { SPACING } from "../../resources/dimens";
import useMQTTClient from "../../utils/hooks/useMQTTClient";

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
  debugInfoContainer: {
    padding: SPACING.spacing_16,
  },
});

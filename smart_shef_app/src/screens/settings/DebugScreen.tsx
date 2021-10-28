import React from "react";
import { StyleSheet, View } from "react-native";

import DebugEntry from "../../components/elements/DebugEntry";
import DebugSection from "../../components/elements/DebugSection";
import useMQTTClient from "../../utils/hooks/useMQTTClient";

const DebugScreen = (): JSX.Element => {
  const client = useMQTTClient();

  return (
    <View style={styles.screen}>
      <DebugSection label="Client Info">
        <DebugEntry entry="Client Ref" value={client?.clientRef} />
        <DebugEntry entry="Client ID" value={client?.options.clientId} />
        <DebugEntry entry="Host" value={client?.options.host} />
        <DebugEntry entry="Port" value={client?.options.port} />
        <DebugEntry entry="Protocol" value={client?.options.protocol} />
        <DebugEntry entry="URI" value={client?.options.uri} />
      </DebugSection>
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
});

import React, { useCallback } from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import DebugEntry from "../../components/elements/DebugEntry";
import DebugSection from "../../components/elements/DebugSection";
import Paragraph from "../../components/typography/Paragraph";
import MQTTClientDetails from "../../components/ui/debug/MQTTClientDetails";
import { MQTTStatus } from "../../service/mqtt";
import { resetLogs } from "../../features/settings/settingsSlice";
import useMQTTClient from "../../utils/hooks/useMQTTClient";

const ServerScreen = (): JSX.Element => {
  const logs = useAppSelector(state => state.settings.logs);
  const clientStatus = useAppSelector(state => state.settings.clientStatus);

  const client = useMQTTClient();
  const dispatch = useAppDispatch();

  const renderLogs = useCallback(({ item }) => {
    return (
      <DebugEntry
        entry={`${item.timestamp.toLocaleTimeString()}   Topic: ${
          item.topic
        }   QoS: ${item.qos}   Retained: ${item.retain}`}
        value={item.message.slice(0, 38)}
      />
    );
  }, []);

  return (
    <View style={styles.screen}>
      <ScrollView>
        <DebugSection
          label="Client Info"
          initialExpanded
          subtitleComponent={() => {
            return (
              <Paragraph
                style={{
                  color:
                    clientStatus === MQTTStatus.CONNECTED ? "green" : "red",
                }}
              >
                {clientStatus}
              </Paragraph>
            );
          }}
        >
          <MQTTClientDetails client={client} />
        </DebugSection>
        <DebugSection
          label="Logs"
          subtitleComponent={() => (
            <Button onPress={() => dispatch(resetLogs())}>Clear</Button>
          )}
        >
          <FlatList data={logs} renderItem={renderLogs} />
        </DebugSection>
      </ScrollView>
    </View>
  );
};

export default ServerScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});

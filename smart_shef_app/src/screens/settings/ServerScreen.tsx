import React from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "react-native-paper";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import DebugEntry from "../../components/elements/DebugEntry";
import DebugSection from "../../components/elements/DebugSection";
import Paragraph from "../../components/typography/Paragraph";
import MQTTClientDetails from "../../components/ui/debug/MQTTClientDetails";
import MQTTWrapper, { MQTTStatus } from "../../config/mqtt";
import { resetLogs } from "../../features/settings/settingsSlice";
import useMQTTClient from "../../utils/hooks/useMQTTClient";

const ServerScreen = (): JSX.Element => {
  const logs = useAppSelector(state => state.settings.logs);

  const client = useMQTTClient();
  const dispatch = useAppDispatch();

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
                    MQTTWrapper.status === MQTTStatus.CONNECTED
                      ? "green"
                      : "red",
                }}>
                {MQTTWrapper.status}
              </Paragraph>
            );
          }}>
          <MQTTClientDetails client={client} />
        </DebugSection>
        <DebugSection
          label="Logs"
          subtitleComponent={() => (
            <Button onPress={() => dispatch(resetLogs())}>Clear</Button>
          )}>
          {logs.map((item, index) => {
            return (
              <DebugEntry
                key={String(index)}
                entry={`${item.timestamp.toLocaleTimeString()}   Topic: ${
                  item.topic
                }   QoS: ${item.qos}   Retained: ${item.retain}`}
                value={item.message.slice(0, 38)}
              />
            );
          })}
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

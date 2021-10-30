import React, { useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import LiveAudioStream from "react-native-live-audio-stream";
import { Button } from "react-native-paper";
import { log } from "react-native-reanimated";

import DebugSection from "../../components/elements/DebugSection";
import useMQTTClient from "../../utils/hooks/useMQTTClient";
import { requestRecordAudioPermissions } from "../../utils/utils";

const options = {
  sampleRate: 32000, // default is 44100 but 32000 is adequate for accurate voice recognition
  channels: 1, // 1 or 2, default 1
  bitsPerSample: 16, // 8 or 16, default 16
  audioSource: 0, // android only
  bufferSize: 4096, // default is 2048
};

const SensorsScreen = (): JSX.Element => {
  const mqttClient = useMQTTClient();

  const startRecording = async () => {
    const granted = await requestRecordAudioPermissions();
    if (granted) {
      LiveAudioStream.start();

      LiveAudioStream.on("data", data => {
        mqttClient?.publish("smartshef/audio", data, 1, false, true);
      });
    }
  };

  const stopRecording = () => {
    LiveAudioStream.stop();
  };

  useEffect(() => {
    LiveAudioStream.init(options);
  }, []);

  return (
    <View style={styles.screen}>
      <ScrollView>
        <DebugSection label="Microphone" initialExpanded>
          <Button onPress={startRecording}>Start</Button>
          <Button onPress={stopRecording}>Stop</Button>
        </DebugSection>
      </ScrollView>
    </View>
  );
};

export default SensorsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});

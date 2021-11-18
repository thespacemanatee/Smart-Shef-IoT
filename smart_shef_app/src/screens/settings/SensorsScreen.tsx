import React from "react";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import AudioRecorderPlayer, {
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
} from "react-native-audio-recorder-player";
import { Button } from "react-native-paper";
import RNFetchBlob from "rn-fetch-blob";

import DebugSection from "../../components/elements/DebugSection";
import { SPACING } from "../../resources/dimens";
import { publishAudioChunk } from "../../service/mqtt";
import useMQTTClient from "../../utils/hooks/useMQTTClient";
import { requestRecordAudioPermissions } from "../../utils/utils";

const { dirs } = RNFetchBlob.fs;

const path = Platform.select({
  ios: "recording.m4a",
  android: `${dirs.CacheDir}/recording.mp3`,
});

const audioSet: AudioSet = {
  AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
  AudioSourceAndroid: AudioSourceAndroidType.DEFAULT,
  AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
  AVNumberOfChannelsKeyIOS: 2,
  AVFormatIDKeyIOS: AVEncodingOption.aac,
};

const audioRecorderPlayer = new AudioRecorderPlayer();

const SensorsScreen = (): JSX.Element => {
  const client = useMQTTClient();

  const startRecording = async () => {
    requestRecordAudioPermissions();
    const uri = await audioRecorderPlayer.startRecorder(path, audioSet);
    console.log(`Start recording at: ${uri}`);
  };

  const stopRecording = async () => {
    // LiveAudioStream.stop();
    const uri = await audioRecorderPlayer.stopRecorder();
    const audio = await RNFetchBlob.fs.readFile(uri, "base64");
    if (client) {
      console.log("Publishing audio to client");
      publishAudioChunk(client, audio);
    }
  };

  return (
    <View style={styles.screen}>
      <ScrollView>
        <DebugSection label="Microphone" initialExpanded>
          <View style={styles.buttonContainer}>
            <Button
              mode="outlined"
              onPress={startRecording}
              style={styles.startButton}
            >
              Start
            </Button>
            <Button
              mode="outlined"
              onPress={stopRecording}
              style={styles.stopButton}
            >
              Stop
            </Button>
          </View>
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
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  startButton: {
    flex: 1,
    marginRight: SPACING.spacing_4,
  },
  stopButton: {
    flex: 1,
    marginLeft: SPACING.spacing_4,
  },
});

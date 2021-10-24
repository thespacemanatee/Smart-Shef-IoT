import React from "react";
import { StyleSheet, View } from "react-native";

import Paragraph from "../typography/Paragraph";
import SmallHeading from "../typography/SmallHeading";

interface DebugEntryProps {
  entry: string;
  value: string | null;
}

const DebugEntry = ({ entry, value }: DebugEntryProps): JSX.Element => {
  return (
    <View style={styles.entryContainer}>
      <SmallHeading>{`${entry}:`}</SmallHeading>
      <Paragraph>{value || "null"}</Paragraph>
    </View>
  );
};

export default DebugEntry;

const styles = StyleSheet.create({
  entryContainer: {
    justifyContent: "space-between",
  },
});

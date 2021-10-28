import React from "react";
import { StyleProp, StyleSheet, TextStyle, View } from "react-native";

import Paragraph from "../typography/Paragraph";
import SmallHeading from "../typography/SmallHeading";
import { SPACING } from "../../resources/dimens";

interface DebugEntryProps {
  entry: string;
  value: string | null;
  valueStyle?: StyleProp<TextStyle>;
}

const DebugEntry = ({
  entry,
  value,
  valueStyle,
}: DebugEntryProps): JSX.Element => {
  return (
    <View style={styles.entryContainer}>
      <SmallHeading numberOfLines={1}>{entry}</SmallHeading>
      <Paragraph style={valueStyle}>{value || "null"}</Paragraph>
    </View>
  );
};

DebugEntry.defaultProps = {
  valueStyle: null,
};

export default DebugEntry;

const styles = StyleSheet.create({
  entryContainer: {
    justifyContent: "space-between",
    marginVertical: SPACING.spacing_4,
  },
});

import React from "react";
import { View, StyleSheet } from "react-native";

function RightHeader(props) {
  return <View style={styles.main}>{props.children}</View>;
}

let styles = StyleSheet.create({
  main: {
    padding: 10,
  },
});

export default RightHeader;

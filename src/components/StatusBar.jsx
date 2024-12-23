import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Progress = ({ name, step, steps, height }) => {
  const progress = (step / steps) * 100;
  return (
    <View style={styles.progressContainer}>
      <Text style={styles.label}>{`${name}`}</Text>
      <View
        style={{
          height,
          backgroundColor: "rgba(0,0,0,0.1)",
          borderRadius: height / 2,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            height,
            width: `${progress}%`,
            borderRadius: height,
            backgroundColor: "#F8E51E",
          }}
        />
      </View>
    </View>
  );
};

export default function StatusBar() {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Progress rock="Rock" step={6} steps={10} height={20} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 20,
  },
});

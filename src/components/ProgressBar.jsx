import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

const ProgressBar = ({ title, percentage }) => {
  const [fontsLoaded] = useFonts({
      CherryBombOne: require("../assets/font/CherryBombOne-Regular.ttf"),
    });
    if (!fontsLoaded) {
      return null;
    }
  return (
    <View style={styles.progressContainer}>
      <Text style={styles.progressTitle}>{title}</Text>
      <View style={styles.progressBar}>
        <View style={{ ...styles.progressFill, width: `${percentage}%` }} />
      </View>
      <Text style={styles.percentageText}>{percentage}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  progressContainer: {
    backgroundColor: '#FEAE4D',
    borderRadius: 20,
    padding: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    alignSelf: 'center',
  },
  progressTitle: {
    fontFamily: "CherryBombOne",
    fontSize: 22,
    marginBottom: 5,
  },
  progressBar: {
    height: 25,
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#ffd700',
    borderRadius: 20,
  },
  percentageText: {
    position: 'absolute',
    right: 27,
    top: '50%',
    transform: [{ translateY: 20 }],
    fontFamily: "CherryBombOne",
    fontSize: 16,
    color: '#000',
  },
});

export default ProgressBar;
import React, { Component } from "react";
import { View, ImageBackground, StyleSheet, Animated, Easing } from "react-native";
import { StackActions } from "@react-navigation/native";

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.spinValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.startSpinning();

    setTimeout(() => {
      this.props.navigation.dispatch(StackActions.replace("Start"));
    }, 5000);
  }

  startSpinning() {
    Animated.loop(
      Animated.timing(this.spinValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }

  render() {
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"], // Rotate from 0 to 360 degrees
    });

    return (
      <ImageBackground
        source={require("../assets/image/Background.png")}
        style={styles.background}
      >
        <View style={styles.container}>
          <Animated.Image source={require("../assets/image/OSOMLOGO.png")}
          style={{ transform: [{rotate: spin}] }} />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

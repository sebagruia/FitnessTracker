import React, { Component } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Animated
} from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { Foundation } from "@expo/vector-icons";
import { purple, white } from "../utils/colors";
import { calculateDirection } from "../utils/helpers";

class Live extends Component {
  constructor() {
    super();
    this.state = {
      coords: "",
      status: null,
      direction: "",
      bounceValue: new Animated.Value(1)
    };
  }
  componentDidMount() {
    this.askPermission();
  }
  askPermission = () => {
    Permissions.askAsync(Permissions.LOCATION)
      .then(({ status }) => {
        if (status === "granted") {
          return this.setLocation();
        }
        else{
          this.setState({ status: status });
        }
        
      })
      .catch((error) => {
        console.warn("error asking Location permission: ", error);
        this.setState({ status: "undetermined" });
      });
  };

  setLocation = () => {
    Location.watchPositionAsync(
      {
        enableHighAccuracy: true,
        timeInterval: 1,
        distanceInterval: 1,
      },
      ({ coords }) => {
        const newDirection = calculateDirection(coords.heading);
        const {direction, bounceValue} = this.state;

        if(newDirection !== direction){
          Animated.sequence([
            Animated.timing(bounceValue, {duration:200, toValue:1.04}),
            Animated.spring(bounceValue, {toValue:1, friction:4})
          ])
        }
        this.setState({
          coords: coords,
          status: 'granted',
          direction: newDirection,
        });
      }
    );
  };
  render() {
    const { status, coords, direction, bounceValue } = this.state;
    switch (status) {
      case null:
        return <ActivityIndicator style={{ marginTop: 30 }} />;
      case "denied":
        return (
          <View style={styles.center}>
            <Foundation name="alert" size={50} />
            <Text>
              You denied your location. You can fix this by visiting settings
              and enabling location services for this app.
            </Text>
          </View>
        );
      case "undetermined":
        return (
          <View style={styles.center}>
            <Foundation name="alert" size={50} />
            <Text>You need to enable location services for this app.</Text>
            <TouchableOpacity
              onPress={this.askPermission}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Enable</Text>
            </TouchableOpacity>
          </View>
        );
      case "granted":
        return (
          <View style={styles.container}>
            <View style={styles.directionContainer}>
              <Text style={styles.header}>You're heading</Text>
              <Animated.Text style={[styles.direction, {transform:[{scale:bounceValue}]}]}>{direction}</Animated.Text>
            </View>
            {/* <View style={{flex:1, flexDirection:"row"}}> */}
            <View style={styles.metricContainer}>
              <View style={styles.metric}>
                <Text style={[styles.header, { color: white }]}>Altitude</Text>
                <Text style={[styles.subHeader, { color: white }]}>
                  {Math.round(coords.altitude)} Meters
                </Text>
              </View>
            </View>
            <View style={styles.metricContainer}>
              <View style={styles.metric}>
                <Text style={[styles.header, { color: white }]}>Speed</Text>
                <Text style={[styles.subHeader, { color: white }]}>
                  {Math.round(coords.speed).toFixed(1)} km/h
                </Text>
              </View>
            </View>
            {/* </View> */}
          </View>
        );
      default:
        return (
          <View style={styles.center}>
            <Foundation name="alert" size={50} />
            <Text>You need to enable location services for this app.</Text>
            <TouchableOpacity
              onPress={this.askPermission}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Enable</Text>
            </TouchableOpacity>
          </View>
        );
    }
  }
}

// Styles

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 30,
    marginRight: 30,
  },
  button: {
    padding: 10,
    backgroundColor: purple,
    alignSelf: "center",
    borderRadius: 5,
    margin: 20,
  },
  buttonText: {
    color: white,
    fontSize: 20,
  },
  directionContainer: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    fontSize: 35,
    textAlign: "center",
  },
  direction: {
    color: purple,
    fontSize: 120,
    textAlign: "center",
  },
  metricContainer: {
    // flex:1,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: purple,
  },
  metric: {
    flex: 1,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  subHeader: {
    fontSize: 25,
    textAlign: "center",
    marginTop: 5,
  },
});

export default Live;

import React from "react";
import { View, StyleSheet } from "react-native";
import {
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { white, red, orange, blue, lightPurp, pink } from "./colors";

export function isBetween(num, x, y) {
  if (num >= x && num <= y) {
    return true;
  }

  return false;
}

export function calculateDirection(heading) {
  let direction = "";

  if (isBetween(heading, 0, 22.5)) {
    direction = "North";
  } else if (isBetween(heading, 22.5, 67.5)) {
    direction = "North East";
  } else if (isBetween(heading, 67.5, 112.5)) {
    direction = "East";
  } else if (isBetween(heading, 112.5, 157.5)) {
    direction = "South East";
  } else if (isBetween(heading, 157.5, 202.5)) {
    direction = "South";
  } else if (isBetween(heading, 202.5, 247.5)) {
    direction = "South West";
  } else if (isBetween(heading, 247.5, 292.5)) {
    direction = "West";
  } else if (isBetween(heading, 292.5, 337.5)) {
    direction = "North West";
  } else if (isBetween(heading, 337.5, 360)) {
    direction = "North";
  } else {
    direction = "Calculating";
  }

  return direction;
}

export function timeToString(time = Date.now()) {
  const date = new Date(time);
  const todayUTC = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  return todayUTC.toISOString().split("T")[0];
}

export const getMetricMetaInfo = (metric) => {
  const info = {
    run: {
      id:1,
      displayName: "Run",
      max: 100000,
      unit: "meters",
      step: 100,
      type: "steppers",
      getIcon() {
        return (
          <View style={[styles.iconContainer, {backgroundColor:red}]}>
            <MaterialIcons name="directions-run" color={"white"} size={35} />
          </View>
        );
      },
    },
    bike: {
      id:2,
      displayName: "Bike",
      max: 200000,
      unit: "meters",
      step: 100,
      type: "steppers",
      getIcon() {
        return (
          <View style={[styles.iconContainer, {backgroundColor:orange}]}>
            <MaterialCommunityIcons name="bike" color={"white"} size={35} />
          </View>
        );
      },
    },
    swim: {
      id:3,
      displayName: "Swim",
      max: 9900,
      unit: "meters",
      step: 100,
      type: "steppers",
      getIcon() {
        return (
          <View style={[styles.iconContainer, {backgroundColor:blue}]}>
            <MaterialIcons name="pool" color={"white"} size={35} />
          </View>
        );
      },
    },
    sleep: {
      id:4,
      displayName: "Sleep",
      max: 24,
      unit: "hours",
      step: 1,
      type: "slider",
      getIcon() {
        return (
          <View style={[styles.iconContainer, {backgroundColor:lightPurp}]}>
            <FontAwesome name="bed" color={"white"} size={35} />
          </View>
        );
      },
    },
    eat: {
      id:5,
      displayName: "Eat",
      max: 10,
      unit: "rating",
      step: 1,
      type: "slider",
      getIcon() {
        return (
          <View style={[styles.iconContainer, {backgroundColor:pink}]}>
            <MaterialCommunityIcons name="food" color={"white"} size={35} />
          </View>
        );
      },
    },
  };

  return  typeof metric === "undefined"
  ? info 
  : info[metric];
};


export function getDailyReminderValue (){
  return{
    today:"&#128079; Don't forget to log your data today!"
  }

}


// Styles

const styles = StyleSheet.create({
  iconContainer: {
    padding:5, 
    borderRadius:8,
    width:50,
    height:50,
    justifyContent:"center",
    alignItems:"center",
    marginRight:20,
  }
})
import "react-native-gesture-handler";
import React, { Component } from "react";
import store from "./redux/store";
import { View, Platform, StatusBar } from "react-native";
import AddEntry from "./components/AddEntry";
import History from "./components/History";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { purple, white } from "./utils/colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import EntryDetail from "./components/EntryDetail";

const Tabs = Platform.OS === "ios"
    ? createMaterialBottomTabNavigator()
    : createMaterialTopTabNavigator();

const TabsNavigator = () => {
  return (
    <Tabs.Navigator
      tabBarOptions={{
        activeTintColor: Platform.OS === "ios" ? purple : white,
        style: {
          height: 56,
          backgroundColor: Platform.OS === "ios" ? white : purple,
          shadowColor: "rgba(0,0,0,0.24)",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowRadius: 6,
          shadowOpacity: 1,
        },
      }}
    >
      <Tabs.Screen
        name="History"
        component={History}
        options={{
          tabBarIcon: ({ tintColor }) => (
            <Ionicons name="ios-bookmarks" size={30} color={tintColor} />
          ),
        }}
      />
      <Tabs.Screen
        name="Add Entry"
        component={History}
        options={{
          tabBarIcon: ({ tintColor }) => (
            <FontAwesome name="plus-square" size={30} color={tintColor} />
          ),
        }}
        component={AddEntry}
      />
    </Tabs.Navigator>
  );
};

const CustomStatusbar = ({ backgroundColor, ...props }) => {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
};

const MainNavigator = createStackNavigator();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <CustomStatusbar backgroundColor={purple} barStyle="light-content" />
          <NavigationContainer>
            <MainNavigator.Navigator>
              <MainNavigator.Screen name="Home" component={TabsNavigator} options={{title:"Home", headerShown:false}}/>
              <MainNavigator.Screen
                name="EntryDetail"
                component={EntryDetail}
                options={{
                  headerTintColor: white,
                  headerTitleAlign:"center",
                  headerStyle: { backgroundColor: purple },
                }}
              />
            </MainNavigator.Navigator>
          </NavigationContainer>
        </View>
      </Provider>
    );
  }
}

export default App;

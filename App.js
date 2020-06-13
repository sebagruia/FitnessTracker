import React, { Component } from "react";
import { View } from "react-native";
import AddEntry from "./components/AddEntry";
import { Provider } from "react-redux";
import store from "./redux/store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{flex:1}}>
          <AddEntry />
        </View>
      </Provider>
    );
  }
}


export default App;

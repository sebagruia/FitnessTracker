import React, { Component } from "react";
import {connect} from "react-redux";
import { View, TouchableOpacity, Text, Platform, StyleSheet } from "react-native";
import { getMetricMetaInfo, timeToString, getDailyReminderValue  } from "../utils/helpers";
import FitnessSlider from "./FitnessSlider";
import FitnessStepper from "./FitnessStepper";
import DateHeader from "./DateHeader";
import {Ionicons} from "@expo/vector-icons";
import TextButton from "./TextButton";
import {submitEntry, removeEntry } from "../utils/api";
import {addEntry} from "../redux/actions/index_actions";
import {white, purple} from "../utils/colors";

const SubmitBtn = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}>
      <Text style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  );
};

class AddEntry extends Component {
  constructor() {
    super();
    this.state = {
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0,
    };
  }

  increment = (metric) => {
    const { max, step } = getMetricMetaInfo(metric);
    const count = this.state[metric] + step;

    this.setState({ ...this.state, [metric]: count > max ? max : count });
  };

  decrement = (metric) => {
    const { step } = getMetricMetaInfo(metric);
    const count = this.state[metric] - step;

    this.setState({ ...this.state, [metric]: count < 0 ? 0 : count });
  };

  slide = (metric, value) => {
    this.setState({ [metric]: value });
  };

  submit = () => {
    const key = timeToString();
    const entry = this.state;
    console.log(key);
    console.log(entry);

    this.props.dispatch(addEntry({
      [key]:entry
    }));

    this.setState({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0,
    });

    // Navigate to home

    submitEntry({key, entry});

    // Clear local notofocation
  };

  reset =()=>{
    const key = timeToString();

    // Update Redux

    this.props.dispatch(addEntry({
      [key]:getDailyReminderValue()
    }));

    removeEntry(key);
  }

  render() {
    const {alreadyLogged} = this.props;
    console.log(alreadyLogged);
    const metaInfo = getMetricMetaInfo();
    const newDate = new Date().toLocaleDateString("en-GB");

    if(alreadyLogged){
      return(
        <View style={styles.center}>
          <Ionicons 
          name={Platform.OS==="ios" ? "ios-happy" : "md-happy"}
          size={100}
          />
          <Text>You already logged your information for today</Text>
          <TextButton onPress={this.reset} style={{padding:10}}>
            Reset
          </TextButton>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <DateHeader date={newDate} />
        {Object.keys(metaInfo).map((key) => {
          const { getIcon, type, id, ...rest } = metaInfo[key];
          console.log(id);
          const value = this.state[key];
          return (
            <View key={id} style={styles.row}>
              {getIcon()}

              {type === "slider" ? (
                <FitnessSlider
                  value={value}
                  onChange={(value) => this.slide(key, value)}
                  {...rest}
                />
              ) : (
                <FitnessStepper
                  value={value}
                  onIncrement={() => {
                    this.increment(key);
                  }}
                  onDecrement={() => {
                    this.decrement(key);
                  }}
                  {...rest}
                />
              )}
            </View>
          );
        })}
        <SubmitBtn onPress={this.submit}/>
      </View>
    );
  }
}

const mapStateToProps = (state)=>{
  console.log(state);
  const key = timeToString();
  console.log(key)
  console.log(state[key])
  return {
    alreadyLogged: state.entries[key] && typeof state.entries[key].today === "undefined"
  }
}

// Styles

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:20,
    backgroundColor:white,
  },
  row:{
    flexDirection:'row',
    flex:1,
    alignItems:'center'
  },
  iosSubmitBtn:{
    backgroundColor:purple,
    padding:10,
    borderRadius:7,
    height:45,
    marginLeft:40,
    marginRight:40
  },
  androidSubmitBtn:{
    backgroundColor:purple,
    padding:10,
    paddingLeft:30,
    paddingRight:30,
    height:45,
    borderRadius:2,
    alignSelf:"flex-end",
    justifyContent:"center",
    alignItems:"center"
  },
  submitBtnText:{
    color:white,
    fontSize:22,
    textAlign:'center'
  },
  center:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    marginRight:30,
    marginLeft:30
  }
});

export default connect(mapStateToProps)(AddEntry);

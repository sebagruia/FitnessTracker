import React, { Component } from "react";
import { View, Text, StyleSheet, Platform, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { receiveEntries, addEntry } from "../redux/actions/index_actions";
import { timeToString, getDailyReminderValue } from "../utils/helpers";
import { fetchCalendarResults } from "../utils/api";
import UdaciFitnessCalendar from "udacifitness-calendar-fix";
import {white} from "../utils/colors";
import DateHeader from "../components/DateHeader";
import MetricCard from "./MetricCard";
import {AppLoading} from "expo";
 
class History extends Component {

    constructor(){
        super();

        this.state ={
            ready:false
        }
    }

    componentDidMount() {
        const { dispatch } = this.props;
        fetchCalendarResults()
            .then(entries => dispatch(receiveEntries(entries)))
            .then(({ entries }) => {
                if (!entries[timeToString()]) {
                    dispatch(addEntry({
                        [timeToString()]: getDailyReminderValue()
                    }))
                }
            })
            .then(()=>{
                this.setState({ready:true})
            })
    }



    renderItem = ({ today, ...metrics }, formattedDate, key) => (
        <View style={styles.item}>
            {today
                ? <View>
                    <DateHeader date={formattedDate} />
                    <Text style={styles.noDataText}>
                        {today}
                    </Text>
                </View>
                : <TouchableOpacity onPress={()=>this.props.navigation.navigate("EntryDetail", {entryId:key})}>
                    <MetricCard metrics={metrics} date={formattedDate}/>
                </TouchableOpacity>
            }
        </View>
    );


    renderEmptyDate = (formattedDate) => {
        return (
            <View style={[styles.item, {flex:1}]}>
                <DateHeader data={formattedDate}/>
                <Text style={styles.noDataText}>
                    You didn't log any data on this day
                </Text>
            </View>
        );
    }

    render() {
        const { entries } = this.props;
        const {ready} = this.state;

        if(ready===false){
            return <AppLoading />
        }

        return (
            <UdaciFitnessCalendar 
                firstDay={1}
                items={entries}
                renderItem={this.renderItem}
                renderEmptyDate={this.renderEmptyDate}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        entries:state.entries
    }
}


// Styles

const styles = StyleSheet.create({
    item:{
        backgroundColor:white,
        borderRadius:Platform.OS === 'ios' ? 16 : 2,
        padding:20,
        marginLeft:10,
        marginRight:10,
        marginTop:17,
        justifyContent:"center",
        shadowRadius:3,
        shadowOpacity:0.8,
        shadowColor: "rgba(0,0,0,0.24)",
        shadowOffset:{
            width:0,
            height:3
        }
    },
    noDataText:{
        fontSize:18,
        paddingTop:20,
        paddingBottom:20
    }
});

export default connect(mapStateToProps)(History);
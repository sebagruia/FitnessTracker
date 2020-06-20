import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { white } from "../utils/colors";
import MetricCard from "./MetricCard";
import { addEntry } from "../redux/actions/index_actions";
import { removeEntry } from "../utils/api";
import { timeToString, getDailyReminderValue } from "../utils/helpers";
import TextButton from "./TextButton";

class EntryDetail extends Component {
  setTitle = (entryId) => {
    if (!entryId) {
      return;
    }
    const year = entryId.slice(0, 4);
    const month = entryId.slice(5, 7);
    const day = entryId.slice(8);
    this.props.navigation.setOptions({ title: `${day}/${month}/${year}` });
  };

  reset = () => {
    const { remove, goBack, entryId } = this.props;
    remove();
    goBack();
    removeEntry(entryId);
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.metrics !== null && !nextProps.metrics.today;
  }

  render() {
    const { entryId } = this.props.route.params;
    const { metrics } = this.props;
    this.setTitle(entryId);
    return (
      <View style={styles.container}>
        <MetricCard metrics={metrics} data={entryId} />
        <View style={{ margin: 20 }}>
          <TextButton onPress={this.reset}>Reset</TextButton>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { entryId } = ownProps.route.params;
  return {
    entryId: entryId,
    metrics: state.entries[entryId],
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { entryId } = ownProps.route.params;
  return {
    remove: () =>
      dispatch(
        addEntry({
          [entryId]:
            timeToString() === entryId ? getDailyReminderValue() : null,
        })
      ),
    goBack: () => ownProps.navigation.goBack(),
  };
};

// Styles

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EntryDetail);

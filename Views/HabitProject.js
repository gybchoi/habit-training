import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';

class HabitProject extends React.Component {
  getLeftDate() {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const date = new Date().getDate();

    const goalDate = this.props.goalDate.split('-');

    const leftDate =
      (new Date(goalDate[0], goalDate[1], goalDate[2]) -
        new Date(year, month, date)) /
      (1000 * 3600 * 24);
    return leftDate - 1;
  }

  getCrown() {
    if (this.props.completedDate.includes(this.props.today)) {
      return (
        <View
          style={{
            alignItems: 'flex-end',
          }}>
          <Icon
            name="crown"
            size={60}
            style={{
              position: 'absolute',
              transform: [{rotate: '30deg'}],
              right: -40,
              top: -40,
              color: 'gold',
            }}
          />
        </View>
      );
    }
  }

  getProgressColor(progress) {
    if (progress < 25) {
      return {color: 'indianred'};
    } else if (progress < 50) {
      return {color: 'navajowhite'};
    } else if (progress < 75) {
      return {color: 'seagreen'};
    } else {
      return {color: 'navy'};
    }
  }

  render() {
    const {
      navigation,
      habit,
      date,
      color,
      today,
      goalDate,
      completedDate,
    } = this.props;
    return (
      <TouchableOpacity
        style={[styles.container, {backgroundColor: color}]}
        onPress={() =>
          navigation.navigate('ProjectInfo', {
            habit: habit,
            date: date,
            color: color,
            leftDate: this.getLeftDate(),
            goalDate: goalDate,
            today: today,
            completedDate: completedDate,
            completeFunction: this.props.completeFunction,
            finishFunction: this.props.finishFunction,
          })
        }>
        <View style={styles.left_container}>
          <Text
            style={[
              styles.progress_text,
              this.getProgressColor(
                Math.floor((completedDate.length / date) * 100),
              ),
            ]}>
            {Math.floor((completedDate.length / date) * 100)}%
          </Text>
          <Text style={styles.left_date_text}>
            {this.getLeftDate() === 0
              ? '마지막 날!'
              : this.getLeftDate() > 0
              ? `${this.getLeftDate()}일 남음`
              : `${-this.getLeftDate()}일 지남`}
          </Text>
        </View>
        <View style={styles.right_container}>
          <Text style={styles.project_text}>{habit}</Text>
        </View>
        {this.getCrown()}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 375,
    borderColor: '#555',
    borderWidth: 2,
    marginTop: 18,
    marginBottom: 5,
    padding: 24,
    borderRadius: 20,
    elevation: 2,
    flexDirection: 'row',
  },
  left_container: {
    paddingRight: 20,
    flex: 1,
    borderRightWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progress_text: {
    fontSize: 40,
    fontFamily: 'NanumPen',
  },
  left_date_text: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'NanumPen',
  },
  right_container: {
    paddingLeft: 20,
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  project_text: {
    fontSize: 30,
    color: 'black',
    fontFamily: 'NanumPen',
  },
});

export default withNavigation(HabitProject);

import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';

export default class ProjectInfo extends React.Component {
  constructor(props) {
    super(props);
    const {navigation} = this.props;
    this.state = {
      habit: navigation.getParam('habit'),
      date: navigation.getParam('date'),
      color: navigation.getParam('color'),
      today: navigation.getParam('today'),
      leftDate: navigation.getParam('leftDate'),
      completedDate: navigation.getParam('completedDate'),
    };
  }

  getProjectPeriod() {
    const {date, leftDate} = this.state;
    const prevDate = date - leftDate;

    const prev_year = new Date().getFullYear();
    const prev_month = new Date().getMonth();
    const prev_date = new Date().getDate() - prevDate;
    const _prevDate = new Date(prev_year, prev_month, prev_date);

    const goal_date = prev_date + date;
    const goalDate = new Date(prev_year, prev_month, goal_date);

    return `${_prevDate.getFullYear()}.${_prevDate.getMonth() +
      1}.${_prevDate.getDate() +
      1} ~ ${goalDate.getFullYear()}.${goalDate.getMonth() +
      1}.${goalDate.getDate()}`;
  }

  getCompleteButton() {
    const {navigation} = this.props;
    if (this.state.leftDate >= 0) {
      if (this.state.completedDate !== null) {
        if (this.state.completedDate.includes(this.state.today)) {
          return (
            <Text
              style={[
                styles.completed_text,
                {borderBottomColor: this.state.color},
              ]}>
              오늘의 할 일을 완료했습니다.
            </Text>
          );
        } else {
          return (
            <TouchableOpacity
              style={[
                styles.complete_button,
                {backgroundColor: this.state.color},
              ]}
              onPress={() =>
                Alert.alert(
                  '확인해주세요',
                  `"${this.props.navigation.getParam(
                    'habit',
                  )}" 을(를) 정말 완료했나요?`,
                  [
                    {text: '아니요'},
                    null,
                    {text: '네', onPress: () => this.completeProject()},
                  ],
                )
              }>
              <Text style={styles.complete_button_text}>
                오늘의 할 일 완료하기
              </Text>
            </TouchableOpacity>
          );
        }
      }
    } else {
      return (
        <TouchableOpacity
          style={[styles.complete_button, {backgroundColor: this.state.color}]}
          onPress={() => {
            const finishFunction = navigation.getParam('finishFunction');
            finishFunction();
            navigation.goBack();
          }}>
          <Text style={styles.complete_button_text}>프로젝트 종료하기</Text>
        </TouchableOpacity>
      );
    }
  }

  completeProject() {
    const {navigation} = this.props;
    this.setState({
      completedDate: this.state.completedDate.concat(this.state.today),
    });
    if (navigation.getParam('leftDate') == 0) {
      Alert.alert(
        '축하합니다',
        `"${this.state.habit}" 을(를) 모두 완수하셨습니다!`,
      );
      const finishFunction = navigation.getParam('finishFunction');
      finishFunction();
    } else {
      const completeFunction = navigation.getParam('completeFunction');
      completeFunction();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 1.6,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <Text style={styles.habit_text}>{this.state.habit}</Text>
          <Text style={styles.date_text}>{this.getProjectPeriod()}</Text>
          <View>{this.getCompleteButton()}</View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  habit_text: {
    textAlign: 'center',
    fontSize: 50,
    fontFamily: 'NanumPen',
  },
  date_text: {
    fontSize: 20,
    fontFamily: 'NanumPen',
    color: '#555',
  },
  complete_button: {
    borderWidth: 1,
    borderRadius: 20,
    width: 200,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
  },
  complete_button_text: {
    fontSize: 24,
    fontFamily: 'NanumPen',
  },
  completed_text: {
    marginTop: 25,
    fontSize: 15,
    borderBottomWidth: 1,
    fontFamily: 'NanumPen',
  },
});

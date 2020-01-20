import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import ColorSelector from './ColorSelector';

export default class MakeHabitProject extends React.Component {
  constructor(props) {
    super(props);

    const placeholders = [
      '금연/금주 하기',
      '책 40쪽 읽기',
      '영어 단어 20개 암기하기',
      '한자 30번 쓰기',
      '스쿼트 30개 하기',
      '자격증 공부 1시간 하기',
      '일기 작성하기',
      '스트레칭 30분 하기',
      '나쁜 말 하지 않기',
      '요리 학원 수강하기',
      '산책 30분 하기',
    ];
    let rand = Math.floor(Math.random() * placeholders.length);
    let placeholder = placeholders[rand];

    this.state = {
      placeholder: placeholder,
    };
  }

  selectColor(c) {
    this.setState({
      color: c,
    });
  }

  getGoalDate() {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const date = new Date().getDate() + Number(Math.round(this.state.date));

    return `${year}-${month}-${date}`;
  }

  errorAlert(msg) {
    Alert.alert('확인해주세요', msg, [{text: '네'}]);
  }

  checkProject() {
    const {navigation} = this.props;
    if (!this.state.habit || this.state.habit.trim() === '') {
      this.errorAlert('만들고 싶은 습관을 적어주세요.');
    } else if (!this.state.date) {
      this.errorAlert('이 습관을 실천할 날짜를 적어주세요.');
    } else if (Number(this.state.date) < 3) {
      this.errorAlert('실천할 날짜가 너무 적은 것 같아요.');
    } else if (!this.state.color) {
      this.errorAlert('이 습관 프로젝트를 표현할 색을 골라주세요.');
    } else {
      Alert.alert(
        '성공!',
        `${Math.round(
          this.state.date,
        )}일 동안 "${this.state.habit.trim()}" 을(를) 습관 프로젝트에 등록하시겠어요?\n프로젝트를 등록하면 수정하거나 삭제할 수 없습니다. 신중하게 확인해주세요.`,
        [
          {text: '잠시만요!'},
          null,
          {
            text: '네',
            onPress: () => {
              const goalDate = this.getGoalDate();

              navigation.navigate('Home', {
                id: Date.now(),
                habit: this.state.habit.trim(),
                date: Math.round(this.state.date),
                color: this.state.color,
                goalDate: goalDate,
              });
              const addFunction = navigation.getParam('addFunction');
              addFunction();
            },
          },
        ],
      );
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.habit_project_text}>
          만들고 싶은 습관을 적어보세요.
        </Text>
        <TextInput
          placeholder={this.state.placeholder}
          style={styles.habit_project_input}
          onChangeText={e => this.setState({habit: e})}
          maxLength={30}
        />

        <View style={styles.inner_container}>
          <TextInput
            placeholder="몇"
            keyboardType="numeric"
            maxLength={3}
            contextMenuHidden={true}
            onChangeText={e => this.setState({date: e})}
            style={styles.habit_date_input}
          />
          <Text style={styles.habit_date_text}>일 동안</Text>
        </View>
        <Text style={styles.habit_date_content_text}>
          실천해서 습관으로 만듭니다.
        </Text>

        <View style={styles.color_container}>
          <View style={styles.color_top_container}>
            <ColorSelector
              color="pink"
              onPress={() => this.selectColor('pink')}
              selected_color={this.state.color}
            />
            <ColorSelector
              color="orangered"
              onPress={() => this.selectColor('orangered')}
              selected_color={this.state.color}
            />
            <ColorSelector
              color="coral"
              onPress={() => this.selectColor('coral')}
              selected_color={this.state.color}
            />
            <ColorSelector
              color="lemonchiffon"
              onPress={() => this.selectColor('lemonchiffon')}
              selected_color={this.state.color}
            />
            <ColorSelector
              color="palegreen"
              onPress={() => this.selectColor('palegreen')}
              selected_color={this.state.color}
            />
          </View>
          <View style={styles.color_bottom_container}>
            <ColorSelector
              color="skyblue"
              onPress={() => this.selectColor('skyblue')}
              selected_color={this.state.color}
            />
            <ColorSelector
              color="aqua"
              onPress={() => this.selectColor('aqua')}
              selected_color={this.state.color}
            />
            <ColorSelector
              color="dodgerblue"
              onPress={() => this.selectColor('dodgerblue')}
              selected_color={this.state.color}
            />
            <ColorSelector
              color="mediumpurple"
              onPress={() => this.selectColor('mediumpurple')}
              selected_color={this.state.color}
            />
            <ColorSelector
              color="mediumslateblue"
              onPress={() => this.selectColor('mediumslateblue')}
              selected_color={this.state.color}
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.complete_button}
          onPress={() => this.checkProject()}>
          <Text style={styles.complete_text}>습관 프로젝트 만들기</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 30,
  },
  habit_project_text: {
    fontSize: 25,
    fontFamily: 'NanumPen',
    marginBottom: 30,
    marginTop: 30,
  },
  habit_project_input: {
    width: '80%',
    paddingHorizontal: 20,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    fontSize: 15,
  },
  inner_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  habit_date_input: {
    marginRight: 2,
    fontSize: 35,
    color: 'red',
  },
  habit_date_text: {
    fontSize: 30,
    fontFamily: 'NanumPen',
    marginTop: 30,
    marginBottom: 30,
  },
  habit_date_content_text: {
    fontSize: 30,
    fontFamily: 'NanumPen',
  },
  color_container: {
    width: 375,
    height: 200,
    backgroundColor: '#fffff0',
    borderColor: '#555',
    borderWidth: 2,
    marginTop: 30,
    marginBottom: 15,
    padding: 24,
    borderRadius: 30,
    elevation: 5,
  },
  color_top_container: {
    flex: 1,
    flexDirection: 'row',
  },
  color_bottom_container: {
    flex: 1,
    flexDirection: 'row',
  },
  complete_button: {
    marginTop: 20,
    borderRadius: 15,
    backgroundColor: '#4286ff',
    width: 300,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#555',
    elevation: 4,
  },
  complete_text: {
    fontSize: 35,
    fontFamily: 'NanumPen',
  },
});

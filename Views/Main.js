import React from 'react';
import {StyleSheet, ScrollView, SafeAreaView, Alert} from 'react-native';
import HabitProject from './HabitProject';
import AddHabit from './AddHabit';
import AsyncStorage from '@react-native-community/async-storage';
import Snackbar from 'react-native-snackbar';

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      habit_projects: [],
    };
  }

  componentDidMount = async () => {
    try {
      const data = JSON.parse(await AsyncStorage.getItem('projects'));
      if (data === null) {
        this.setState({habit_projects: [], isLoading: true});
      } else {
        this.setState({habit_projects: data, isLoading: true});
      }
    } catch (e) {
      Alert.alert('error', e.toString());
    }
  };

  getTodayDate() {
    const day = new Date();
    const year = day.getFullYear();
    const month = day.getMonth() + 1;
    const date = day.getDate();

    return `${year}.${month}.${date}`;
  }

  completeProject(id) {
    this.setState(prevState => {
      const [project] = prevState.habit_projects.filter(e => e.id === id);
      project.completedDate = project.completedDate.concat(this.getTodayDate());
      this.saveProjects();
      return {
        habit_projects: [...prevState.habit_projects],
      };
    });
  }

  addProjects = async () => {
    const {navigation} = this.props;
    let newHabitProject = {
      id: navigation.getParam('id'),
      habit: navigation.getParam('habit'),
      date: navigation.getParam('date'),
      color: navigation.getParam('color'),
      goalDate: navigation.getParam('goalDate'),
      completedDate: [],
    };
    this.setState(prevState => ({
      habit_projects: [...prevState.habit_projects, newHabitProject],
    }));
    this.saveProjects();
    this.showSnackbar('프로젝트가 등록되었습니다.', '실행 취소', () =>
      this.deleteProject(navigation.getParam('id')),
    );
  };

  deleteProject(id) {
    this.setState(prevState => {
      const index = prevState.habit_projects.findIndex(e => e.id === id);
      prevState.habit_projects.splice(index, 1);
      this.saveProjects();
      return {
        habit_projects: [...prevState.habit_projects],
      };
    });
  }

  finishProject = async id => {
    const index = this.state.habit_projects.findIndex(e => e.id === id);
    const finished_project = this.state.habit_projects.splice(index, 1);
    try {
      await AsyncStorage.setItem(
        'finished_projects',
        JSON.stringify(finished_project),
      );
    } catch (e) {
      Alert.alert('error', e.toString());
    }
    this.deleteProject(id);
  };

  saveProjects = async () => {
    try {
      await AsyncStorage.setItem(
        'projects',
        JSON.stringify(this.state.habit_projects),
      );
    } catch (e) {
      Alert.alert('error', e.toString());
    }
  };

  showSnackbar(msg, action_title, action, action_color = 'red') {
    Snackbar.show({
      title: msg,
      duration: Snackbar.LENGTH_LONG,
      action: {
        title: action_title,
        color: action_color,
        onPress: action,
      },
    });
  }

  render() {
    return this.state.isLoading ? (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollview}>
          {this.state.habit_projects.map(data => (
            <HabitProject
              key={data.id}
              habit={data.habit}
              date={data.date}
              color={data.color}
              today={this.getTodayDate()}
              goalDate={data.goalDate}
              completedDate={data.completedDate}
              completeFunction={() => this.completeProject(data.id)}
              finishFunction={() => this.finishProject(data.id)}
            />
          ))}
          <AddHabit addFunction={() => this.addProjects()} />
        </ScrollView>
      </SafeAreaView>
    ) : null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollview: {
    alignItems: 'center',
  },
});

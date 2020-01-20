import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Main from './Views/Main';
import Progress from './Views/Progress';
import Others from './Views/Others';
import MakeHabitProject from './Views/MakeHabitProject';
import ProjectInfo from './Views/ProjectInfo';
import AppInfo from './Views/AppInfo';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

const BottomNavigator = createBottomTabNavigator(
  {
    Progress: {
      screen: Progress,
      navigationOptions: {
        tabBarLabel: 'Progress',
        tabBarIcon: ({tintColor}) => (
          <Icon name="badge" style={{color: tintColor}} size={20} />
        ),
      },
    },

    Home: {
      screen: Main,
      navigationOptions: {
        tabBarLabel: 'My Projects',
        tabBarIcon: ({tintColor}) => (
          <Icon name="notebook" style={{color: tintColor}} size={20} />
        ),
      },
    },

    Others: {
      screen: Others,
      navigationOptions: {
        tabBarLabel: 'Others',
        tabBarIcon: ({tintColor}) => (
          <Icon name="settings" style={{color: tintColor}} size={20} />
        ),
      },
    },
  },
  {
    initialRouteName: 'Home',
    tabBarOptions: {
      activeTintColor: '#000',
      labelStyle: {
        fontSize: 18,
        fontFamily: 'NanumPen',
      },
      style: {
        borderTopColor: '#000',
        borderTopWidth: 0.75,
        height: 60,
        backgroundColor: '#fff',
      },
    },
  },
);

const AppNavigator = createStackNavigator(
  {
    BottomNavigator: BottomNavigator,
    Progress: Progress,
    Home: Main,
    Others: Others,
    MakeHabitProject: MakeHabitProject,
    ProjectInfo: ProjectInfo,
    AppInfo: AppInfo,
  },
  {
    headerMode: 'none',
  },
);

export default createAppContainer(AppNavigator);

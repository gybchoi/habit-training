import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class AppInfo extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>AppInfo</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class NullMain extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>NullMain</Text>
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

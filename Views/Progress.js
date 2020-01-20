import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class Progress extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 40, textAlign: 'center'}}>
          아직 완료한 습관 프로젝트가 없어요.
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

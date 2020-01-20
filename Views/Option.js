import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default class Option extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={[styles.container, this.props.style]}
        onPress={this.props.onPress}>
        <Icon
          name={this.props.icon}
          size={25}
          style={[styles.option_icon, this.props.iconstyle]}
        />
        <Text style={styles.option_text}>{this.props.text}</Text>
        <View style={styles.right_text}>
          <Text style={styles.option_text}>{this.props.rightText}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    borderBottomWidth: 0.5,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 1,
  },
  option_icon: {
    paddingLeft: 20,
  },
  option_text: {
    color: '#555',
    fontSize: 20,
    fontFamily: 'NanumPen',
    paddingLeft: 15,
  },
  right_text: {
    padding: 25,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
  },
});

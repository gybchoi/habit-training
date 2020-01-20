import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';

export default class ColorSelector extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={[
          styles.container,
          {
            backgroundColor: this.props.color,
            borderColor:
              this.props.color === this.props.selected_color ? '#d00' : 'black',
          },
        ]}
        onPress={this.props.onPress}></TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 6,
    borderRadius: 20,
    borderWidth: 5,
  },
});

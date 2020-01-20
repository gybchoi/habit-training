import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {withNavigation} from 'react-navigation';
class AddHabit extends React.Component {
  render() {
    const {navigation} = this.props;
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() =>
          navigation.navigate('MakeHabitProject', {
            addFunction: this.props.addFunction,
          })
        }>
        <Icon name="plus" size={30} color="#ddd" />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 365,
    height: 80,
    marginVertical: 14,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#ddd',
  },
});

export default withNavigation(AddHabit);

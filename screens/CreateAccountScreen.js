import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

class CreateAccount extends Component {
    
    render() {
      return (
        <View  style={styles.container}>
            <Text>Create Account</Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('MainTab')}> 
                <Text>Submit</Text>
            </TouchableOpacity>
        </View>
      )
    }
  }

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
},
});

  export default CreateAccount
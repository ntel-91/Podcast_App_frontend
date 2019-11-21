import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';



class LoginScreen extends Component {
    
    render() {
      return (
        <View  style={styles.container}>
            <Text>Login Screen</Text>
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
  

  export default LoginScreen
import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
// import WelcomeNavigator from '../navigation/WelcomeNavigator'


class WelcomeScreen extends Component {
    
    
    
    render() {
      return (
        <View  style={styles.container}>
            
            <Text>Welcome</Text>          
            
            <Button title="Login" onPress={() => this.props.navigation.navigate('Login')}/>
            <Button title="create account" onPress={() => this.props.navigation.navigate('CreateAccount')}/>     
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
  

  export default WelcomeScreen
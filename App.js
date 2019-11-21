import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import AppNavigator from './navigation/AppNavigator.js'
// import { createBottomNavigator }from 'react-navigation-stack'


class App extends Component {
  render() {
    return <AppNavigator />
    // return <AppContainer />
  }
}

// class WelcomeScreen extends Component {
//   render() {
//     return (
//       <View  style={styles.container}>
//         <Text>Welcome Screen</Text>
//       </View>
//     )
//   }
// }

// class DashboardScreen extends Component {
//   render() {
//     return (
//       <View>
//         <Text>Dashboard Screen</Text>
//       </View>
//     )
//   }
// }

// const AppSwitchNavigator = createSwitchNavigator({
//   Welcome: WelcomeScreen,
//   Dashboard: DashboardScreen
// })

// const AppContainer = createAppContainer(AppSwitchNavigator)



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default App

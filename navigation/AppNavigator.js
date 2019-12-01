import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import WelcomeNavigator from './WelcomeNavigator.js'
import MainStackNavigator from './MainStackNavigator.js'
import TestScreen from '../screens/TestScreen.js'

export default createAppContainer(
    createSwitchNavigator({
        Welcome: WelcomeNavigator,
        MainStack: MainStackNavigator,
        Test: TestScreen
      },{
        initialRouteName: 'Welcome'
      })
)
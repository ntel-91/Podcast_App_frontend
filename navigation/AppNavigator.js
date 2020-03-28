import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import WelcomeNavigator from './WelcomeNavigator.js'
import MainStackNavigator from './MainStackNavigator.js'

export default createAppContainer(
    createSwitchNavigator({
        Welcome: WelcomeNavigator,
        MainStack: MainStackNavigator
      },{
        initialRouteName: 'Welcome'
      })
)
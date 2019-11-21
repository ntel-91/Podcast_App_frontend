import { createStackNavigator } from 'react-navigation-stack'
import LoginScreen from '../screens/LoginScreen.js'
import CreateAccountScreen from '../screens/CreateAccountScreen.js'
import WelcomeScreen from '../screens/WelcomeScreen.js'

export default createStackNavigator({
    Welcome: WelcomeScreen,
    Login: LoginScreen,
    CreateAccount: CreateAccountScreen
})
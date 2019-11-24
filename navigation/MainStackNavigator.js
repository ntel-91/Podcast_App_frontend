import { createStackNavigator } from 'react-navigation-stack'
import MainTabNavigator from './MainTabNavigator.js'
import PodcastShowNavigator from './PodcastShowNavigator.js'

export default createStackNavigator({
    MainTab: MainTabNavigator,
    PodcastShow: PodcastShowNavigator
},{
    headerMode: "none"
}
)
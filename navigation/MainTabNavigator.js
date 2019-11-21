import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator }from 'react-navigation-tabs'

import DiscoverScreen from '../screens/DiscoverScreen.js'
import PodcastsScreen from '../screens/PodcastsScreen.js'
import SearchScreen from '../screens/SearchScreen.js'

const MainTabNavigator = createBottomTabNavigator({
    Podcasts: PodcastsScreen,
    Discover: DiscoverScreen,
    Search: SearchScreen
},{
    navigationOptions:({navigation})=>{
        const {routeName} = navigation.state.routes[navigation.state.index]
        return{
            headerTitle: routeName
        }
    }
})

export default createStackNavigator({
    Main: {
        screen: MainTabNavigator
    }
})
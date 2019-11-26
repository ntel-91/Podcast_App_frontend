import { createBottomTabNavigator }from 'react-navigation-tabs'

import DiscoverScreen from '../screens/DiscoverScreen.js'
import PodcastsScreen from '../screens/PodcastsScreen.js'
import SearchScreen from '../screens/SearchScreen.js'


export default createBottomTabNavigator({
    Podcasts: PodcastsScreen,
    Discover: DiscoverScreen,
    Search: SearchScreen
},{
    initialRouteName: 'Podcasts'
},{
    navigationOptions:({navigation})=>{
        const {routeName} = navigation.state.routes[navigation.state.index]
        return {
            headerTitle: routeName
        }
    }
})

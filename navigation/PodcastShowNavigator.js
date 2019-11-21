import { createStackNavigator } from 'react-navigation-stack'
import PodcastShowScreen from '../screens/PodcastShowScreen.js'
import PodcastEpisodeScreen from '../screens/PodcastEpisodeScreen.js'
import DiscoverSearchScreen from '../screens/DiscoverSearchScreen.js'


export default createStackNavigator({
    PodcastShow: PodcastShowScreen,
    PodcastEpisode: PodcastEpisodeScreen,
    DiscoverSearch: DiscoverSearchScreen
})
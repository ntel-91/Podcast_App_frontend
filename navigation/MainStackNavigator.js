import { createStackNavigator } from 'react-navigation-stack'
import MainTabNavigator from './MainTabNavigator.js'
import PodcastShowScreen from '../screens/PodcastShowScreen.js'
import PodcastEpisodeScreen from '../screens/PodcastEpisodeScreen.js'
import DiscoverSearchScreen from '../screens/DiscoverSearchScreen.js'
import EpisodeBookmarksScreen from '../screens/EpisodeBookmarksScreen.js'


export default createStackNavigator({
    MainTab: MainTabNavigator,
    PodcastShow: PodcastShowScreen,
    PodcastEpisode: PodcastEpisodeScreen,
    DiscoverSearch: DiscoverSearchScreen,
    EpisodeBookmarks: EpisodeBookmarksScreen
})
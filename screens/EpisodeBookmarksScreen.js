import React, { Component } from 'react'
import { StyleSheet, View, FlatList, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux'
import BookmarkedEpisodeItem from '../components/BookmarkedEpisodeItem.js'
import { setEpisodeData, currentEpisodeBookmarks } from '../action'


class EpisodeBookmarksScreen extends Component {
    
    renderItems = (episode) => {     
        let bookmarks = this.props.user_bookmarks.find(e => Object.keys(e)[0] === `${episode.item.id}`)
        let numBookmarks = Object.values(bookmarks).flat().length
        
        return (
            <TouchableOpacity
                onPress={() => {
                    this.props.setEpisodeData(episode.item)
                    this.props.currentEpisodeBookmarks(Object.values(bookmarks).flat())
                    this.props.navigation.navigate('PodcastEpisode')
                }}
            >
                <BookmarkedEpisodeItem num={numBookmarks} episode={episode.item} />
            </TouchableOpacity>
        )
    }

    render() {
        // console.log("PODCAST BOOKMARKS: ", this.props.podcast_bookmarks)
        return (
            <View>
                <FlatList
                    data={this.props.podcast_bookmarks}
                    keyExtractor={item => item.created_at}
                    renderItem=
                        {this.renderItems}
                />
            </View>
        )
    }
}


mapStateToProps = (state) => {
    return {
        user_podcasts: state.user_podcasts,
        user_episodes: state.user_episodes,
        user_bookmarks: state.user_bookmarks,
        podcast_bookmarks: state.podcast_bookmarks,
        episode_bookmarks: state.episode_bookmarks,
        podcastData: state.podcastData
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

export default connect(mapStateToProps, { setEpisodeData, currentEpisodeBookmarks })(EpisodeBookmarksScreen)

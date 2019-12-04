import React, { Component } from 'react'
import { StyleSheet, View, FlatList, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux'
import BookmarkedPodcastItem from '../components/BookmarkedPodcastItem.js'
import { podcastEpisodesWithBookmarks, setPodcastData } from '../action'


class BookmarkScreen extends Component {
    
    renderItems = (podcast) => {
        let podcastItem = this.props.user_podcasts.find( p => p.id === parseInt(Object.keys(podcast.item)[0]))
        // console.log(podcastItem)
        return (
            <TouchableOpacity
                onPress={() => {
                    this.props.setPodcastData(podcastItem)
                    this.props.podcastEpisodesWithBookmarks(Object.values(podcast.item).flat())
                    this.props.navigation.navigate('EpisodeBookmarks')
                }}
            >
                <BookmarkedPodcastItem episodes={podcast.item} podcast={podcastItem} />
            </TouchableOpacity>
        )
    }

    render() {
        
        return (
            <View>
                <FlatList
                    data={this.props.user_episodes}
                    keyExtractor={item => Object.keys(item)[0]}
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
        user_bookmarks: state.user_bookmarks
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

export default connect(mapStateToProps, { podcastEpisodesWithBookmarks, setPodcastData })(BookmarkScreen)


  

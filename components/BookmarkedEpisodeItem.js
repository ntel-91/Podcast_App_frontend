import React, { Component } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { connect } from 'react-redux'
// import { setPodcastData } from '../action'

class BookmarkedEpisodeItem extends Component {

    render() {
        
        return (
            <View style={{borderBottomWidth: 0.5, borderColor: 'lightgrey'}}>
                <View style={styles.card}>
                    <View style={styles.headerContentStyle}>
                        <Text style={styles.headerTextStyle}>{this.props.episode.episode_name}</Text>
                        
                        <Text style={styles.subHeaderTextStyle}>{`${this.props.num} Bookmark${this.props.num > 1 ? "s" : ""}`}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        // borderBottomWidth: 1
    },
    headerContentStyle: {
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    headerTextStyle: {
        fontSize: 15,
        marginLeft: 10
    },
    subHeaderTextStyle: {
        color: 'grey',
        fontSize: 13,
        marginLeft: 10
    },
    thumbnailContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    }

})

mapStateToProps = (state) => {
    return {
        user_podcasts: state.user_podcasts,
        user_episodes: state.user_episodes,
        user_bookmarks: state.user_bookmarks
    }
}

export default connect(mapStateToProps)(BookmarkedEpisodeItem)
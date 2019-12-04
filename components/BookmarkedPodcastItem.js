import React, { Component } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { connect } from 'react-redux'

class BookmarkedPodcastItem extends Component {

    render() {
        console.log(this.props.podcast)
        return (
            <View style={{borderBottomWidth: 0.5, borderColor: 'lightgrey'}}>
                <View style={styles.card}>
                    <View style={styles.thumbnailContainerStyle}>
                        <Image
                            style={{width: 50, height: 50}}
                            source={{uri: this.props.podcast.img_url}}
                        />
                    </View>
                    <View style={styles.headerContentStyle}>
                        <Text style={styles.headerTextStyle}>{this.props.podcast.podcast_name}</Text>
                        <Text style={styles.subHeaderTextStyle}>{`${Object.values(this.props.episodes).flat().length} Episode${Object.values(this.props.episodes).flat().length >1 ? "s" : ""}`}</Text>
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
        fontSize: 18
    },
    subHeaderTextStyle: {
        color: 'grey'
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

export default connect(mapStateToProps)(BookmarkedPodcastItem)
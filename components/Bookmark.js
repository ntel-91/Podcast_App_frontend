import React, { Component } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { connect } from 'react-redux'
// import { setPodcastData } from '../action'

class Bookmark extends Component {

    render() {
        
        return (
            <View style={{borderBottomWidth: 0.5, borderColor: 'lightgrey'}}>
                <View style={styles.card}>
                    <View style={styles.headerContentStyle}>
                        <Text style={styles.headerTextStyle}>{`Time: ${this.props.time}`}</Text>
                        <Text style={styles.subHeaderTextStyle}>{`on ${this.props.bookmarkDate.slice(0,10)}`}</Text>
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
        alignContent: 'stretch',
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

export default connect(mapStateToProps)(Bookmark)
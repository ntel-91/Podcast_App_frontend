import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'

class Episode extends Component {

    render() {
        console.log(this.props)
        return (
            <View style={{borderBottomWidth: 0.5, borderColor: 'lightgrey'}}>
                <View style={styles.card}>
                    
                    <View style={styles.headerContentStyle}>
                        <Text style={styles.headerTextStyle}>{this.props.episodes.title}</Text>
                        {/* <Text style={styles.subHeaderTextStyle}>{this.props.podcast.artist_name}</Text> */}
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
        fontSize: 14,
        marginLeft: 10
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


export default Episode
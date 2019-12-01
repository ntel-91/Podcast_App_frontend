import React, { Component } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'

class SearchItem extends Component {

    render() {
        return (
            <View style={{borderBottomWidth: 0.5, borderColor: 'lightgrey'}}>
                <View style={styles.card}>
                    <View style={styles.thumbnailContainerStyle}>
                        <Image 
                            style={{width: 50, height: 50}}
                            source={{uri: this.props.podcast.image_small}}
                        />
                    </View>
                    <View style={styles.headerContentStyle}>
                        <Text style={styles.headerTextStyle}>{this.props.podcast.collection_name}</Text>
                        <Text style={styles.subHeaderTextStyle}>{this.props.podcast.artist_name}</Text>
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


export default SearchItem
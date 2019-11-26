import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux'
import { setPodcastData } from '../action'

class PodcastsScreen extends Component {
    render() {
        return (
        <View  style={styles.container}>
            <Text>Podcasts Screen</Text> 
            <FlatList 
                data={this.props.user_podcasts}
                keyExtractor={item => item.podcast_name}
                renderItem={({ item }) => {
                    return (
                        <View>
                            <TouchableOpacity 
                                onPress={() => {
                                    this.props.setPodcastData({
                                        collection_name: item.podcast_name,
                                        image_medium: item.img_url,
                                        rss: item.rss
                                        
                                    })
                                    this.props.navigation.navigate('PodcastShow')
                                }}>
                                <Text>{item.podcast_name}</Text>
                                <Image
                                    style={{width: 50, height: 50}}
                                    source={{uri: item.img_url}}
                                />    
                            </TouchableOpacity>
                        </View>
                    )
                }}
            />
        </View>
        )
    }
}

mapStateToProps = (state) => {
    return {
        user_podcasts: state.user_podcasts
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
  
export default connect(mapStateToProps, { setPodcastData })(PodcastsScreen)
import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux'
import { setPodcastData } from '../action'

class PodcastsScreen extends Component {  
    render() {
        return (
        <View>
            <FlatList          
                data={this.props.user_podcasts}
                renderItem={({ item }) => {
                    return (
                            <TouchableOpacity 
                                style={{width: '33.33%', aspectRatio: 1}}
                                onPress={() => {
                                    this.props.setPodcastData({
                                        collection_name: item.podcast_name,
                                        image_medium: item.img_url,
                                        rss: item.rss      
                                    })
                                    this.props.navigation.navigate('PodcastShow')
                                }}>
                                <Image
                                    style={{flex: 1}}
                                    source={{uri: item.img_url}}
                                />    
                            </TouchableOpacity>
                    )
                }}
                keyExtractor={item => item.podcast_name}
                numColumns={3}
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
        backgroundColor: '#fff',
        flex: 1,
        
        // flexWrap: 'wrap',
        flexDirection: 'row'
    },
    image: {
        flex: 1,
        flexDirection: 'row'
    }
});
  
export default connect(mapStateToProps, { setPodcastData })(PodcastsScreen)
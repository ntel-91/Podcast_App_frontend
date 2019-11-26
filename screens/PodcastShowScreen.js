import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux'
import { FlatList } from 'react-native-gesture-handler';
import { setEpisodeData } from '../action'



class PodcastShowScreen extends Component {

    state = {
        podcastDescription: '',
        podcastEpisodes: []
    }
    
    componentDidMount(){
        fetch('http://localhost:3000/podcastdata',{
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'  
            },
            body: JSON.stringify({
                rss: this.props.podcastData.rss
            })
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                podcastDescription: data.description,
                podcastEpisodes: data.episodes_info
            })
        })
    }

    render() {
        
        return (
        <View  style={styles.container}>
            <Text>PodcastShow Screen</Text>
            <Image
                style={{width: 50, height: 50}}
                source={{uri: this.props.image_small}}
            /> 
            <Text>{this.props.podcastData.artist_name}</Text>
            <Text>{this.state.podcastDescription}</Text>
            <View>
                <FlatList
                    data={this.state.podcastEpisodes}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity 
                                onPress={() => {
                                    this.props.setEpisodeData(item)
                                    this.props.navigation.navigate('PodcastEpisode')
                                }}
                            >
                                <Text>{ item.title }</Text>
                                <Text>{ item.pubDate }</Text>
                            </TouchableOpacity>
                        )
                    }} 
                />
            </View>
            
            <Button 
                title="Go to episdoe"
                onPress={() => this.props.navigation.navigate('PodcastEpisode')}
            />
        </View>
        )
    }
}

mapStateToProps = (state) => {
    return {
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
  
export default connect(mapStateToProps, { setEpisodeData })(PodcastShowScreen)
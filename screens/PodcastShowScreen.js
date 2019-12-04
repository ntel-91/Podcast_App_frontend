import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import Episode from '../components/Episode.js'
import { FlatList } from 'react-native-gesture-handler';

import { connect } from 'react-redux'
import { setEpisodeData, setUserPodcasts, currentEpisodeBookmarks } from '../action'

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

    subscribe = () => {
        fetch('http://localhost:3000/podcasts',{
            method: "POST",
            headers: {
                'Accept': 'application/json', 
                'Content-Type': 'application/json'  
            },
            body: JSON.stringify({
                user_id: this.props.user_id,
                podcast_name: this.props.podcastData.collectionName,
                podcast_image: this.props.podcastData.img_url,
                rss: this.props.podcastData.rss
            })
        })
        .then(res => res.json())
        .then(data => {
            this.props.setUserPodcasts(data.podcasts)
        })
    }

    unsubscribe = (podcast_name) => {
        id = this.subscribedPodcastId(podcast_name).id

        fetch(`http://localhost:3000/podcasts/${id}`,{
            method: "DELETE",
            headers: {
                'Accept': 'application/json', 
                'Content-Type': 'application/json'  
            },
            body: JSON.stringify({
                user_id: this.props.user_id,
                podcast_name: this.props.podcastData.collectionName,
                podcast_image: this.props.podcastData.img_url,
                rss: this.props.podcastData.rss
            })
        })
        .then(res => res.json())
        .then(data => {
            this.props.setUserPodcasts(data.podcasts)
        })
    }

    subscribedPodcastId = (podcast_name) => {
        return this.props.user_podcasts.find((p) => {
            return p.podcast_name === podcast_name
        })
    } 
    
    renderEpisodes = (episodes) => {
        return (
            <TouchableOpacity 
                onPress={() => {
                    this.props.setEpisodeData(episodes.item)
                    this.props.navigation.navigate('PodcastEpisode')}}
            >
                <Episode episodes={episodes.item} />
            </TouchableOpacity>
        )
    }

    render() {
        return (
        <View  style={styles.container}>
            <View>
                <Image
                    style={styles.image}
                    source={{uri: this.props.podcastData.img_url}}
                />
            </View>
            <View>
                <Text>{this.props.podcastData.artistName}</Text>
                <Text>{this.state.podcastDescription}</Text>
                {this.props.user_podcasts.find((p) => p.podcast_name === this.props.podcastData.collectionName) ? (
                    <TouchableOpacity onPress={()=> this.unsubscribe(this.props.podcastData.collectionName)}>
                        <Text>Unsubscribe</Text>
                    </TouchableOpacity>
                ) : ( 
                    <TouchableOpacity onPress={this.subscribe}>
                        <Text>Subscribe</Text>
                    </TouchableOpacity> 
                )}
            </View>
             
            <View style={styles.episodesBox}>
                <FlatList
                    data={this.state.podcastEpisodes}
                    keyExtractor={item => item.audio } 
                    renderItem={this.renderEpisodes}
                />
            </View>
        </View>
        )
    }
}

mapStateToProps = (state) => {
    return {
        user_id: state.user_id,
        user_podcasts: state.user_podcasts,
        podcastData: state.podcastData
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: 150,
        height: 150,
        marginLeft: 15,
        marginTop: 15,
        marginBottom: 5
    },
    podcastContent: {
        flex: 1,
    },
    episodesBox: {
        flex: 4
    }
});

export default connect(mapStateToProps, { setEpisodeData, setUserPodcasts, currentEpisodeBookmarks })(PodcastShowScreen)

import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux'
import { FlatList } from 'react-native-gesture-handler';
import { setEpisodeData, setUserPodcasts } from '../action'



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
                podcast_name: this.props.podcastData.collection_name,
                podcast_image: this.props.podcastData.image_medium,
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
                podcast_name: this.props.podcastData.collection_name,
                podcast_image: this.props.podcastData.image_medium,
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
            {this.props.user_podcasts.find((p) => p.podcast_name === this.props.podcastData.collection_name) ? (
                  <TouchableOpacity onPress={()=> this.unsubscribe(this.props.podcastData.collection_name)}>
                      <Text>Unsubscribe</Text></TouchableOpacity>
                ) : ( 
                    <TouchableOpacity onPress={this.subscribe}>
                        <Text>Subscribe</Text>
                    </TouchableOpacity> 
                )} 
            <View>
                <FlatList
                    data={this.state.podcastEpisodes}
                    keyExtractor={item => item.audio } 
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
        user_id: state.user_id,
        user_podcasts: state.user_podcasts,
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
  
export default connect(mapStateToProps, { setEpisodeData, setUserPodcasts })(PodcastShowScreen)
import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import Episode from '../components/Episode.js'

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
        console.log("PROPS: ",this.props)
        return (
        <View  style={styles.container}>
            <View>
                <Image
                    style={styles.image}
                    source={{uri: this.props.podcastData.image_medium}}
                />
            </View>
            <View style={styles.podcastContent}>
                <Text>{this.props.podcastData.artist_name}</Text>
                <Text>{this.state.podcastDescription}</Text>
                <View>
                    {this.props.user_podcasts.find((p) => p.podcast_name === this.props.podcastData.collection_name) ? (
                    <TouchableOpacity onPress={()=> this.unsubscribe(this.props.podcastData.collection_name)}>
                        <Text>Unsubscribe</Text></TouchableOpacity>
                    ) : ( 
                        <TouchableOpacity onPress={this.subscribe}>
                            <Text>Subscribe</Text>
                        </TouchableOpacity> 
                    )}
                </View>
            </View>
             
            <View style={styles.episodesBox}>
                <FlatList
                    data={this.state.podcastEpisodes}
                    keyExtractor={item => item.audio } 
                    renderItem={this.renderEpisodes}
                    // {({ item }) => {
                    //     return ( 
                    //         <TouchableOpacity
                    //             onPress={() => {
                    //                 this.props.setEpisodeData(item)
                    //                 this.props.navigation.navigate('PodcastEpisode')
                    //             }}
                    //         >
                    //             <Text>{ item.title }</Text>
                    //             <Text>{ item.pubDate }</Text>
                    //         </TouchableOpacity>
                    //     )
                    // }} 
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

export default connect(mapStateToProps, { setEpisodeData, setUserPodcasts })(PodcastShowScreen)

// PODCAST Object {
//     "collection_name": "The Portal",
//     "image_medium": "https://is5-ssl.mzstatic.com/image/thumb/Podcasts113/v4/16/e6/31/16e631fe-d2cb-7ca0-f1b2-3bbc07b0c293/mza_1989164661815778920.jpeg/100x100bb.jpg",
//     "rss": "https://rss.art19.com/the-portal",
//   }

// DESCRIPTION:  
//       Welcome to The Portal. This podcast does something different. Hosted by Eric Weinstein. Coming July 2019.

// EPISODES:  Array [
//     Object {
//       "audio": "https://dts.podtrac.com/redirect.mp3/rss.art19.com/episodes/18c7a9b0-14e9-405e-adaa-babe36c5b96d.mp3",
//       "pubDate": "Sat, 23 Nov 2019 22:00:00 -0000",
//       "title": "13: Garry Kasparov - Avoiding Zugzwang in AI and Politics ",
//     },
//     Object {
//       "audio": "https://dts.podtrac.com/redirect.mp3/rss.art19.com/episodes/777009b2-9a58-431f-9237-0581716107a8.mp3",
//       "pubDate": "Thu, 21 Nov 2019 21:31:23 -0000",
//       "title": "12: Vitalik Buterin - The Ethereal Prince and His Virtual Machine ",
//     },
//     Object {
//       "audio": "https://dts.podtrac.com/redirect.mp3/rss.art19.com/episodes/f3641c6a-574f-42f3-afbe-a7c1257053c2.mp3",
//       "pubDate": "Fri, 15 Nov 2019 16:17:16 -0000",
//       "title": "11: Sam Harris - Fighting with Friends",
//     },
//     Object {
//       "audio": "https://dts.podtrac.com/redirect.mp3/rss.art19.com/episodes/6a7f2132-e11d-4e06-8169-348cbb489d6e.mp3",
//       "pubDate": "Thu, 31 Oct 2019 20:43:35 -0000",
//       "title": "10: Julie Lindahl: Shaking the poisoned fruit of shame out of the family tree",
//     },
//     Object {
//       "audio": "https://dts.podtrac.com/redirect.mp3/rss.art19.com/episodes/9cbd969b-c24d-4c9c-a048-c0d2ce5dfb4c.mp3",
//       "pubDate": "Thu, 31 Oct 2019 01:59:56 -0000",
//       "title": "9: Bryan Callen - Cracking Wise",
//     },
//     Object {
//       "audio": "https://dts.podtrac.com/redirect.mp3/rss.art19.com/episodes/5e00578a-102a-4824-87f6-7a12294fd1ec.mp3",
//       "pubDate": "Wed, 02 Oct 2019 15:10:44 -0000",
//       "title": "8: Andrew Yang - The Dangerously Different Candidate The Media Wants You To Ignore ",
//     },
//     Object {
//       "audio": "https://dts.podtrac.com/redirect.mp3/rss.art19.com/episodes/b51bf85d-b4b0-4920-a3c6-d08d8291c178.mp3",
//       "pubDate": "Mon, 30 Sep 2019 01:23:41 -0000",
//       "title": "7: Bret Easton Ellis - The Dark Laureate of Generation X",
//     },
//     Object {
//       "audio": "https://dts.podtrac.com/redirect.mp3/rss.art19.com/episodes/d028d8c0-4b39-49a9-9649-bbde98b88c80.mp3",
//       "pubDate": "Sat, 07 Sep 2019 23:06:07 -0000",
//       "title": "6: Jocko Willink - The Way of the Violent Intellectual",
//     },
//     Object {
//       "audio": "https://dts.podtrac.com/redirect.mp3/rss.art19.com/episodes/953c0dfb-2d12-4743-ae19-e2e5f5922fe9.mp3",
//       "pubDate": "Sat, 31 Aug 2019 05:23:13 -0000",
//       "title": "5: Rabbi Wolpe - “So a Rabbi and an atheist walk into a podcast...”",
//     },
//     Object {
//       "audio": "https://dts.podtrac.com/redirect.mp3/rss.art19.com/episodes/fac49501-d33b-47ef-8d83-f70ed5683fd1.mp3",
//       "pubDate": "Tue, 20 Aug 2019 11:50:35 -0000",
//       "title": "4: Timur Kuran - The Economics of Revolution and Mass Deception",
//     },
//     Object {
//       "audio": "https://dts.podtrac.com/redirect.mp3/rss.art19.com/episodes/fc8934df-0bbe-48c0-aed1-25a0c3674712.mp3",
//       "pubDate": "Thu, 25 Jul 2019 20:33:00 -0000",
//       "title": "3: Werner Herzog",
//     },
//     Object {
//       "audio": "https://dts.podtrac.com/redirect.mp3/rss.art19.com/episodes/1827a29a-6050-4229-88ef-79df38791b76.mp3",
//       "pubDate": "Fri, 19 Jul 2019 22:26:00 -0000",
//       "title": "2: What Is The Portal?",
//     },
//     Object {
//       "audio": "https://dts.podtrac.com/redirect.mp3/rss.art19.com/episodes/6740c1c3-c9d2-4ecc-a3df-0ed32f0ddba0.mp3",
//       "pubDate": "Wed, 17 Jul 2019 09:00:00 -0000",
//       "title": "1: Peter Thiel",
//     },
//     Object {
//       "audio": "https://dts.podtrac.com/redirect.mp3/rss.art19.com/episodes/2d9b9c66-5288-4643-afa4-55e68dd570f0.mp3",
//       "pubDate": "Mon, 24 Jun 2019 23:34:00 -0000",
//       "title": "Welcome to The Portal",
//     },
//   ]
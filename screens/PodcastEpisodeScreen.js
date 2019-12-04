import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux'
import { Audio } from 'expo-av'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import Slider from 'react-native-slider'
import Bookmark from '../components/Bookmark.js'
import { currentEpisodeBookmarks, setUserEpisodes, setUserBookmarks } from '../action'
const audioBookPlaylist = [
    {
      title: 'Hamlet - Act I',
      author: 'William Shakespeare',
      source: 'Librivox',
      uri:
        'https://ia800204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act1_shakespeare.mp3',
      imageSource:
        'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg'
    },
    {
      title: 'Hamlet - Act II',
      author: 'William Shakespeare',
      source: 'Librivox',
      uri:
        'https://ia600204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act2_shakespeare.mp3',
      imageSource:
        'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg'
    },
    {
      title: 'Hamlet - Act III',
      author: 'William Shakespeare',
      source: 'Librivox',
      uri:
        'http://www.archive.org/download/hamlet_0911_librivox/hamlet_act3_shakespeare.mp3',
      imageSource:
        'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg'
    },
    {
      title: 'Hamlet - Act IV',
      author: 'William Shakespeare',
      source: 'Librivox',
      uri:
        'https://ia800204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act4_shakespeare.mp3',
      imageSource:
        'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg'
    },
    {
      title: 'Hamlet - Act V',
      author: 'William Shakespeare',
      source: 'Librivox',
      uri:
        'https://ia600204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act5_shakespeare.mp3',
      imageSource:
        'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg'
    }
  ]

function msToTime(duration) {
    let seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = hours === 0 ? "" : ((hours < 10) ? "0" + hours : hours);
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return (hours ? (hours + ":") : "") + minutes + ":" + seconds;
}

class PodcastEpisodeScreen extends Component {
    state = {
        isPlaying: false,
        playbackInstance: null,
        currentIndex: 0,
        volume: 1.0,
        isBuffering: false,
        position: 0,
        duration: 0
    }

    async componentDidMount() {
        try {
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
            shouldDuckAndroid: true,
            staysActiveInBackground: true,
            playThroughEarpieceAndroid: true
        })
        this.loadAudio()
        } catch (e) {
        console.log(e)
        }
        
        fetch('http://localhost:3000/episodebookmarks',{
            method: 'POST',
            headers: {
                'Accept': 'application/json', 
                'Content-Type': 'application/json'    
            },
            body: JSON.stringify({
                userId: this.props.user_id,
                episode: this.props.episodeData,
                podcast: this.props.podcastData  
            })
        })    
        .then(res => res.json())
        .then(bookmarks => {
            console.log(bookmarks)
            this.props.currentEpisodeBookmarks(bookmarks)
        })

    }

    async loadAudio() {
        const {currentIndex, isPlaying, volume} = this.state
        try {
        const playbackInstance = new Audio.Sound()
        const source = {
            uri: this.props.episodeData.audio
        }
        const status = {
            shouldPlay: isPlaying,
            volume
        }
        playbackInstance.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate)
        await playbackInstance.loadAsync(source, status, false)
        this.setState({playbackInstance})
        } catch (e) {
            console.log(e)
        }
    }

    onPlaybackStatusUpdate = status => {
        this.setState({
        isBuffering: status.isBuffering,
        position: status.positionMillis,
        duration: status.durationMillis
        })
    }
    
    handlePlayPause = async () => {
        const { isPlaying, playbackInstance } = this.state
        isPlaying
        ? await playbackInstance.pauseAsync()
        // : await playbackInstance.playAsync()
        : await playbackInstance.playFromPositionAsync(this.state.position)
        this.setState({
            isPlaying: !isPlaying
        })
    }

    incrementRewind = async () => {
        let { playbackInstance, currentIndex } = this.state
        if (this.state.position > 30000) {
            await playbackInstance.playFromPositionAsync(this.state.position - 30000)
        } else {
            await playbackInstance.playFromPositionAsync(0)
        }
    }

    incrementFastForward = async () => {
        let { playbackInstance, currentIndex } = this.state
        if (playbackInstance) {
            await playbackInstance.playFromPositionAsync(this.state.position + 30000)
        }
    } 

    bookmark = () => {
        // console.log("POSITION", this.state.position)
        // console.log("EPISODE", this.props.episodeData.episode_name)
        // console.log("USER", this.props.user_id)
        // console.log("PODCASTID", this.props.episode_bookmarks)
        fetch('http://localhost:3000/bookmarks',{
            method: 'POST',
            headers: {
                'Accept': 'application/json', 
                'Content-Type': 'application/json'    
            },
            body: JSON.stringify({
                userId: this.props.user_id,
                episode: this.props.episodeData,
                bookmarkTime: this.state.position,
                podcast: this.props.podcastData  
            })
        })    
        .then(res => res.json())
        .then(bookmarks => {
            
            
            this.props.currentEpisodeBookmarks(bookmarks.episode_bookmarks)
            this.props.setUserEpisodes(bookmarks.episodes)
            this.props.setUserBookmarks(bookmarks.bookmarks)
            // this.props.currentEpisodeBookmarks(bookmarks)
        })
    }
    
    sliderValue = () => {
        if (this.state.duration){
        return this.state.position / this.state.duration
        }
    } 
    

    renderFileInfo = () => {
        const { playbackInstance, currentIndex } = this.state
        return playbackInstance ? (
        <View style={styles.trackInfo}>
            <Text style={[styles.trackInfoText, styles.smallText]}>
            {this.props.episodeData.episode_name}
            </Text>
        </View>
        ) : null
    }

    renderBookmarks = (bookmark) => {
        
        return (
            <TouchableOpacity
                onPress={() => {
                    this.setState({
                        
                        isPlaying: false,
                        position: bookmark.item.bookmark_time
                    })}
                }
            >
                <Bookmark
                    time={msToTime(bookmark.item.bookmark_time)}
                    bookmarkDate={bookmark.item.created_at}
                />
            </TouchableOpacity>
        )
    }
      
    render() {
        // console.log(this.props.episode_bookmarks)
        return (
        <View style={styles.container}>
            <Image
            style={styles.albumCover}
            source={{
                uri: this.props.podcastData.img_url
            }}
            />
            <View style={styles.controls}>
                <TouchableOpacity style={styles.control} onPress={this.incrementRewind}>
                    <MaterialIcons name='replay-30' size={48} color='#444' />
                </TouchableOpacity>
                <TouchableOpacity style={styles.control} onPress={this.handlePlayPause}>
                    {this.state.isPlaying ? (
                        <Ionicons name='ios-pause' size={48} color='#444' />
                    ) : (
                        <Ionicons name='ios-play-circle' size={48} color='#444' />
                    )}
                </TouchableOpacity>
                <TouchableOpacity style={styles.control} onPress={this.incrementFastForward}>
                    <MaterialIcons name='forward-30' size={48} color='#444' />
                </TouchableOpacity>
                <TouchableOpacity style={styles.control} onPress={this.bookmark}>
                    <Ionicons name='ios-bookmark' size={48} color='#444' />
                </TouchableOpacity>
            </View>
            <Slider 
                value={this.sliderValue()}
                minimumValue={0}
                maximumValue={1}
                style={styles.slider}
                thumbStyle={styles.thumb}
            />

            <View style={styles.time}>
            <Text>{msToTime(this.state.position)}</Text>
            <Text>{msToTime(this.state.duration)}</Text>
            </View>

            {this.renderFileInfo()}
            <View>
                <Text>Bookmarks:</Text>
            </View>
            <View style={{flex: 1}}>
                <FlatList 
                    data={this.props.episode_bookmarks}
                    keyExtractor={item => item.created_at } 
                    renderItem={this.renderBookmarks}
                />
            </View>
        </View>
        )
    }
    }

    mapStateToProps = (state) => {
        return {
            user_id: state.user_id,
            podcastData: state.podcastData,
            episodeData: state.episodeData,
            episode_bookmarks: state.episode_bookmarks,
            user_bookmarks: state.user_bookmarks,
            user_podcasts: state.user_podcasts

        }
    }
    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    slider: {
        width: 250,
        height: 40
    },
    time: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 300,
        height: 20
    },
    albumCover: {
        width: 250,
        height: 250
    },
    trackInfo: {
        padding: 40,
        backgroundColor: '#fff'
    },
    trackInfoText: {
        textAlign: 'center',
        flexWrap: 'wrap',
        color: '#550088'
    },
    largeText: {
        fontSize: 22
    },
    smallText: {
        fontSize: 16
    },
    control: {
        margin: 20
    },
    controls: {
        flexDirection: 'row'
    },
    thumb: {
        width: 10,
        height: 10
    }
    })



export default connect(mapStateToProps, { currentEpisodeBookmarks, setUserEpisodes, setUserBookmarks })(PodcastEpisodeScreen)
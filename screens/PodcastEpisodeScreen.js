import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { Audio } from 'expo-av'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import Slider from 'react-native-slider'
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
          : await playbackInstance.playAsync()
          // : await playbackInstance.playFromPositionAsync(60000)
        this.setState({
          isPlaying: !isPlaying
        })
      }

      handlePreviousTrack = async () => {
        let { playbackInstance, currentIndex } = this.state
          if (this.state.position > 30000) {
            await playbackInstance.playFromPositionAsync(this.state.position - 30000)
            // currentIndex < audioBookPlaylist.length - 1
            //   ? (currentIndex -= 1)
            //   : (currentIndex = 0)
            // this.setState({
            //   currentIndex
            // })
            // this.loadAudio()
          } else {
            await playbackInstance.playFromPositionAsync(0)
          }
      }

      handleNextTrack = async () => {
        let { playbackInstance, currentIndex } = this.state
          if (playbackInstance) {
            await playbackInstance.playFromPositionAsync(this.state.position + 30000)
          //   currentIndex < audioBookPlaylist.length - 1
          //     ? (currentIndex += 1)
          //     : (currentIndex = 0)
          //   this.setState({
          //     currentIndex
          //   })
          //   this.loadAudio()
          }
      } 

      bookmark = () => {
        // console.log(this.state.position)
        this.state.playbackInstance.playFromPositionAsync(60000)
      }
    
      sliderValue = () => {
        if (this.state.duration){
          return this.state.position / this.state.duration
        }
      } 
    

      renderFileInfo() {
        const { playbackInstance, currentIndex } = this.state
        return playbackInstance ? (
          <View style={styles.trackInfo}>
            <Text style={[styles.trackInfoText, styles.smallText]}>
              {this.props.episodeData.title}
            </Text>
            {/* <Text style={[styles.trackInfoText, styles.smallText]}>
              {audioBookPlaylist[currentIndex].author}
            </Text>
            <Text style={[styles.trackInfoText, styles.smallText]}>
              {audioBookPlaylist[currentIndex].source}
            </Text> */}
          </View>
        ) : null
      }
      render() {
        console.log(this.props.episodeData)
        return (
          <View style={styles.container}>
            <Image
              style={styles.albumCover}
              source={{
                uri: this.props.podcastData.image_medium
              }}
            />
            <View style={styles.controls}>
              <TouchableOpacity style={styles.control} onPress={this.handlePreviousTrack}>
                <MaterialIcons name='replay-30' size={48} color='#444' />
              </TouchableOpacity>
              <TouchableOpacity style={styles.control} onPress={this.handlePlayPause}>
                {this.state.isPlaying ? (
                  <Ionicons name='ios-pause' size={48} color='#444' />
                ) : (
                  <Ionicons name='ios-play-circle' size={48} color='#444' />
                )}
              </TouchableOpacity>
              <TouchableOpacity style={styles.control} onPress={this.handleNextTrack}>
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
    </View>
        )
      }
    }

    mapStateToProps = (state) => {
        return {
            podcastData: state.podcastData,
            episodeData: state.episodeData
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



export default connect(mapStateToProps)(PodcastEpisodeScreen)
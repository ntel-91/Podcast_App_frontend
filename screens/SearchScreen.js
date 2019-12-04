import React, { Component } from 'react'
import { StyleSheet, Image, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
import SearchBar from '../components/SearchBar.js'
import { FlatList } from 'react-native-gesture-handler';
import { setPodcastData } from '../action'
import { connect } from 'react-redux'
import SearchItem from '../components/SearchItem.js'


class SearchScreen extends Component {
    
    state = {
        term: "",
        podcast: '',
        podcastsArray: []
    }
 
    handleChange = (text) => {
        this.setState({
            term: text,
            podcast: '',
            podcastsArray: [],
            rss: ''
        })
    }

    renderItems = (podcast) => {
        return (
            <TouchableOpacity 
                onPress={() => {
                    this.props.setPodcastData(podcast.item)
                    this.props.navigation.navigate('PodcastShow')}}
            >
                <SearchItem podcast={podcast.item} />
            </TouchableOpacity>
        )
    }

    submit = (searchTerm) => {
        
        let URL = `https://itunes.apple.com/search?term=${searchTerm}&media=podcast&limit=20`
        fetch(URL)
        .then(res => res.json())
        .then(data => {
            results = data.results.map((podcast) => {
                return {
                    collectionName: podcast.collectionCensoredName,
                    artistName: podcast.artistName,
                    imageSmall: podcast.artworkUrl60,
                    img_url: podcast.artworkUrl600,
                    rss: podcast.feedUrl
                }
            })
            this.setState({
                podcastsArray: results
            })
        })
    }
  
    render() {
        return (
            <View > 
                <SearchBar 
                    // term={term}
                    // onTermSubmit={this.testFetchFunction}
                />

                <TextInput 
                    defaultValue={this.state.term}
                    onChangeText={this.handleChange}
                    placeholder="Search"
                />

                <TouchableOpacity onPress={() => this.submit(this.state.term)}>
                    <Text>Submit</Text>
                </TouchableOpacity>

                <View>
                    <FlatList
                        data={this.state.podcastsArray}
                        keyExtractor={item => item.rss }
                        renderItem={this.renderItems}
                    />
                </View>  
            </View>
        )
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
  

export default connect(null, { setPodcastData })(SearchScreen)

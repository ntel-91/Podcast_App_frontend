import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
import SearchBar from '../components/SearchBar.js'


class SearchScreen extends Component {
    
    xml2json = (srcDOM) => {
        let children = [...srcDOM.children];
        
        // base case for recursion. 
        if (!children.length) {
          if (srcDOM.innerHTML) {
              return srcDOM.innerHTML
          } else if (srcDOM.tagName === 'enclosure'){
              return srcDOM.getAttribute('url')
          }  
        }
      
        // initializing object to be returned.
        let jsonResult = {};
        
        for (let child of children) {
          
          // checking is child has siblings of same name. 
          let childIsArray = children.filter(eachChild => eachChild.nodeName === child.nodeName).length > 1;
          
          // if child is array, save the values as array, else as strings. 
          if (childIsArray) {
            if (jsonResult[child.nodeName] === undefined) {   
              jsonResult[child.nodeName] = [xml2json(child)];
            } else {
              jsonResult[child.nodeName].push(xml2json(child));
            }
          } else {
              jsonResult[child.nodeName] = xml2json(child);
              
          }
        }
        
        return jsonResult;
    }

    state = {
        term: ""
    }

    handleChange = (text) => {
        this.setState({
            term: text
        })
    }

    submit = () => {
        // // fetch itunes search api
        // let URL = `https://itunes.apple.com/search?term=podcast&genreId=1402&limit=20`
        // let CORS = 'https://cors-anywhere.herokuapp.com/'
        // fetch(URL)
        // .then(res => res.json())
        // .then(data => {
        //     console.log(data)
        // })
   
        // fetch rss feed
        let URL = `http://feeds.feedburner.com/TEDTalks_audio`
        let CORS = 'https://cors-anywhere.herokuapp.com/'
        fetch(URL)
        .then(res => res.text())
        .then(data => {
            // console.log(data)
            let parser = new DOMParser
            let xml = parser.parseFromString(data, 'application/xml');
            console.log(xml2json(xml))
        })
    

    }


    
    
    render() {
        return (
            <View  style={styles.container}>
                <TextInput 
                    defaultValue={this.state.term}
                    onChangeText={this.handleChange}
                    placeholder="Search"
                />
                <TouchableOpacity onPress={this.submit}>
                    <Text>Submit</Text>
                </TouchableOpacity>
                
                
                <SearchBar 
                    // term={term}
                    onTermSubmit={this.testFetchFunction}
                />
                <Text>DiscoverSearch Page</Text>
                <Text>Different Podcasts will render here</Text>
                <Button 
                    title="Navigate to Podcast Show Screen"
                    onPress={() => this.props.navigation.navigate('PodcastShow')}
                />
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
  

  export default SearchScreen
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
                    collection_name: podcast.collectionCensoredName,
                    artist_name: podcast.artistName,
                    image_small: podcast.artworkUrl60,
                    image_medium: podcast.artworkUrl100,
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
                    onTermSubmit={this.testFetchFunction}
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
                    renderItem=
                        {this.renderItems}
                    //     ({ item }) => {
                    //     return (
                    //         <View>
                    //             <TouchableOpacity 
                    //                 onPress={() => {
                    //                     this.props.setPodcastData(item)
                    //                     this.props.navigation.navigate('PodcastShow')}}
                    //             >
                    //                 <Text>{item.collection_name}</Text>
                    //                 <Image
                    //                     style={{width: 50, height: 50}}
                    //                     source={{uri: item.image_small}}
                    //                 />    
                    //             </TouchableOpacity>
                    //         </View>
                    //     )
                    // }
                // }
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

// [
//     {
//       artist_name: "NPR",
//       collection_name: "Fresh Air",
//       image_medium: "https://is3-ssl.mzstatic.com/image/thumb/Podcasts113/v4/d6/9e/e3/d69ee352-84ec-c6c9-ad89-57da3f452ff0/mza_709971845194736840.jpg/100x100bb.jpg",
//       image_small: "https://is3-ssl.mzstatic.com/image/thumb/Podcasts113/v4/d6/9e/e3/d69ee352-84ec-c6c9-ad89-57da3f452ff0/mza_709971845194736840.jpg/60x60bb.jpg",
//       rss: "https://www.npr.org/rss/podcast.php?id=381444908",
//     },
//     {
//       artist_name: "NPR",
//       collection_name: "Planet Money",
//       image_medium: "https://is4-ssl.mzstatic.com/image/thumb/Podcasts123/v4/68/f0/37/68f037d9-47f0-0120-6dcb-eb0dc07570f6/mza_5572831542089209819.jpg/100x100bb.jpg",
//       image_small: "https://is4-ssl.mzstatic.com/image/thumb/Podcasts123/v4/68/f0/37/68f037d9-47f0-0120-6dcb-eb0dc07570f6/mza_5572831542089209819.jpg/60x60bb.jpg",
//       rss: "https://www.npr.org/rss/podcast.php?id=510289",
//     },
//     {
//       artist_name: "NPR",
//       collection_name: "TED Radio Hour",
//       image_medium: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts113/v4/83/0f/7f/830f7fc6-eb1e-00d6-db2b-d3da4b82328e/mza_5561333771912948069.jpg/100x100bb.jpg",
//       image_small: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts113/v4/83/0f/7f/830f7fc6-eb1e-00d6-db2b-d3da4b82328e/mza_5561333771912948069.jpg/60x60bb.jpg",
//       rss: "https://www.npr.org/rss/podcast.php?id=510298",
//     },
//     {
//       artist_name: "NPR",
//       collection_name: "Wait Wait... Don't Tell Me!",
//       image_medium: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts123/v4/16/4d/6f/164d6f65-2896-71e7-8aa3-bfea7b0b4f7f/mza_17344131623870046238.jpg/100x100bb.jpg",
//       image_small: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts123/v4/16/4d/6f/164d6f65-2896-71e7-8aa3-bfea7b0b4f7f/mza_17344131623870046238.jpg/60x60bb.jpg",
//       rss: "https://www.npr.org/rss/podcast.php?id=344098539",
//     },
//     {
//       artist_name: "NPR",
//       collection_name: "Hidden Brain",
//       image_medium: "https://is3-ssl.mzstatic.com/image/thumb/Podcasts123/v4/17/1c/fc/171cfcec-6d18-2743-0d8c-e6ce17e144dc/mza_2626150054894051534.jpg/100x100bb.jpg",
//       image_small: "https://is3-ssl.mzstatic.com/image/thumb/Podcasts123/v4/17/1c/fc/171cfcec-6d18-2743-0d8c-e6ce17e144dc/mza_2626150054894051534.jpg/60x60bb.jpg",
//       rss: "https://www.npr.org/rss/podcast.php?id=510308",
//     },
//     {
//       artist_name: "NPR",
//       collection_name: "The NPR Politics Podcast",
//       image_medium: "https://is2-ssl.mzstatic.com/image/thumb/Podcasts123/v4/f4/1e/81/f41e8104-85c2-1cbc-726c-4c0165c9d05f/mza_5701922616140762566.jpg/100x100bb.jpg",
//       image_small: "https://is2-ssl.mzstatic.com/image/thumb/Podcasts123/v4/f4/1e/81/f41e8104-85c2-1cbc-726c-4c0165c9d05f/mza_5701922616140762566.jpg/60x60bb.jpg",
//       rss: "https://www.npr.org/rss/podcast.php?id=510310",
//     },
//     {
//       artist_name: "NPR",
//       collection_name: "How I Built This with Guy Raz",
//       image_medium: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts113/v4/40/b9/e3/40b9e34e-224a-9448-8858-1b60c34de1da/mza_1480841263198296123.jpg/100x100bb.jpg",
//       image_small: "https://is5-ssl.mzstatic.com/image/thumb/Podcasts113/v4/40/b9/e3/40b9e34e-224a-9448-8858-1b60c34de1da/mza_1480841263198296123.jpg/60x60bb.jpg",
//       rss: "https://www.npr.org/rss/podcast.php?id=510313",
//     },
//     {
//       artist_name: "NPR",
//       collection_name: "Up First",
//       image_medium: "https://is2-ssl.mzstatic.com/image/thumb/Podcasts123/v4/37/cb/d8/37cbd883-1c5b-acab-e19b-5d1f26c363eb/mza_13122205564624174740.jpg/100x100bb.jpg",
//       image_small: "https://is2-ssl.mzstatic.com/image/thumb/Podcasts123/v4/37/cb/d8/37cbd883-1c5b-acab-e19b-5d1f26c363eb/mza_13122205564624174740.jpg/60x60bb.jpg",
//       rss: "https://www.npr.org/rss/podcast.php?id=510318",
//     },
//     {
//       artist_name: "NPR",
//       collection_name: "Invisibilia",
//       image_medium: "https://is4-ssl.mzstatic.com/image/thumb/Podcasts113/v4/02/83/94/0283945f-a004-124d-6e19-dcbe1a202992/mza_7974899130799439623.jpg/100x100bb.jpg",
//       image_small: "https://is4-ssl.mzstatic.com/image/thumb/Podcasts113/v4/02/83/94/0283945f-a004-124d-6e19-dcbe1a202992/mza_7974899130799439623.jpg/60x60bb.jpg",
//       rss: "https://www.npr.org/rss/podcast.php?id=510307",
//     },
//     {
//       artist_name: "NPR",
//       collection_name: "All Songs Considered",
//       image_medium: "https://is3-ssl.mzstatic.com/image/thumb/Podcasts113/v4/68/b7/c3/68b7c303-daff-802e-dbff-893317d9dc01/mza_4458877920242531082.jpg/100x100bb.jpg",
//       image_small: "https://is3-ssl.mzstatic.com/image/thumb/Podcasts113/v4/68/b7/c3/68b7c303-daff-802e-dbff-893317d9dc01/mza_4458877920242531082.jpg/60x60bb.jpg",
//       rss: "https://www.npr.org/rss/podcast.php?id=510019",
//     },
//     {
//       artist_name: "NPR",
//       collection_name: "Car Talk",
//       image_medium: "https://is2-ssl.mzstatic.com/image/thumb/Podcasts123/v4/7b/d3/68/7bd3685e-a074-2cee-4d0f-2dc7b309fd2c/mza_583053047175579130.jpg/100x100bb.jpg",
//       image_small: "https://is2-ssl.mzstatic.com/image/thumb/Podcasts123/v4/7b/d3/68/7bd3685e-a074-2cee-4d0f-2dc7b309fd2c/mza_583053047175579130.jpg/60x60bb.jpg",
//       rss: "https://www.npr.org/rss/podcast.php?id=510208",
//     },
//     {
//       artist_name: "NPR",
//       collection_name: "Pop Culture Happy Hour",
//       image_medium: "https://is3-ssl.mzstatic.com/image/thumb/Podcasts123/v4/19/9a/bb/199abb14-fe61-46a6-a825-4df5b6052d26/mza_3118002910777664714.jpg/100x100bb.jpg",
//       image_small: "https://is3-ssl.mzstatic.com/image/thumb/Podcasts123/v4/19/9a/bb/199abb14-fe61-46a6-a825-4df5b6052d26/mza_3118002910777664714.jpg/60x60bb.jpg",
//       rss: "https://www.npr.org/rss/podcast.php?id=510282",
//     },
//     {
//       artist_name: "NPR",
//       collection_name: "NPR News Now",
//       image_medium: "https://is4-ssl.mzstatic.com/image/thumb/Podcasts123/v4/d9/a4/8a/d9a48a40-46cd-959f-a4d5-fb7c1b576668/mza_7137354159625328798.jpg/100x100bb.jpg",
//       image_small: "https://is4-ssl.mzstatic.com/image/thumb/Podcasts123/v4/d9/a4/8a/d9a48a40-46cd-959f-a4d5-fb7c1b576668/mza_7137354159625328798.jpg/60x60bb.jpg",
//       rss: "https://www.npr.org/rss/podcast.php?id=500005",
//     },
//     {
//       artist_name: "NPR",
//       collection_name: "Code Switch",
//       image_medium: "https://is2-ssl.mzstatic.com/image/thumb/Podcasts113/v4/b8/28/8d/b8288d42-1473-9e80-ca86-dd853d28a56f/mza_5645217348202306478.jpg/100x100bb.jpg",
//       image_small: "https://is2-ssl.mzstatic.com/image/thumb/Podcasts113/v4/b8/28/8d/b8288d42-1473-9e80-ca86-dd853d28a56f/mza_5645217348202306478.jpg/60x60bb.jpg",
//       rss: "https://www.npr.org/rss/podcast.php?id=510312",
//     },
//     {
//       artist_name: "NPR",
//       collection_name: "Embedded",
//       image_medium: "https://is2-ssl.mzstatic.com/image/thumb/Podcasts123/v4/f6/87/ac/f687ac18-57cc-f659-33cd-5ad9f051cf9a/mza_410190615227332928.jpg/100x100bb.jpg",
//       image_small: "https://is2-ssl.mzstatic.com/image/thumb/Podcasts123/v4/f6/87/ac/f687ac18-57cc-f659-33cd-5ad9f051cf9a/mza_410190615227332928.jpg/60x60bb.jpg",
//       rss: "https://www.npr.org/rss/podcast.php?id=510311",
//     },
//     {
//       artist_name: "NPR",
//       collection_name: "Ask Me Another",
//       image_medium: "https://is3-ssl.mzstatic.com/image/thumb/Podcasts123/v4/3f/c3/5a/3fc35a3e-3efd-7952-c44a-6eef85bcabe8/mza_4254422752169261058.jpg/100x100bb.jpg",
//       image_small: "https://is3-ssl.mzstatic.com/image/thumb/Podcasts123/v4/3f/c3/5a/3fc35a3e-3efd-7952-c44a-6eef85bcabe8/mza_4254422752169261058.jpg/60x60bb.jpg",
//       rss: "https://www.npr.org/rss/podcast.php?id=510299",
//     },
//     {
//       artist_name: "NPR",
//       collection_name: "How To Do Everything",
//       image_medium: "https://is4-ssl.mzstatic.com/image/thumb/Features6/v4/36/c8/39/36c83909-ce7d-eb37-47f7-38ace06920aa/mza_3668376240611285016.png/100x100bb.jpg",
//       image_small: "https://is4-ssl.mzstatic.com/image/thumb/Features6/v4/36/c8/39/36c83909-ce7d-eb37-47f7-38ace06920aa/mza_3668376240611285016.png/60x60bb.jpg",
//       rss: "https://www.npr.org/rss/podcast.php?id=510303",
//     },
//     {
//       artist_name: "NPR",
//       collection_name: "StoryCorps",
//       image_medium: "https://is3-ssl.mzstatic.com/image/thumb/Podcasts123/v4/40/2f/6f/402f6f87-46a8-e34d-fd9c-4f8dba02e776/mza_7922207465039053872.jpg/100x100bb.jpg",
//       image_small: "https://is3-ssl.mzstatic.com/image/thumb/Podcasts123/v4/40/2f/6f/402f6f87-46a8-e34d-fd9c-4f8dba02e776/mza_7922207465039053872.jpg/60x60bb.jpg",
//       rss: "https://www.npr.org/rss/podcast.php?id=510200",
//     },
//     {
//       artist_name: "NPR",
//       collection_name: "Short Wave",
//       image_medium: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts113/v4/5b/d7/ba/5bd7baab-94d4-7f74-eacc-e2404579b81c/mza_18326069786796145483.png/100x100bb.jpg",
//       image_small: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts113/v4/5b/d7/ba/5bd7baab-94d4-7f74-eacc-e2404579b81c/mza_18326069786796145483.png/60x60bb.jpg",
//       rss: "https://www.npr.org/rss/podcast.php?id=510351",
//     },
//     {
//       artist_name: "NPR",
//       collection_name: "Live In Concert from NPR's All Songs Considered",
//       image_medium: "https://is2-ssl.mzstatic.com/image/thumb/Podcasts123/v4/37/75/64/377564fd-da51-4914-a678-208195f0845b/mza_7047559041386555907.jpg/100x100bb.jpg",
//       image_small: "https://is2-ssl.mzstatic.com/image/thumb/Podcasts123/v4/37/75/64/377564fd-da51-4914-a678-208195f0845b/mza_7047559041386555907.jpg/60x60bb.jpg",
//       rss: "https://www.npr.org/rss/podcast.php?id=510253",
//     },
//   ]
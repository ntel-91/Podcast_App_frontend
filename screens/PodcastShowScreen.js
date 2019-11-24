import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, Image } from 'react-native';

import { connect } from 'react-redux'



class PodcastShowScreen extends Component {

    render() {
        
        return (
        <View  style={styles.container}>
            <Text>PodcastShow Screen</Text>
            <Image
                style={{width: 50, height: 50}}
                source={{uri: this.props.image_small}}
            />    
            {/* <Text>{this.props.rss.collection_name}</Text> */}
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
  

  export default connect(mapStateToProps)(PodcastShowScreen)
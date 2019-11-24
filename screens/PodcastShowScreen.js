import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import { setRssFeed } from '../action'
import { connect } from 'react-redux'


class PodcastShowScreen extends Component {
    render() {
        console.log(this.props)
        return (
        <View  style={styles.container}>
            <Text>PodcastShow Screen</Text>
            
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
        data: state.rss
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
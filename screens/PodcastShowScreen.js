import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';


class PodcastShowScreen extends Component {
    render() {
        return (
        <View  style={styles.container}>
            <Text>PodcastShow Screen</Text>
            <Button 
                title="Go to episdoe"
                onPress={() => this.props.navigation.navigate('PodcastEpisode')}
                
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
  

  export default PodcastShowScreen
import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';


class DiscoverSearchScreen extends Component {
    render() {
        return (
        <View  style={styles.container}>
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
  

  export default DiscoverSearchScreen
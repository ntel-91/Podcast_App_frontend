import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';


class DiscoverScreen extends Component {
    render() {
        return (
        <View  style={styles.container}>
            <Text>Discover Screen</Text>
            <Button 
                title="Search Podcasts by Comedy Genre"
                onPress={() => this.props.navigation.navigate('DiscoverSearch')}

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
  

  export default DiscoverScreen
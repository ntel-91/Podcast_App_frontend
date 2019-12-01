import React, { Component } from 'react'
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import TestComponent from '../components/TestComponent.js'


const list = [ <TestComponent />,  <TestComponent />,  <TestComponent />,  <TestComponent />,  <TestComponent />]

class TestScreen extends Component {
  
    render() {
      return (
        // <ScrollView>
        <View  style={styles.container}>
            <View style={{backgroundColor: 'darkgrey'}}>
                <Image 
                    source={{uri: 'https://is4-ssl.mzstatic.com/image/thumb/Podcasts113/v4/36/8f/43/368f43a6-c97d-f69e-dcae-6c9a3f08b196/mza_3740946593757410045.png/100x100bb.jpg'}}
                    style={styles.image}
                />
            </View>
            <View style={styles.box}></View>
            <View style={styles.box2}>
                <FlatList 
                    data={list}
                    renderItem={({ item }) => {
                        return <TestComponent />
                    }}
                />
            </View>
            
            
        </View>
        // {/* </ScrollView> */}
      )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
        // backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    box: { 
        flex: 1,
        backgroundColor: 'grey'
    },
    box2: {
        flex: 4
    },
    image: {
        width: 150,
        height: 150,
        marginLeft: 15,
        marginTop: 15,
        marginBottom: 5
    }
});
  

  export default TestScreen
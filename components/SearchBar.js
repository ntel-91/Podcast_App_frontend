import React from 'react'
import { StyleSheet, View, TextInput, FlatList } from 'react-native'
import { Feather } from '@expo/vector-icons';

const SearchBar = ({ onTermSubmit }) => {
    
    

    return (
        <View style={styles.background}>
            <Feather name="search" size={30} style={styles.iconStyle}/>
            <TextInput 
                autoCapitalize='none'
                autoCorrect={false}
                style={styles.inputStyle}
                placeholder="Search"
                onEndEditing={onTermSubmit}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        marginTop: 15,
        backgroundColor: '#f0EEEE',
        height: 50,
        borderRadius: 10,
        marginHorizontal: 15,
        flexDirection: 'row'
    },
    inputStyle: {
        flex: 1,
        fontSize: 18
    },
    iconStyle: {
        fontSize: 35,
        alignSelf: 'center',
        marginHorizontal: 15
    }
})


export default SearchBar
import React, { Component } from 'react'
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native'
import Bookmark from './Bookmark.js'
import { msToTime } from '../helper.js'

class BookmarkList extends Component {

    
    renderBookmarks = (bookmark) => {   
        return (
            <TouchableOpacity
                onPress={() => {
                    this.props.renderBookmarkPosition(bookmark)
                }}
            >
                <Bookmark
                    time={msToTime(bookmark.item.bookmark_time)}
                    bookmarkDate={bookmark.item.created_at}
                />
            </TouchableOpacity>
        )
    }

    render() {
        
        return (
            <View style={styles.bookmarks}>
                <View style={{borderBottomWidth: 0.5, borderColor: 'lightgrey'}}>
                    <Text style={styles.bookmarkHeader}>{`Bookmarks: (${this.props.bookmarksList.length})`}</Text>
                </View>
                <View style={{flex: 1}}>
                    <FlatList 
                        data={this.props.bookmarksList}
                        keyExtractor={item => item.created_at } 
                        renderItem={this.renderBookmarks}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    bookmarks: {
        flex: 1,
        justifyContent: 'flex-start',
        alignSelf: 'stretch'
        
    },
    bookmarkHeader: {
        fontSize: 16,
        marginLeft: 10,
        marginBottom: 10
    }
})


export default BookmarkList
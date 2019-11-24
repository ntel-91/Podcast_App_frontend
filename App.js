import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import AppNavigator from './navigation/AppNavigator.js'
import reducer from './reducer/index.js'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <AppNavigator />
      </Provider>
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

export default App

import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import t from 'tcomb-form-native'
import { setUser, setUserPodcasts } from '../action'
import { connect } from 'react-redux'


const Form = t.form.Form;

const User = t.struct({
  username: t.String,
  password: t.String
});

const options = {
  fields:{
    username: {
      autoCapitalize: 'none'
    }
  }
}

class LoginScreen extends Component {

  handleSubmit = () => {
    const value = this._form.getValue()
    fetch('http://localhost:3000/users')
    .then(res => res.json())
    .then(data => {
      user = data.find(function(user){
        return user.username === value.username
      })
      this.props.setUser(user.id)
      this.props.setUserPodcasts(user.podcasts)
      this.props.navigation.navigate('MainTab')
    }) 
  }
  

  render() {
    return (
      <View  style={styles.container}>
          <Form 
            type={User}
            ref={c => this._form = c}
            options={options} 
          />
          <Button
            title="Submit"
            onPress={this.handleSubmit}
          />  
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 50,
        padding: 20,
        backgroundColor: '#ffffff',
    },
});


  export default connect(null, { setUser, setUserPodcasts })(LoginScreen)
import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import db from "../config"
import AppHeader from '../components/AppHeader';

export default class HomeScreen extends React.Component {
  render(){
    return(
      <View>
      <AppHeader/>
      {/* <TouchableOpacity 
      style = {styles.button1}
      onPress={()=>{
        this.props.navigation.navigate('EnterDataDetails')
      }}
      >
      <Text style = {styles.buttonText}>
          New Patient
      </Text>
      </TouchableOpacity> */}

      <TouchableOpacity 
      style = {styles.button2}
      onPress={()=>{
        this.props.navigation.navigate('ViewData')
      }}
      >
      <Text style = {styles.buttonText}>
          View Patient Data
      </Text>
      </TouchableOpacity>
      </View>
    )
  }
}


  const styles = StyleSheet.create({
  button1: {
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 5,
    borderColor: "#2B4865",
    borderRadius: 15,
    marginTop: 120,
    width: 200,
    height: 100,
    color: "#002B5B",
  },

   button2: {
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 5,
    borderColor: "#2B4865",
    borderRadius: 15,
    marginTop: 120,
    width: 200,
    height: 100,
    color: "#002B5B"
  },

  buttonText: {
    textAlign: 'center',
    color: '#002B5B',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

import React from 'react';
import { Text, View } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
//import StudentId from '../screens/StudentId';
import HomeScreen from '../screens/HomeScreen';
import EnterDataDetails from '../screens/EnterDataDetails';

//import BottomTabNavigator from './BottomTabNavigator';
import EnterDataMeds from "../screens/EnterDataMeds";
import ViewData from "../screens/ViewData";
import ViewDetails from "../screens/ViewDetails";

//import SignUp from "../screens/SignUp";
//import SignIn from "../screens/SignIn";
//import { MaterialIcons } from '@expo/vector-icons';
//import firebase from 'firebase';
import  { Component } from 'react';
const Stack = createStackNavigator();

export default class StackNavigator extends Component{
  constructor(props) {
    super(props);
   
      
    };
  
  render() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor:'white' ,
          shadowOpacity: 0,
          elevation: 0,
          height:50,
        },
        headerTintColor: 'black',
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen}  options={{headerShown:false}}/>
      {/* <Stack.Screen name="SignUp" component={SignUp} options={{title:" ", headerShown: true, headerBackTitleStyle:{fontSize:20} } }/>
      <Stack.Screen name="SignIn" component={SignIn} options={{title:" ", headerShown: true, headerBackTitleStyle:{fontSize:20} } }/> */}
      <Stack.Screen name="EnterDataDetails" component={EnterDataDetails} options={{title:" ", headerShown: true, headerBackTitleStyle:{fontSize:20} } } />
      {/* <Stack.Screen name="tab" component={BottomTabNavigator} /> */}
      <Stack.Screen name="EnterDataMeds" component={EnterDataMeds} options={{title:" ", headerShown: true, headerBackTitleStyle:{fontSize:20},
    //   headerRight: () => (
    //           <View style={{marginRight: 10}}>
    //             <MaterialIcons name="logout" size={24} color="white" onPress={()=>firebase.auth().signOut().then(() => {
    //   alert('Logged Out!!');
    //   this.props.navigation.navigate("Home")
    //  }).catch((error) => {
    //   alert(error.message);
    //   //alert("Oops something went wrong! Try again later.")
    //  })} /></View>
    //  ), 
     }}/>
      <Stack.Screen name="ViewData" component={ViewData} options={{title:" ", headerShown: true, headerBackTitleStyle:{fontSize:20} } }/>
      <Stack.Screen name="ViewDetails" component={ViewDetails} options={{title:" ", headerShown: true, headerBackTitleStyle:{fontSize:20} } }/>
       
    
    </Stack.Navigator>
  );
  

    }
  }



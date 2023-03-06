import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { Header, Icon } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import {
  Entypo,
  Fontisto,
  FontAwesome5,
  Octicons,
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
  Feather,
} from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenHeight ,ScreenWidth} from 'react-native-elements/dist/helpers';
export default class ViewDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mrn: this.props.route.params.patientDetails['mrn'],
      name: this.props.route.params.patientDetails['name'],
      age: this.props.route.params.patientDetails['age'],
      height:
        this.props.route.params.patientDetails['height'],
        weight: this.props.route.params.patientDetails['weight'],
        bpm: this.props.route.params.patientDetails['bpm'],
        bloodgroup: this.props.route.params.patientDetails['bloodgroup'],
    };
  }

  

  render() {
    return (
      <SafeAreaProvider style={{ flex: 1, backgroundColor: 'white' }}>
      
      <Text style={{alignSelf:'center',fontSize:'bold',fontSize:25,}}>Patients</Text>
          <ScrollView style={{ flex: 1 }}>
          <View style={{height:ScreenHeight,width:ScreenWidth,alignContent:'center',alignItems:'center'}}>
            {/* <Text style={{alignSelf:'center',fontSize:'bold',fontSize:25,}}>Patients</Text> */}
            <View style={{height:ScreenHeight/1.8,width:ScreenWidth-20, padding:10,backgroundColor:'skyblue',borderRadius:30}}>
<Text style={{alignSelf:'center',fontSize:20}}>{this.state.name} </Text>
<Text style={{alignSelf:'flex-start',fontSize:20}}>{this.state.height} kg(weight)</Text>
<Text style={{alignSelf:'flex-end',fontSize:20}}>{this.state.weight} cms(height)</Text>
            </View>

            <View style={{flexDirection:'row',height:ScreenHeight/3.5, width:ScreenWidth, margin:10,padding:10}}>
              <View style={{backgroundColor:'blue',width:ScreenWidth/2,borderRadius:30}}>
                <Text></Text>
              </View>
            </View>
          </View>

          </ScrollView>
       
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    width: '100%',
    resizeMode: 'contain',
  },
  headerImg: {
    width: '90%',
    height: 60,
    backgroundColor: '#FFA500',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  updateButton: {
    width: '60%',
    height: 50,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#62A001',
    borderRadius: 20,
  },
});

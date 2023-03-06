import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  CheckBox,
  Modal,
  Button,
  FlatList,
} from 'react-native';
import db from '../config';
import AppHeader from '../components/AppHeader';
import AppHeaderMedications from '../components/AppHeaderMedications';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RFValue from 'react-native-responsive-fontsize';
import AwesomeAlert from 'react-native-awesome-alerts';
import DropDownPicker from 'react-native-dropdown-picker';
import EnterDataDetails from './EnterDataDetails';
import { ListItem, Icon } from 'react-native-elements';

//import firebase, { doc, setDoc } from 'firebase';

import moment from 'moment';

const allMeds = [];
const noMeds = [1, 2, 3, 4];

export default class EnterDataMeds extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 1,
      drug: '',
      dosage: '',
      frequency: '',
      route: '',
      timings: '',
      modalOpen: false,
      dropdownHeight: 40,
      routeMed: 'PO',
      duration: '',
      name: '',
      allIndivMeds: [],
    };
    var medicine = this.state.drug;
  }

  getMeds = () => {
    const allMeds = [
      this.state.drug,
      this.state.frequency,
      this.state.dosage,
      this.state.route,
      this.state.timings,
      this.state.duration,
    ];
  };
  // renderItem = ({ item }) => {
  //   return (
  //     <View style={styles.itemStyle}>
  //       <Text style={styles.title}>{allMeds}</Text>
  //     </View>
  //   );
  // };
  goBack = () => {
    this.props.navigation.navigate('HomeScreen');
  };

  componentDidMount = () => {
    this.getMeds();
  };
  renderItem = ({ item, i }) => {
    return (
      <View style={{ borderWidth: 1 }}>
        <View style={{ zIndex: 0 }}>
          <TouchableOpacity onPress={() => {
            this.props.navigation.navigate('ViewDetails', {
              recipeDetails: item,
            });}}>
            <ListItem key={i} bottomDivider>
              <Icon type={'antdesign'} name={'book'} size={40} />
              <ListItem.Content>
                <ListItem.Title style={styles.title}>
                  {item.name}
                </ListItem.Title>
                <View style={styles.lowerLeftContaiiner}>
                  <View style={styles.transactionContainer}>
                    <Icon
                      type={'ionicon'}
                      name={
                        item.transaction_type === 'issue'
                          ? 'checkmark-circle-outline'
                          : 'arrow-redo-circle-outline'
                      }
                      color={
                        item.transaction_type === 'issue'
                          ? '#78D304'
                          : '#0364F4'
                      }
                    />
                  </View>
                </View>
              </ListItem.Content>
            </ListItem>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  getPatients = () => {
    db.collection('patients')
      .doc(this.props.navigation.getParam('details'))
      .get("meds")
      .then((doc) => {
        if(this.state.allIndivMeds[0]===null){
          this.state.allIndivMeds.shift()
        }
        this.setState({
         allIndivMeds: [doc.data().meds]
        });
         console.log(this.state.allIndivMeds);
         //console.log(doc.data().meds);
      });
  };
  handleUpdate = async () => {
    console.log(this.state.drug);
    var { date, name } = this.state;
    var addMed = db
      .collection('patients')
      .doc(this.props.navigation.getParam('details'));

    var setWithMerge = addMed.set(
      {
        meds: {
          [this.state.drug]: {
            drug: this.state.drug,
            frequency: this.state.frequency,
            dosage: this.state.dosage,
            route: this.state.route,
            timings: this.state.timings,
            duration: this.state.duration,
          },
        },
      },
      { merge: true }
    );
    this.getPatients();
  };

  modalHandle = () => {
    this.setState({
      modalOpen: true,
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false,
    });
  };

  addMedication = () => {
    db.collection('patients/allMeds');
  };

  render() {
    const { showAlert } = this.state;
    return (
      <View>
        <AppHeaderMedications />
        <View style={styles.lowerContainer}>
          <FlatList
            data={this.state.allIndivMeds}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View
          style={{ alignSelf: 'flex-end', bottom: -600, position: 'absolute' }}>
          <TouchableOpacity onPress={() => this.modalHandle()}>
            <Ionicons name={'add-circle'} size={100} color={'#41C264'} />
          </TouchableOpacity>
          <View
            style={{
              alignSelf: 'flex-end',
              bottom: +100,
              position: 'absolute',
            }}>
            <TouchableOpacity onPress={() => this.goBack()}>
              <Ionicons
                name={'arrow-back-circle'}
                size={100}
                color={'#256D85'}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Modal
          visible={this.state.modalOpen}
          animationType="slide"
          style={styles.modal}>
          <TouchableOpacity onPress={() => this.setState({ modalOpen: false })}>
            <Ionicons name={'close-circle-outline'} size={50} />
          </TouchableOpacity>
          <View>
            <TextInput
              style={styles.inputBoxShort}
              placeholder="Enter Drug"
              placeholderTextColor="black"
              onChangeText={(text) => {
                this.setState({ drug: text });
              }}></TextInput>
            <TextInput
              style={styles.inputBoxShort}
              placeholder="Enter Dosage"
              placeholderTextColor="black"
              onChangeText={(text) => {
                this.setState({ dosage: text });
              }}></TextInput>
            <DropDownPicker
              items={[
                { label: 'PO', value: 'PO' },
                { label: 'SC', value: 'SC' },
                { label: 'IV', value: 'IV' },
                { label: 'IM', value: 'IM' },
                { label: 'TOP', value: 'TOP' },
              ]}
              defaultValue={this.state.routeMed}
              containerStyle={{
                height: 40,
                borderRadius: 20,
                marginBottom: 20,
                marginHorizontal: 10,
              }}
              onOpen={() => {
                this.setState({ dropdownHeight: 170 });
              }}
              onClose={() => {
                this.setState({ dropdownHeight: 40 });
              }}
              style={{ backgroundColor: 'transparent' }}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              dropDownStyle={{
                backgroundColor: 'white',
              }}
              labelStyle={
                this.state.light_theme
                  ? styles.dropdownLabelLight
                  : styles.dropdownLabel
              }
              arrowStyle={
                this.state.light_theme
                  ? styles.dropdownLabelLight
                  : styles.dropdownLabel
              }
              onChangeItem={(item) =>
                this.setState({
                  routeMed: item.value,
                })
              }
            />

            <TextInput
              style={styles.inputBoxShort}
              placeholder="Enter Timings"
              placeholderTextColor="black"
              onChangeText={(text) => {
                this.setState({ timings: text });
              }}></TextInput>

            <TextInput
              style={styles.inputBoxShort}
              placeholder="Enter Frequency"
              placeholderTextColor="black"
              onChangeText={(text) => {
                this.setState({ frequency: text });
              }}></TextInput>

            <TextInput
              style={styles.inputBoxShort}
              placeholder="Enter Duration"
              placeholderTextColor="black"
              onChangeText={(text) => {
                this.setState({ duration: text });
              }}></TextInput>
          </View>
          <View>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => {
                this.handleUpdate();
                this.setState({
                  modalOpen: false,
                  drug: '',
                  duration: '',
                  frequency: '',
                  dosage: '',
                  route: '',
                  timings: '',
                })
              }}>
              <Text style={styles.text2}>Next</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  saveButton: {
    left: 0,
    right: 0,
    bottom: 0,
    height: 67,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#002B5B',
    marginTop: 10,
  },
  text: {
    color: '#256D85',
    padding: 20,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    borderWidth: 0,
    borderRadius: 0,
  },
  inputBoxShort: {
    width: '50%',
    alignSelf: 'center',
    height: 30,
    textAlign: 'center',
    borderWidth: 4,
    marginLeft: 0,
    borderColor: '#8FE3CF',
    marginTop: '10',
  },
  text2: {
    color: 'white',
    padding: 20,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    borderWidth: 0,
    borderRadius: 0,
  },
  fillContainer2: {
    flexDirection: 'row',
    padding: 0,
    alignItems: 'center',
    margin: 20,
    borderWidth: 4,
    borderColor: '#256D85',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
});

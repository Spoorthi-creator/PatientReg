import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import db from '../config';
import EnterDataDetails from './EnterDataDetails';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ViewDetails from './ViewDetails';
export default class ViewData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allPatients: [],
      lastVisiblePatient: null,
      searchText: '',
    };
  }
  componentDidMount = async () => {
    this.getPatients();
  };
  goBack = () => {
    this.props.navigation.navigate('HomeScreen');
  };
  getPatients = () => {
    db.collection('patients')
      .limit(10)
      .get()
      .then((snapshot) => {
        snapshot.docs.map((doc) => {
          this.setState({
            allPatients: [...this.state.allPatients, doc.data()],
            lastVisiblePatient: doc,
          });
        });
      });
  };

  handleSearch = async (text) => {
    var enteredText = text.toUpperCase().split('');
    // text = text.toUpperCase();
    this.setState({
      allPatients: [],
    });
    if (!text) {
      this.getPatients();
    }
    console.log(text);
    db.collection('patients')
      .where('name', '==', text)
      .get()
      .then((snapshot) => {
        snapshot.docs.map((doc) => {
          this.setState({
            allPatients: [...this.state.allPatients, doc.data()],
            lastVisiblePatient: doc,
          });
        });
      });
  };

  fetchMorePatients = async (text) => {
    var enteredText = text.toUpperCase().split('');
    text = text.toUpperCase();
    const { lastVisiblePatient, allPatients } = this.state;

    const query = await db
      .collection('patients')
      .where('name', '==', text)
      .startAfter(lastVisiblePatients)
      .limit(10)
      .get();
    query.docs.map((doc) => {
      this.setState({
        allPatients: [...this.state.allPatients, doc.data()],
        lastVisiblePatients: doc,
      });
    });
  };

  renderItem = ({ item,i }) => {
    return (
    //<ViewDetails details={viewDetails} navigation={this.props.navigation} />
      <View style={{ borderWidth: 1 }}>
        <View style={{ zIndex: 0 }}>
          <TouchableOpacity onPress={() => {
            this.props.navigation.navigate('ViewDetails', {
              patientDetails: item,
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
    )
  };

  render() {
    const { searchText, allPatients } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.upperContainer}>
          <View style={styles.textinputContainer}>
            <TextInput
              style={styles.textinput}
              onChangeText={(text) => this.setState({ searchText: text })}
              placeholder={'Type here'}
              placeholderTextColor={'#FFFFFF'}
              onSubmitEditing={() => this.handleSearch(searchText)}
            />
            <TouchableOpacity
              style={styles.scanbutton}
              onPress={() => this.handleSearch(searchText)}>
              <Text style={styles.scanbuttonText}>Search</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.lowerContainer}>
          <FlatList
            data={allPatients}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={() => this.fetchMorePatients(searchText)}
            onEndReachedThreshold={0.7}
          />
        </View>
        <View
          style={{
            zIndex: 1,
            alignSelf: 'flex-end',
            bottom: 0,
            position: 'absolute',
          }}>
          <TouchableOpacity onPress={() => this.goBack()}>
            <Ionicons name={'arrow-back-circle'} size={100} color={'#256D85'} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B4865',
    zIndex: 0,
  },
  upperContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textinputContainer: {
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: '#256D85',
    borderColor: '#8FE3CF',
  },
  textinput: {
    width: '57%',
    height: 50,
    padding: 10,
    borderColor: '#8FE3CF',
    borderRadius: 10,
    borderWidth: 3,
    fontSize: 18,
    backgroundColor: '#2B4865',
    fontFamily: 'Rajdhani_600SemiBold',
    color: '#8FE3CF',
  },
  scanbutton: {
    width: 100,
    height: 50,
    backgroundColor: '#256D85',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanbuttonText: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'Rajdhani_600SemiBold',
  },
  lowerContainer: {
    flex: 0.8,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Rajdhani_600SemiBold',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Rajdhani_600SemiBold',
  },
  lowerLeftContaiiner: {
    alignSelf: 'flex-end',
    marginTop: -40,
  },
  transactionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  transactionText: {
    fontSize: 20,

    fontFamily: 'Rajdhani_600SemiBold',
  },
  date: {
    fontSize: 12,
    fontFamily: 'Rajdhani_600SemiBold',
    paddingTop: 5,
  },
});

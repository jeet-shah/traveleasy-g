import React, { Component } from 'react';
import { Text, View,TouchableOpacity } from 'react-native';
import { styles } from '../component/Styles';
import Dates from 'react-native-dates';
import moment from 'moment';
import firebase from 'firebase';
import db from '../config';


 
export default class Date extends Component {
  constructor(props){
    super(props)
    this.state = {data:null,focus:'startDate',startDate:null,enddDate:null,isModalVisible:'false',userid:firebase.auth().currentUser.email}
  }
  isDateBlocked = (date) =>
      date.isBefore(moment(), 'day');
 
    onDatesChange = ({ startDate, endDate, focusedInput }) =>
      this.setState({ ...this.state, focus: focusedInput }, () =>
        this.setState({ ...this.state, startDate, endDate })
      );
 
    onDateChange = ({ date }) =>
      this.setState({ ...this.state, date });
  render(){
    return (
      <View style={styles.container}>
        <View style={{width:300}}>
          <Dates
            onDatesChange={this.onDatesChange}
            isDateBlocked={this.isDateBlocked}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            focusedInput={this.state.focus}
            range
  
          />
        </View>
        {this.state.date && <Text style={styles.date}>{this.state.date && this.state.date.format('LL')}</Text>}
      <Text style={[styles.date, this.state.focus === 'startDate' && styles.focused]}>{this.state.startDate && this.state.startDate.format('LL')}</Text>
      <Text style={[styles.date, this.state.focus === 'endDate' && styles.focused]}>{this.state.endDate && this.state.endDate.format('LL')}</Text>
         <TouchableOpacity onPress={()=>{
           this.props.navigation.navigate('Catalogue')
           db.collection("DatesCities").add({
            "Start_Date":this.state.startDate && this.state.startDate.format('LL'),
            "End_Date":this.state.endDate && this.state.endDate.format('LL'),
            "User_Id":this.state.userid
          })
           }} style={[styles.button,{marginTop:20}]}>
           <Text style={styles.buttonText}> Next </Text>
         </TouchableOpacity>
      </View>
    )
  }
}
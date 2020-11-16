import React from 'react';
import {styles} from '../component/Styles';
import { Text, View, TouchableOpacity } from 'react-native';
import db from '../config';
import firebase from 'firebase';
import { Table, Row, Rows } from 'react-native-table-component';

export default class Cart extends React.Component{

    constructor(){
        super()
        this.state={
            requestedItems:[],
            userID:firebase.auth().currentUser.email,
                tableHead: ['Items', 'Quantity', 'Rate', 'Price'],
                tableData: [
                  ['Shirt:\nBlue Shirt\nBlack Shirt', '0\n0\n0', '0\n0\n0', '0\n0\n0'],
                  ['Pant:\nBlue Pant\nCream Pant', '0\n0\n0', '0\n0\n0', '0\n0\n0'],
                  ['Watch:\nRolex Watch\nTitan Watch', '0\n0\n0', '0\n0\n0', '0\n0\n0'],
                  ['Tie:\nBlue Tie\nRed Tie', '0\n0\n0', '0\n0\n0', '0\n0\n0'],
                  ['Sport Shoes\nBlue Shoes\nBlack Shoes','0\n0\n0','0\n0\n0','0\n0\n0'],
                  ['Formal Shoes\nBlack Shoes\nGrey Shoes','0\n0\n0','0\n0\n0','0\n0\n0']
                ]
        }
    }

    getrequesteditem = () => {
        db.collection('Cart').doc(this.state.userID)
        .onSnapshot((snapshot)=>{
            var requestedItems = snapshot.docs.map((doc)=>doc.data())
            this.setState({
                requestedItems:requestedItems
            })
        })
    }

    render(){
        return(
            <View style={styles.container}>
                <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff',width:390}}>
                    <Row data={this.state.tableHead} style={{width:365}} textStyle={{textAlign:'center'}} />
                    <Rows data={this.state.tableData} style={{width:365}} textStyle={{textAlign:'center'}} />
                </Table>
            </View>
        )
    }
}
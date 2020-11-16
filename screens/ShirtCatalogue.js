import MyHeader from '../component/MyHeader';
import {styles} from '../component/Styles';
import DropDownPicker from 'react-native-dropdown-picker';
import firebase from "firebase";
import db from "../config";
import React from 'react';
import { Text, View,Image,TouchableOpacity } from 'react-native';

export default class Catalogue2 extends React.Component{

    constructor(props){
        super(props);
        this.state={
            name:this.props.navigation.getParam("detail")['name'],
            image:this.props.navigation.getParam("detail")['avatar_url'],
            subtitle:this.props.navigation.getParam('detail')['subtitle'],
            count:0,
            size:'42',
            userID:firebase.auth().currentUser.email
        }
    }

    render(){
        return(
            <View style={styles.container}>
              <View style={{width:370}}>
                <MyHeader title={this.state.name} navigation={this.props.navigation} />
              </View>
                <Image source={{uri:this.state.image}} style={{width:150,height:150,marginTop:50}} />
              <Text style={{marginTop:20,fontWeight:'bold'}}> {this.state.subtitle} </Text>
            <View style={{flexDirection:'row',marginTop:20,marginBottom:425}}>
                <DropDownPicker
                    items={[
                        {label: '42', value: '42',selected:true},
                        {label: '44', value: '44'},
                        {label: '46', value: '46'}
                    ]}
                    containerStyle={{height: 40}}
                    onChangeItem={item => this.setState({size:item.label})}
                    placeholder="Size"
                    style={{width:80}}
                    dropDownStyle={{width:100}}
                />
                <TouchableOpacity onPress={()=>{
                    if(this.state.count === 0){
                        this.setState({count:0})
                    }else{
                        this.setState({count:this.state.count-1})
                    }
                }} style={{backgroundColor:'white',width:40,marginLeft:20}}>
                    <Text style={{fontSize:20}}>-</Text>
                </TouchableOpacity>
                <Text style={{fontSize:20}}> {this.state.count} </Text>
                <TouchableOpacity onPress={()=>{this.setState({count:this.state.count+1})}} style={{backgroundColor:'white'}} >
                    <Text style={{fontSize:20,width:40}}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{marginTop:20,backgroundColor:'white',marginLeft:10}} onPress={()=>{
                    db.collection('Cart').doc(this.state.userID).collection('Shirts').add({
                        "ShirtName":this.state.name,
                        "ShirtQuantity":this.state.count,
                        "ShirtSize":this.state.size,
                    })
                }}>
                <Text> Add To Cart </Text>
            </TouchableOpacity>
            </View>
            </View>
        )
    }
}
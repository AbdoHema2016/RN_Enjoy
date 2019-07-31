import _ from 'lodash'
import React, {Component} from 'react'
import {View,Text} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
//import {AppLoading} from 'expo'
import Slides from '../components/Slides'


const Slide_Date = [
{text:'Welcome to the App',color:'#03A9F4'},
{text:'Set your Location,then Swipe away',color:'#009688'},
{text:'Get in',color:'#03A9F4'},
] 


class WelcomeScreen extends Component{
	state = {token:null}
	
	async componentWillMount(){
		let token =  await AsyncStorage.getItem('fb_token')
		if (token){
			this.props.navigation.navigate('login')
			this.setState({token})
		}else{
			this.setState({token:false})
		}
		
	}
	onSlidesComplete = () =>{
		this.props.navigation.navigate('login')
	}
	render(){
		
		return(
				<Slides data={Slide_Date} onComplete={this.onSlidesComplete}/>

			)
	}
}
export default WelcomeScreen;
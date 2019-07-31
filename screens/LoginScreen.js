import React, {Fragment,Component} from 'react';
import {
  SafeAreaView,
 
  Text,
  TouchableOpacity,
  StatusBar,Alert,
} from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin, GoogleSigninButton,statusCodes } from 'react-native-google-signin';
import {connect} from 'react-redux'
import firebase from 'firebase'
import * as actions from '../actions'



import Geolocation from '@react-native-community/geolocation';

Geolocation.getCurrentPosition(info => console.log(info));

class LoginScreen extends Component{

    state = {
        location: null 
      };
      findCoordinates = () => {
        Geolocation.getCurrentPosition(info => Alert.alert(info));
      };
    
      componentDidMount(){
        GoogleSignin.configure({
          iosClientId:'942617148522-u33cj6r0otk16tv5k50n8krm05osaldf.apps.googleusercontent.com'
        })
        
        
      }
      componentWillReceiveProps(nextProps){
        this.onAuthComplete(nextProps)
      }
      onAuthComplete(props){

        if(props.token){
          Alert.alert(props.token)
          
        }
      }
      signIn =()=>{
        GoogleSignin.signIn().then((data)=>{
          const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken,data.accessToken)
          return firebase.auth().signInWithCredential(credential)
        })
        .then((currentuser)=>{
          console.log("got in"+currentuser)
          //console.log("got in"+data.accessToken)
          //console.log("got in"+data)
        })
        .catch((error)=>{
          console.log(error)
        })
      }
      signIn = async () => {
        try {
          const result = await RNCAppleSignIn.signIn();
          console.warn(result);
        } catch (err) {
          console.error(err);
        }
      };
    render(){
        return(
            <Fragment>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
            <TouchableOpacity
              onPress={()=>this.props.facebookLogin()}
              
            ><Text>
              Press me
              </Text>
            </TouchableOpacity>
           
            <LoginButton
                onLoginFinished={
                  (error, result) => {
                    if (error) {
                      console.log("login has error: " + result.error);
                    } else if (result.isCancelled) {
                      console.log("login is cancelled.");
                    } else {
                      AccessToken.getCurrentAccessToken().then(
                        (data) => {
                          console.log(data.accessToken.toString())
                        }
                      )
                    }
                  }
                }
                onLogoutFinished={() => console.log("logout.")}/>
               <GoogleSigninButton
    style={{ width: 192, height: 48 }}
    size={GoogleSigninButton.Size.Wide}
    color={GoogleSigninButton.Color.Dark}
    onPress={this.props.googleLogin}
     />
     <TouchableOpacity onPress={this.findCoordinates}>
          <Text>Find My Coords?</Text>
          <Text>Location: {this.state.location}</Text>
        </TouchableOpacity>
            </SafeAreaView>
          </Fragment>
        )
    }
}

function mapStateToProps({auth}){
	return {token: auth.token}
}
export default connect(mapStateToProps,actions)(LoginScreen);
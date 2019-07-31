import AsyncStorage from '@react-native-community/async-storage';
import { LoginButton, AccessToken,Facebook,LoginManager } from 'react-native-fbsdk';
import { GoogleSignin, GoogleSigninButton,statusCodes } from 'react-native-google-signin';
import React from 'react'
import firebase from 'firebase'

import { 
	FACEBOOK_LOGIN_SUCCESS,
    FACEBOOK_LOGIN_FAIL,
    GOOGLE_LOGIN_FAIL,
    GOOGLE_LOGIN_SUCCESS

} from './types'
import {Alert} from 'react-native'

export const googleLogin = () => async dispatch =>{
    
    let tokenGoogle = await AsyncStorage.getItem('Google_token')
	if(tokenGoogle){
        
		dispatch({type:GOOGLE_LOGIN_SUCCESS,payload:tokenGoogle})
	}else{
		doGoogleLogin(dispatch)
	}

    

} 
const doGoogleLogin = async dispatch =>{
  
    GoogleSignin.configure({
        iosClientId:'942617148522-u33cj6r0otk16tv5k50n8krm05osaldf.apps.googleusercontent.com'
      })
      GoogleSignin.signIn().then((data)=>{
        const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken,data.accessToken)
        let tokenGoogle =credential.idToken
        AsyncStorage.setItem('Google_token',tokenGoogle)
        dispatch({type:GOOGLE_LOGIN_SUCCESS,payload:tokenGoogle})
        
        return firebase.auth().signInWithCredential(credential)
      })
      .then((currentuser)=>{
       
      })
      .catch((error)=>{
        dispatch({type:GOOGLE_LOGIN_FAIL,payload:tokenGoogle})

       
      })
}
export const facebookLogin = () => async dispatch => {

 
	let token = await AsyncStorage.getItem('fb_token')
	if(token){
        console.log(token)
		dispatch({type:FACEBOOK_LOGIN_SUCCESS,payload:token})
	}else{
		doFacebookLogin(dispatch)
	}
}

const doFacebookLogin = async dispatch =>{

    LoginManager.logInWithPermissions(["public_profile"]).then(
        function(result) {
          if (result.isCancelled) {
            console.log("Login cancelled");
            return dispatch ({type:FACEBOOK_LOGIN_FAIL})
          } else {
            AccessToken.getCurrentAccessToken().then(
                (data) => {
                   
                    let token = data.accessToken.toString()
                    AsyncStorage.setItem('fb_token',token)
                    dispatch({type:FACEBOOK_LOGIN_SUCCESS,payload:token})
                    console.log(token)
                }
              )
          }
        },
        function(error) {
          console.log("Login fail with error: " + error);
          return dispatch ({type:FACEBOOK_LOGIN_FAIL})
        }
      );


   

	
}
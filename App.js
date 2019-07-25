/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment,Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin, GoogleSigninButton,statusCodes } from 'react-native-google-signin';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

class App extends Component{
  componentDidMount(){
    GoogleSignin.configure({
      iosClientId:'942617148522-u33cj6r0otk16tv5k50n8krm05osaldf.apps.googleusercontent.com'
    })
  }
  signIn =()=>{
    GoogleSignin.signIn().then((data)=>{
      const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken,data.accessToken)
      return firebase.auth().signInWithCredential(credential)
    })
    .then((currentuser)=>{
      console.log("got in")
    })
    .catch((error)=>{
      console.log("error")
    })
  }
  render(){
        return (
          <Fragment>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
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
    onPress={this.signIn}
     />
            </SafeAreaView>
          </Fragment>
        );
        }
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;

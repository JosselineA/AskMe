import { Injectable } from '@angular/core';
import { AuthProviders, AngularFireAuth, FirebaseAuthState, AuthMethods } from 'angularfire2';

import { Platform ,AlertController} from 'ionic-angular';
import { Facebook } from 'ionic-native';
import { GooglePlus } from 'ionic-native';

import * as firebase from 'firebase';
@Injectable()
export class AuthService {
  private authState: FirebaseAuthState;

  constructor(public auth$: AngularFireAuth, private platform: Platform,public alertController : AlertController,) {
    this.authState = auth$.getAuth();
    auth$.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
    });
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  signInWithFacebook(): firebase.Promise<FirebaseAuthState> {
    if (this.platform.is('cordova')) {
      return Facebook.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        return firebase.auth().signInWithCredential(facebookCredential);
      });
    } else {
      return this.auth$.login({
        provider: AuthProviders.Facebook,
        method: AuthMethods.Popup
      });
    }

  }
  signInWithGoogle(): firebase.Promise<FirebaseAuthState> {
    if (this.platform.is('cordova')) {
     
      
      return GooglePlus.login({
                'webClientId' : '49989948952-u76rq3cre9dd07fmoh1iic8dbv22hnbq.apps.googleusercontent.com'
           })
           .then((userData) => {
 
                console.log("userData " + JSON.stringify(userData));
                console.log("firebase " + firebase);
                var provider = firebase.auth.GoogleAuthProvider.credential(userData.idToken);
                return firebase.auth().signInWithCredential(provider)      
 
                 })
             
    } else {
      return this.auth$.login({
        provider: AuthProviders.Google,
        method: AuthMethods.Popup
      });
    }


  }
   displayAlert(value,title)
  {
      let coolAlert = this.alertController.create({
      title: title,
      message: JSON.stringify(value),
      buttons: [
                    {
                        text: "OK"
                    }
               ]
      });
      coolAlert.present();
 
    }
  signOut(): void {
    this.auth$.logout();
  }

  displayName(): string {
    if (this.authState != null) {
      return this.authState.facebook.displayName;
    } else {
      return '';
    }
  }
}

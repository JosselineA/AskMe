import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { TabsPage } from '../tabs/tabs';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class Login {

  items: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController,public af: AngularFire,private _auth: AuthService) {
    this.items = af.database.list('/usuarios/javier');
  }
  signInWithFacebook(): void {
    this._auth.signInWithFacebook()
      .then(() => this.onSignInSuccess());
  }
  signInWithGoogle(): void {
    this.af.auth.unsubscribe()
    this._auth.signInWithGoogle()
      .then(() => this.onSignInSuccess());
  }

  private onSignInSuccess(): void {
    //console.log("Facebook display name ",this._auth.displayName());
    this.goToTabsPage();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  goToTabsPage() {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.push(TabsPage);
  }

}

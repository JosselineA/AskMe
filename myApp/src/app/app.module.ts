import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { Login } from '../pages/login/login';

import { AngularFireModule } from 'angularfire2';
import { AuthService } from '../providers/auth-service';


export const firebaseConfig = {
   apiKey: "AIzaSyBeDSLf8eP23EooJhB3v3HqjY5KsFvq_gA",
    authDomain: "appmovilespreguntados.firebaseapp.com",
    databaseURL: "https://appmovilespreguntados.firebaseio.com",
    storageBucket: "appmovilespreguntados.appspot.com",
    messagingSenderId: "49989948952"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    Login
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    Login
  ],
  providers: [AuthService]
})
export class AppModule {}

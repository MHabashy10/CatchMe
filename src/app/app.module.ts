import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { HttpModule, JsonpModule } from '@angular/http';

import { AuthService } from './../providers/auth.service';
import { ValidationService } from '../providers/validation.service';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


var config = {
  apiKey: "AIzaSyBRvwabU-PiSF-pT7co5IBW8TARWUa2pTw",
  authDomain: "popping-heat-2454.firebaseapp.com",
  databaseURL: "https://popping-heat-2454.firebaseio.com",
  projectId: "popping-heat-2454",
  storageBucket: "",
  messagingSenderId: "485505836289"
};
@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(config, 'my-app'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpModule,
    JsonpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthService,
    ValidationService
  ]
})
export class AppModule { }

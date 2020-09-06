import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Camera } from '@ionic-native/camera/ngx';
import { IonicStorageModule } from '@ionic/storage';
import * as firebase from 'firebase';
firebase.initializeApp({
    // apiKey: "AIzaSyAE8_vD7FB4zz4bmRHAsAHOIzPzKbrqvkQ",
    // authDomain: "ionic-d0421.firebaseapp.com",
    // databaseURL: "https://ionic-d0421.firebaseio.com",
    // projectId: "ionic-d0421",
    // storageBucket: "ionic-d0421.appspot.com",
    // messagingSenderId: "127421792235",
    // appId: "1:127421792235:web:c9cb1cdcc1cd6f336a63ae",
    // measurementId: "G-BZ5RN02WH7"
    apiKey: "AIzaSyApWQDVetrBE6oWS6HC4FOcv-Dq_Rc9PoU",
    authDomain: "photo-6833b.firebaseapp.com",
    databaseURL: "https://photo-6833b.firebaseio.com",
    projectId: "photo-6833b",
    storageBucket: "photo-6833b.appspot.com",
    messagingSenderId: "95908108808",
    appId: "1:95908108808:web:376e184b3775ff3cd9cfbd",
    measurementId: "G-EM6DRZY1EG"
});

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { MainPage } from '../pages/main/main';
import { FirebaseStoreProvider, AuthService } from '../providers/firebase-store/firebase-store'
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private auth: AuthService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.auth.afAuth.authState.subscribe(
      user => {

        if (user) {
          this.rootPage = MainPage;
        } else {
          this.rootPage = HomePage;
        }
      },
      () => {
        this.rootPage = HomePage;
      }
    );
    
    
  }
    
}


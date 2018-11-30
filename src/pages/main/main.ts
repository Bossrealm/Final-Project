import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService, FirebaseStoreProvider } from '../../providers/firebase-store/firebase-store';
import { Observable } from 'rxjs/Observable';
/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  messages: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public Data: FirebaseStoreProvider, private auth: AuthService) {
    this.messages = Data.listText();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }
  logout(){
    this.auth.signOut();
  }
}

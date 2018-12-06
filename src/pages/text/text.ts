import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirebaseStoreProvider, AuthService } from '../../providers/firebase-store/firebase-store';

/**
 * Generated class for the TextPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-text',
  templateUrl: 'text.html',
})
export class TextPage {
  textForm: FormGroup;

  constructor(public navCtrl: NavController, public auth: AuthService, public fb: FormBuilder, public navParams: NavParams, public fbData: FirebaseStoreProvider) {
    this.textForm = fb.group({
      text: ['', Validators.required]
  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TextPage');
  }
  addText(){
    let data = this.textForm.value;
    console.log(data);
    //this.fbData.addText(this.auth.user, data);
  }
}

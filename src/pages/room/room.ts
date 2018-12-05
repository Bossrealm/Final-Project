import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirebaseStoreProvider, AuthService } from '../../providers/firebase-store/firebase-store';

/**
 * Generated class for the RoomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-room',
  templateUrl: 'room.html',
})
export class RoomPage {
  roomForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fb: FormBuilder, public fbData: FirebaseStoreProvider, public auth: AuthService)  {
    this.roomForm = fb.group({
      name: ['', Validators.required],
      password: ''
  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomPage');
  }
  addRoom(){
    let data = this.roomForm.value;
    console.log(data);
    this.fbData.addRoom(this.auth.user, data);
  }
}

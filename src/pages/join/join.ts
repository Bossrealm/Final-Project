import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { FirebaseStoreProvider, AuthService } from '../../providers/firebase-store/firebase-store';
import { database } from 'firebase';
import * as firebase from 'firebase'
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User } from 'firebase/app';

/**
 * Generated class for the JoinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-join',
  templateUrl: 'join.html',
})
export class JoinPage {
  rooms: Observable<any[]>;
  currentroom: firebase.firestore.DocumentSnapshot;
  username: any;
  textForm: FormGroup;
  messages: Observable<any[]>;
  user: User;

  constructor(public navCtrl: NavController, public fb: FormBuilder, public navParams: NavParams, public Data: FirebaseStoreProvider, private auth: AuthService, public alertCtrl: AlertController, public fbData: FirebaseStoreProvider) {
    this.rooms = Data.listRoom();
    this.currentroom = null;
    this.textForm = fb.group({
      text: ['', Validators.required]
  });
  this.auth.afAuth.authState.subscribe(
    user => {        
      this.user = user;})
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JoinPage');
  }
joinRoom(roomid){
  this.Data.getRoom(roomid).then(
    room => {
      let prompt = this.alertCtrl.create({ 
        title: 'Join Room',
        inputs: [{
          name: 'name',
          placeholder: 'Create Username'
        },
        {
          name: 'password',
          placeholder: 'Enter Room Password',
          type: 'password'
        }],
        buttons:[{                         
         
          text: "Join",
          handler: data => {
            if(
              room.data().password == data.password
            ){
            this.currentroom = room;
            this.messages = this.Data.listText(room.id); 
            this.username = data.name;  
          }
          else{
            const alert = this.alertCtrl.create({
              title: 'Oops!',
              subTitle: 'Try a different password',
              buttons: ['OK']
            });
            alert.present();
          }
         }                                 
        }
        ]
      });
    
      prompt.present();

console.log(this.currentroom);
    }
  )
}
leaveRoom(){
  this.currentroom = null;
}
addText(){
  let data = this.textForm.value;
  console.log(data);
  this.fbData.addText(this.auth.user, data, this.currentroom.id);
  this.textForm.reset();
}
}

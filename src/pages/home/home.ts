import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Injectable } from "@angular/core";
import 'rxjs/add/operator/toPromise';
import * as firebase from 'firebase/app';
import { FirebaseStoreProvider, AuthService } from '../../providers/firebase-store/firebase-store'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private auth: AuthService) {  

  }
  login() {
    this.auth.login()
  }

  signup() {
    this.navCtrl.push("SignupPage");
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import AuthProvider = firebase.auth.AuthProvider;
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { RoomPage } from '../../pages/room/room';

@Injectable()
export class FirebaseStoreProvider {

  constructor(public afs: AngularFirestore) {
    console.log('Hello FirebaseStoreProvider Provider');
  }

  listMovies(){
    return this.afs.collection('/movies').valueChanges();
  }
  addText(user, data, roomid){
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('/rooms/' + roomid + '/messages').add({
        text: data.text,
        uid: user.uid,
        email: user.email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      }).then(
        (res) => {
          resolve(res)
        },
        err => reject(err)
      )
      })
    }

  listText(roomid){
    return this.afs.collection('/rooms/' + roomid + '/messages', ref => ref.orderBy('createdAt')).snapshotChanges().pipe(map(actions => {
      return actions.map( item=> {
        const id = item.payload.doc.id;
          const data = item.payload.doc.data();
          data['id'] = id;
          return data;
      });
    })); 
  }
  addRoom(user, data){
    console.log(data);
    console.log(user);
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('/rooms').add({
        name: data.name,
        uid: user.uid,
        email: user.email,
        password: data.password,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      }).then(
        (res) => {
          resolve(res)
        },
        err => reject(err)
      )
      })
    }
    listRoom(){
      return this.afs.collection('/rooms', ref => ref.orderBy('createdAt')).snapshotChanges().pipe(map(actions => {
        return actions.map( item=> {
          const id = item.payload.doc.id;
            const data = item.payload.doc.data();
            data['id'] = id;
            return data;
        });
      })); 
    }
    getRoom(roomid) : Promise<firebase.firestore.DocumentSnapshot>{
      var room = this.afs.firestore.doc('/rooms/' + roomid).get().then(
        doc => {

          return doc;
        }      
      )
      return room;
    }
}
@Injectable()
export class AuthService {
  public user: firebase.User;
  constructor(public afAuth: AngularFireAuth, ) {
    afAuth.authState.subscribe(user => {			
			this.user = user;
		});
  }
  login() {
    return this.oauthSignIn(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }
  signUp(credentials) {
		return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email,credentials.password);
  }
  
  signInWithEmail(credentials) {
		console.log('Sign in with email');
		return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,
			 credentials.password);
	}

	get authenticated(): boolean {
		return this.user !== null;
	}

	getEmail() {
		return this.user && this.user.email;
	}

	getUID(){
		return this.user && this.user.uid;
  }
  signOut(): Promise<void> {
		return this.afAuth.auth.signOut();
  }
  private oauthSignIn(provider: AuthProvider) {
		if (!(<any>window).cordova) {
			return this.afAuth.auth.signInWithPopup(provider);
		} else {
			return this.afAuth.auth.signInWithRedirect(provider)
			.then(() => {
				return this.afAuth.auth.getRedirectResult().then( result => {
					// This gives you a Google Access Token.
					// You can use it to access the Google API.
					let token = result.credential.accessToken;
					// The signed-in user info.
					let user = result.user;
					console.log(token, user);
				}).catch(function(error) {
					// Handle Errors here.
					alert(error.message);
				});
			});
		}
	}
  
}
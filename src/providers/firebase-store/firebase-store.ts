import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import AuthProvider = firebase.auth.AuthProvider;
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class FirebaseStoreProvider {

  constructor(public afs: AngularFirestore) {
    console.log('Hello FirebaseStoreProvider Provider');
  }

  listMovies(){
    return this.afs.collection('/movies').valueChanges();
  }
  addText(user, data){
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('/messages').add({
        text: data.text,
        uid: user.uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      }).then(
        (res) => {
          resolve(res)
        },
        err => reject(err)
      )
      })
    }

  listText(){
    return this.afs.collection('/messages', ref => ref.orderBy('createdAt')).snapshotChanges().pipe(map(actions => {
      return actions.map( item=> {
        const id = item.payload.doc.id;
          const data = item.payload.doc.data();
          data['id'] = id;
          return data;
      });
    })); 
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
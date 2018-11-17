import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    private db: AngularFirestore
  ) { }

  goOnline() {
    this.db.firestore.enableNetwork().then(() => {
    }).catch(() => {
    })
  }

  goOffline() {
    this.db.firestore.disableNetwork().then(() => {
    }).catch(() => {
    })
  }

}

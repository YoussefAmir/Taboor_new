import { Component, OnInit, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { async } from '@angular/core/testing';
import { ToastController } from '@ionic/angular';
import { Activity } from '../types';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  favList: Observable<any>;
  services: string[];
  counter: number;
  constructor(private _angularFireStore: AngularFirestore,
    private _angularFireAuth: AngularFireAuth,
    private toastController: ToastController) {
    }

    ngOnInit() {
      this.counter = 0;
      this.favList = this._angularFireStore
      .collection("queue")
      .doc(firebase.auth().currentUser.uid)
      .collection("queue")
      .valueChanges()
      var service: string[] = [];

      firebase.firestore().collection("queue").doc(firebase.auth().currentUser.uid).collection("queue").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          service.push(doc.id)
        });
    });
    this.services = service
    console.log(service)
    // this.services = service;
    }
    async getId():Promise<string>{
      let id: string;
      firebase.firestore().collection("queue").doc(firebase.auth().currentUser.uid).collection("queue").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          console.log(doc.id)
          id = doc.id;
        });
    });
    console.log(id)
    return await id;
    }
  async presentToast(option:string) {
    var msg:string;

    if(option == 'add')
      msg= 'Added to Queue!'
    else
      msg= 'Removed from Queue!'

    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'top' 
    });
    toast.present();
  }

  increment(){
    if(this.counter >= this.services.length)
      this.counter = 0;
    this.counter = this.counter + 1;
    return this.counter - 1;
  }


removeFav(id: string){
  console.log(id);
  this._angularFireStore.collection("queue")
  .doc(firebase.auth().currentUser.uid)
  .collection("queue")
  .get().subscribe((doc) =>{
    if(!doc.empty){
      this._angularFireStore.collection("queue")
      .doc(firebase.auth().currentUser.uid)
      .collection("queue")
      .doc(id)
      .delete();

      this.presentToast('delete');
    }
  })

  // this._angularFireStore.collection("queue")
  //     .doc(firebase.auth().currentUser.uid)
  //     .collection("queue")
  //     .doc(id)
  //     .delete();

  //     this.presentToast('delete');

      
  console.log("SHOULD BE DONE")


}

doRefresh(event) {

  setTimeout(() => {
    this.ngOnInit();
    event.target.complete();
  }, 500);
  
}

}

import { Component, OnInit } from '@angular/core';
import { Activity, branches } from '../types';
import { ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { ActivityService } from '../activity.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-bank-services',
  templateUrl: './bank-services.page.html',
  styleUrls: ['./bank-services.page.scss'],
})
export class BankServicesPage implements OnInit {

  activityDetail: Activity[];
  branch: branches;
  activityID: string;
  taken: number[]; 

  constructor(
    public toastController: ToastController,
    private angularfirestore: AngularFirestore,
    activatedRoute: ActivatedRoute,
    private actService: ActivityService,
    
  ) { 
    this.activityID = activatedRoute.snapshot.params["activityID"]
  }

  ngOnInit() {
    this.getMediaItem(this.activityID);
  
    for(let it of this.activityDetail[0].branches){
      if(it.id.toString() == this.activityID)
      {
        this.branch = it
      }
    }
    
  }

  getMediaItem(medium: string) {
    let branchID = Math.floor(parseInt(medium,10))
    this.actService.get(branchID.toString())
    .subscribe(mediaItems => {
      this.activityDetail = mediaItems;
    });
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

  addToFav(service: string){
    let index: number;
    for (var j=0; j<this.branch.services.length; j++) {
      if (this.branch.services[j].match(service))
      {
        index = j;
        break;
      }
    } 
    let ID: string = `${this.branch.services[index]}-${this.branch.id}.${index}` 
    this.angularfirestore.collection("queue")
    .doc(firebase.auth().currentUser.uid)
    .collection("queue", ref=>{
      return ref.where("id","==",ID)
    })
    .get().subscribe(doc =>{
      if(doc.empty){
        this.angularfirestore.collection("queue")
        .doc(firebase.auth().currentUser.uid)
        .collection("queue")
        .doc(ID)
        .set(this.branch);
      }
    })
    this.presentToast('add');
    console.log("SHOULD BE DONE")
}

removeFav(){
  this.angularfirestore.collection("queue")
  .doc(firebase.auth().currentUser.uid)
  .collection("queue", ref=>{
    return ref.where("id","==",this.activityDetail[0].id)
  })
  .get().subscribe(doc =>{
    if(!doc.empty){
      this.angularfirestore.collection("queue")
      .doc(firebase.auth().currentUser.uid)
      .collection("queue")
      .doc(this.activityDetail[0].id.toString())
      .delete();

      this.presentToast('delete');
    }
  })
  console.log("SHOULD BE DONE")


}


}

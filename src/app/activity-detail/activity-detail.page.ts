import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Activity } from '../types';
import { ActivityService } from '../activity.service';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ActivityVideoPage } from '../activity-video/activity-video.page';
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';
import * as firebase from 'firebase';
import { stringify } from 'querystring';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.page.html',
  styleUrls: ['./activity-detail.page.scss'],
})
export class ActivityDetailPage implements OnInit {

  activityDetail: Activity[];
  activityID: string;

  constructor(
    public toastController: ToastController,
    private angularfirestore: AngularFirestore,
    private _modalController: ModalController,
    activatedRoute: ActivatedRoute,
    private actService: ActivityService
    ) {
      this.activityID = activatedRoute.snapshot.params["activityID"]
      console.log(this.activityID)
     }

  ngOnInit() {
    this.getMediaItem(this.activityID);
  }

  getMediaItem(medium: string) {
    this.actService.get(medium)
    .subscribe(mediaItems => {
      this.activityDetail = mediaItems;
    });
  }

  async openModal(){
    const videoModal = await this._modalController.create({
      component: ActivityVideoPage,
      componentProps: { id: this.activityID}
    });

    return await videoModal.present();
}

    
  

  // share(){
  //   this.activityDetail.subscribe(activity => {
  //     this._socailShare.share("Look What I found",activity.name,"",activity.cropped)
  //   })
  // }

  // async presentToast(option:string) {
  //   var msg:string;

  //   if(option == 'add')
  //     msg= 'Added to Favorites!'
  //   else
  //     msg= 'Removed from Favorites'

  //   const toast = await this.toastController.create({
  //     message: msg,
  //     duration: 2000,
  //     position: 'top'
  //   });
  //   toast.present();
  // }

  // addToFav(){
  //       this.angularfirestore.collection("queue")
  //       .doc(firebase.auth().currentUser.uid)
  //       .collection("queue", ref=>{
  //         return ref.where("id","==",this.activityDetail[0].id)
  //       })
  //       .get().subscribe(doc =>{
  //         if(doc.empty){
  //           this.angularfirestore.collection("queue")
  //           .doc(firebase.auth().currentUser.uid)
  //           .collection("queue")
  //           .doc(this.activityDetail[0].id.toString())
  //           .set(this.activityDetail[0]);
  //         }
  //       })
  //       this.presentToast('add');
  //       console.log("SHOULD BE DONE")
  // }

  // removeFav(){
    
  //       this.angularfirestore.collection("queue")
  //       .doc(firebase.auth().currentUser.uid)
  //       .collection("queue", ref=>{
  //         return ref.where("id","==",this.activityDetail[0].id)
  //       })
  //       .get().subscribe(doc =>{
  //         if(!doc.empty){
  //           this.angularfirestore.collection("queue")
  //           .doc(firebase.auth().currentUser.uid)
  //           .collection("queue")
  //           .doc(this.activityDetail[0].id.toString())
  //           .delete();

  //           this.presentToast('delete');
  //         }
  //       })
  //       console.log("SHOULD BE DONE")
      
    
  // }

}

import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CameraOptions, Camera } from "@ionic-native/camera/ngx";
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  myImage;
  myStoredImg: Observable<any>;
  
  constructor(
    private _angularFireStore: AngularFirestore,
    private _angularFireAuth: AngularFireAuth,
    private _alertController: AlertController,
    private _camera: Camera) {
      this.myStoredImg = _angularFireStore.collection("users")
      .doc(firebase.auth().currentUser.uid)
      .valueChanges();

      console.log(this.myStoredImg);
    }

  async selectImgSrc(){
    const cameraOptions: CameraOptions = {
      quality: 100,
      destinationType: this._camera.DestinationType.DATA_URL,
      encodingType: this._camera.EncodingType.JPEG,
      mediaType: this._camera.MediaType.PICTURE,
      targetHeight: 200,
      correctOrientation: true,
      sourceType: this._camera.PictureSourceType.CAMERA
    }

    const gallaryOptions: CameraOptions = {
      quality: 100,
      destinationType: this._camera.DestinationType.DATA_URL,
      encodingType: this._camera.EncodingType.JPEG,
      mediaType: this._camera.MediaType.PICTURE,
      targetHeight: 200,
      correctOrientation: true,
      sourceType: this._camera.PictureSourceType.SAVEDPHOTOALBUM
    }
    const alert = await this._alertController.create({
      header: "Select Source",
      message: "Pick a source for your image",
      buttons: [
        {
          text: "Camera",
          handler: () =>{
            this._camera.getPicture(cameraOptions)
            .then(imageData => {
              // this.myImage ="data:image/jpeg;base64," + imageData;
              const img = "data:image/jpeg;base64," + imageData;
              this._angularFireStore.collection("users")
              .doc(firebase.auth().currentUser.uid)
              .set({
                image_src: img
              })

              
            })
          }
        },
        {
          text: "Gallary",
          handler: () =>{
            this._camera.getPicture(gallaryOptions)
            .then(imageData => {
              // this.myImage ="data:image/jpeg;base64," + imageData;

              const img = "data:image/jpeg;base64," + imageData;
              this._angularFireStore.collection("users")
              .doc(firebase.auth().currentUser.uid)
              .set({
                image_src: img
              })
            })
          }
        }
      ]
    })
    await alert.present();
  }

}

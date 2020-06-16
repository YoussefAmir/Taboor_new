import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ActivityService } from '../activity.service';
import { Activity } from '../types';

@Component({
  selector: 'app-activity-video',
  templateUrl: './activity-video.page.html',
  styleUrls: ['./activity-video.page.scss'],
})
export class ActivityVideoPage implements OnInit {
  Search: string = '';
  activityDetail: Activity[];
  activityID: string;
  constructor(
    private _modalController: ModalController, 
    activatedRoute: ActivatedRoute,
    private actService: ActivityService,
    private navPrams: NavParams) {
      this.activityID = navPrams.get("id")
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

  getItems(ev: any) {
    let search = ev.target.value;
    this.Search = search.toLowerCase();
    // console.log(this.Search);
  }

  // getItems(ev: any) {
  //   // Reset items back to all of the items
  //   this.initializeItems();
  //   // set val to the value of the searchbar
  //   const val = ev.target.value;

  //   // if the value is an empty string don't filter the items
  //   if (val && val.trim() != '') {
  //     this.bankBranchesArray = this.bankBranchesArray.filter((item) => {
  //       return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
  //     })
  //   }
  // }


  // async navToBankServices(item){
  //   console.log("helloFromCardFunction"+item)
  //   // this.route.navigateByUrl('branches');


  //   localStorage.setItem('currentBranch', JSON.stringify(item));

  //   await this.router.navigate(['services'], { state: item });
  //   console.log("helloBefore services Navi")
  // }



  closeModal(){
    this._modalController.dismiss();
  }

}

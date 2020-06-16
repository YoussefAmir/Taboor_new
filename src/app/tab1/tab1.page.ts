import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Activity } from '../types';
import { ActivityService } from '../activity.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  mediaItems: Activity[];

  constructor(
    private mediaItemService: ActivityService) {}


  ngOnInit() {
        this.getMediaItems('');
  }

 

  getMediaItems(medium: string) {
   this.mediaItemService.get('')
      .subscribe(mediaItems => {
        this.mediaItems = mediaItems;
      });
  }
 



}

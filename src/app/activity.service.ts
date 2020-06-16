import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { Activity } from './types';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private _httpClient: HttpClient) { }

  // getActivity(activityID: string): Observable<Activity>{
  // //  var Act = this._httpClient.get<Activity>(API);
  // //  console.log('=>>>', Act.forEach)
  //  return this._httpClient.get<Activity>(`${API}/id/${activityID}`);
  // }

  // getAllActivities(): Observable<Activity[]>{
  //   return this._httpClient.get<Activity[]>(API);
  // }

  // get(id: string) {
  //   const getOptions = {
  //     params: { id }
  //   };
  //   return this._httpClient.get<ActivitysResponse>('banks', getOptions)
  //     .pipe(
  //       map((response: ActivitysResponse) => {
  //         return response.activities;
  //       }),
  //       catchError(this.handleError)
  //     );

      
  // }

  get(medium: string) {
    const getOptions = {
      params: { medium }
    };
    return this._httpClient.get<MediaItemsResponse>('mediaitems', getOptions)
      .pipe(
        map((response: MediaItemsResponse) => {
          return response.mediaItems;
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error(error.message);
    return throwError('A data error occurred, please try again.');
  }

}


interface MediaItemsResponse {
  mediaItems: Activity[];
}


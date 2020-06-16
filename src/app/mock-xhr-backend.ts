import { HttpEvent, HttpRequest, HttpResponse, HttpBackend } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';

export class MockXHRBackend implements HttpBackend {
  private mediaItems = [
    {
      id: 1,
      name: 'Ahli Bank',
      medium: 'Public',
      img: '/assets/alahli.jpg',
      desc: 'hehehe',
      isAvailable: true,
      branches: [
        {
          id: 1.1,
          name: 'Ahli Agoza',
          location: 'Agoza Street',
          img: '/assets/alahli.jpg',
          isAvailable: true,
          services: ["cards","checks","deposites","visa"]
        },
       {
        id: 1.2,
        name: 'Ahli Almaza',
        location: 'Almaza Street',
        img: '/assets/alahli.jpg',
        isAvailable: true,
        services: ["cards","checks","deposites","visa"]
      }
      ]
    },
    {
      id: 2,
      name: 'CIB Bank',
      medium: 'Private',
      img: '/assets/cib.jpg',
      desc: 'hehehe',
      isAvailable: true,
      branches: [
        {
          id: 2.1,
          name: 'CIB Agoza',
          location: 'Agoza Street',
          img: '/assets/cib.jpg',
          isAvailable: true,
          services: ["cards","checks","deposites","visa"]
        },
       {
        id: 2.2,
        name: 'CIB Almaza',
        location: 'Almaza Street',
        img: '/assets/cib.jpg',
        isAvailable: true,
        services: ["cards","checks","deposites","visa"]
      }
      ]
    }, {
      id: 3,
      name: 'Cairo Bank',
      medium: 'Public',
      img: '/assets/cairo.jpg',
      desc: 'hehehe',
      isAvailable: true
    }, {
      id: 4,
      name: 'Alexandria Bank',
      medium: 'Public',
      img: '/assets/alex.jpg',
      desc: 'hehehe',
      isAvailable: true
    }, {
      id: 5,
      name: 'ABE Bank',
      medium: 'Public',
      img: '/assets/AgriculturalBankofEgypt.jpg',
      desc: 'hehehe',
      isAvailable: false
    }
  ];

  handle(request: HttpRequest<any>): Observable<HttpEvent<any>> {
    return new Observable((responseObserver: Observer<HttpResponse<any>>) => {
      let responseOptions;
      switch (request.method) {
        case 'GET':
          if (request.urlWithParams.indexOf('mediaitems?medium=') >= 0 || request.url === 'mediaitems') {
            let medium;
            if (request.urlWithParams.indexOf('?') >= 0) {
              medium = parseInt(request.urlWithParams.split('=')[1]);
              if (medium === 'undefined') { medium = ''; }
            }
            let mediaItems;
            if (medium) {
              mediaItems = this.mediaItems.filter(i => i.id === medium);
            } else {
              mediaItems = this.mediaItems;
            }
            responseOptions = {
              body: {mediaItems: JSON.parse(JSON.stringify(mediaItems))},
              status: 200
            };
          } 
          // else {
          //   let mediaItems;
          //   const idToFind = parseInt(request.url.split('/')[1], 10);
          //   mediaItems = this.mediaItems.filter(i => i.id === idToFind);
          //   responseOptions = {
          //     body: JSON.parse(JSON.stringify(mediaItems[0])),
          //     status: 200
          //   };
          // }
          break;
        // case 'POST':
        //   const mediaItem = request.body;
        //   mediaItem.id = this._getNewId();
        //   this.mediaItems.push(mediaItem);
        //   responseOptions = {status: 201};
        //   break;
        // case 'DELETE':
        //   const id = parseInt(request.url.split('/')[1], 10);
        //   this._deleteMediaItem(id);
        //   responseOptions = {status: 200};
      }

      const responseObject = new HttpResponse(responseOptions);
      responseObserver.next(responseObject);
      responseObserver.complete();
      return () => {
      };
    });
  }
}

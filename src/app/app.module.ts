import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HttpXhrBackend } from "@angular/common/http";

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Camera } from "@ionic-native/camera/ngx";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';

import { MockXHRBackend } from './mock-xhr-backend';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
      AngularFirestoreModule,
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireAuthModule,
      HttpClientModule,
      BrowserModule,
      IonicModule.forRoot(),
      AppRoutingModule
      
    ],
  providers: [
    SocialSharing,
    Camera,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HttpXhrBackend, useClass: MockXHRBackend }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { LoginCre } from '../types';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signUpFromGroup: FormGroup;

  constructor( 
    private _modalController: ModalController,
    private _router: Router,
    private _loginService: LoginService,
    formBuilder: FormBuilder
    ) 
    {
    this.signUpFromGroup= formBuilder.group({
      email: [""],
      password: [""]
    })
   }

  ngOnInit() {
  }

  signUp(){
    const loginCre : LoginCre = this.signUpFromGroup.value;
    console.log(loginCre)
    this._loginService.signUp(loginCre)
    .then(authData=>{
      document.querySelector('ion-card-header.header2').color = "primary"
      document.querySelector('ion-card-header.header2').innerHTML = "User added. Login Now!"
    
      this._router.navigate(["/login"])
    })
    .catch(authError =>{
      document.querySelector('ion-card-header.header2').color = "danger"
      document.querySelector('ion-card-header.header2').innerHTML = "Incorrect Data - Please Try Again!"
    })
  }

  openModal(){
    this._router.navigate(["/login"])
  }


}

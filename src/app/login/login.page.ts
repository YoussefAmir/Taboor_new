import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginCre } from '../types';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { sign } from 'crypto';
import { SignupPage } from '../signup/signup.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginFromGroup: FormGroup;

  constructor(
    private _modalController: ModalController,
    private _router: Router,
    private _loginService: LoginService,
     formBuilder: FormBuilder) {
    this.loginFromGroup= formBuilder.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required]]
    })
   
   }

  ngOnInit() {
  }

  login(){
    const loginCre : LoginCre = this.loginFromGroup.value;
    this._loginService.login(loginCre)
    .then(authData=>{
      this._router.navigate(["/tabs"])
    })
    .catch(authError =>{
      document.querySelector('ion-card-header.header1').color = "danger"
      document.querySelector('ion-card-header.header1').innerHTML = "Incorrect Data - Please Try Again!"
    })
  }

  

  openModal(){
    this._router.navigate(["/signup"])
  }

}

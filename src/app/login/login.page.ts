import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginCre } from '../types';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginFromGroup: FormGroup;


  constructor(
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
      console.log("AUTH ERROR",authError)
    })
  }

}

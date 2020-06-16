import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginCre } from './types';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _angularFireAuth: AngularFireAuth) { }

  login(cred: LoginCre): Promise<any>{
    return this._angularFireAuth.
    signInWithEmailAndPassword(cred.email,cred.password);
  }
}

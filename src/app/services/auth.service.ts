import { Injectable, resolveForwardRef } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor() { }

  loginUser(credential: any) {
    return new Promise((accept, reject) => {
      if (credential.email == 'jeyson@gmail.com'
        && credential.password == '123456-j') {
        accept('Login Correcto');
      } else {
        reject('Login Incorrecto.')
      }
    });
  }

  registerUser(userData: any) {
    return new Promise((resolve, reject) =>{
      if (userData.email != 'jeyson@gmail.com') {
        resolve('Registro Exitoso')
      } else {
        reject('EL email ya está registrado')
      }
    });

  }
}

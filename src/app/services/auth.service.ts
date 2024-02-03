import { Injectable, resolveForwardRef } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private storage: Storage
  ) { }

  // Método para registrar un usuario
  registerUser(userData: any) {
    return new Promise((resolve, reject) => {
      if (userData.email != 'jeyson@gmail.com') {
        this.storage.set('userData', userData);
        resolve('Registro Exitoso');
      } else {
        reject('El email ya está registrado');
      }
    });
  }

  // Método para iniciar sesión
  loginUser(credential: any) {
    return new Promise((resolve, reject) => {
      // Credenciales quemadas
      const hardcodedEmail = 'jeyson@gmail.com';
      const hardcodedPassword = '123456-j';

      // Verificar si las credenciales coinciden con las quemadas
      if (credential.email === hardcodedEmail && credential.password === hardcodedPassword) {
        resolve('Inicio de sesión exitoso');
      } else {
        // Obtener las credenciales almacenadas del Storage
        this.storage.get('userData').then(userData => {
          // Verificar si las credenciales coinciden con las almacenadas
          if (userData && userData.email === credential.email && userData.password === credential.password) {
            resolve('Inicio de sesión exitoso');
          } else {
            reject('Credenciales incorrectas');
          }
        }).catch(error => {
          reject('Error al obtener los datos de inicio de sesión');
        });
      }
    });
  }
}

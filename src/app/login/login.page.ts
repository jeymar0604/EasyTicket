import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup; //Declara la propiedad de loginForm

  loginMessage: any;

  passwordHidden: boolean = true;

  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private storage: Storage
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(
            "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
          )
        ])
      ),
      password: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(8), // Mínimo 8 caracteres
          Validators.maxLength(10), // Máximo 10 caracteres
          Validators.pattern(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$@!%*?&+-_])/), // Al menos una letra; Al menos un número; Al menos un carácter especial
        ])
      )
    })
  }

  ngOnInit() {
  }

  login(login_data: any) {
    console.log(login_data);
    this.authService.loginUser(login_data).then(res => {
      this.loginMessage = res;
      this.storage.set('userLoggedIn', true);
      this.navCtrl.navigateForward('/home');
    }).catch(err => {
      this.loginMessage = err;
    });
  }

  //mensajes de error y validacion 
  getErrorMessage(controlName: string): string {
    const control = this.loginForm.get(controlName);
    if (control?.hasError('required')) {
      return 'Este campo es obligatorio.';
    } else if (control?.hasError('pattern')) {
      if (controlName == 'email') {
        return 'El email es invalido.';
      }
      else if (controlName == 'password') {
        return 'El password es invalido.';
      }
    }
    return '';
  }

  isInvalid(controlName: string): boolean {
    const control = this.loginForm.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  togglePasswordVisibility() {
    this.passwordHidden = !this.passwordHidden; 
  }

}

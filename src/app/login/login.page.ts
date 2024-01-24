import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup; //Declara la propiedad de loginForm

  constructor(
    private formBuilder: FormBuilder,
    private alertController: AlertController
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(
            "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.+[a-zA-Z0-9-.]+$"
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

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error de Validación',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  login(login_data: any) {
    const emailControl = this.loginForm.get('email');
    const passwordControl = this.loginForm.get('password');
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
    } else {
      if (emailControl && emailControl.hasError('pattern')) {
        this.presentAlert('El formato del correo electrónico es incorrecto.');
      } else if (passwordControl && passwordControl.hasError('pattern')) {
        this.presentAlert('La contraseña debe contener al menos 8 caracteres, una letra, un número y un carácter especial ($@!%*?&+-_)');
      } else {
        this.presentAlert('Por favor, completa todos los campos correctamente.');
      }
    }
  }
}

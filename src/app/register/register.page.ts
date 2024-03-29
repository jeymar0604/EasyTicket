import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup; //Declara la propiedad de registerForm

  registerMessage: any;

  passwordHidden: boolean = true;
  confirmationPasswordHidden: boolean = true;

  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private storage: Storage,
    private authService: AuthService
  ) {
    this.registerForm = this.formBuilder.group({
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
      ),
      confirmation_password: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          this.passwordsMatch.bind(this)
        ]),
      ),
      name: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(2), // Mínimo 2 caracteres
          Validators.maxLength(50), // Máximo 50 caracteres
          Validators.pattern(/^[a-zA-Z\s]*$/) // Solo letras y espacios permitidos
        ])
      ),
      last_name: new FormControl(
        "",
        Validators.compose([
          Validators.minLength(2), // Mínimo 2 caracteres
          Validators.maxLength(50), // Máximo 50 caracteres
          Validators.pattern(/^[a-zA-Z\sñ]*$/) // Solo letras y espacios permitidos
        ])
      ),
    })

  }

  // Función para verificar si las contraseñas coinciden
  passwordsMatch(control: AbstractControl): { [key: string]: any } | null {
    const passwordControl = control.root.get('password');
    const confirmPasswordControl = control.root.get('confirmation_password');

    if (passwordControl && confirmPasswordControl && passwordControl.value !== confirmPasswordControl.value) {
      return { 'passwordMismatch': true };
    } else {
      return null;
    }
  }

  ngOnInit() {
  }

  register(register_data: any) {
    console.log(register_data);
    this.authService.registerUser(register_data).then(res => {
      this.registerMessage = res;
      this.storage.set('userRegistered', true);
      this.showSuccessMessage().then(() => {
        this.registerMessage = '';
        this.registerForm.reset();
      });
    }).catch(err => {
      this.registerMessage = err;
    });
  }
  
  async showSuccessMessage() {
    // Muestra un mensaje de éxito durante 1 segundo
    this.registerMessage = '¡Registro exitoso!';
    await new Promise(resolve => setTimeout(resolve, 1000)); // Espera 1 segundo
    this.navCtrl.navigateForward('/login'); // Redirige a la página de inicio de sesión
  }

  // Función para obtener el mensaje de error
  getErrorMessage(controlName: string): string {
    const control = this.registerForm.get(controlName);

    if (control?.hasError('required')) {
      return 'Este campo es obligatorio.';
    } else if (control?.hasError('pattern')) {
      if (controlName === 'email') {
        return 'El email es invalido.';
      } else if (controlName === 'password') {
        return 'La contraseña debe contener al menos 8 caracteres, una letra, un número y un carácter especial ($@!%*?&+-_)';
      }
    } else if (control?.hasError('passwordMismatch')) {
      return 'Los passwords no coinciden';
    }

    return '';
  }

  // Función para verificar si el campo es inválido
  isInvalid(controlName: string): boolean {
    const control = this.registerForm.get(controlName); //Obtiene el control del formulario
    return !!control && control.invalid && (control.dirty || control.touched); //Devuelve verdadero si el control existe, es inválido y ha sido modificado o tocado
  }

  // Función para alternar la visibilidad de la contraseña
  togglePasswordVisibility(field: string) {
    if (field === 'password') {
      this.passwordHidden = !this.passwordHidden;
    } else if (field === 'confirmation_password') {
      this.confirmationPasswordHidden = !this.confirmationPasswordHidden;
    }
  }

  goToLogin() {
    this.navCtrl.navigateBack('/login')
    this.storage.set('VolverLogin', true)
  }

}
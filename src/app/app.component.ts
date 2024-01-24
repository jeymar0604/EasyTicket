import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
register();
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  constructor(
    private router: Router,
    private storage: Storage) {}

  async ngOnInit() {
    // If using a custom driver:
    // await this.storage.defineDriver(MyCustomDriver)
    await this.storage.create();
  }

  goToHome(){
    this.router.navigateByUrl('/home')
    this.storage.set('MostrarHome', true)
  }

  goToIntro(){
    this.router.navigateByUrl('/intro')
    this.storage.set('MostrarIntro', true)
  }

  goToLogin(){
    this.router.navigateByUrl('/login')
    this.storage.set('MostrarLogin', true)
  }

  menuType: string = 'overlay';
}

import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private storage: Storage
  ) { }

  ngOnInit() {
  }

  goToHome() {
    this.navCtrl.navigateForward('menu/home')
    console.log('Mostar Home (menú)')
    this.storage.set('MostrarHome', true)
  }

  goToIntro() {
    this.navCtrl.navigateForward('/intro')
    console.log('Mostar Intro (menú)')
    this.storage.set('MostrarIntro', true)
  }

  goToLogin() {
    this.navCtrl.navigateForward('/login')
    console.log('Mostar Login (menú)')
    this.storage.set('MostrarLogin', true)
  }

  goToRegister() {
    this.navCtrl.navigateForward('/register')
    console.log('Mostar Register (menú)')
    this.storage.set('MostrarRegister', true)
  }

  logout(){
    this.navCtrl.navigateRoot('/login')
  }

  menuType: string = 'overlay';

}

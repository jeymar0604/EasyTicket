import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],

})
export class IntroPage implements OnInit {

  slides = [
    {
      title: "",
      image: "",
      class: "slide1"
    },
    {
      title: "TU TELEFONO ES TU TICKET",
      image: "../../assets/images/tuticket.png",
      class: "slide2"
    },
    {
      title: "DESCUBRE NUEVOS EVENTOS",
      image: "../../assets/images/eventos.png",
      class: "slide3"
    },
    {
      title: "REVISA TUS TICKETS",
      image: "../../assets/images/detalles.png",
      class: "slide4"
    },
    {
      title: "",
      image: "",
      class: "slide5"
    },
  ]

  constructor(
    private navCtrl: NavController,
    private storage: Storage
    ) { }

  ngOnInit() {
    
  }

  goToHome() {
    this.navCtrl.navigateBack('menu/home')
    this.storage.set('VolverHomeIntro', true)
  }

  goToRegister() {
    this.navCtrl.navigateForward('/register')
    this.storage.set('MostrarRegister', true)
  }

  goToLogin() {
    this.navCtrl.navigateForward('/login')
    this.storage.set('MostrarLogin', true)
  }

  ionViewDidEnter() {
    console.log('Ya vi la intro')
    this.storage.set('MostreIntro', true)
  }
}

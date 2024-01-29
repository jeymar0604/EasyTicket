import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

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
    private router: Router,
    private storage: Storage) { }

  ngOnInit() {

  }

  goToHome() {
    this.router.navigateByUrl('/home')
    this.storage.set('VolverHome', true)
  }

  goToRegister() {
    this.router.navigateByUrl('/register')
    this.storage.set('MostrarRegister', true)
  }

  goToLogin() {
    this.router.navigateByUrl('/login')
    this.storage.set('MostrarLogin', true)
  }

  ionViewDidEnter() {
    console.log('Ya vi la intro')
    this.storage.set('MostreIntro', true)
  }
}

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
      description: "",
      class: "slide1"
    },
    {
      title: "TU TELEFONO ES TU TICKET",
      image: "../../assets/images/tuticket.png",
      description: "Con tu telefono podras entrar a los eventos",
      class: "slide2"
    },
    {
      title: "DESCUBRE NUEVOS EVENTOS",
      image: "../../assets/images/eventos.png",
      description: "Lorem",
      class: "slide3"
    },
    {
      title: "REVISA TUS TICKETS",
      image: "../../assets/images/detalles.png",
      description: "En la app podras administrar tus Tickets y eventos",
      class: "slide4"
    },
    {
      title: "",
      image: "",
      description: "",
      class: "slide5"
    },
  ]

  constructor(
    private router: Router,
    private storage: Storage) { }

  ngOnInit() {
  }

  goBack() {
    this.router.navigateByUrl('/home')
    this.storage.set('VolverHome', true)
  }

  goToRegister() {
    this.router.navigateByUrl('/home')
    this.storage.set('MostrarRegister', true)
  }

  goToLogin() {
    this.router.navigateByUrl('/home')
    this.storage.set('MostrarLogin', true)
  }
}

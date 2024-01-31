import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  event_list: any;
  category_list: any;
  category: any;

  constructor(
    private navCtrl: NavController,
    private storage: Storage,
    private events: EventsService
  ) { }

  ionViewDidEnter() {
    // Obtener eventos desde el servidor
    this.events.getEvents().then(
      res => {
        this.event_list = res;
        console.log("Events desde el servidor", this.event_list);
      }
    );
  
    // Obtener eventos locales
    console.log("Local Events", this.events.getLocalEvents().events);
  
    // Obtener categorías desde el servidor
    this.events.getCategories().then(
      res => {
        this.category_list = res; // Asumiendo que tienes una variable category_list para almacenar las categorías
        console.log("Categorias", this.category_list);
      }
    );
  
    // Obtener una categoría por ID
    const categoryId = 1; // Reemplaza 1 con el ID de la categoría que deseas obtener
    this.events.getCategoryById(categoryId).then(
      res => {
        this.category = res; // Asumiendo que tienes una variable category para almacenar la categoría
        console.log("Categoría por ID", this.category);
      }
    );
  }
}

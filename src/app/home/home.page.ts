import { Component } from '@angular/core';
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

  selectedEvent: any;
  isModalOpen = false;

  constructor(
    private events: EventsService,
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
        this.category_list = res; // Variable category_list para almacenar las categorías
        console.log("Categorias", this.category_list);
      }
    );
  
    // Obtener una categoría por ID
    const categoryId = 1; // Reemplaza 1 con el ID de la categoría que se desea obtener
    this.events.getCategoryById(categoryId).then(
      res => {
        this.category = res; // Variable category para almacenar la categoría
        console.log("Categoría por ID", this.category);
      }
    );
  }

  //Modal para mostrar los detalles del evento

  //Abrir el modal y mostrar los detalles del evento seleccionado
  setOpen(isOpen: boolean, event: any) {
    this.isModalOpen = isOpen;
    this.selectedEvent = event;
  }

  //Cerrar el modal
  closeModal() {
    this.isModalOpen = false; // Cierra el modal
  }

}

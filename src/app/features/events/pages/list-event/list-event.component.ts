import { Component } from '@angular/core';
import { EventsService } from '../../../../data-access/events.service';
import { EventModel } from '../../../../models/event';
import { BackendServiceService } from '../../../../data-access/backend-service.service';

@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrls: ['./list-event.component.css']
})
export class ListEventComponent {
  searchItem: string = '';

  constructor(private eventsService: EventsService ,private backendService : BackendServiceService) {}

  get events() {
    return this.eventsService.getAllEvents();
  }

  // Likes increments
  whenClicked(event: EventModel) {
    this.eventsService.updateLikes(event.id, event.nbLikes + 1);
  }

  // Expired date
  expired(event: EventModel) {
    return new Date(event.date) < new Date();
  }
  // buy ticket
  buyTicket(event : EventModel){
    return this.eventsService.updatePlace(event.id , event.nbPlaces - 1);
  }
  // Filter
  filter() {
    return this.events.filter((eventItem) =>
      eventItem.title.toLowerCase().includes(this.searchItem.toLowerCase()) ||
      eventItem.place.toLowerCase().includes(this.searchItem.toLowerCase())
    );
  }

  listEvent : EventModel[] = [];
  ngOnInit(){
    this.backendService.getAllEventsFromBackend().subscribe({
      next:(response) => {
        this.listEvent = response.body || [];
        console.log(response.status+" : " +response.statusText)},
        error:(error)=>console.log(error?.error?.message),
    });
    this.backendService.getEventsWithTVA().subscribe({
      next: (eventsWithTVA) => {
        console.log('Événements avec TVA:', eventsWithTVA);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des événements avec TVA:', error);
      }
    });
  }
}

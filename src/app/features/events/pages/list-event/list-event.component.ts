import { Component } from '@angular/core';
import { EventsService } from '../../../../data-access/events.service';
import { EventModel } from '../../../../models/event';

@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrls: ['./list-event.component.css']
})
export class ListEventComponent {
  searchItem: string = '';

  constructor(private eventsService: EventsService) {}

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
}

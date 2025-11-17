import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../../../../data-access/events.service';
import { EventModel } from '../../../../models/event';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  event: EventModel | undefined;

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID depuis l'URL
    const eventId = Number(this.route.snapshot.paramMap.get('id'));

    // Charger les détails de l'événement
    this.event = this.eventsService.getEventById(eventId);
  }

  // Méthode pour vérifier si l'événement est expiré
  isExpired(): boolean {
    if (!this.event) return false;
    return new Date(this.event.date) < new Date();
  }

  onLike(): void {
    if (this.event) {
      this.eventsService.updateLikes(this.event.id, this.event.nbLikes + 1);
    }
  }

  onBuy():void{
    if (this.event) {
      this.eventsService.updatePlace(this.event.id, this.event.nbPlaces - 1);
    }
  }
}

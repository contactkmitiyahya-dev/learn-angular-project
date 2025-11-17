import { Injectable } from '@angular/core';
import { EventModel } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private events: EventModel[] = [
    {
      id: 1,
      title: 'Angular Summit',
      description: 'Conférence sur Angular et l\'écosystème front-end.',
      date: new Date('2026-11-10'),
      place: 'Tunis',
      price: 30.000,
      organizerId: 1,
      imageUrl: 'images/event.png',
      nbPlaces: 25,
      nbLikes: 4,
      detailedAddress: { // ← AJOUTER
        street: 'Avenue Habib Thameur',
        city: 'Sfax',
        governorate: 'Sfax',
        zipcode: '3000'
      }
    },
    {
      id: 2,
      title: 'Web Dev Days',
      description: 'Journée dédiée aux frameworks web modernes.',
      date: new Date('2026-01-05'),
      place: 'Ariana',
      price: 30.000,
      organizerId: 2,
      imageUrl: 'images/event.png',
      nbPlaces: 0,
      nbLikes: 3,
      detailedAddress: { // ← AJOUTER
        street: 'Avenue Habib Thameur',
        city: 'Sfax',
        governorate: 'Sfax',
        zipcode: '3000'
      }
    },
    {
      id: 3,
      title: 'JavaScript Conference',
      description: 'Conférence sur les dernières nouveautés JavaScript.',
      date: new Date('2026-03-15'),
      place: 'Sfax',
      price: 45.000,
      organizerId: 3,
      imageUrl: 'images/event.png',
      nbPlaces: 50,
      nbLikes: 8,
      detailedAddress: { // ← AJOUTER
        street: 'Avenue Habib Thameur',
        city: 'Sfax',
        governorate: 'Sfax',
        zipcode: '3000'
      }
    }
  ];

  getAllEvents(): EventModel[] {
    return this.events;
  }

  getEventById(id: number): EventModel | undefined {
    return this.events.find(event => event.id === id);
  }

  updateLikes(eventId: number, newLikes: number): void {
    const event = this.events.find(e => e.id === eventId);
    if (event) {
      event.nbLikes = newLikes;
    }
  }
  updatePlace(eventId: number, newPlace: number): void {
    const event = this.events.find(e=> e.id === eventId);
    if(event){
      event.nbPlaces = newPlace;
    }
  }
  addEvent(event:any){
    return this.events.push(event);
  }
}

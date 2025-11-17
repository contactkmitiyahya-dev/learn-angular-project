import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EventModel } from '../../../../models/event';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent {

  @Input() event: EventModel | undefined;
  @Output() notifLike: EventEmitter<EventModel> = new EventEmitter<EventModel>();
  @Output() notifBuy: EventEmitter<EventModel> = new EventEmitter<EventModel>();

  likeEvent(): void {
    if (this.event) {
      this.notifLike.emit(this.event);
    }
  }

  buyEvent(): void {
    if (this.event) {
      this.notifBuy.emit(this.event);
    }
  }

  dateExpire(): boolean {
    if (!this.event) return false;
    return new Date(this.event.date) < new Date();
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events.component';
import { EventDetailComponent } from './pages/event-detail/event-detail.component';
import { EventCardComponent } from './components/event-card/event-card.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ListEventComponent } from './pages/list-event/list-event.component';
import { FormsModule } from '@angular/forms';
import { ShareModule } from "../../share/share.module";
import { AddEventComponent } from './components/add-event/add-event.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ParticipationFormComponent } from './components/participation-form/participation-form.component';
import { ListUserComponent } from './components/list-user/list-user.component';


@NgModule({
  declarations: [
    EventsComponent,
    EventDetailComponent,
    EventCardComponent,
    SearchBarComponent,
    ListEventComponent,
    AddEventComponent,
    ParticipationFormComponent,
    ListUserComponent,
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    FormsModule,
    ShareModule,
    ReactiveFormsModule
]
})
export class EventsModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEventComponent } from './pages/list-event/list-event.component';
import { EventDetailComponent } from './pages/event-detail/event-detail.component';
import { EventsComponent } from './events.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { ParticipationFormComponent } from './components/participation-form/participation-form.component';
import { ListUserComponent } from './components/list-user/list-user.component';

const routes: Routes = [
  {
    path: '',
    component: EventsComponent,
    children: [
      { path: '', component: ListEventComponent },
      { path: 'addEvent', component: AddEventComponent },
      {path:'users' , component : ListUserComponent},
      { path:'participer/:id/:price',component:ParticipationFormComponent},
      { path: ':id', component: EventDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }

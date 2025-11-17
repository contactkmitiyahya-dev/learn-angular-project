import { Component } from '@angular/core';
import { EventsService } from '../../../../data-access/events.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { EventModel } from '../../../../models/event';
import { futurDateValidator } from '../../../../share/Validators/future-date.validator';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.css'
})
export class AddEventComponent {

  eventForm!: FormGroup;

  constructor(private EventsService: EventsService, private router: Router) {
    this.eventForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern('[a-zA-Z ]*')
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(30)
      ]),
      price: new FormControl('', [
        Validators.required,
        Validators.pattern('^\\d+(\\.\\d+)?$')
      ]),
      nbPlace: new FormControl('', [
        Validators.required,
        Validators.pattern('^[1-9][0-9]?$|^100$')
      ]),
      place: new FormControl('', [
        Validators.required
      ]),
      date: new FormControl('', [
        Validators.required,
        futurDateValidator(7)
      ]),
      domaines: new FormArray([
        new FormControl('')
      ]),
      detailedAddress: new FormGroup({
        street: new FormControl('', [Validators.required]),
        city: new FormControl('', Validators.required),
        governorate: new FormControl('', Validators.required),
        zipcode: new FormControl('', [
          Validators.required,
          Validators.pattern('^[0-9]{4}$')
        ])
      })
    });
  }

  get title() {
    return this.eventForm.get('title');
  }
  get description() {
    return this.eventForm.get('description');
  }
  get price() {
    return this.eventForm.get('price');
  }
  get nbPlace() {
    return this.eventForm.get('nbPlace');
  }
  get place() {
    return this.eventForm.get('place');
  }
  get date() {
    return this.eventForm.get('date');
  }
  get domaines() {
    return this.eventForm.get('domaines') as FormArray;
  }

  get detailedAddress() {
    return this.eventForm.get('detailedAddress') as FormGroup; // CORRECTION 2: FormGroup (pas FormArray)
  }

  get street() {
    return this.detailedAddress.get('street');
  }
  get city() {
    return this.detailedAddress.get('city');
  }
  get governorate() {
    return this.detailedAddress.get('governorate');
  }
  get zipcode() {
    return this.detailedAddress.get('zipcode');
  }

  addDomain() {
    this.domaines.push(
      new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
      ])
    );
  }

  onSubmit() {
    const FormValue = this.eventForm.value;
    const newEvent: EventModel = {
      id: 5,
      title: FormValue.title, // CORRECTION: 'title' (pas 'titre')
      description: FormValue.description,
      date: FormValue.date,
      price: Number(FormValue.price),
      nbPlaces: Number(FormValue.nbPlace),
      place: FormValue.place,
      imageUrl: '',
      organizerId: 1,
      nbLikes: 0,
      detailedAddress: FormValue.detailedAddress
    };
    this.EventsService.addEvent(newEvent);
    this.router.navigate(['/events']);
  }
}

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-participation-form',
  templateUrl: './participation-form.component.html',
  styleUrls: ['./participation-form.component.css']
})
export class ParticipationFormComponent {
  eventId!: number;
  pricePerPlace!: number;
  showTotalPrice = true;

  participations: any[] = [];

  participationForm!: FormGroup;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.eventId = +this.route.snapshot.paramMap.get('eventId')!;
    this.pricePerPlace = +this.route.snapshot.paramMap.get('price')!;

    this.participationForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}')
      ]),
      places: new FormControl(1, [
        Validators.required,
        Validators.min(1)
      ])
    });
  }

  get email() {
    return this.participationForm.get('email');
  }

  get places() {
    return this.participationForm.get('places');
  }

  get totalPrice() {
    const places = this.places?.value || 1;
    return places * this.pricePerPlace;
  }

  onPlacesBlur() {
    if (this.places?.valid) {
      this.showTotalPrice = true;
    }
  }

  onSubmit() {
    if (this.participationForm.valid) {
      const participation = {
        eventId: this.eventId,
        email: this.email?.value,
        places: this.places?.value,
        totalPrice: this.totalPrice,
        date: new Date()
      };

      this.participations.push(participation);

      this.participationForm.reset({
        email: '',
        places: 1
      });
      this.showTotalPrice = true;
    }
  }
}

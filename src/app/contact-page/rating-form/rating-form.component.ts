import {Component, Renderer2} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ServerCommunicationService} from "../../services/server-communication.service";

@Component({
  selector: 'app-rating-form',
  templateUrl: './rating-form.component.html',
  styleUrls: ['./rating-form.component.css']
})
export class RatingFormComponent {
  ratingForm: FormGroup;

  constructor(private fb: FormBuilder,
              private renderer: Renderer2,
              private serverCommunicationService: ServerCommunicationService) {
    this.ratingForm = this.fb.group({
      title: new FormControl('', Validators.required),
      rating: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
    });
  }

  onSubmit(): void {
    if (this.ratingForm.valid) {
      const { title, rating, message } = this.ratingForm.value;
      this.serverCommunicationService.storeRating(title, rating, message).subscribe(
        response => {
          console.log('Rating stored:', response);
          this.ratingForm.reset();
        },
        error => {
          console.log('Error storing rating:', error);
        }
      );
    } else {
      console.log('Form is not valid.');
    }
  }
}

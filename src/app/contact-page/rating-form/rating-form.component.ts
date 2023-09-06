import {Component, Renderer2} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ServerCommunicationService} from "../../services/server-communication.service";
import {SnackbarService} from "../../services/snackbar.service";

@Component({
  selector: 'app-rating-form',
  templateUrl: './rating-form.component.html',
  styleUrls: ['./rating-form.component.css']
})
export class RatingFormComponent {
  ratingForm: FormGroup;

  constructor(private fb: FormBuilder,
              private renderer: Renderer2,
              private serverCommunicationService: ServerCommunicationService,
              private snackbarService: SnackbarService) {
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
          this.snackbarService.onSuccess("Bewertung wurde erfolgreich gesendet!");
          this.ratingForm.reset();
        },
        error => {
          this.snackbarService.onError("Bewertung konnte nicht gesendet werden!");
        }
      );
    } else {
      console.log('Form is not valid.');
    }
  }
}

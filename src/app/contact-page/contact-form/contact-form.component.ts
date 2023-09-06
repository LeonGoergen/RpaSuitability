import {Component, Renderer2} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ServerCommunicationService} from "../../services/server-communication.service";
import {SnackbarService} from "../../services/snackbar.service";

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder,
              private renderer: Renderer2,
              private serverCommunicationService: ServerCommunicationService,
              private snackbarService: SnackbarService) {
    this.contactForm = this.fb.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl('', Validators.required),
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const { name, email, message } = this.contactForm.value;
      this.serverCommunicationService.storeMessage(name, email, message).subscribe(
        response => {
          this.snackbarService.onSuccess("Nachricht wurde erfolgreich gesendet!");
          this.contactForm.reset();
        },
        error => {
          this.snackbarService.onError("Nachricht konnte nicht gesendet werden!");
        }
      );
    } else {
      console.log('Form is not valid.');
    }
  }
}

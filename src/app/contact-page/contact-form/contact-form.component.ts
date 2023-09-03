import {Component, Renderer2} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ServerCommunicationService} from "../../services/server-communication.service";

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder,
              private renderer: Renderer2,
              private serverCommunicationService: ServerCommunicationService) {
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
          console.log('Message stored:', response);
          this.contactForm.reset();
        },
        error => {
          console.log('Error storing message:', error);
        }
      );
    } else {
      console.log('Form is not valid.');
    }
  }
}

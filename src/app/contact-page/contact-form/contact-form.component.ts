import {Component, Renderer2} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private renderer: Renderer2) {
    this.renderer.setStyle(document.body, 'background', 'lightgrey');
    this.contactForm = this.fb.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl('', Validators.required),
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log('Form data:', this.contactForm.value);
      // TODO: Implement your service call here
      this.contactForm.reset();
    } else {
      console.log('Form is not valid.');
    }
  }
}

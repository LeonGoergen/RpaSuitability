import {Component, Renderer2} from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private renderer: Renderer2) {
    this.renderer.setStyle(document.body, 'background', 'lightgrey');
  }
}

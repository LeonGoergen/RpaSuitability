import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ServerCommunicationService} from "../../services/server-communication.service";

@Component({
  selector: 'app-ratings-slider',
  templateUrl: './ratings-slider.component.html',
  styleUrls: ['./ratings-slider.component.css']
})
export class RatingsSliderComponent implements OnInit, AfterViewInit {
  ratings: any = [];
  speed = 20;

  @ViewChild('sliderWrapper') sliderWrapper!: ElementRef;

  constructor(private serverCommunicationService: ServerCommunicationService) { }

  ngOnInit(): void {
    this.serverCommunicationService.getAllRatings().subscribe(data => {
      this.ratings = data;
    });
  }

  ngAfterViewInit(): void {
    this.startSliding();
  }

  startSliding() {
    const sliderWrapperEl = this.sliderWrapper.nativeElement;
    let offset = 0;

    setInterval(() => {
      offset -= 1; // Adjust the speed if needed

      if (-offset >= 210) {
        offset += 240;

        sliderWrapperEl.style.transition = 'none';
        sliderWrapperEl.style.transform = `translateX(${offset}px)`;

        sliderWrapperEl.offsetHeight;

        sliderWrapperEl.style.transition = 'none';

        const firstChild = sliderWrapperEl.firstChild;
        sliderWrapperEl.removeChild(firstChild);
        sliderWrapperEl.appendChild(firstChild);
      }

      sliderWrapperEl.style.transform = `translateX(${offset}px)`;
    }, this.speed);
  }

  getProperty(object: any, propertyName: string) {
    try {
      return object[propertyName];
    } catch (error) {
      return '';
    }
  }
}

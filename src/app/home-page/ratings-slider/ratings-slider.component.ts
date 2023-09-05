import {AfterViewInit, Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {ServerCommunicationService} from "../../services/server-communication.service";
import {animate, style, transition, trigger} from "@angular/animations";
import {timer} from "rxjs";

@Component({
  selector: 'app-ratings-slider',
  templateUrl: './ratings-slider.component.html',
  styleUrls: ['./ratings-slider.component.css']
})
export class RatingsSliderComponent implements OnInit {
  ratings: any = [];
  visibleRatings: any[] = [];
  currentIndex = 0;
  speed = 5000;  // 5 seconds

  constructor(private serverCommunicationService: ServerCommunicationService) { }

  ngOnInit(): void {
    this.serverCommunicationService.getAllRatings().subscribe(data => {
      this.ratings = data;
      this.visibleRatings = this.ratings.slice(0, 5);
      this.startSliding();
    });
  }

  startSliding() {
    setInterval(() => {
      this.currentIndex++;
      if (this.currentIndex >= this.ratings.length) {
        this.currentIndex = 0;
      }
      this.visibleRatings.shift();
      const nextIndex = (this.currentIndex + 4) % this.ratings.length;  // Adjust as needed
      this.visibleRatings.push(this.ratings[nextIndex]);
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

import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-content-slider',
  templateUrl: './content-slider.component.html',
  styleUrls: ['./content-slider.component.css']
})
export class ContentSliderComponent {
  selectedValue = 0;
  interval: any;
  @Output() selectedValueChange = new EventEmitter<number>();

  ngOnInit() {
    this.startSlider();
  }

  ngAfterViewInit() {
    this.updateLabelClass();
  }

  ngOnDestroy() {
    // Ensure the interval is cleared when the component is destroyed
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  startSlider() {
    this.interval = setInterval(() => {
      this.selectedValue = (this.selectedValue + 1) % 4; // Switch between the values 0, 1, 2 and 3
      this.updateLabelClass();
      this.selectedValueChange.emit(this.selectedValue);
    }, 5000); // Switch every 10 seconds
  }

  onValueChange(value: number) {
    this.selectedValue = value;

    // Clear the current interval and start a new one when a user selects an option
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.startSlider();
    this.updateLabelClass();
    this.selectedValueChange.emit(this.selectedValue);
  }

  updateLabelClass() {
    let labels = document.getElementsByClassName('rad-label');
    for (let i = 0; i < labels.length; i++) {
      labels[i].classList.remove('selected');
    }
    labels[this.selectedValue].classList.add('selected');
  }
}

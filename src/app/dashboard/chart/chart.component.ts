import {Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectorRef} from '@angular/core';
import {Chart, ChartConfiguration, registerables} from "chart.js";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() properties: any = [];
  selectedTimeRange: number = 0;
  chart: Chart | null = null;
  labels: string[] = [];
  data: number[] = [];
  numberOfQuestionnaires: number = 0;

  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.createChartWithData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['labels'] || changes['data']) {
      this.createChart();
    }
  }

  onTimeRangeChange(event: any): void {
    this.selectedTimeRange = Number(event.target.value);
    this.createChartWithData();
    this.cdRef.detectChanges();
  }

  generateTimestamps(timeRange: number): string[] {
    const now = new Date();
    const timestamps = [this.formatDate(now, timeRange)];
    const totalSegments = 6;

    for (let i = 0; i < totalSegments; i++) {
      if (timeRange === 0.0416666667) { // Letzte Stunde
        now.setMinutes(now.getMinutes() - 10);
      } else if (timeRange === 24) { // Letzte 24 Stunden
        now.setHours(now.getHours() - 4);
      } else if (timeRange === 7) { // Letzte 7 Tage
        now.setDate(now.getDate() - 1);
      } else if (timeRange === 30) { // Letzter Monat
        now.setDate(now.getDate() - 5);
      } else if (timeRange === 365) { // Letztes Jahr
        now.setMonth(now.getMonth() - 2);
      }

      timestamps.unshift(this.formatDate(now, timeRange));
    }

    return timestamps;
  }

  formatDate(date: Date, timeRange: number): string {
    const day = date.getDate();
    const month = date.getMonth() + 1; // months are zero indexed
    const year = date.getFullYear();
    const hour = date.getHours();
    const minutes = date.getMinutes();

    if (timeRange <= 0.0416666667) { // If less than or equal to 1 hour
      return `${day}.${month}.${year} ${hour}:${minutes}`;
    } else if (timeRange <= 24) { // If less than or equal to 24 hours
      return `${day}.${month}.${year} ${hour}:00`;
    } else { // If more than 24 hours
      return `${day}.${month}.${year}`;
    }
  }

  createChartWithData() {
    this.labels = this.generateTimestamps(this.selectedTimeRange);

    const intervals = this.labels.map(label => {
      const [day, month, year, hour, minute] = label.split(/[. :]/).map(Number);
      return new Date(year, month - 1, day, hour || 0, minute || 0);
    });

    this.data = new Array(this.labels.length).fill(0);

    for (let i = 0; i < this.properties.length; i++) {
      const date = new Date(this.properties[i].timestamp);

      for (let j = 0; j < intervals.length - 1; j++) {
        if (date >= intervals[j] && date < intervals[j + 1]) {
          this.data[j]++;
          break;
        }
      }

      if (date >= intervals[intervals.length - 1]) {
        this.data[this.data.length - 1]++;
      }
    }

    this.numberOfQuestionnaires = this.data.reduce((a, b) => a + b, 0);
    this.createChart();
  }

  createChart() {
    const canvas = document.getElementById('myChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (ctx === null) {
      console.error('Could not get the context of the canvas');
      return;
    }

    if(this.chart) {
      this.chart.destroy();
    }

    Chart.register(...registerables);
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'Anzahl der Einträge',
          data: this.data,
          fill: true,
          backgroundColor: 'rgba(75, 192, 192, 0.1)',
          borderColor: 'rgb(75, 192, 192)',
          borderWidth: 2,
          pointBackgroundColor: 'rgb(75, 192, 192)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(75, 192, 192)'
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: '#000',
              font: {
                size: 14,
              },
            },
          },
          y: {
            grid: {
              color: '#ddd',
              borderDash: [5, 5]
            },
            ticks: {
              color: '#000',
              font: {
                size: 14,
              },
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            labels: {
              color: '#000',
              font: {
                size: 18,
              },
            },
          },
        },
      }
    } as ChartConfiguration);
  }
}

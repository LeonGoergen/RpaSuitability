import {Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectorRef} from '@angular/core';
import {Chart, ChartConfiguration, registerables} from "chart.js";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() properties: any = [];
  selectedTimeRange: number = 0.0416666667;
  chart: Chart | null = null;
  labels: string[] = [];
  data: number[] = [];

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

  createChartWithData() {
    const now = new Date();
    const dataByDate = this.properties.reduce((accum: any, curr: any) => {
      const date = new Date(curr.timestamp);

      if (isNaN(date.getTime())) {
        return accum;
      }

      const diffInDays = Math.round((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
      if (diffInDays > this.selectedTimeRange) {
        return accum;
      }

      const key = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`;

      if (!accum[key]) {
        accum[key] = 0;
      }

      accum[key]++;
      return accum;
    }, {});

    this.labels = Object.keys(dataByDate).sort();
    this.data = this.labels.map(label => dataByDate[label]);

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

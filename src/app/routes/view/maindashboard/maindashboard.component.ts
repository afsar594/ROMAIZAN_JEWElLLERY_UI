import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-maindashboard',
  templateUrl: './maindashboard.component.html',
  styleUrls: ['./maindashboard.component.scss']
})
export class MaindashboardComponent implements OnInit {

  title: string;
  subtitle: string;
  data: any;
  options: any;
  chart: any;
  // lineChart:any;
  constructor(private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
      this.subtitle = data.subtitle;
    });
    var oilCanvas: any = document.getElementById("oilChart");

    var oilData = {
      labels: [
        "Saudi Arabia",
        "Russia",
        "Iraq",
        "United Arab Emirates",
        "Canada"
      ],
      datasets: [
        {
          data: [133.3, 86.2, 52.2, 51.2, 50.2],
          backgroundColor: [
            "#FF6384",
            "#63FF84",
            "#84FF63",
            "#8463FF",
            "#6384FF"
          ]
        }
      ]
    };

    var pieChart = new Chart(oilCanvas, {
      type: 'pie',
      data: oilData,
      options: {
        legend: {
          position: 'right',
          align: 'center'
        }
      }
    });

    var lineCanvas: any = document.getElementById("lineChart");

    var lineData = {
      labels: [
        "Saudi Arabia",
        "Russia",
        "Iraq",
        "United Arab Emirates",
        "Canada"
      ],
      datasets: [
        {
          data: [133.3, 86.2, 52.2, 51.2, 50.2],
          backgroundColor: [
            "#FF6384",
            "#63FF84",
            "#84FF63",
            "#8463FF",
            "#6384FF"
          ]
        }
      ]
    };

    var lineChart = new Chart(lineCanvas, {
      type: 'line',
      data: lineData,
      options: {
        legend: {
          position: 'right',
          align: 'center'
        }
      }
    });
    var barCanvas: any = document.getElementById("barChart");

    var lineData = {
      labels: [
        "Saudi Arabia",
        "Russia",
        "Iraq",
        "United Arab Emirates",
        "Canada"
      ],
      datasets: [
        {
          data: [133.3, 86.2, 52.2, 51.2, 50.2],
          backgroundColor: [
            "#FF6384",
            "#63FF84",
            "#84FF63",
            "#8463FF",
            "#6384FF"
          ]
        }
      ]
    };

    var barChart = new Chart(barCanvas, {
      type: 'bar',
      data: lineData,
      options: {
        legend: {
          position: 'right',
          align: 'center',

        }
      }
    });



  }


}

import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  NgZone,
} from '@angular/core';
import { DashboardService } from './dashboard.srevice';
import { SelectItem } from 'primeng/api/selectitem';
import { MenuItem } from 'primeng/api/menuitem';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  cities: SelectItem[];

  cars: any[];

  cols: any[];

  chartData: any;

  events: any[];

  selectedCity: any;

  selectedCar: any;

  items: MenuItem[];

  fullcalendarOptions: any;

  constructor() { }

  ngOnInit() {
    

      this.cols = [
          { field: 'vin', header: 'Vin' },
          { field: 'year', header: 'Year' },
          { field: 'brand', header: 'Brand' },
          { field: 'color', header: 'Color' }
      ];


      this.cities = [];
      this.cities.push({label: 'Select City', value: null});
      this.cities.push({label: 'New York', value: {id: 1, name: 'New York', code: 'NY'}});
      this.cities.push({label: 'Rome', value: {id: 2, name: 'Rome', code: 'RM'}});
      this.cities.push({label: 'London', value: {id: 3, name: 'London', code: 'LDN'}});
      this.cities.push({label: 'Istanbul', value: {id: 4, name: 'Istanbul', code: 'IST'}});
      this.cities.push({label: 'Paris', value: {id: 5, name: 'Paris', code: 'PRS'}});

      this.chartData = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
              {
                  label: 'First Dataset',
                  data: [65, 59, 80, 81, 56, 55, 40],
                  fill: false,
                  borderColor: '#FFC107'
              },
              {
                  label: 'Second Dataset',
                  data: [28, 48, 40, 19, 86, 27, 90],
                  fill: false,
                  borderColor: '#03A9F4'
              }
          ]
      };

      this.items = [
          {label: 'Save', icon: 'fa fa-check'},
          {label: 'Update', icon: 'fa fa-refresh'},
          {label: 'Delete', icon: 'fa fa-trash'}
      ];

  }

}

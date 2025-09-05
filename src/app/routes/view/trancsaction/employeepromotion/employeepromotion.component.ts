import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-employeepromotion',
  templateUrl: './employeepromotion.component.html',
  styleUrls: ['./employeepromotion.component.scss']
})
export class EmployeepromotionComponent implements OnInit {

  
  title: string;
  subtitle: string;
  EPForm: FormGroup;
  index: number = 0;
  handleChange(e) {
    this.index = e.index;
  }

  constructor(
    private activatedroute: ActivatedRoute,
    private fb: FormBuilder,
    private translate: TranslateService
  ) { }
  

  ngOnInit(): void {
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
      this.subtitle = data.substitle;
    });
    this.EPForm = new FormGroup({
      Date: new FormControl(new Date(new Date().setFullYear(new Date().getFullYear())), Validators.required),
      ID: new FormControl('', Validators.required),
      NewDesignation: new FormControl('', Validators.required),
      CurrentDesignation: new FormControl('', Validators.required),
      Remarks: new FormControl('', Validators.required),


    });
 
  }
  get f() {
    return this.EPForm.controls;
  }
}



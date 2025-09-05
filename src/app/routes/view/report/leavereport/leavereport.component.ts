import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-leavereport',
  templateUrl: './leavereport.component.html',
  styleUrls: ['./leavereport.component.scss']
})
export class LeavereportComponent implements OnInit {
title:string;
subtitle:string;
index: number = 0;
handleChange(e) {
  this.index = e.index;
}

  constructor( 
    private activatedroute:ActivatedRoute,
    private fb:FormBuilder,
    private translate:TranslateService 
    ) { }

  ngOnInit(): void {
    this.activatedroute.data.subscribe(data=>{
      this.title=data.title;
      this.subtitle=data.subtitle;
    })
  }

}

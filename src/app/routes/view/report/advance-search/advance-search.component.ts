import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HotTableRegisterer } from '@handsontable/angular';
import { TranslateService } from '@ngx-translate/core';
import Handsontable from 'handsontable';

@Component({
  selector: 'app-advance-search',
  templateUrl: './advance-search.component.html',
  styleUrls: ['./advance-search.component.scss']
})
export class AdvanceSearchComponent implements OnInit {
title:string;
subtitle:string;
licensekey: any;
  gridHeader: string;
  dataset:any;
index: number = 0;
handleChange(e) {
  this.index = e.index;
}
 
leavereport: Handsontable.GridSettings;
private hotRegisterer = new HotTableRegisterer();
hotid = 'leavereport';
initializeControls() {
  this.leavereport = {
    rowHeaders: true,
    viewportColumnRenderingOffset: 27,
    viewportRowRenderingOffset: 'auto',
    colWidths: 150,
    minRows: 10,
    height: 'auto',
    rowHeights: 23,
    fillHandle: {
      direction: 'vertical',
      autoInsertRow: true
    },


    data: [],
    minSpareRows: 1,
    allowInsertRow: true,
    stretchH: "all",
    manualRowResize: true,
    manualColumnResize: true,
    columns: [
      {
        data: 'Staff Code',
        type: 'text'
      },
      {
        data: 'Staff Name',
        type: 'text',
      },
      {
        data: 'Father Name',
        type: 'text'
      },
      {
        data: 'Gendeer',
        type: 'text'
      },
      {
        data: 'DOB',
        type: 'text'
      },
      {
        data: 'Nationality',
        type: 'text'
      },
      {
        data: 'Department',
        type: 'text',
      },
      {
        data: 'DOJ',
        type: 'text'
      },
      {
        data: 'Designation',
        type: 'text'
      },
      {
        data: 'Religion',
        type: 'text'
      }
    ],
    colHeaders: [
      this.translate.instant('Staff Code'),
      this.translate.instant('Staff Name'),
      this.translate.instant('Father Name'),
      this.translate.instant('Gender'),
      this.translate.instant('DOB'),
      this.translate.instant('Nationality'),
      this.translate.instant('Department'),
      this.translate.instant('DOJ'),
      this.translate.instant('Designation'),
      this.translate.instant('Religion'),
    ],
    manualRowMove: true,
    manualColumnMove: true,
    contextMenu: true,
    filters: true,
    dropdownMenu: true,
  };


}
  constructor( private activatedroute:ActivatedRoute,
    private fb:FormBuilder,
    private translate:TranslateService ) { }

  ngOnInit(): void {
    this.activatedroute.data.subscribe(data=>{
      this.title=data.title;
      this.subtitle=data.subtitle;
    });
    this.initializeControls()
  }


}

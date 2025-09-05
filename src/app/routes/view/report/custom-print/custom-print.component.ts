import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HotTableRegisterer } from '@handsontable/angular';
import { TranslateService } from '@ngx-translate/core';
import Handsontable from 'handsontable';

@Component({
  selector: 'app-custom-print',
  templateUrl: './custom-print.component.html',
  styleUrls: ['./custom-print.component.scss']
})
export class CustomPrintComponent implements OnInit {
title:string;
subtitle:string;
sourceProducts!: any[];

targetProducts!: any[];
index: number = 0;
  licensekey: string;
  handleChange(e) {
    this.index = e.index;
  }
customprint:Handsontable.GridSettings;
private hotRegisterer = new HotTableRegisterer();
  hotid = 'customprint';
  initializeControls() {
    this.customprint = {
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
         
          data: 'A',
          type: 'text',
        },
        {
         
          data: 'B',
          type: 'text',
        },
        {
         
          data: 'C',
          type: 'text',
        },
        {
         
          data: 'D',
          type: 'text',
        },
        {
         
          data: 'E',
          type: 'text',
        },
        {
         
          data: 'F',
          type: 'text',
        },
        {
         
          data: 'G',
          type: 'text',
        },
        {
         
          data: 'H',
          type: 'text',
        },
        {
         
          data: 'I',
          type: 'text',
        },
           {
         
          data: 'J',
          type: 'text',
        },
        {
         
          data: 'K',
          type: 'text',
        },
        {
         
          data: 'L',
          type: 'text',
        },
        {
         
          data: 'M',
          type: 'text',
        },
      ],
      colHeaders: [
        this.translate.instant('A'),
        this.translate.instant('B'),
        this.translate.instant('C'),
        this.translate.instant('D'),
        this.translate.instant('E'),
        this.translate.instant('F'),
        this.translate.instant('G'),
        this.translate.instant('H'),
        this.translate.instant('I'),
        this.translate.instant('J'),
        this.translate.instant('K'),
        this.translate.instant('L'),
        this.translate.instant('M'),
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
    this.initializeControls();
  }

}

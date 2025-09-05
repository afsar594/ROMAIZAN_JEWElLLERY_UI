import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HotTableRegisterer } from '@handsontable/angular';
import { TranslateService } from '@ngx-translate/core';
import Handsontable from 'handsontable';

@Component({
  selector: 'app-salaryheads',
  templateUrl: './salaryheads.component.html',
  styleUrls: ['./salaryheads.component.scss']
})
export class SalaryheadsComponent implements OnInit {

  title: string;
  dataset: any;
  subtitle: string;
  gridHeader: string;
  index: number = 0;
    handleChange(e) {
     this.index = e.index;
   }
  
   hotid = 'monthlypakege';
   licensekey:string = 'non-commercial-and-evaluation';
   private hotRegisterer = new HotTableRegisterer();
    monthlypakege: Handsontable.GridSettings;
   initializeControls() {
    this. monthlypakege= {
      rowHeaders: true,
      viewportColumnRenderingOffset: 27,
      viewportRowRenderingOffset: 'auto',
      colWidths: [60,30,30,30,30],
      minRows: 3,
      width: '100%',
      height: 300,
      rowHeights: 23,
      fillHandle: {
        direction: 'vertical',
        autoInsertRow: true
      },
      data: [],
      minSpareRows: 1,
      allowInsertRow: true,
      allowInsertColumn: false,
      allowRemoveColumn: false,
      allowRemoveRow: false,
      autoWrapRow: false,
      autoWrapCol: false,
      maxRows: 22,
      stretchH: "all",
      manualRowResize: true,
      manualColumnResize: true,
      columns: [
        {
          data: 'ID',
          type: 'text'
        },
        {
          data: 'Head Name',
          type: 'text',
        },
        {
          data: 'AMOUNT',
          type: 'text'
        },
        
         
      ],
      colHeaders: [
       this.translate.instant('ID'),
      this.translate.instant('Head Name'),
      this.translate.instant('AMOUNT'),
     
    ],

      manualRowMove: true,
      manualColumnMove: true,
      contextMenu: true,
      filters: true,
      dropdownMenu: true,
    }
  }
   hotid1 = 'variablearning';
   licensekey1:string = 'non-commercial-and-evaluation';
   private hotRegisterer1 = new HotTableRegisterer();
   variablearning: Handsontable.GridSettings;
   initializeControls1() {
    this. variablearning= {
      rowHeaders: true,
      viewportColumnRenderingOffset: 27,
      viewportRowRenderingOffset: 'auto',
      colWidths: [60,30,30,30,30],
      minRows: 3,
      width: '100%',
      height: 300,
      rowHeights: 23,
      fillHandle: {
        direction: 'vertical',
        autoInsertRow: true
      },
      data: [],
      minSpareRows: 1,
      allowInsertRow: true,
      allowInsertColumn: false,
      allowRemoveColumn: false,
      allowRemoveRow: false,
      autoWrapRow: false,
      autoWrapCol: false,
      maxRows: 22,
      stretchH: "all",
      manualRowResize: true,
      manualColumnResize: true,
      columns: [
        {
          data: 'ID',
          type: 'text'
        },
        {
          data: 'Head Name',
          type: 'text',
        },
        {
          data: 'AMOUNT',
          type: 'text'
        },
        
         
      ],
      colHeaders: [
       this.translate.instant('ID'),
      this.translate.instant('Head Name'),
      this.translate.instant('AMOUNT'),
     
    ],

      manualRowMove: true,
      manualColumnMove: true,
      contextMenu: true,
      filters: true,
      dropdownMenu: true,
    }
  }

 hotid2 = 'variabldeduction';
   licensekey2:string = 'non-commercial-and-evaluation';
   private hotRegisterer2 = new HotTableRegisterer();
   variabldeduction: Handsontable.GridSettings;
   initializeControls2() {
    this. variabldeduction= {
      rowHeaders: true,
      viewportColumnRenderingOffset: 27,
      viewportRowRenderingOffset: 'auto',
      colWidths: [60,30,30,30,30],
      minRows: 3,
      width: '100%',
      height: 300,
      rowHeights: 23,
      fillHandle: {
        direction: 'vertical',
        autoInsertRow: true
      },
      data: [],
      minSpareRows: 1,
      allowInsertRow: true,
      allowInsertColumn: false,
      allowRemoveColumn: false,
      allowRemoveRow: false,
      autoWrapRow: false,
      autoWrapCol: false,
      maxRows: 22,
      stretchH: "all",
      manualRowResize: true,
      manualColumnResize: true,
       columns: [
        {
          data: 'ID',
          type: 'text'
        },
        {
          data: 'Head Name',
          type: 'text',
        },
        {
          data: 'AMOUNT',
          type: 'text'
        },
        
         
      ],
      colHeaders: [
       this.translate.instant('ID'),
      this.translate.instant('Head Name'),
      this.translate.instant('AMOUNT'),
     
    ],

      manualRowMove: true,
      manualColumnMove: true,
      contextMenu: true,
      filters: true,
      dropdownMenu: true,
    }
  }


  constructor(
    private activatedroute: ActivatedRoute,
    private fb: FormBuilder,
    private translate: TranslateService,
  ) { }

   
  ngOnInit(): void {
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
      this.subtitle = data.title;
    });
    this.initializeControls()
    this.initializeControls1() 
    this.initializeControls2()
  }

}
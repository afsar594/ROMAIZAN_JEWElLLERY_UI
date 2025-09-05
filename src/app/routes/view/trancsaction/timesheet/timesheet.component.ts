import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HotTableRegisterer } from '@handsontable/angular';
import { TranslateService } from '@ngx-translate/core';
import Handsontable from 'handsontable';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetComponent implements OnInit {
  title: string;
  subtitle: any;
  TSForm: FormGroup;
  gridHeader: string;
   index: number = 0;
  handleChange(e) {
   this.index = e.index;
 }

 hotid = 'timesheet';
 licensekey:string = 'non-commercial-and-evaluation';
 private hotRegisterer = new HotTableRegisterer();
 timesheet: Handsontable.GridSettings;
 initializeControls() {
  this.  timesheet= {
    rowHeaders: true,
    viewportColumnRenderingOffset: 27,
    viewportRowRenderingOffset: 'auto',
    colWidths: [30,60,30,30,30],
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
    // allowInsertColumn: false,
    // allowRemoveColumn: false,
    // allowRemoveRow: false,
    // autoWrapRow: false,
    // autoWrapCol: false,
    //  autoWrapRow: true,
    // height: 487,
    // maxRows: 22,
    stretchH: "all",
    manualRowResize: true,
    manualColumnResize: true,
    columns: [
      {
        data: 'Code',
        type: 'text'
      },
      {
        data: 'Name',
        type: 'text',
      },
      {
        data: 'Designation',
        type: 'text'
      } ,
      {
        data: 'Site',
        type: 'text'
      },
      {
        data: 'Normal Hour',
        type: 'text',
      },
      {
        data: 'OT',
        type: 'text'
      } ,
      {
        data: 'Remarks',
        type: 'text'
      }
    ],
    colHeaders: [
      this.translate.instant('Code'),
      this.translate.instant('Name'),
      this.translate.instant('Designation'),
      this.translate.instant('Site'),
      this.translate.instant('Normal Hour'),
      this.translate.instant('OT'),
       this.translate.instant('Remarks'), 
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
    this.TSForm = new FormGroup({
      SITE: new FormControl('', Validators.required),
      TSDate: new FormControl(new Date(new Date().setFullYear(new Date().getFullYear())), Validators.required),
      TSID: new FormControl('', Validators.required),
      REMARKS: new FormControl('', Validators.required),
       
    });
    this. initializeControls()
  }


  get f() {
    return this.TSForm.controls;
  }
  

}
 
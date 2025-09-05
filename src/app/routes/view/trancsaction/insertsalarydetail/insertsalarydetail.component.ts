import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HotTableRegisterer } from '@handsontable/angular';
import { TranslateService } from '@ngx-translate/core';
import Handsontable from 'handsontable';

@Component({
  selector: 'app-insertsalarydetail',
  templateUrl: './insertsalarydetail.component.html',
  styleUrls: ['./insertsalarydetail.component.scss']
})
export class InsertsalarydetailComponent implements OnInit { 
  title: string;
  subtitle: string;
  InsertsalaryForm: FormGroup;
    dataset: any;
  gridHeader: string;
   index: number = 0;
  handleChange(e) {
   this.index = e.index;
 }

 hotid = 'Insertsalary';
 licensekey:string = 'non-commercial-and-evaluation';
 private hotRegisterer = new HotTableRegisterer();
 Insertsalary: Handsontable.GridSettings;
 initializeControls() {
  this.  Insertsalary= {
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
        data: 'Staff_Code',
        type: 'text'
      },
      {
        data: 'Name',
        type: 'text',
      },
      {
        data: 'Amount',
        type: 'text'
      } ,
      {
        data: 'Remarks',
        type: 'text'
      }
    ],
    colHeaders: [
      this.translate.instant('Staff Code'),
      this.translate.instant('Name'),
      this.translate.instant('Amount'),
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
      this.subtitle = data.subtitle;
      
    }
    );
    this.InsertsalaryForm = new FormGroup({
   Year: new FormControl(new Date().setFullYear(new Date().getFullYear() - 5)),
      Month: new FormControl(new Date().setFullYear(new Date().getFullYear() - 5)),
      Searchstaff: new FormControl('', Validators.required),
      Salaryheads: new FormControl('', Validators.required),
    }); 
   this.initializeControls()
  }
 
  get f() {
    return this.InsertsalaryForm.controls;
  }
}




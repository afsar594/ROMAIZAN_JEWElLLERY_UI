import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HotTableRegisterer } from '@handsontable/angular';
import { TranslateService } from '@ngx-translate/core';
import Handsontable from 'handsontable';

@Component({
  selector: 'app-changdepartment',
  templateUrl: './changdepartment.component.html',
  styleUrls: ['./changdepartment.component.scss']
})
export class ChangdepartmentComponent implements OnInit {

  title: string;
  subtitle: string;
  CDForm: FormGroup;
  index: number = 0;
  handleChange(e) {
    this.index = e.index;
  }

  constructor(
    private activatedroute: ActivatedRoute,
    private fb: FormBuilder,
    private translate: TranslateService
  ) { }
  hotid = 'changedepartment';
  licensekey:string = 'non-commercial-and-evaluation';
  private hotRegisterer = new HotTableRegisterer();
  changedepartment: Handsontable.GridSettings;
  initializeControls() {
   this. changedepartment= {
     rowHeaders: true,
     viewportColumnRenderingOffset: 27,
     viewportRowRenderingOffset: 'auto',
     colWidths: [40,70,40,40,70],
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
     stretchH: "all",
     manualRowResize: true,
     manualColumnResize: true,
     columns: [
       {
         data: 'Code',
         type: 'text'
       },
       {
         data: 'Staff Name',
         type: 'text',
       },
       {
        data: 'Cur. Department',
        type: 'text'
      },
      {
        data: 'New Department',
        type: 'text',
      },
       {
         data: 'Remarks',
         type: 'text'
       }  
        
     ],
     colHeaders: [
       this.translate.instant('Code'),
       this.translate.instant('Staff Name'),
       this.translate.instant('Cur. Department'),
       this.translate.instant('New Department'),
       this.translate.instant('Remarks'),
     ],
     manualRowMove: true,
     manualColumnMove: true,
     contextMenu: true,
     filters: true,
     dropdownMenu: true,
   }
 }

  ngOnInit(): void {
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
      this.subtitle = data.substitle;
    });
    this.CDForm = new FormGroup({
      Date: new FormControl(new Date(new Date().setFullYear(new Date().getFullYear())), Validators.required),
      Id: new FormControl('', Validators.required),
      Remarks: new FormControl('', Validators.required),


    });
 this. initializeControls()
  }
  get f() {
    return this.CDForm.controls;
  }
}




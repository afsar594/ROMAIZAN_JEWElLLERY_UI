import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { TimeSheet2 } from 'src/app/routes/domain/TimeSheet2';
import { MasterApiService } from 'src/app/routes/service/master.api.services';
import { TimesheetService } from 'src/app/routes/service/timesheet.service';

@Component({
  selector: 'app-timesheetmultiplestaff',
  templateUrl: './timesheetmultiplestaff.component.html',
  styleUrls: ['./timesheetmultiplestaff.component.scss']
})
export class TimesheetmultiplestaffComponent implements OnInit {
  first = 0;
  rows = 10;
  enableButtons: boolean = true
  staffSearch: string = ""
  TSMultipleStaffForm: FormGroup;
  dataArray: any[];
  tableData: any[] = [];
  Year: number[] = [2020, 2021, 2022, 2023]
  Month: string[] = ["January", "February", "March", "April"]
  submitted: boolean;
  constructor(private fb: FormBuilder, private translate: TranslateService, public masterApiService: MasterApiService,
    private timeSheetService: TimesheetService, private messageService: MessageService) {

  }
  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.TSMultipleStaffForm = new FormGroup({
      TsDate: new FormControl({ value: new Date(new Date().setFullYear(new Date().getFullYear())), disabled: false }, Validators.required),
      TsID: new FormControl({ value: 0, disabled: false }),
      Remarks: new FormControl({ value: '', disabled: false }),
      SiteId: new FormControl(null, Validators.required),
      DocType: new FormControl('TimeSheetMultipleStaff'),
      SubmitTs: new FormControl(true),
      MonthId: new FormControl(null, Validators.required),
      TsYear: new FormControl(null, Validators.required)

    });
  }

  get f() {
    return this.TSMultipleStaffForm.controls;
  }

  onClickNew() {
    this.TSMultipleStaffForm.controls.SITE.enable()
    this.TSMultipleStaffForm.controls.TSDate.enable()
    this.TSMultipleStaffForm.controls.Month.enable()
    this.TSMultipleStaffForm.controls.REMARKS.enable()
    this.TSMultipleStaffForm.controls.Year.enable()
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.tableData ? this.first === this.tableData.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.tableData ? this.first === 0 : true;
  }

  onSave() {
    this.submitted = true
    if (this.TSMultipleStaffForm.invalid) {
      return;
    }
    else {
      this.TSMultipleStaffForm.controls.TsDate.enable()
      this.TSMultipleStaffForm.controls.Remarks.enable()
      this.timeSheetService.InsertHrTimeSheet2(this.TSMultipleStaffForm.value).subscribe((res: TimeSheet2[]) => {
        this.TSMultipleStaffForm.controls.TsID.setValue(res[res.length - 1].tsID)
        this.enableButtons = false
        this.submitted = false
        this.messageService.add({ severity: 'success', summary: 'Saved', detail: 'Saved Successfully.' });
      }, (error: any) => {
        this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
      })
    }
  }
}

export class SheetModel {
  Code: any = "";
  Name?: any = ''
  Designation?: any = ''
  Site: any = "";
  TotalHour?: any = ''
  OT?: any = ''
  Remarks?: any = ''
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { TimeSheet2 } from 'src/app/routes/domain/TimeSheet2';
import { MasterApiService } from 'src/app/routes/service/master.api.services';
import { TimesheetService } from 'src/app/routes/service/timesheet.service';

@Component({
  selector: 'app-timesheetbreakup',
  templateUrl: './timesheetbreakup.component.html',
  styleUrls: ['./timesheetbreakup.component.scss']
})
export class TimesheetbreakupComponent implements OnInit {
  first = 0;
  rows = 10;
  enableButtons: boolean = true
  staffSearch: string = ""
  staffModal: boolean = false
  TSBreakUpForm: FormGroup;
  tableData: any[] = [];
  submitted: boolean;
  constructor(private fb: FormBuilder, private translate: TranslateService, public masterApiService: MasterApiService,
    private timeSheetService: TimesheetService, public messageService: MessageService) {

  }
  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.TSBreakUpForm = new FormGroup({
      TsDate: new FormControl({ value: new Date(new Date().setFullYear(new Date().getFullYear())), disabled: false }, Validators.required),
      TemplateDate: new FormControl(''),
      TsID: new FormControl({ value: 0, disabled: false }),
      Remarks: new FormControl({ value: '', disabled: false }),
      DocType: new FormControl('TimeSheetBreakUp'),
      SubmitTs: new FormControl(true),
      DTLID: new FormControl(''),
      Day: new FormControl(''),
    });
  }

  get f() {
    return this.TSBreakUpForm.controls;
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
    if (this.TSBreakUpForm.invalid) {
      return;
    }
    else {
      this.enableButtons = false
      this.timeSheetService.InsertHrTimeSheet2(this.TSBreakUpForm.value).subscribe((res: TimeSheet2[]) => {
        this.TSBreakUpForm.controls.TsID.setValue(res[res.length - 1].tsID)
        this.enableButtons = false
        this.submitted = false
        this.messageService.add({ severity: 'success', summary: 'Saved', detail: 'Saved Successfully.' });
      }, (error: any) => {
        this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
      })
    }
  }
}

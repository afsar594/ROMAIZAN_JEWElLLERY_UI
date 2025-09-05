import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { StaffMaster } from 'src/app/routes/domain/StaffMaster';
import { TimeSheet2 } from 'src/app/routes/domain/TimeSheet2';
import { MasterApiService } from 'src/app/routes/service/master.api.services';
import { TimesheetService } from 'src/app/routes/service/timesheet.service';

@Component({
  selector: 'app-timsheetkz',
  templateUrl: './timsheetkz.component.html',
  styleUrls: ['./timsheetkz.component.scss']
})
export class TimsheetkzComponent implements OnInit {
  first = 0;
  rows = 10;
  enableButtons: boolean = true
  staffSearch: string = ""
  staffModal: boolean = false
  TSKZForm: FormGroup;
  tableData: any[] = [];
  submitted: boolean;
  constructor(private fb: FormBuilder, private translate: TranslateService, public masterApiService: MasterApiService,
    private timeSheetService: TimesheetService, private messageService: MessageService) {

  }
  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.TSKZForm = new FormGroup({
      TsDate: new FormControl({ value: new Date(new Date().setFullYear(new Date().getFullYear())), disabled: false }, Validators.required),
      TsID: new FormControl({ value: 0, disabled: false }),
      Remarks: new FormControl({ value: '', disabled: false }),
      StaffId: new FormControl(''),
      StaffName: new FormControl({ value: '', disabled: false }, Validators.required),
      DocType: new FormControl('TimeSheetKZ'),
      SubmitTs: new FormControl(true)
    });
  }

  get f() {
    return this.TSKZForm.controls;
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

  onSearchStaff(value: string) {
    this.masterApiService.staffMasterArray = this.masterApiService.staffMasterArrayDuplicate.filter(o => o.staffCode.toLowerCase().includes(value.toLowerCase()) || o.fullName.toLowerCase().includes(value.toLowerCase()))
  }

  setStaffName(value: StaffMaster) {
    this.TSKZForm.controls.StaffId.setValue(value.staffId)
    this.TSKZForm.controls.StaffName.setValue(value.fullName)
    this.staffModal = false
  }

  onSave() {
    this.submitted = true
    if (this.TSKZForm.invalid) {
      return;
    }
    else {
      this.TSKZForm.controls.TsDate.enable()
      this.TSKZForm.controls.Remarks.enable()
      this.timeSheetService.InsertHrTimeSheet2(this.TSKZForm.value).subscribe((res: TimeSheet2[]) => {
        this.TSKZForm.controls.TsID.setValue(res[res.length - 1].tsID)
        this.enableButtons = false
        this.submitted = false
        this.messageService.add({ severity: 'success', summary: 'Saved', detail: 'Saved Successfully.' });
      }, (error: any) => {
        this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
      })
    }
  }
}

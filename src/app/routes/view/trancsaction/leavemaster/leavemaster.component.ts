import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng';
import { MasterApiService } from 'src/app/routes/service/master.api.services';
import { TransactionService } from 'src/app/routes/service/transaction-service.service';

@Component({
  selector: 'app-leavemaster',
  templateUrl: './leavemaster.component.html',
  styleUrls: ['./leavemaster.component.scss']
})
export class LeavemasterComponent implements OnInit {
  index: any;
  title: any;
  subtitle: any;
  first: any;
  rows: any;
  submittedMultiple: boolean;
  isEditBtndisable: boolean;
  dataArray: any[];
  listModal: boolean;
  dtailListModal: boolean;
  staffName: any;
  staffId: any
  handleChange(e) {
    this.index = e == 0 ? 0 : e.index;
  }
  submitted: boolean = false
  LeaveMasterForm: FormGroup
  constructor(private fb: FormBuilder, public masterApiService: MasterApiService, public transactionService: TransactionService,
    private messageService: MessageService, private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
      this.subtitle = data.subtitle
    });
    this.initForm()
    this.transactionService.GetAllLeaveMasterStaff()
    this.transactionService.GetAllHrLeaveMasters()
    this.masterApiService.GetAllHrLeaveType()
    this.masterApiService.getAllStaffMasterWithSubscribe()
    // this.getDates(new Date(2023, 1, 1), new Date())
  }

  // getDates(startDate, stopDate) {
  //   var dateArray2 = new Array();
  //   var currentDate = startDate;
  //   while (currentDate <= stopDate) {
  //     dateArray2.push(new Date(currentDate));
  //     currentDate = new Date(currentDate).setDate(1);
  //   }
  //   console.log(dateArray2)
  //   return dateArray2;
  // }

  initForm() {
    this.LeaveMasterForm = this.fb.group({
      leaveId: new FormControl(0),
      lappCode: new FormControl(null),
      staffId: new FormControl(null, Validators.required),
      leavetypeId: new FormControl(null, Validators.required),
      appLeaveFrom: new FormControl(new Date()),
      appLeaveTo: new FormControl(new Date()),
      noofdays: new FormControl(0, Validators.required),
      leaveStart: new FormControl(new Date()),
      rejoiningDate: new FormControl(new Date()),
      reason: new FormControl(null, Validators.required),
      contactDetails: new FormControl(null, Validators.required),
      applicationDate: new FormControl(new Date()),
      approvalDate: new FormControl(new Date()),
      lastrejoindate: new FormControl(new Date()),
      leaveCanDate: new FormControl(new Date()),
      leaveCanAppDate: new FormControl(new Date()),
      PassportIn: new FormControl(false),
      PassportOut: new FormControl(false),
    })
  }

  get f() {
    return this.LeaveMasterForm.controls
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
    return this.transactionService.HrLeaveMasterAray ? this.first === this.transactionService.HrLeaveMasterAray.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.transactionService.HrLeaveMasterAray ? this.first === 0 : true;
  }

  onChangeStaff(event) {
    debugger
    this.LeaveMasterForm.controls.StaffCode.setValue(event.value.staffCode)
  }

  getDataObj() {
    var dataObj = {
      leaveId: 0,
      lappCode: this.LeaveMasterForm.controls.lappCode.value,
      staffId: this.LeaveMasterForm.controls.staffId.value?.staffId,
      leavetypeId: this.LeaveMasterForm.controls.leavetypeId.value?.leaveTypeId,
      appLeaveFrom: this.LeaveMasterForm.controls.appLeaveFrom.value,
      appLeaveTo: this.LeaveMasterForm.controls.appLeaveTo.value,
      noofdays: this.calculateDiff(),
      leaveStart: this.LeaveMasterForm.controls.leaveStart.value,
      rejoiningDate: this.LeaveMasterForm.controls.rejoiningDate.value,
      reason: this.LeaveMasterForm.controls.reason.value,
      contactDetails: this.LeaveMasterForm.controls.contactDetails.value,
      applicationDate: this.LeaveMasterForm.controls.applicationDate.value,
      approvalDate: this.LeaveMasterForm.controls.approvalDate.value,
      lastrejoindate: this.LeaveMasterForm.controls.lastrejoindate.value,
      leaveCanDate: this.LeaveMasterForm.controls.leaveCanDate.value,
      leaveCanAppDate: this.LeaveMasterForm.controls.leaveCanAppDate.value,
      PassportOut: this.LeaveMasterForm.controls.PassportOut.value,
      PassportIn: this.LeaveMasterForm.controls.PassportIn.value,
    }
    return dataObj
  }

  onSave() {
    this.submitted = true
    if (this.LeaveMasterForm.invalid) {
      return
    }

    this.transactionService.InsertHrLeaveMaster(this.getDataObj()).subscribe((response: any[]) => {
      this.initForm()
      this.submitted = false
      this.transactionService.HrLeaveMasterAray = response
      // this.transactionService.GetAllLeaveMasterStaff()
      this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Added Successflly!' });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    })
  }

  onDelete(rowData: any) {
    if (confirm("Are you sure. You want to delete this record ?")) {
      this.transactionService.DeleteHrLeaveMaster(rowData).subscribe((response: any[]) => {
        this.transactionService.HrLeaveMasterAray = response
        // this.transactionService.GetAllLeaveMasterStaff()
        this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Deleted Successflly!' });
      }, error => {
        this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
      });
    }
  }

  getSalaryHead(shID: any) {
    this.transactionService.SalaryHeadsArray.find(o => o.shid == shID)?.fldName
  }

  onClickEdit(rowData: any) {
    try {
      var staffObj = this.masterApiService.staffMasterArrayDuplicate.find(o => o.staffId == rowData.staffId)
      var ltObj = this.masterApiService.HrLeaveTypeAray.find(o => o.leaveTypeId == rowData.leavetypeId)
      this.isEditBtndisable = false
      this.LeaveMasterForm.controls.leaveId.setValue(rowData.leaveId)
      this.LeaveMasterForm.controls.lappCode.setValue(rowData.lappCode)
      this.LeaveMasterForm.controls.staffId.setValue(staffObj)
      this.LeaveMasterForm.controls.leavetypeId.setValue(ltObj)
      this.LeaveMasterForm.controls.appLeaveFrom.setValue(new Date(rowData.appLeaveFrom))
      this.LeaveMasterForm.controls.appLeaveTo.setValue(new Date(rowData.appLeaveTo))
      this.LeaveMasterForm.controls.leaveStart.setValue(new Date(rowData.leaveStart))
      this.LeaveMasterForm.controls.rejoiningDate.setValue(new Date(rowData.rejoiningDate))
      this.LeaveMasterForm.controls.applicationDate.setValue(new Date(rowData.applicationDate))
      this.LeaveMasterForm.controls.approvalDate.setValue(new Date(rowData.approvalDate))
      this.LeaveMasterForm.controls.lastrejoindate.setValue(new Date(rowData.lastrejoindate))
      this.LeaveMasterForm.controls.leaveCanDate.setValue(new Date(rowData.leaveCanDate))
      this.LeaveMasterForm.controls.leaveCanAppDate.setValue(new Date(rowData.leaveCanAppDate))
      this.LeaveMasterForm.controls.noofdays.setValue(rowData.noofdays)
      this.LeaveMasterForm.controls.reason.setValue(rowData.reason)
      this.LeaveMasterForm.controls.contactDetails.setValue(rowData.contactDetails)
      this.listModal = false
      this.dtailListModal = false
      this.isEditBtndisable = true
    } catch (error) {
      console.log(error)
    }
  }

  onCancel() {
    this.initForm()
    this.isEditBtndisable = false
    this.submitted = false
    this.submittedMultiple = false
  }

  onEdit() {
    this.submitted = true
    if (this.LeaveMasterForm.invalid) {
      return
    }
    this.transactionService.UpdateHrLeaveMaster(this.getDataObj()).subscribe((response: any[]) => {
      this.initForm()
      this.transactionService.HrLeaveMasterAray = response
      // this.transactionService.GetAllLeaveMasterStaff()
      this.submitted = false
      this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Updated Successflly!' });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  viewDetails(staffId: any, staffName) {
    this.staffName = staffName
    this.staffId = staffId
    this.dataArray = this.transactionService.HrLeaveMasterAray.filter(o => o.staffId == staffId)
    console.log(this.dataArray)
    this.dtailListModal = true
  }

  getLeaveTypeName(leavetypeId: number) {
    return this.masterApiService.HrLeaveTypeAray.find(o => o.leaveTypeId == leavetypeId)?.leaveType
  }

  calculateDiff() {
    let currentDate = new Date(this.LeaveMasterForm.controls.appLeaveTo.value);
    var dateSent = new Date(this.LeaveMasterForm.controls.appLeaveFrom.value);

    return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate())) / (1000 * 60 * 60 * 24));
  }
}


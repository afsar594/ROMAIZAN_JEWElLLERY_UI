import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng';
import { StaffMaster } from 'src/app/routes/domain/StaffMaster';
import { MasterApiService } from 'src/app/routes/service/master.api.services';
import { TransactionService } from 'src/app/routes/service/transaction-service.service';

@Component({
  selector: 'app-allowancededuction',
  templateUrl: './allowancededuction.component.html',
  styleUrls: ['./allowancededuction.component.scss']
})
export class AllowancedeductionComponent implements OnInit {
  index: any;
  title: any;
  subtitle: any;
  first: any;
  rows: any;
  submittedMultiple: boolean;
  isEditBtndisable: boolean;
  dataArray: any[];
  handleChange(e) {
    this.index = e == 0 ? 0 : e.index;
  }
  submitted: boolean = false
  yearArray: any[] = []
  monthNames: any[] = [{ month: "January" }, { month: "February" }, { month: "March" }, { month: "April" }, { month: "May" }, { month: "June" },
  { month: "July" }, { month: "August" }, { month: "September" }, { month: "October" }, { month: "November" }, { month: "December" },]
  IndividualForm: FormGroup
  MultipleForm: FormGroup
  multipleFormArray: any[] = []
  listModal: boolean = false
  dtailListModal: boolean = false
  constructor(private activatedroute: ActivatedRoute, public transactionApi: TransactionService, public masterApiService: MasterApiService,
    private fb: FormBuilder, private messageService: MessageService) { }

  ngOnInit(): void {
    this.handleChange(0)
    this.initForm()
    this.multipleFormArray = []
    this.masterApiService.getAllStaffMasterWithSubscribe()
    this.transactionApi.GetAllHrSalaryHeads()
    this.transactionApi.GetAllHR_MonthSalary()
    this.transactionApi.getDeductionStaffs()
    var year = (new Date()).getFullYear()
    var previousYear = year - 1
    var yearArray = [{ year: year }, { year: previousYear }]
    this.yearArray = yearArray
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
      this.subtitle = data.subtitle
    });
    this.masterApiService.isStaffApiCall.subscribe(res => {
      if (res) {
        this.AddMultipleArray()
      }
    })
  }

  AddMultipleArray() {
    this.masterApiService.staffMasterArrayDuplicate.forEach((res: StaffMaster) => {
      this.multipleFormArray.push({
        STAFFId: res.staffId,
        StaffCode: res.staffCode,
        FullName: res.fullName,
        ShID: null,
        MSAmount: null,
        Remarks: ''
      })
    })
  }

  initForm() {
    this.IndividualForm = this.fb.group({
      MSId: new FormControl(0),
      STAFFId: new FormControl(null, Validators.required),
      StaffCode: new FormControl(""),
      MSMonthName: new FormControl(null, Validators.required),
      MSYear: new FormControl(null, Validators.required),
      ShID: new FormControl(null, Validators.required),
      MSAmount: new FormControl(null, Validators.required),
      Status: new FormControl("R"),
      Remarks: new FormControl(null, Validators.required),
      LSID: new FormControl(null),
      MSOTHr: new FormControl(null),
    })
    this.MultipleForm = this.fb.group({
      MSId: new FormControl(0),
      MSMonthName: new FormControl("", Validators.required),
      MSYear: new FormControl("", Validators.required),
    })
  }

  get f() {
    return this.IndividualForm.controls
  }

  get d() {
    return this.MultipleForm.controls
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
    return this.multipleFormArray ? this.first === this.multipleFormArray.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.multipleFormArray ? this.first === 0 : true;
  }

  onChangeStaff(event) {
    debugger
    this.IndividualForm.controls.StaffCode.setValue(event.value.staffCode)
  }

  onSave() {
    if (this.index == 0) {
      this.submitted = true
      if (this.IndividualForm.invalid) {
        return
      }
      var dataObj = {
        MSId: 0,
        STAFFId: this.IndividualForm.controls.STAFFId.value?.staffId,
        StaffCode: this.IndividualForm.controls.StaffCode.value,
        MSMonthName: this.IndividualForm.controls.MSMonthName.value?.month,
        MSYear: this.IndividualForm.controls.MSYear.value?.year,
        ShID: this.IndividualForm.controls.ShID.value?.shid,
        MSAmount: this.IndividualForm.controls.MSAmount.value,
        Status: "R",
        Remarks: this.IndividualForm.controls.Remarks.value,
        LSID: null,
        MSOTHr: null
      }
      this.transactionApi.InsertHR_MonthSalary(dataObj).subscribe(res => {
        this.initForm()
        this.submitted = false
        this.transactionApi.GetAllHR_MonthSalary()
        this.transactionApi.getDeductionStaffs()
        this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Added Successflly!' });
      }, error => {
        this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
      })
    }
    else {
      this.submittedMultiple = true
      if (this.MultipleForm.invalid) {
        return
      }

      var dataArray = []
      this.multipleFormArray.forEach(element => {
        if (element.ShID != null && element.ShID?.shid > 0) {
          dataArray.push({
            MSId: 0,
            STAFFId: element.STAFFId,
            StaffCode: element.StaffCode,
            MSMonthName: this.MultipleForm.controls.MSMonthName.value?.month,
            MSYear: this.MultipleForm.controls.MSYear.value?.year,
            ShID: element.ShID?.shid,
            MSAmount: element.MSAmount,
            Status: "R",
            Remarks: element.Remarks,
            LSID: null,
            MSOTHr: null
          })
        }
      });
      this.transactionApi.InsertHrMonthSalaryList(dataArray).subscribe(res => {
        this.multipleFormArray = []
        this.AddMultipleArray()
        this.submittedMultiple = false
        this.initForm()
        this.transactionApi.GetAllHR_MonthSalary()
        this.transactionApi.getDeductionStaffs()
        this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Added Successflly!' });
      }, error => {
        this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
      })
    }
  }

  onDelete(rowData: any) {
    if (confirm("Are you sure. You want to delete this record ?")) {
      this.transactionApi.DeleteHR_MonthSalary(rowData).subscribe((response: any[]) => {
        this.transactionApi.GetAllHR_MonthSalary()
        this.transactionApi.getDeductionStaffs()
        this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Deleted Successflly!' });
      }, error => {
        this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
      });
    }
  }

  getSalaryHead(shID: any) {
    this.transactionApi.SalaryHeadsArray.find(o => o.shid == shID)?.fldName
  }

  onClickEdit(rowData: any) {
    try {
      var staffObj = this.masterApiService.staffMasterArrayDuplicate.find(o => o.staffCode == rowData.staffCode)
      var shObj = this.transactionApi.SalaryHeadsArray.find(o => o.shid == rowData.shID)
      this.isEditBtndisable = false
      this.IndividualForm.controls.MSId.setValue(rowData.msId)
      this.IndividualForm.controls.STAFFId.setValue(staffObj)
      this.IndividualForm.controls.StaffCode.setValue(rowData.staffCode)
      this.IndividualForm.controls.MSMonthName.setValue({ month: rowData.msMonthName })
      this.IndividualForm.controls.MSYear.setValue({ year: rowData.msYear })
      this.IndividualForm.controls.ShID.setValue(shObj)
      this.IndividualForm.controls.MSAmount.setValue(rowData.msAmount)
      this.IndividualForm.controls.Status.setValue(rowData.status)
      this.IndividualForm.controls.Remarks.setValue(rowData.remarks)
      this.listModal = false
      this.dtailListModal = false
      this.isEditBtndisable = true
    } catch (error) {
      console.log(error)
    }
  }

  onCancel() {
    this.initForm()
    this.AddMultipleArray()
    this.isEditBtndisable = false
    this.submitted = false
    this.submittedMultiple = false
  }

  onEdit() {
    this.submitted = true
    if (this.IndividualForm.invalid) {
      return
    }
    var dataObj = {
      MSId: this.IndividualForm.controls.MSId.value,
      STAFFId: this.IndividualForm.controls.STAFFId.value?.staffId,
      StaffCode: this.IndividualForm.controls.StaffCode.value,
      MSMonthName: this.IndividualForm.controls.MSMonthName.value?.month,
      MSYear: this.IndividualForm.controls.MSYear.value?.year,
      ShID: this.IndividualForm.controls.ShID.value?.shid,
      MSAmount: this.IndividualForm.controls.MSAmount.value,
      Status: "R",
      Remarks: this.IndividualForm.controls.Remarks.value,
      LSID: null,
      MSOTHr: null
    }
    this.transactionApi.UpdateHR_MonthSalary(dataObj).subscribe((response: any[]) => {
      this.initForm()
      this.transactionApi.GetAllHR_MonthSalary()
    this.transactionApi.getDeductionStaffs()
      this.submitted = false
      this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Updated Successflly!' });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  viewDetails(staffCode: any) {
    this.dataArray = this.transactionApi.HrMotnSalarayArray.filter(o => o.staffCode == staffCode)
    this.dtailListModal = true
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HotTableRegisterer } from '@handsontable/angular';
import { TranslateService } from '@ngx-translate/core';
import Handsontable from 'handsontable';
import { MessageService } from 'primeng/api';
import { MasterApiService } from 'src/app/routes/service/master.api.services';
import { TransactionService } from 'src/app/routes/service/transaction-service.service';

@Component({
  selector: 'app-loanentry',
  templateUrl: './loanentry.component.html',
  styleUrls: ['./loanentry.component.scss']
})
export class LoanentryComponent implements OnInit {
  manualDeductionModal: boolean = false
  submitted: boolean = false
  title: string;
  dataset: any;
  loanentryForm: FormGroup;
  loanentryDetailForm: FormGroup;
  subtitle: string;
  gridHeader: string;
  index: number = 0;
  submittedDetails: boolean = false;
  viewDetailModal: boolean = false;
  viewListModal: boolean = false
  detailArray: any[];
  staffId: any;
  deductionArray: any[] = [];
  masterObj: any;
  showDeduction: boolean = false;
  dataObj: any;
  handleChange(e) {
    this.index = e.index;
  }
  constructor(private activatedroute: ActivatedRoute, private fb: FormBuilder, private messageService: MessageService,
    private translate: TranslateService, public masterApiService: MasterApiService, public transactionService: TransactionService
  ) { }
  ngOnInit(): void {
    this.initForm()
    this.staffId = null
    this.detailArray = []
    this.transactionService.GetLoanSalaryHeads()
    this.masterApiService.GetAllLoanEntryStaffWise()
    this.masterApiService.getAllStaffMasterWithSubscribe()
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
      this.subtitle = data.title;
    });
  }

  initForm() {
    this.loanentryForm = new FormGroup({
      loanId: new FormControl(0),
      loanHeadId: new FormControl(null, Validators.required),
      staffid: new FormControl(null, Validators.required),
      issueDate: new FormControl(new Date()),
      dedFromDate: new FormControl(new Date()),
      loanAmount: new FormControl(null, Validators.required),
      noOfInst: new FormControl(null, Validators.required),
      instAmount: new FormControl(null, Validators.required),
      hold: new FormControl(false),
      amtPaid: new FormControl(0),
      balance: new FormControl(0),
      refNo: new FormControl(""),
      remarks: new FormControl(""),
      curMnthPayrollDedAmt: new FormControl(0),
      jvid: new FormControl(""),
    });

    this.loanentryDetailForm = this.fb.group({
      ldid: new FormControl(0),
      loanId: new FormControl(null),
      staffId: new FormControl(null),
      payrollId: new FormControl(null),
      dedDate: new FormControl(new Date()),
      dedAmount: new FormControl(null, Validators.required),
      dedMonth: new FormControl(null),
      dedYear: new FormControl(null),
      dedType: new FormControl(null),
      manualDeduction: new FormControl(true)
    })
  }

  get f() {
    return this.loanentryForm.controls;
  }

  get d() {
    return this.loanentryDetailForm.controls;
  }

  onSave() {
    this.submitted = true
    if (this.loanentryForm.invalid) {
      return
    }
    var dataObj = {
      loanId: 0,
      loanHeadId: this.loanentryForm.controls.loanHeadId.value?.shid,
      staffid: this.loanentryForm.controls.staffid.value?.staffId,
      issueDate: this.loanentryForm.controls.issueDate.value,
      dedFromDate: this.loanentryForm.controls.dedFromDate.value,
      loanAmount: this.loanentryForm.controls.loanAmount.value,
      noOfInst: this.loanentryForm.controls.noOfInst.value,
      instAmount: this.loanentryForm.controls.instAmount.value,
      hold: this.loanentryForm.controls.hold.value,
      amtPaid: this.loanentryForm.controls.amtPaid.value,
      balance: this.loanentryForm.controls.balance.value,
      refNo: this.loanentryForm.controls.refNo.value,
      remarks: this.loanentryForm.controls.remarks.value,
      curMnthPayrollDedAmt: this.loanentryForm.controls.curMnthPayrollDedAmt.value,
      jvid: this.loanentryForm.controls.jvid.value,
    }
    this.masterApiService.InsertHrLoanentry(dataObj).subscribe((response: any[]) => {
      this.submitted = false
      this.masterApiService.HrLoanentryStaffWise = response
      this.masterApiService.GetAllLoanEntryStaffWise()
      this.initForm()
      this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Added Successflly!' });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  ChangeNoOfIns() {
    var value = this.loanentryForm.controls.loanAmount.value / this.loanentryForm.controls.noOfInst.value
    this.loanentryForm.controls.instAmount.setValue(value)
  }

  onSaveDetails() {
    this.submittedDetails = true
    if (this.loanentryDetailForm.invalid) {
      return
    }
    this.loanentryDetailForm.controls.loanId.setValue(this.loanentryForm.controls.loanId.value)
    this.loanentryDetailForm.controls.staffId.setValue(this.loanentryForm.controls.staffid.value?.staffId)
    this.masterApiService.InsertHrLoandetails(this.loanentryDetailForm.value).subscribe((response: any[]) => {
      this.submitted = false
      this.manualDeductionModal = false
      this.loanentryDetailForm = this.fb.group({
        ldid: new FormControl(0),
        loanId: new FormControl(null),
        staffId: new FormControl(null),
        payrollId: new FormControl(null),
        dedDate: new FormControl(new Date()),
        dedAmount: new FormControl(null, Validators.required),
        dedMonth: new FormControl(null),
        dedYear: new FormControl(null),
        dedType: new FormControl(null),
        manualDeduction: new FormControl(true)
      })

      this.deductionArray = response
      this.calculateData()
      this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Added Successflly!' });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  onCancel() {
    this.showDeduction = false
    this.submitted = false
    this.initForm()
    this.deductionArray = []
  }

  getStaffName(staffId: number) {
    return this.masterApiService.staffMasterArrayDuplicate.find(o => o.staffId == staffId)?.fullName
  }

  // openManualDeduction(item: any) {
  //   this.manualDeductionModal = true
  //   this.loanentryDetailForm.controls.staffId.setValue(item.staffid)
  //   this.loanentryDetailForm.controls.loanId.setValue(item.loanId)
  // }

  // getDetailsByStaffandLoanId(item: any) {
  //   this.masterApiService.GetDetailByStaffID(item.loanId, item.staffid).subscribe((response: any[]) => {
  //     this.viewDetailModal = true
  //     this.detailArray = response
  //     console.log(this.detailArray)
  //   }, error => {
  //     this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
  //   });
  // }

  viewDetails(staffId: any, item: any) {
    this.staffId = staffId
    this.masterObj = item
    this.detailArray = item.masterList
    // this.getDetailsByStaffandLoanId(item)
  }

  getTypeName(loanheadId: number) {
    return this.transactionService.LoanSalaryHeadsArray.find(o => o.shid == loanheadId)?.shname
  }

  setFormValues(item: any) {
    var staffObj = this.masterApiService.staffMasterArrayDuplicate.find(o => o.staffId == item.staffid)
    this.loanentryForm.controls.staffid.setValue(staffObj)
    var loanTypeObj = this.transactionService.LoanSalaryHeadsArray.find(o => o.shid == item.loanHeadId)
    this.loanentryForm.controls.loanId.setValue(item.loanId)
    this.loanentryForm.controls.loanHeadId.setValue(loanTypeObj)
    this.loanentryForm.controls.loanAmount.setValue(item.loanAmount)
    this.loanentryForm.controls.issueDate.setValue(new Date(item.issueDate))
    this.loanentryForm.controls.dedFromDate.setValue(new Date(item.dedFromDate))
    this.loanentryForm.controls.refNo.setValue(item.refNo)
    this.loanentryForm.controls.noOfInst.setValue(item.noOfInst)
    this.loanentryForm.controls.instAmount.setValue(item.instAmount)
    this.loanentryForm.controls.amtPaid.setValue(item.amtPaid)
    this.loanentryForm.controls.balance.setValue(item.balance)
    this.loanentryForm.controls.curMnthPayrollDedAmt.setValue(item.curMnthPayrollDedAmt)
    this.loanentryForm.controls.remarks.setValue(item.remarks)
    this.loanentryForm.controls.hold.setValue(item.hold)

  }

  SetDedctionDetails(item: any) {
    console.log(item)
    this.dataObj = item
    this.viewListModal = false
    this.showDeduction = true
    this.deductionArray = item.detailList
    Object.keys(this.loanentryForm.controls).forEach((keys) => {
      this.loanentryForm.controls[keys].disable();
    })
    this.setFormValues(item)
    this.calculateData()
  }

  ChangeLoanAmount() {
    this.loanentryForm.controls.balance.setValue(this.loanentryForm.controls.loanAmount.value)
  }

  getDeductinTotal() {
    var dedAmount = 0
    this.deductionArray.forEach(elemt => {
      dedAmount += elemt.dedAmount
    })
    return dedAmount
  }

  calculateData() {
    var dedAmount = 0
    this.deductionArray.forEach(elemt => {
      dedAmount += elemt.dedAmount
    })
    this.loanentryForm.controls.amtPaid.setValue(dedAmount)
    this.loanentryForm.controls.balance.setValue(this.dataObj.loanAmount - dedAmount)
  }

  ChangeDeductionAmount() {
    this.loanentryForm.controls.balance.setValue(this.dataObj.balance)
    if (this.loanentryDetailForm.controls.dedAmount.value > this.dataObj.balance) {
      this.loanentryDetailForm.controls.dedAmount.setValue(0)
      this.loanentryForm.controls.balance.setValue(this.dataObj.balance)
      // alert("Deduction amount cant be greater than balance amount")
    }
  }

  onDelete(item: any) {
    if (confirm("Are you sure. You want to delete this record ?")) {
      this.masterApiService.DeleteHrLoanentry(item).subscribe(res => {
        this.deductionArray = []
        this.masterApiService.GetAllLoanEntryStaffWise()
      })
    }
  }

  onDeleteDetails(item: any) {
    if (confirm("Are you sure. You want to delete this record ?")) {
      this.masterApiService.DeleteHrLoandetails(item).subscribe(res => {
        this.deductionArray = res as any[]
        this.calculateData()
        this.masterApiService.GetAllLoanEntryStaffWise()
      })
    }
  }
}
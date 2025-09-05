import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MasterApiService } from 'src/app/routes/service/master.api.services';
import { TransactionService } from 'src/app/routes/service/transaction-service.service';

@Component({
  selector: 'app-salarypackage',
  templateUrl: './salarypackage.component.html',
  styleUrls: ['./salarypackage.component.scss']
})
export class SalarypackageComponent implements OnInit {
  title: string;
  subtitle: string;
  SPForm: FormGroup;
  index: number = 0;
  first: any;
  rows: any;
  submitted: boolean;
  isEditBtndisable: boolean;
  handleChange(e) {
    this.index = e.index;
  }

  constructor(private activatedroute: ActivatedRoute, private fb: FormBuilder, public transactionService: TransactionService,
    public masterApi: MasterApiService) { }


  ngOnInit(): void {
    this.initForm()
    this.masterApi.getAllStaffMasterWithSubscribe()
    this.transactionService.GetAllHrSalaryPackages()
    this.transactionService.GetAllHrSalaryHeads()
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
      this.subtitle = data.substitle;
    });

  }
  get f() {
    return this.SPForm.controls;
  }

  initForm() {
    this.SPForm = new FormGroup({
      spid: new FormControl(0),
      staffId: new FormControl('', Validators.required),
      shid: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      remarks: new FormControl(''),
      nature: new FormControl('', Validators.required),
    });
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
    return this.transactionService.SalaryPckg ? this.first === this.transactionService.SalaryPckg.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.transactionService.SalaryPckg ? this.first === 0 : true;
  }

  getDataObj() {
    var dataObj = {
      spid: this.SPForm.controls.spid.value,
      staffId: this.SPForm.controls.staffId.value?.staffId,
      shid: this.SPForm.controls.shid.value?.shid,
      amount: +this.SPForm.controls.amount.value,
      nature: this.SPForm.controls.nature.value,
      remarks: this.SPForm.controls.remarks.value,
    }
    return dataObj
  }

  onSave() {
    this.submitted = true
    if (this.SPForm.invalid) {
      return
    }

    this.transactionService.InsertHrSalaryPackage(this.getDataObj()).subscribe((response: any[]) => {
      this.initForm()
      this.submitted = false
      this.transactionService.SalaryPckg = response
      this.transactionService.GetAllHrSalaryPackages()
    }, error => {
    })
  }

  onDelete(rowData: any) {
    if (confirm("Are you sure. You want to delete this record ?")) {
      this.transactionService.DeleteHrSalaryPackage(rowData).subscribe((response: any[]) => {
        this.transactionService.SalaryPckg = response
        this.transactionService.GetAllHrSalaryPackages()
      }, error => {
      });
    }
  }

  onClickEdit(rowData: any) {
    try {
      this.isEditBtndisable = true
    } catch (error) {
      console.log(error)
    }
  }

  onCancel() {
    this.initForm()
    this.isEditBtndisable = false
    this.submitted = false
  }

  getsalaryHeadName(Id: number) {
    return this.transactionService.SalaryHeadsArray.find(o => o.shid == Id)?.shname
  }

  getStaffName(staffId: number) {
    return this.masterApi.staffMasterArrayDuplicate.find(o => o.staffId == staffId)?.fullName
  }

  onCickEdit(item: any) {
    this.isEditBtndisable = true
    this.SPForm.patchValue(item)
    var staffObj = this.masterApi.staffMasterArrayDuplicate.find(o => o.staffId == item.staffId)
    var shObj = this.transactionService.SalaryHeadsArray.find(o => o.shid == item.shid)
    this.SPForm.controls.staffId.setValue(staffObj)
    this.SPForm.controls.shid.setValue(shObj)
  }

  onEdit() {
    this.submitted = true
    if (this.SPForm.invalid) {
      return
    }
    this.transactionService.UpdateHrSalaryPackage(this.getDataObj()).subscribe((response: any[]) => {
      this.initForm()
      this.transactionService.SalaryPckg = response
      this.transactionService.GetAllHrSalaryPackages()
      this.submitted = false
    }, error => {
    });
  }
}




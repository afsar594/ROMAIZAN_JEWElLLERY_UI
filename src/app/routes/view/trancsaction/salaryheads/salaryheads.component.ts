import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { index } from 'handsontable/helpers/dom';
import { MessageService } from 'primeng/api';
import { TransactionService } from 'src/app/routes/service/transaction-service.service';

@Component({
  selector: 'app-salaryheads',
  templateUrl: './salaryheads.component.html',
  styleUrls: ['./salaryheads.component.scss']
})
export class SalaryheadsComponent implements OnInit {
  title: string;
  subtitle: string;
  SHForm: FormGroup;
  index: number = 0;
  isEditBtndisable: boolean;
  submitted: boolean;
  rows: number;
  first: number;
  handleChange(e) {
    this.index = e.index;
  }

  constructor(private activatedroute: ActivatedRoute, private fb: FormBuilder, public transactionApi: TransactionService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.initForm()
    this.transactionApi.GetAllHrSalaryHeads()
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
      this.subtitle = data.subtitle;
    });
  }

  initForm() {
    this.SHForm = this.fb.group({
      shid: new FormControl(0),
      shname: new FormControl(''),
      fldName: new FormControl('', Validators.required),
      nature: new FormControl(''),
      fixed: new FormControl(false),
      sortNo: new FormControl(null),
      shortName: new FormControl(''),
      absentDeduct: new FormControl(false),
      remarks: new FormControl(''),
      salObject: new FormControl(''),
      dontShowWps: new FormControl(false),
      displayName: new FormControl(''),
    });
  }

  get f() {
    return this.SHForm.controls;
  }


  onCancel() {
    this.isEditBtndisable = true
    this.initForm()
  }

  onDelete(rowData: any) {
    if (confirm("Are you sure. You want to delete this record ?")) {
      this.transactionApi.DeleteHrSalaryHead(rowData).subscribe((response: any[]) => {
        this.initForm()
        this.transactionApi.SalaryHeadsArray = response
        this.submitted = false
        this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Deleted Successflly!' });
      }, error => {
        this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
      });
    }
  }

  onClickEdit(rowData: any) {
    try {
      this.isEditBtndisable = false
      this.SHForm.patchValue(rowData)
    } catch (error) {
      console.log(error)
    }
  }

  onEdit() {
    this.submitted = true
    if (this.SHForm.invalid) {
      return
    }
    this.transactionApi.UpdateHrSalaryHead(this.SHForm.value).subscribe((response: any[]) => {
      this.initForm()
      this.transactionApi.SalaryHeadsArray = response
      this.submitted = false
      this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Updated Successflly!' });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  onSave() {
    this.submitted = true
    if (this.SHForm.invalid) {
      return
    }
    this.transactionApi.InsertHrSalaryHead(this.SHForm.value).subscribe((response: any[]) => {
      this.initForm()
      this.transactionApi.SalaryHeadsArray = response
      this.submitted = false
      this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Added Successflly!' });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
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
    return this.transactionApi.SalaryHeadsArray ? this.first === this.transactionApi.SalaryHeadsArray.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.transactionApi.SalaryHeadsArray ? this.first === 0 : true;
  }
}




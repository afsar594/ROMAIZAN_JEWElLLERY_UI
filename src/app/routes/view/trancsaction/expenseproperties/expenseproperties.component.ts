import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HotTableRegisterer } from '@handsontable/angular';
import { TranslateService } from '@ngx-translate/core';
import Handsontable from 'handsontable';
import { MessageService } from 'primeng/api';
import { MasterApiService } from 'src/app/routes/service/master.api.services';
import { TransactionService } from 'src/app/routes/service/transaction-service.service';

@Component({
  selector: 'app-expenseproperties',
  templateUrl: './expenseproperties.component.html',
  styleUrls: ['./expenseproperties.component.scss']
})
export class ExpensepropertiesComponent implements OnInit {
  title: string;
  subtitle: string;
  dataset: any;
  EPPropertiesForm: FormGroup;
  EPmasterForm: FormGroup;
  gridHeader: string;
  index: number = 0;
  submitted: boolean = false;
  expenseDetailModal: boolean = false;
  submittedDetail: boolean = false
  detailArray: any[];
  viewexpenseDetailModal: boolean = false;
  isEditBtndisable: boolean = true;
  handleChange(e) {
    this.index = e.index;
  }
  constructor(private activatedroute: ActivatedRoute, private fb: FormBuilder, private translate: TranslateService,
    public transactionService: TransactionService, private messageService: MessageService,
    public masterApiService: MasterApiService) { }

  ngOnInit(): void {
    this.initForm()
    this.masterApiService.getAllStaffMasterWithSubscribe()
    this.transactionService.GetAllHrOtherExpenceMaster()
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
      this.subtitle = data.subtitle;
    });
  }

  initForm() {
    this.EPmasterForm = this.fb.group({
      oeid: new FormControl(0),
      otherExpence: new FormControl('', Validators.required),
    });
    this.EPPropertiesForm = new FormGroup({
      id: new FormControl(0),
      StaffId: new FormControl(null, Validators.required),
      RewType: new FormControl(null),
      Amont: new FormControl(null, Validators.required),
      Remarks: new FormControl(null),
      BillNo: new FormControl(null, Validators.required),
      Date: new FormControl(new Date(), Validators.required),
      Status: new FormControl(null),
      Oeid: new FormControl(null, Validators.required),
    });
  }

  get f() {
    return this.EPmasterForm.controls;
  }

  get d() {
    return this.EPPropertiesForm.controls;
  }

  onSave() {
    this.submitted = true
    if (this.EPmasterForm.invalid) {
      return
    }
    this.transactionService.InsertHrOtherExpenceMaster(this.EPmasterForm.value).subscribe(res => {
      this.transactionService.OtherExpenseMasterArray = res as any[]
      this.initForm()
      this.submitted = false
      this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Added Successflly!' });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    })
  }

  onSaveDetail() {
    this.submittedDetail = true
    if (this.EPPropertiesForm.invalid) {
      return
    }
    this.EPPropertiesForm.controls.StaffId.setValue(this.EPPropertiesForm.controls.StaffId.value?.staffId)
    this.transactionService.InsertHrOtherExpProperties(this.EPPropertiesForm.value).subscribe(res => {
      this.initForm()
      this.submittedDetail = false
      this.expenseDetailModal = false
      this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Added Successflly!' });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    })
  }

  onCancel() {
    this.initForm()
  }

  openExponseDetailModal(item: any) {
    this.expenseDetailModal = true
    this.EPPropertiesForm.controls.Oeid.setValue(item.oeid)
  }

  openViewExponseDetailModal(item: any) {
    this.transactionService.GetExpensePropertiesByMasterID(item.oeid).subscribe(res => {
      this.detailArray = res as any[]
      this.viewexpenseDetailModal = true
      this.EPPropertiesForm.controls.Oeid.setValue(item.oeid)
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    })
  }

  getStaffName(staffId: number) {
    return this.masterApiService.staffMasterArrayDuplicate.find(o => o.staffId == staffId)?.fullName
  }

  onClickEdit(item: any) {
    this.isEditBtndisable = false
    this.EPmasterForm.patchValue(item)
  }

  onEdit() {
    this.submitted = true
    if (this.EPmasterForm.invalid) {
      return
    }
    this.transactionService.UpdateHrOtherExpenceMaster(this.EPmasterForm.value).subscribe((response: any[]) => {
      this.initForm()
      this.transactionService.OtherExpenseMasterArray = response as any[]
      this.submitted = false
      this.isEditBtndisable = true
      this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Updated Successflly!' });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  onDelete(rowData: any) {
    if (confirm("Are you sure. You want to delete this record ?")) {
      this.transactionService.DeleteHrOtherExpenceMaster(rowData).subscribe((response: any[]) => {
        this.initForm()
        this.transactionService.OtherExpenseMasterArray = response as any[]
        this.submitted = false
        this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Deleted Successflly!' });
      }, error => {
        this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
      });
    }
  }

}

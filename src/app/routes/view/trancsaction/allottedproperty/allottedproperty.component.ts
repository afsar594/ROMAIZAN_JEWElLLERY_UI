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
  selector: 'app-allottedproperty',
  templateUrl: './allottedproperty.component.html',
  styleUrls: ['./allottedproperty.component.scss']
})
export class AllottedpropertyComponent implements OnInit {
  title: string;
  subtitle: string; 
  dataset: any;
  APForm: FormGroup;
  index: number = 0;
  isEditBtndisable: boolean = true;
  submitted: boolean = false;
  first: any;
  rows: any;
  handleChange(e) {
    this.index = e.index;
  }
  statusArray: any[] = [{ name: 'Accept' }, { name: 'Reject' }]

  constructor(private activatedroute: ActivatedRoute, private fb: FormBuilder, private translate: TranslateService,
    private messageService: MessageService, public masterApiService: MasterApiService, public transactionService: TransactionService) { }

  ngOnInit(): void {
    this.initForm()
    this.masterApiService.getAllStaffMasterWithSubscribe()
    this.transactionService.GetAllHrAssetMaster()
    this.masterApiService.GetAllHrAllotedProperties()
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
      this.subtitle = data.subtitle;
    });

  }
  initForm() {
    this.APForm = new FormGroup({
      id: new FormControl(0),
      issueDate: new FormControl(new Date(new Date().setFullYear(new Date().getFullYear())), Validators.required),
      returnDate: new FormControl(new Date(new Date().setFullYear(new Date().getFullYear())), Validators.required),
      staffId: new FormControl(null),
      assetId: new FormControl(null, Validators.required),
      status: new FormControl(null),
      cost: new FormControl(null),
      remarks: new FormControl(null),
    });
  }

  get f() {
    return this.APForm.controls;
  }


  onCancel() {
    this.isEditBtndisable = true
    this.initForm()
  }

  onDelete(rowData: any) {
    if (confirm("Are you sure. You want to delete this record ?")) {
      this.masterApiService.DeleteHrAllotedProperties(rowData).subscribe((response: any[]) => {
        this.initForm()
        this.masterApiService.HrAllotedPropertiesArray = response
        this.submitted = false
        this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Deleted Successflly!' });
      }, error => {
        this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
      });
    }
  }

  onClickEdit(rowData: any) {
    try {
      var assetObj = this.transactionService.AssetsArray.find(o => o.asId == rowData.assetId)
      var statusObj = this.statusArray.find(o => o.name == rowData.status)
      this.isEditBtndisable = false
      this.APForm.controls.id.setValue(rowData.id)
      this.APForm.controls.issueDate.setValue(new Date(rowData.issueDate))
      this.APForm.controls.returnDate.setValue(new Date(rowData.returnDate))
      this.APForm.controls.staffId.setValue(rowData.staffId)
      this.APForm.controls.assetId.setValue(assetObj)
      this.APForm.controls.status.setValue(statusObj)
      this.APForm.controls.cost.setValue(rowData.cost)
      this.APForm.controls.remarks.setValue(rowData.remarks)
    } catch (error) {
      console.log(error)
    }
  }

  onEdit() {
    this.submitted = true
    if (this.APForm.invalid) {
      return
    }
    this.APForm.controls.assetId.setValue(this.APForm.controls.assetId.value?.asId)
    this.APForm.controls.status.setValue(this.APForm.controls.status.value?.name)
    this.masterApiService.UpdateHrAllotedProperties(this.APForm.value).subscribe((response: any[]) => {
      this.initForm()
      this.masterApiService.HrAllotedPropertiesArray = response
      this.submitted = false
      this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Updated Successflly!' });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  onSave() {
    this.submitted = true
    if (this.APForm.invalid) {
      return
    }
    this.APForm.controls.assetId.setValue(this.APForm.controls.assetId.value?.asId)
    this.APForm.controls.status.setValue(this.APForm.controls.status.value?.name)
    this.masterApiService.InsertHrAllotedProperties(this.APForm.value).subscribe((response: any[]) => {
      this.initForm()
      this.masterApiService.HrAllotedPropertiesArray = response
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
    return this.masterApiService.HrAllotedPropertiesArray ? this.first === this.masterApiService.HrAllotedPropertiesArray.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.masterApiService.HrAllotedPropertiesArray ? this.first === 0 : true;
  }

  getAssetName(Id: any) {
    if (this.transactionService.AssetsArray && this.transactionService.AssetsArray.length > 0) {
      return this.transactionService.AssetsArray.find(o => o.asId == Id)?.assetName
    }
  }
}





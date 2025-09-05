import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { TransactionService } from 'src/app/routes/service/transaction-service.service';

@Component({
  selector: 'app-assetmaster',
  templateUrl: './assetmaster.component.html',
  styleUrls: ['./assetmaster.component.scss'],
})
export class AssetmasterComponent implements OnInit {
  title: string;
  subtitle: string;
  AssetForm: FormGroup;
  index: number = 0;
  isEditBtndisable: boolean = true;
  submitted: boolean = false;
  first: any;
  rows: any;
  displayMaximizeable = false
  handleChange(e) {
    this.index = e.index;
  }
  constructor(private activatedroute: ActivatedRoute, private fb: FormBuilder, public _TransactionService: TransactionService
    , private messageService: MessageService) { }

  ngOnInit(): void {
    this.initForm()
    this._TransactionService.GetAllHrAssetMaster()
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
      this.subtitle = data.subtitle
    });
  }

  initForm() {
    this.AssetForm = this.fb.group({
      asId: new FormControl(0),
      assetName: new FormControl('', Validators.required),
    });
  }

  get f() {
    return this.AssetForm.controls;
  }


  onCancel() {
    this.isEditBtndisable = true
    this.initForm()
  }

  onDelete(rowData: any) {
    if (confirm("Are you sure. You want to delete this record ?")) {
      this._TransactionService.DeleteHrAssetMaster(rowData).subscribe((response: any[]) => {
        this.initForm()
        this._TransactionService.AssetsArray = response
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
      this.AssetForm.patchValue(rowData)
    } catch (error) {
      console.log(error)
    }
  }

  onEdit() {
    this.submitted = true
    if (this.AssetForm.invalid) {
      return
    }
    this._TransactionService.UpdateHrAssetMaster(this.AssetForm.value).subscribe((response: any[]) => {
      this.initForm()
      this._TransactionService.AssetsArray = response
      this.submitted = false
      this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Updated Successflly!' });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  onSave() {
    this.submitted = true
    if (this.AssetForm.invalid) {
      return
    }
    this._TransactionService.InsertHrAssetMaster(this.AssetForm.value).subscribe((response: any[]) => {
      this.initForm()
      this._TransactionService.AssetsArray = response
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
    return this._TransactionService.AssetsArray ? this.first === this._TransactionService.AssetsArray.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this._TransactionService.AssetsArray ? this.first === 0 : true;
  }
}





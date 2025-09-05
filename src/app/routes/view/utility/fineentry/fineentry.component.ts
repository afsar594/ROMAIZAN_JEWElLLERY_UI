import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HotTableRegisterer } from '@handsontable/angular';
import { TranslateService } from '@ngx-translate/core';
import Handsontable from 'handsontable';
import { MessageService } from 'primeng/api';
import { MasterApiService } from 'src/app/routes/service/master.api.services';

@Component({
  selector: 'app-fineentry',
  templateUrl: './fineentry.component.html',
  styleUrls: ['./fineentry.component.scss']
})
export class FineentryComponent implements OnInit {

  title: string;
  subtitle: string;
  FEForm: FormGroup;
  index: number = 0;
  isEditBtndisable: boolean = true;
  submitted: boolean = false;
  first: number;
  rows: number;
  handleChange(e) {
    this.index = e.index;
  }

  constructor(
    public masterApiService: MasterApiService,
    private messageService: MessageService,
    private activatedroute: ActivatedRoute,
    private fb: FormBuilder,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.initForm()
    this.masterApiService.GetAllFinePenalty()
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
      this.subtitle = data.substitle;
    });
  }

  initForm() {
    this.FEForm = new FormGroup({
      id: new FormControl(0),
      date: new FormControl(new Date(new Date().setFullYear(new Date().getFullYear())), Validators.required),
      actiontaken: new FormControl('', Validators.required),
      remarks: new FormControl('', Validators.required),
    });
  }
  get f() {
    return this.FEForm.controls;
  }

  onCancel() {
    this.isEditBtndisable = true
    this.initForm()
  }

  onDelete(rowData: any) {
    if (confirm("Are you sure. You want to delete this record ?")) {
      this.masterApiService.DeleteFinePenalty(rowData).subscribe((response: any[]) => {
        this.initForm()
        this.masterApiService.GetAllFinePenalty()
        this.submitted = false
        this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Deleted Successflly!' });
      }, error => {
        this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
      });
    }
  }

  onClickEdit(rowData: any) {
    try {
      debugger
      this.isEditBtndisable = false
      this.FEForm.controls.id.setValue(rowData.id)
      this.FEForm.controls.date.setValue(new Date(rowData.date))
      this.FEForm.controls.actiontaken.setValue(rowData.actiontaken)
      this.FEForm.controls.remarks.setValue(rowData.remarks)
    } catch (error) {
      console.log(error)
    }
  }

  onEdit() {
    this.submitted = true
    if (this.FEForm.invalid) {
      return
    }
    this.masterApiService.UpdateFinePenalty(this.FEForm.value).subscribe((response: any[]) => {
      this.initForm()
      this.masterApiService.GetAllFinePenalty()
      this.submitted = false
      this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Updated Successflly!' });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  onSave() {
    this.submitted = true
    if (this.FEForm.invalid) {
      return
    }
    this.masterApiService.InsertFinePenalty(this.FEForm.value).subscribe((response: any[]) => {
      this.initForm()
      this.masterApiService.GetAllFinePenalty()
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
    return this.masterApiService.HrFamilyDetailsproperty ? this.first === this.masterApiService.HrFamilyDetailsproperty.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.masterApiService.HrFamilyDetailsproperty ? this.first === 0 : true;
  }
}



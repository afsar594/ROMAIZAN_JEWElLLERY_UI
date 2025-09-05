import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HotTableRegisterer } from '@handsontable/angular';
import { TranslateService } from '@ngx-translate/core';
import Handsontable from 'handsontable';
import { MessageService } from 'primeng/api';
import { MasterApiService } from 'src/app/routes/service/master.api.services';

@Component({
  selector: 'app-trainingdetail',
  templateUrl: './trainingdetail.component.html',
  styleUrls: ['./trainingdetail.component.scss']
})
export class TrainingdetailComponent implements OnInit {
  title: string;
  subtitle: string;
  TDForm: FormGroup;
  index: number = 0;
  isEditBtndisable: boolean = true;
  submitted: boolean = false;
  first: number;
  rows: number;
  handleChange(e) {
    this.index = e.index;
  }

  constructor(public masterApiService: MasterApiService, private messageService: MessageService,
    private activatedroute: ActivatedRoute,
    private fb: FormBuilder,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.masterApiService.GetAllHrTraining()
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
      this.subtitle = data.substitle;
    });
    this.initForm()
  }

  initForm() {
    this.TDForm = new FormGroup({
      courseName: new FormControl('', Validators.required),
      startDate: new FormControl(new Date(new Date().setFullYear(new Date().getFullYear())), Validators.required),
      institution: new FormControl(''),
      endDate: new FormControl(new Date(new Date().setFullYear(new Date().getFullYear())), Validators.required),
      country: new FormControl(''),
      period: new FormControl(''),
      city: new FormControl(''),
      courseFee: new FormControl(null, Validators.required),
      remarks: new FormControl(''),
      id: new FormControl(0)
    });
  }

  get f() {
    return this.TDForm.controls;
  }

  onCancel() {
    this.isEditBtndisable = true
    this.initForm()
  }

  onDelete(rowData: any) {
    if (confirm("Are you sure. You want to delete this record ?")) {
      this.masterApiService.DeleteHrTraining(rowData).subscribe((response: any[]) => {
        this.initForm()
        this.masterApiService.GetAllHrTraining()
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
      this.TDForm.controls.id.setValue(rowData.id)
      this.TDForm.controls.startDate.setValue(new Date(rowData.startDate))
      this.TDForm.controls.endDate.setValue(new Date(rowData.endDate))
      this.TDForm.controls.courseName.setValue(rowData.courseName)
      this.TDForm.controls.institution.setValue(rowData.institution)
      this.TDForm.controls.country.setValue(rowData.country)
      this.TDForm.controls.period.setValue(rowData.period)
      this.TDForm.controls.city.setValue(rowData.city)
      this.TDForm.controls.courseFee.setValue(rowData.courseFee)
      this.TDForm.controls.remarks.setValue(rowData.remarks)
    } catch (error) {
      console.log(error)
    }
  }

  onEdit() {
    this.submitted = true
    if (this.TDForm.invalid) {
      return
    }
    this.masterApiService.UpdateHrTraining(this.TDForm.value).subscribe((response: any[]) => {
      this.initForm()
      this.masterApiService.GetAllHrTraining()
      this.submitted = false
      this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Updated Successflly!' });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  onSave() {
    this.submitted = true
    if (this.TDForm.invalid) {
      return
    }
    this.masterApiService.InsertHrTraining(this.TDForm.value).subscribe((response: any[]) => {
      this.initForm()
      this.masterApiService.GetAllHrTraining()
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






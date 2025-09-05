import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MasterApiService } from 'src/app/routes/service/master.api.services';

@Component({
  selector: 'app-qualification',
  templateUrl: './qualification.component.html',
  styleUrls: ['./qualification.component.scss']
})
export class QualificationComponent implements OnInit {
  title: string;
  qualificationForm: FormGroup;
  subtitle: string;
  isEditBtndisable: boolean;
  submitted: boolean;
  first: any;
  rows: any;
  index: any;
  handleChange(e) {
    this.index = e.index;
  }
  constructor(public masterApiService: MasterApiService, private messageService: MessageService,
    private activatedroute: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.masterApiService.GetHrQualificationsWithSubs()
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
      this.subtitle = data.title;
    });
    this.initForm()
  }

  initForm() {
    this.qualificationForm = this.fb.group({
      qualificationId: new FormControl(0),
      qualification: new FormControl('', Validators.required),
    });
  }

  get f() {
    return this.qualificationForm.controls;
  }


  onCancel() {
    this.isEditBtndisable = true
    this.initForm()
  }

  onDelete(rowData: any) {
    if (confirm("Are you sure. You want to delete this record ?")) {
      this.masterApiService.DeleteHrQualification(rowData).subscribe((response: any[]) => {
        this.initForm()
        this.masterApiService.QualificationMasterArray = response
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
      this.qualificationForm.patchValue(rowData)
    } catch (error) {
      console.log(error)
    }
  }

  onEdit() {
    this.submitted = true
    if (this.qualificationForm.invalid) {
      return
    }
    this.masterApiService.UpdateHrQualification(this.qualificationForm.value).subscribe((response: any[]) => {
      this.initForm()
      this.masterApiService.QualificationMasterArray = response
      this.submitted = false
      this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Updated Successflly!' });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  onSave() {
    this.submitted = true
    if (this.qualificationForm.invalid) {
      return
    }
    this.masterApiService.InsertHrQualification(this.qualificationForm.value).subscribe((response: any[]) => {
      this.initForm()
      this.masterApiService.QualificationMasterArray = response
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
    return this.masterApiService.QualificationMasterArray ? this.first === this.masterApiService.QualificationMasterArray.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.masterApiService.QualificationMasterArray ? this.first === 0 : true;
  }
}





import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MasterApiService } from 'src/app/routes/service/master.api.services';

@Component({
  selector: 'app-nationalmaster',
  templateUrl: './nationalmaster.component.html',
  styleUrls: ['./nationalmaster.component.scss']
})
export class NationalmasterComponent implements OnInit {
  title: string;
  NationalityForm: FormGroup;
  subtitle: string;
  index: any;
  isEditBtndisable: boolean;
  submitted: boolean;
  first: any;
  rows: any;
  handleChange(e) {
    this.index = e.index;
  }
  constructor(
    private activatedroute: ActivatedRoute,
    private fb: FormBuilder,
    public masterApiService: MasterApiService, private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.masterApiService.GetAllHrNationalityWithSubs()
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
      this.subtitle = data.title;
    });
    this.initForm()
  }

  initForm() {
    this.NationalityForm = this.fb.group({
      nationalityId: new FormControl(0),
      sortOrder: new FormControl(null),
      nationality: new FormControl('', Validators.required),
    });
  }

  get f() {
    return this.NationalityForm.controls;
  }


  onCancel() {
    this.isEditBtndisable = true
    this.initForm()
  }

  onDelete(rowData: any) {
    if (confirm("Are you sure. You want to delete this record ?")) {
      this.masterApiService.DeleteHrNationality(rowData).subscribe((response: any[]) => {
        this.initForm()
        this.masterApiService.GetAllHrNationalityWithSubs()
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
      this.NationalityForm.patchValue(rowData)
    } catch (error) {
      console.log(error)
    }
  }

  onEdit() {
    this.submitted = true
    if (this.NationalityForm.invalid) {
      return
    }
    this.masterApiService.UpdateHrNationality(this.NationalityForm.value).subscribe((response: any[]) => {
      this.initForm()
      this.masterApiService.NationalityArray = response
      this.submitted = false
      this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Updated Successflly!' });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  onSave() {
    this.submitted = true
    if (this.NationalityForm.invalid) {
      return
    }
    this.masterApiService.InsertHrNationality(this.NationalityForm.value).subscribe((response: any[]) => {
      this.initForm()
      this.masterApiService.NationalityArray = response
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
    return this.masterApiService.NationalityArray ? this.first === this.masterApiService.NationalityArray.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.masterApiService.NationalityArray ? this.first === 0 : true;
  }
}





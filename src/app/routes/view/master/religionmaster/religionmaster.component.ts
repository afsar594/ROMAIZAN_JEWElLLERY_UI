import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MasterApiService } from 'src/app/routes/service/master.api.services';

@Component({
  selector: 'app-religionmaster',
  templateUrl: './religionmaster.component.html',
  styleUrls: ['./religionmaster.component.scss']
})
export class ReligionmasterComponent implements OnInit {
  title: string;
  ReligionForm: FormGroup;
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
    this.masterApiService.GetAllHrReligionWithSubs()
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
      this.subtitle = data.title;
    });
    this.initForm()
  }

  initForm() {
    this.ReligionForm = this.fb.group({
      religionId: new FormControl(0),
      religion: new FormControl('', Validators.required),
    });
  }

  get f() {
    return this.ReligionForm.controls;
  }


  onCancel() {
    this.isEditBtndisable = true
    this.initForm()
  }

  onDelete(rowData: any) {
    if (confirm("Are you sure. You want to delete this record ?")) {
      this.masterApiService.DeleteHrRelationship(rowData).subscribe((response: any[]) => {
        this.initForm()
        this.masterApiService.ReligionArray = response
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
      this.ReligionForm.patchValue(rowData)
    } catch (error) {
      console.log(error)
    }
  }

  onEdit() {
    this.submitted = true
    if (this.ReligionForm.invalid) {
      return
    }
    this.masterApiService.UpdateHrReligion(this.ReligionForm.value).subscribe((response: any[]) => {
      this.initForm()
      this.masterApiService.ReligionArray = response
      this.submitted = false
      this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Updated Successflly!' });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  onSave() {
    this.submitted = true
    if (this.ReligionForm.invalid) {
      return
    }
    this.masterApiService.InsertHrReligion(this.ReligionForm.value).subscribe((response: any[]) => {
      this.initForm()
      this.masterApiService.ReligionArray = response
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
    return this.masterApiService.ReligionArray ? this.first === this.masterApiService.ReligionArray.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.masterApiService.ReligionArray ? this.first === 0 : true;
  }
}





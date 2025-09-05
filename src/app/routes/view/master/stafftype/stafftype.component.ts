import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { MasterApiService } from 'src/app/routes/service/master.api.services';

@Component({
  selector: 'app-stafftype',
  templateUrl: './stafftype.component.html',
  styleUrls: ['./stafftype.component.scss']
})
export class StafftypeComponent implements OnInit {
  title: string;
  subtitle: string;
  dataset: any;
  StaffTypeForm: FormGroup;
  index: number = 0;
  isEditBtndisable: boolean = true;
  submitted: boolean = false;
  first: any;
  rows: any;
  handleChange(e) {
    this.index = e.index;
  }
  constructor(private activatedroute: ActivatedRoute, private fb: FormBuilder, private translate: TranslateService,
    private messageService: MessageService, public masterApiService: MasterApiService) { }

  ngOnInit(): void {
    this.masterApiService.GetAllHrStaffTypeWithSubs()
    this.initForm()
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
      this.subtitle = data.subtitle;
    });

  }
  initForm() {
    this.StaffTypeForm = new FormGroup({
      staffTypeId: new FormControl(0),
      staffType: new FormControl(null, Validators.required),
      norHrRate: new FormControl(null, Validators.required),
      norOtrate: new FormControl(null, Validators.required),
      fridayRate: new FormControl(null, Validators.required),
      holidayRate: new FormControl(null, Validators.required),
      debAccNo: new FormControl(null, Validators.required),
    });
  }

  get f() {
    return this.StaffTypeForm.controls;
  }


  onCancel() {
    this.isEditBtndisable = true
    this.initForm()
  }

  onDelete(rowData: any) {
    if (confirm("Are you sure. You want to delete this record ?")) {
      this.masterApiService.DeleteHrStaffType(rowData).subscribe((response: any[]) => {
        this.initForm()
        this.masterApiService.StaffTypeArray = response
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
      this.StaffTypeForm.patchValue(rowData)
    } catch (error) {
      console.log(error)
    }
  }

  onEdit() {
    this.submitted = true
    if (this.StaffTypeForm.invalid) {
      return
    }
    this.masterApiService.UpdateHrStaffType(this.StaffTypeForm.value).subscribe((response: any[]) => {
      this.initForm()
      this.masterApiService.StaffTypeArray = response
      this.submitted = false
      this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Updated Successflly!' });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  onSave() {
    this.submitted = true
    if (this.StaffTypeForm.invalid) {
      return
    }
    this.masterApiService.InsertHrStaffType(this.StaffTypeForm.value).subscribe((response: any[]) => {
      this.initForm()
      this.masterApiService.StaffTypeArray = response
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
    return this.masterApiService.StaffTypeArray ? this.first === this.masterApiService.StaffTypeArray.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.masterApiService.StaffTypeArray ? this.first === 0 : true;
  }
}





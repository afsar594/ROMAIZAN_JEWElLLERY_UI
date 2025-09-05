import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { MasterApiService } from 'src/app/routes/service/master.api.services';

@Component({
  selector: 'app-shifttype',
  templateUrl: './shifttype.component.html',
  styleUrls: ['./shifttype.component.scss']
})
export class ShifttypeComponent implements OnInit {
  title: string;
  subtitle: string;
  dataset: any;
  ShiftTypeForm: FormGroup;
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
    this.masterApiService.GetAllHrShiftTypesWithSubs()
    this.initForm()
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
      this.subtitle = data.subtitle;
    });

  }
  initForm() {
    this.ShiftTypeForm = new FormGroup({
      shiftTypeId: new FormControl(0),
      shiftType: new FormControl(null, Validators.required),
    });
  }

  get f() {
    return this.ShiftTypeForm.controls;
  }


  onCancel() {
    this.isEditBtndisable = true
    this.initForm()
  }

  onDelete(rowData: any) {
    if (confirm("Are you sure. You want to delete this record ?")) {
      this.masterApiService.DeleteHrShiftTypes(rowData).subscribe((response: any[]) => {
        this.initForm()
        this.masterApiService.ShiftTypeArray = response
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
      this.ShiftTypeForm.patchValue(rowData)
    } catch (error) {
      console.log(error)
    }
  }

  onEdit() {
    this.submitted = true
    if (this.ShiftTypeForm.invalid) {
      return
    }
    this.masterApiService.UpdateHrShiftTypes(this.ShiftTypeForm.value).subscribe((response: any[]) => {
      this.initForm()
      this.masterApiService.ShiftTypeArray = response
      this.submitted = false
      this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Updated Successflly!' });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  onSave() {
    this.submitted = true
    if (this.ShiftTypeForm.invalid) {
      return
    }
    this.masterApiService.InsertHrShiftTypes(this.ShiftTypeForm.value).subscribe((response: any[]) => {
      this.initForm()
      this.masterApiService.ShiftTypeArray = response
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
    return this.masterApiService.ShiftTypeArray ? this.first === this.masterApiService.ShiftTypeArray.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.masterApiService.ShiftTypeArray ? this.first === 0 : true;
  }
}





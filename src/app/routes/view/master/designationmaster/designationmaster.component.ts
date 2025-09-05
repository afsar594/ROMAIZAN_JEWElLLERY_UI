import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
// import { MessageService } from 'primeng';
import { DesignationMaster } from 'src/app/routes/domain/DesignationMaster';
import { MasterApiService } from 'src/app/routes/service/master.api.services';

@Component({
  selector: 'app-designationmaster',
  templateUrl: './designationmaster.component.html',
  styleUrls: ['./designationmaster.component.scss']
})
export class DesignationmasterComponent implements OnInit {
  submitted: boolean = false
  title: string;
  designationForm: FormGroup;
  subtitle: string;
  displayMaximizeable: boolean = false;
  cols: Array<any> = [];
  designationList: Array<DesignationMaster> = [];
  constructor(
    private activatedroute: ActivatedRoute,
    private fb: FormBuilder,
    private masterApiService: MasterApiService,
    private messageService: MessageService
  ) { }
  ngOnInit(): void {
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
      this.subtitle = data.title;

    });
    this.cols = [
      { field: 'DesignationId', header: 'DesignationCode' },
      { field: 'Designation', header: 'DesignationName' },
      { field: 'ShortName', header: 'ShortName' },
      { field: '', header: 'Actions' }
    ]
    this.displayMaximizeable = false;
    this.initForm()
    // this.getAllDesignation();
  }

  initForm() {
    this.designationForm = new FormGroup({
      DesignationCode: new FormControl('', Validators.required),
      DesignationName: new FormControl('', Validators.required),
      ShortName: new FormControl('', Validators.required),
    });
  }

  getAllDesignation() {
    this.masterApiService.getAllDesignation().subscribe((response: any) => {
      this.designationList = response;
      this.displayMaximizeable = true;
    });
  }
  insertDesignstion() {
    this.submitted = true
    if (this.designationForm.invalid) {
      return
    }
    let payload: DesignationMaster = {
      designationId: Number(this.designationForm.controls['DesignationCode'].value),
      designation: String(this.designationForm.controls['DesignationName'].value),
      shortName: String(this.designationForm.controls['ShortName'].value),

    }
    this.masterApiService.insertDesignstion(payload).subscribe(response => {
      this.submitted = false
      this.initForm()
      this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'New Record Added Successflly!' });
    },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
      });
  }
  selectForEdit(item: DesignationMaster) {
    this.displayMaximizeable = false;
    this.designationForm.controls['DesignationCode'].setValue(item.designationId);
    this.designationForm.controls['DesignationName'].setValue(item.designation);
    this.designationForm.controls['ShortName'].setValue(item.shortName);
  }
  updateDesignation() {
    this.submitted = true
    if (this.designationForm.invalid) {
      return
    }
    let payload: DesignationMaster = {
      designationId: Number(this.designationForm.controls['DesignationCode'].value),
      designation: String(this.designationForm.controls['DesignationName'].value),
      shortName: String(this.designationForm.controls['ShortName'].value),
    }
    this.masterApiService.updateDesignation(payload).subscribe(response => {
      this.submitted = false
      this.initForm()
      this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Updated Successflly!' });
    },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
      });
  }
  deleteDesignation(item) {
    let payload: DesignationMaster = {
      designationId: Number(this.designationForm.controls['DesignationCode'].value),
      designation: String(this.designationForm.controls['DesignationName'].value),
      shortName: String(this.designationForm.controls['ShortName'].value),
    }
    this.masterApiService.deleteDesignation(item).subscribe(response => {
      this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Deleted Successflly!' });
    },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Delete Operation failed!', closable: true });
      })
  }
  public get f() {
    return this.designationForm.controls;
  }

}

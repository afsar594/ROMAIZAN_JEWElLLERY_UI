import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
// import { MenuItem, MessageService } from 'primeng';
import { DepartmentMaster } from 'src/app/routes/domain/DepartmentMaster';
import { MasterApiService } from 'src/app/routes/service/master.api.services';
import { defaults } from 'src/app/shared/service/settings';

@Component({
  selector: 'app-departmentmaster',
  templateUrl: './departmentmaster.component.html',
  styleUrls: ['./departmentmaster.component.scss']
})
export class DepartmentmasterComponent implements OnInit {
  title: string;
  submitted: boolean = false
  departmentForm: FormGroup;
  subtitle: string;
  displayMaximizeable: boolean = false;
  departmentList: Array<DepartmentMaster> = [];
  cols: Array<any> = [
    { field: 'departmentId', header: 'Code' },
    { field: 'department', header: 'Department Name' },
    { field: 'ShortOrder', header: 'Short Order' },
    { field: 'ShortName', header: 'Short Name' },
    { field: '', header: 'Actions' },
  ];
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

this.initForm()
  }

  initForm(){
    this.departmentForm = new FormGroup({
      Code: new FormControl('', Validators.required),
      ShortOrder: new FormControl('', Validators.required),
      Department: new FormControl('', Validators.required),
      ShortName: new FormControl('', Validators.required),
    });
  }

  getAllDepartment() {
    this.masterApiService.getAllDepartment().subscribe((response: any) => {
      this.departmentList = response;
      this.displayMaximizeable = true;
    });
  }
  insertDepartmentMaster() {
    this.submitted = true
    if (this.departmentForm.invalid) {
      return
    }
    let payload: DepartmentMaster = {
      departmentId: Number(this.departmentForm.controls['Code'].value) ?? 0,
      department: String(this.departmentForm.controls['Department'].value) ?? '',
      shortName: String(this.departmentForm.controls['ShortName'].value) ?? '',
      sortOrder: Number(this.departmentForm.controls['ShortOrder'].value) ?? 0,
    }
    this.masterApiService.insertDepartmentMaster(payload).subscribe(response => {
      this.submitted = false
      this.initForm()
      this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'New Record Added Successflly!' });
    },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
      });
  }
  selectForEdit(item: DepartmentMaster) {
    this.displayMaximizeable = false;
    this.departmentForm.controls['Code'].setValue(item.departmentId);
    this.departmentForm.controls['Department'].setValue(item.department);
    this.departmentForm.controls['ShortOrder'].setValue(item.shortName);
    this.departmentForm.controls['ShortName'].setValue(item.shortName);
  }

  updateDepartmentMaster() {
    this.submitted = true
    if (this.departmentForm.invalid) {
      return
    }
    let payload: DepartmentMaster = {
      departmentId: Number(this.departmentForm.controls['Code'].value) ?? 0,
      department: String(this.departmentForm.controls['Department'].value) ?? '',
      shortName: String(this.departmentForm.controls['ShortName'].value) ?? '',
      sortOrder: Number(this.departmentForm.controls['ShortOrder'].value) ?? 0,
    }
    this.masterApiService.updateDepartmentMaster(payload).subscribe(response => {
      this.submitted = false
      this.initForm()
      this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Updated Successflly!' });
    },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
      });
  }
  // deleteDepartmentMaster() {
  //   let payload: DepartmentMaster = {
  //     departmentId: Number(this.departmentForm.controls['Code'].value)??0,
  //     department: String(this.departmentForm.controls['Department'].value)??'',
  //     shortName: String(this.departmentForm.controls['ShortName'].value)??'',
  //     sortOrder: Number(this.departmentForm.controls['ShortOrder'].value)??0,
  //   }
  //   this.masterApiService.deleteDepartmentMaster(payload).subscribe(response => {
  //     this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Deleted Successflly!' });
  //   },
  //     error => {
  //       this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
  //     });
  // }
  deleteDepartmentMaster(departmentId: DepartmentMaster) {
    this.masterApiService.deleteDepartmentMaster(departmentId).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Record deleted successfully!', closable: true });
    },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Delete Operation failed!', closable: true });
      })
  }
  public get f() {
    return this.departmentForm.controls;
  }

}

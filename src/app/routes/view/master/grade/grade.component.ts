import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { GradeMaster } from 'src/app/routes/domain/GradeMaster';
import { MasterApiService } from 'src/app/routes/service/master.api.services';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.scss']
})
export class GradeComponent implements OnInit {
  submitted: boolean = false
  title: string;
  LevelmasterForm: FormGroup;
  subtitle: string;
  displayMaximizeable: boolean = false;
  constructor(
    private activatedroute: ActivatedRoute,
    private fb: FormBuilder,
    private masterApiService: MasterApiService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
      this.subtitle = data.title;
    });
    this.cols = [
      { field: 'Code', header: 'Code' },
      { field: 'Grade', header: 'Grade' },
      { field: '', header: 'Actions' }
    ]
    this.displayMaximizeable = false;
    this.initForm()
  }

  initForm() {
    this.LevelmasterForm = new FormGroup({
      gid: new FormControl(),
      gradeName: new FormControl('', Validators.required),
    });
  }
  gradeMasterList: Array<GradeMaster> = [];
  cols: Array<any> = [
  ];

  getAllGradeMaster() {
    this.masterApiService.getAllGradeMaster().subscribe((response: any) => {
      this.gradeMasterList = response;
      this.displayMaximizeable = true;
      console.log('Grade Master list :', response)
    });
  }

  insertGradeMaster() {
    this.submitted = true
    if (this.LevelmasterForm.invalid) {
      return
    }
    this.masterApiService.InsertGradeMaster(this.LevelmasterForm.value).subscribe(response => {
      this.submitted = false
      this.initForm()
      this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'New Record Added Successflly!' });
    },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
      });
  }

  selectForEdit(item: GradeMaster) {
    this.displayMaximizeable = false;
    this.LevelmasterForm.controls['Code'].setValue(item.gid);
    this.LevelmasterForm.controls['Grade'].setValue(item.gradeName);
  }


  updateGradeMaster() {
    this.submitted = true
    if (this.LevelmasterForm.invalid) {
      return
    }
    this.masterApiService.UpdateGradeMaster(this.LevelmasterForm.value).subscribe(response => {
      this.submitted = false
      this.initForm()
      this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Updated Successflly!' });
    },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
      });
  }

  deleteGradeMaster(gid: GradeMaster) {
    this.masterApiService.DeleteGradeMaster(gid).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Record deleted successfully!', closable: true });
    },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Delete Operation failed!', closable: true });
      })
  }
  public get f() {
    return this.LevelmasterForm.controls;
  }

}

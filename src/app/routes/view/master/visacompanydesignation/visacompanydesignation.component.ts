import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Visacompanydesignation } from 'src/app/routes/domain/VisaCompanyDesignationMaster';

import { MasterApiService } from 'src/app/routes/service/master.api.services';

@Component({
  selector: 'app-visacompanydesignation',
  templateUrl: './visacompanydesignation.component.html',
  styleUrls: ['./visacompanydesignation.component.scss']
})
export class VisacompanydesignationComponent implements OnInit {
  submitted: boolean = false
  title: string;
  visaDesignationForm: FormGroup;
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
      { field: 'Designation', header: 'Designation' },
      { field: '', header: 'Actions' }
    ]
    this.displayMaximizeable = false;
    this.initForm()
  }

  initForm() {
    this.visaDesignationForm = new FormGroup({
      visaDesignation: new FormControl('', Validators.required),
    });
  }

  visadesignationList: Array<Visacompanydesignation> = [];
  cols: Array<any> = [
  ];
  getAllVisaDesignation() {
    this.masterApiService.getAllVisaDesignation().subscribe((response: any) => {
      this.visadesignationList = response;
      this.displayMaximizeable = true;
      console.log('Visa designation list :', this.visadesignationList)
    });
  }

  insertVisaDesignation() {
    this.submitted = true
    if (this.visaDesignationForm.invalid) {
      return
    }
    let payload: Visacompanydesignation = {
      visaDesignation: String(this.visaDesignationForm.controls['visaDesignation'].value),

    }
    this.masterApiService.InsertVisaDesignation(payload).subscribe(response => {
      this.initForm()
      this.submitted = false
      this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'New Record Added Successflly!' });
    },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
      });
  }
  beingEdited: Visacompanydesignation;
  selectForEdit(item: Visacompanydesignation) {
    this.beingEdited = item;
    this.displayMaximizeable = false;
    this.visaDesignationForm.controls['visaDesignation'].setValue(item.visaDesignation);
  }
  updateGradeMaster() {
    this.submitted = true
    if (this.visaDesignationForm.invalid) {
      return
    }
    let payload: Visacompanydesignation = {
      visaDesignation: String(this.visaDesignationForm.controls['visaDesignation'].value),
      visaDesignationId: Number(this.beingEdited.visaDesignationId)
    }
    this.masterApiService.UpdateVisaDesignation(payload).subscribe(response => {
      this.initForm()
      this.submitted = false
      this.messageService.add({ severity: 'success', summary: 'Success!', detail: 'Record Updated Successflly!' });
    },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
      });
  }
  deleteVisaDesignation(designation: Visacompanydesignation) {
    this.masterApiService.DeleteVisaDesignation(designation).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Record deleted successfully!', closable: true });
    },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Delete Operation failed!', closable: true });
      })
  }

  public get f() {
    return this.visaDesignationForm.controls;
  }

}

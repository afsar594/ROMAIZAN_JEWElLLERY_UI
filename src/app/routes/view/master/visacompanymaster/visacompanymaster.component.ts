import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
// import { MessageService } from 'primeng';
import { CompanyMaster } from 'src/app/routes/domain/CompanyMaster';
import { VisaCompanyMaster } from 'src/app/routes/domain/VisaCompanyMaster';
import { MasterApiService } from 'src/app/routes/service/master.api.services';

@Component({
  selector: 'app-visacompanymaster',
  templateUrl: './visacompanymaster.component.html',
  styleUrls: ['./visacompanymaster.component.scss']
})
export class VisacompanymasterComponent implements OnInit {

  title: string;
  subtitle: string;
  displayMaximizeable: boolean;
  VisaCompanyForm: FormGroup;

  VisaCompanyMasterArray: Array<VisaCompanyMaster>;
  constructor(
    private activatedroute: ActivatedRoute,
    private masterApi: MasterApiService,
    private messageService: MessageService,
  ) {
    this.displayMaximizeable = false;
    this.VisaCompanyForm = new FormGroup({
      visaCompanyCode: new FormControl('', Validators.required),
      visaCompanyType: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
      this.subtitle = data.subtitle;
    });
  }
  
  getAllVisaCompanyList() {
    this.masterApi.getAllVisaCompany().subscribe(response => {
      this.VisaCompanyMasterArray = response;
      this.displayMaximizeable = true;
    });
  }
  insertVisaCompany() {
    let payload: VisaCompanyMaster = {
      visaCompanyId: 0,
      visaCompany: ''
    }
    this.masterApi.insertVisaCompany(payload).subscribe(response => {
      this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'New Record Added Successflly!' });
    },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
      });
  }
  updateVisaCompany() {
    let payload: VisaCompanyMaster = {
      visaCompanyId: 0,
      visaCompany: ''
    }
    this.masterApi.updateVisaCompany(payload).subscribe(response => {
      this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Updated Successflly!' });
    },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
      });
  }
  deleteVisaCompany() {
    let payload: VisaCompanyMaster = {
      visaCompanyId: 0,
      visaCompany: ''
    }
    this.masterApi.deleteVisaCompany(payload).subscribe(response => {
      this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Deleted Successflly!' });
    },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
      });
  }
  newEntry() {

  }


  get f() {
    return this.VisaCompanyForm.controls;
  }
}


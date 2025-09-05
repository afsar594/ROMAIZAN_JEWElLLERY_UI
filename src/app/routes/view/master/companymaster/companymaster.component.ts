import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
// import { MenuItem, MessageService } from 'primeng';
import { CompanyMaster } from 'src/app/routes/domain/CompanyMaster';
import { MasterApiService } from 'src/app/routes/service/master.api.services';

@Component({
  selector: 'app-companymaster',
  templateUrl: './companymaster.component.html',
  styleUrls: ['./companymaster.component.scss']
})
export class CompanymasterComponent implements OnInit {
  submitted: boolean = false
  title: string;
  subtitle: string;
  displayMaximizeable: boolean;
  CompanyForm: FormGroup;
  index: number = 0;
  cols: Array<any>;
  CompanyMasterArray: Array<CompanyMaster>;
  breadcumbmodel: MenuItem[];
  constructor(
    private translate: TranslateService,
    private activatedroute: ActivatedRoute,
    private masterApi: MasterApiService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.displayMaximizeable = false;
    this.CompanyForm = new FormGroup({
      companyId: new FormControl(''),
      companyName: new FormControl('', Validators.required),
      licenseNo: new FormControl('', Validators.required),
      companyAddress: new FormControl('', Validators.required),
      phone1: new FormControl('', Validators.required),
      phone2: new FormControl('', Validators.required),
      postBox: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      website: new FormControl('', Validators.required),
      empId: new FormControl('', Validators.required),
      empBank: new FormControl('', Validators.required),
      trnNo: new FormControl('', Validators.required),
      companyType: new FormControl('', Validators.required),
      cell: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      fax: new FormControl('', Validators.required),
      staffCodePrefix: new FormControl('', Validators.required),
      prefixLength: new FormControl('', Validators.required),
    });
    this.cols = [
      { field: 'companyName', header: 'Company name' },
      { field: 'licNo', header: 'License No' },
      { field: 'city', header: 'City' },
      { field: 'country', header: 'Country' },
      { field: 'addr', header: 'Address' },
      { field: 'website', header: 'Website' },
      { field: 'phone1', header: 'Phone' },
      { field: 'cell', header: 'Cell' },
      { field: 'email', header: 'Email' },
      { field: 'fax', header: 'Fax' },
      { field: 'trnno', header: 'TRN No' },
      { field: '', header: 'Actions' },
    ];
  }

  ngOnInit(): void {
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
      this.subtitle = data.subtitle;
    });
    this.breadcumbmodel = this.router.url.slice(1).split('/').map((k) => ({ label: k }));

  }

  handleChange(e: any) {
    this.index = e.index;
  }
  getAllCompanyList() {
    this.masterApi.getAllCompany().subscribe(response => {
      this.CompanyMasterArray = response;
      this.displayMaximizeable = true;
    });
  }

  insertCompany() {
    this.submitted = true
    if (this.CompanyForm.invalid) {
      return
    }
    let payload: CompanyMaster = {
      //companyId: Number(this.CompanyForm.controls[''].value),
      companyName: String(this.CompanyForm.controls['CompanyName'].value),
      licno: String(this.CompanyForm.controls['LicenseNo'].value),
      addr: String(this.CompanyForm.controls['CompanyAddress'].value),
      phone1: String(this.CompanyForm.controls['Phone1'].value),
      phone2: String(this.CompanyForm.controls['Phone2'].value),
      post: String(this.CompanyForm.controls['PostBox'].value),
      city: String(this.CompanyForm.controls['City'].value),
      website: String(this.CompanyForm.controls['Website'].value),
      wpsemployerId: Number(this.CompanyForm.controls['EmpId'].value),
      wpsemployerBankId: Number(this.CompanyForm.controls['EmpBank'].value),
      trnno: String(this.CompanyForm.controls['TrnNo'].value),
      cell: String(this.CompanyForm.controls['Cell'].value),
      email: String(this.CompanyForm.controls['Email'].value),
      fax: String(this.CompanyForm.controls['Fax'].value),
    }
    this.masterApi.insertCompany(payload).subscribe(response => {
      this.submitted = false
      this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'New Record Added Successflly!' });
    },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
      });
  }
  updateCompany() {
    this.submitted = true
    if (this.CompanyForm.invalid) {
      return
    }
    let payload: CompanyMaster = {
      companyId: 0,
      companyName: ''
    }
    this.masterApi.updateCompany(payload).subscribe(response => {
      this.submitted = false
      this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Updated Successflly!' });
    },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
      });
  }
  deleteCompany() {
    let payload: CompanyMaster = {
      companyId: 0,
    }
    this.masterApi.deleteCompany(payload).subscribe(response => {
      this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Deleted Successflly!' });
    },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
      });
  }

  get f() {
    return this.CompanyForm.controls;
  }
}

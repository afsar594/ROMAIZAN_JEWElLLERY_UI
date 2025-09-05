import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng';
import { BankMaster } from 'src/app/routes/domain/BankMaster';
import { MasterApiService } from 'src/app/routes/service/master.api.services';

@Component({
  selector: 'app-bankmaster',
  templateUrl: './bankmaster.component.html',
  styleUrls: ['./bankmaster.component.scss']
})
export class BankmasterComponent implements OnInit {
  title: string;
  subtitle: string;
  BMForm:FormGroup;
  displayMaximizeable: boolean = false;
  index: number = 0;
  handleChange(e) {
    this.index = e.index;
  }
  constructor( 
    private activatedroute:ActivatedRoute,
    private masterApiService: MasterApiService,
    private messageService: MessageService,
    ) { }
//validation is here
  ngOnInit(): void {
    this.activatedroute.data.subscribe(data=>{
      this.title=data.title;
      this.subtitle=data.subtitle;
    })
    this.cols = [
      { field: 'bankName', header: 'BankName' },
      { field: 'bankId', header: 'BankCode' },
      { field: 'branchName', header: 'BranchName' },
      { field: 'phone', header: 'PhonNo' },
      { field: 'iban', header: 'IBAN' },
      { field: 'rmail', header: 'Email' },
      { field: 'wpsagentId', header: 'AgentID' },
      { field: 'shortName', header: 'ShortName' },
      { field: 'fax', header: 'ChqNo' },
      { field: '', header: 'Actions' }
    ]
    this.displayMaximizeable = false;

    this. BMForm = new FormGroup({
      BankCode: new FormControl('', Validators.required),
      ShortName: new FormControl('', Validators.required),
      BankName: new FormControl('', Validators.required),
      AgentID: new FormControl('', Validators.required),
      IBAN: new FormControl('', Validators.required),
      BranchName: new FormControl('', Validators.required),
      PhonNo: new FormControl('', Validators.required),
      ChqNo: new FormControl('', Validators.required),
      Email: new FormControl('', Validators.required),
    });
    this.getBankMaster();
  }
  bankMasterList: Array<BankMaster> = [];
  cols: Array<any> = [
  ];
  getBankMaster() {
    this.masterApiService.getBankMaster().subscribe((response: any) => {
      this.bankMasterList = response;
      this.displayMaximizeable = true;
      //console.log('Visa designation list :',this.visadesignationList)
    });
  }
  insertBankMaster() {
    let payload: BankMaster = {
      bankName: String(this.BMForm.controls['BankName'].value),
      bankId:Number(this.BMForm.controls['BankCode'].value),
      branchName: String(this.BMForm.controls['BranchName'].value),
      phone:String(this.BMForm.controls['PhonNo'].value),
      iban: String(this.BMForm.controls['IBAN'].value),
      rmail:String(this.BMForm.controls['Email'].value),
      wpsagentId: Number(this.BMForm.controls['AgentID'].value),
      shortName:String(this.BMForm.controls['ShortName'].value),
      fax:String(this.BMForm.controls['ChqNo'].value),

    }
    this.masterApiService.insertBankMaster(payload).subscribe(response => {
      this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'New Record Added Successflly!' });
    },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
      });
  }
  selectForEdit(item: BankMaster) {
     
    this.displayMaximizeable = false;
    this.BMForm.controls['BankName'].setValue(item.bankName);
    this.BMForm.controls['BankCode'].setValue(item.bankId);
    this.BMForm.controls['BranchName'].setValue(item.branchName);
    this.BMForm.controls['PhonNo'].setValue(item.phone);
    this.BMForm.controls['IBAN'].setValue(item.iban);
    this.BMForm.controls['Email'].setValue(item.rmail);
    this.BMForm.controls['AgentID'].setValue(item.wpsagentId);
    this.BMForm.controls['ShortName'].setValue(item.shortName);
    this.BMForm.controls['ChqNo'].setValue(item.fax);
  }
  updateBankMaster() {
    let payload: BankMaster = {
      bankName: String(this.BMForm.controls['BankName'].value),
      bankId: Number(this.BMForm.controls['BankCode'].value),
      branchName: String(this.BMForm.controls['BranchName'].value),
      phone: String(this.BMForm.controls['PhonNo'].value),
      iban: String(this.BMForm.controls['IBAN'].value),
      rmail: String(this.BMForm.controls['Email'].value),
      wpsagentId: Number(this.BMForm.controls['AgentID'].value),
      shortName: String(this.BMForm.controls['ShortName'].value),
      fax: String(this.BMForm.controls['ChqNo'].value),
     
    }
    this.masterApiService.updateBankMaster(payload).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: 'Success!', detail: 'Record Updated Successflly!' });
    },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
      });
  }
  deleteBankMaster(bankId:BankMaster){
    this.masterApiService.deleteBankMaster(bankId).subscribe(response=>{
      this.messageService.add({severity:'success',summary:'Success',detail:'Record deleted successfully!',closable:true});
    },
    error=>{
      this.messageService.add({severity:'error',summary:'Failed',detail:'Delete Operation failed!',closable:true});
    })
  }
  get f(){
    return this.BMForm.controls;
  }

}

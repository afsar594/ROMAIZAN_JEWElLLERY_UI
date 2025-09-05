import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BankMaster } from 'src/app/routes/domain/BankMaster';
import { MasterApiService } from 'src/app/routes/service/master.api.services';

@Component({
  selector: 'app-bankmaster',
  templateUrl: './bankmaster.component.html',
  styleUrls: ['./bankmaster.component.scss']
})
export class BankmasterComponent implements OnInit {
  submitted: boolean = false
  title: string;
  subtitle: string;
  BMForm: FormGroup;
  displayMaximizeable: boolean = false;
  index: number = 0;
  isEditBtndisable: boolean = true;
  first: any;
  rows: any;
  handleChange(e) {
    this.index = e.index;
  }
  constructor(private activatedroute: ActivatedRoute, public masterApiService: MasterApiService,
    private messageService: MessageService) { }
  ngOnInit(): void {
    this.masterApiService.GetHrBankMastersWithSubs()
    this.initForm()
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
      this.subtitle = data.subtitle;

    })
    this.masterApiService.InserHrBankMaster(this.BMForm.value).subscribe(response => {
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
    this.masterApiService.UpdateHrBankMaster(payload).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: 'Success!', detail: 'Record Updated Successflly!' });
    },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
      });
  }
  deleteBankMaster(bankId: BankMaster) {
    this.masterApiService.DeleteHrBankMaster(bankId).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Record deleted successfully!', closable: true });
    },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Delete Operation failed!', closable: true });
      })
  }

  initForm() {
    this.BMForm = new FormGroup({
      bankId: new FormControl(0),
      shortName: new FormControl('', Validators.required),
      bankName: new FormControl('', Validators.required),
      wpsagentId: new FormControl(null),
      ibAN: new FormControl(''),
      branchName: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      fax: new FormControl(''),
      email: new FormControl('', Validators.required),
    });
  }

  get f() {
    return this.BMForm.controls;
  }


  onCancel() {
    this.isEditBtndisable = true
    this.initForm()
  }

  onDelete(rowData: any) {
    if (confirm("Are you sure. You want to delete this record ?")) {
      this.masterApiService.DeleteHrBankMaster(rowData).subscribe((response: any[]) => {
        this.initForm()
        this.masterApiService.BankMasterArray = response
        this.submitted = false
        this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Deleted Successflly!' });
      }, error => {
        this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
      });
    }
  }

  onClickEdit(rowData: any) {
    try {
      debugger
      this.isEditBtndisable = false
      this.BMForm.controls.bankId.setValue(rowData.bankId)
      this.BMForm.controls.shortName.setValue(rowData.shortName)
      this.BMForm.controls.bankName.setValue(rowData.bankName)
      this.BMForm.controls.ibAN.setValue(rowData.ibAN)
      this.BMForm.controls.branchName.setValue(rowData.branchName)
      this.BMForm.controls.phone.setValue(rowData.phone)
      this.BMForm.controls.fax.setValue(rowData.fax)
      this.BMForm.controls.email.setValue(rowData.email)
    } catch (error) {
      console.log(error)
    }
  }

  onEdit() {
    this.submitted = true
    if (this.BMForm.invalid) {
      return
    }
    this.masterApiService.UpdateHrBankMaster(this.BMForm.value).subscribe((response: any[]) => {
      this.initForm()
      this.masterApiService.BankMasterArray = response
      this.submitted = false
      this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Updated Successflly!' });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  onSave() {
    this.submitted = true
    if (this.BMForm.invalid) {
      return
    }
    this.masterApiService.InserHrBankMaster(this.BMForm.value).subscribe((response: any[]) => {
      this.initForm()
      this.masterApiService.BankMasterArray = response
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
    return this.masterApiService.HrFamilyDetailsproperty ? this.first === this.masterApiService.HrFamilyDetailsproperty.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.masterApiService.HrFamilyDetailsproperty ? this.first === 0 : true;
  }
}




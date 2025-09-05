import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng';
import { MasterApiService } from 'src/app/routes/service/master.api.services';
import { TransactionService } from 'src/app/routes/service/transaction-service.service';

@Component({
  selector: 'app-passport',
  templateUrl: './passport.component.html',
  styleUrls: ['./passport.component.scss']
})
export class PassportComponent implements OnInit {
  passportForm: FormGroup
  submitted: boolean = false
  subtitle: any;
  title: any;
  statusArray: any[] = [{ name: "In" }, { name: "Out" }]
  listModal: boolean = false
  staffName: string = ""
  detailArray: any[];
  index: any;
  handleChange(e) {
    this.index = e.index;
  }
  constructor(public transactionService: TransactionService, public masterApi: MasterApiService, private fb: FormBuilder, private messageService: MessageService
    , private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.initForm()
    this.masterApi.getAllStaffMasterWithSubscribe()
    this.masterApi.GetAllDocumentTypes()
    this.transactionService.GetPassportStaffList()
    this.transactionService.GetAllHrPassport()
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
      this.subtitle = data.subtitle
    });
  }

  initForm() {
    this.passportForm = this.fb.group({
      id: [0],
      date: [new Date()],
      documentTypeID: [null, Validators.required],
      status: [null, Validators.required],
      resubmissionDays: [0],
      labourCardNo: [null],
      lCDate: [new Date()],
      purpose: [null],
      remarks: [null],
      staffID: [null, Validators.required],
    })
  }

  get f() {
    return this.passportForm.controls
  }

  onCancel() {
    this.initForm()
    this.submitted = false
    this.listModal = false
  }

  getDataObj() {
    var dataobj = {
      id: this.passportForm.controls.id.value,
      date: this.passportForm.controls.date.value,
      documentTypeID: this.passportForm.controls.documentTypeID.value?.documentTypeId,
      status: this.passportForm.controls.status.value?.name,
      resubmissionDays: this.passportForm.controls.resubmissionDays.value,
      labourCardNo: this.passportForm.controls.labourCardNo.value,
      lCDate: this.passportForm.controls.lCDate.value,
      purpose: this.passportForm.controls.purpose.value,
      remarks: this.passportForm.controls.remarks.value,
      staffID: this.passportForm.controls.staffID.value?.staffId,
    }
    return dataobj
  }

  onSave() {
    this.submitted = true
    if (this.passportForm.invalid) {
      return
    }
    this.transactionService.InsertHrPassport(this.getDataObj()).subscribe(res => {
      this.transactionService.PassportArray = res as any[]
      this.submitted = false
      this.initForm()
      this.transactionService.GetPassportStaffList()
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    })
  }

  viewDetails(staffID, staffName) {
    debugger
    this.staffName = staffName;
    this.detailArray = this.transactionService.PassportArray.filter(o => o.staffID == staffID)
    this.listModal = true
  }

  getDocumentTypeName(documentTypeID) {
    return this.masterApi.HrDocumentTypesArray.find(o => o.documentTypeId == documentTypeID)?.documentType
  }

  onDelete(rowData: any) {
    if (confirm("Are you sure. You want to delete this record ?")) {
      this.transactionService.DeleteHrMobilizationDetails(rowData).subscribe((response: any[]) => {
        this.initForm()
        this.transactionService.GetPassportStaffList()
        this.transactionService.PassportArray = response
        this.listModal = false
        this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Deleted Successflly!' });
      }, error => {
        this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
      });
    }
  }


}

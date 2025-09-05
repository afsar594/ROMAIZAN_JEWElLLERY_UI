import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api/menuitem';
import { MasterApiService } from 'src/app/routes/service/master.api.services';
import { TransactionService } from 'src/app/routes/service/transaction-service.service';
// import { MenuItem } from 'primeng';
import { GratuityAmountPolicy } from 'src/app/routes/domain/GratuityAmountPolicy';

@Component({
  selector: 'app-gratuityamountpolicy',
  templateUrl: './gratuityamountpolicy.component.html',
  styleUrls: ['./gratuityamountpolicy.component.scss']
})
export class GratuityamountpolicyComponent implements OnInit {
  isBtnEnable: boolean = false
  showListModal: boolean = false
  submitted: boolean = false
  title: string;
  GAPForm: FormGroup;
  subtitle: string;
  breadcumbmodel: MenuItem[];
  detailArray: any[] = [];
  policyMasterId: number = 1;
  detailData: any[];
  viewDetailModal: boolean = false;
  constructor(private activatedroute: ActivatedRoute, private fb: FormBuilder, public masterApiService: MasterApiService,
    public transactionApiService: TransactionService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.transactionApiService.GetAllHrSalaryHeads()
    this.masterApiService.GetAllHrGratAmtPolicyMaster()
    this.masterApiService.GetAllHrGratAmtPolicyDetails()
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
      this.subtitle = data.title;
    });
    this.initForm()
  }

  public get f() {
    return this.GAPForm.controls;
  }

  ChangeSelect(shID: number) {
    var index = this.detailArray.findIndex(o => o.SalHeadId == shID)
    if (index >= 0) {
      this.detailArray.splice(index, 1)
    }
    else {
      this.detailArray.push({
        DetPolId: 0,
        PolId: this.policyMasterId,
        SalHeadId: shID,
        CheckStatus: true
      })
    }
    console.log(this.detailArray)
  }

  initForm() {
    this.GAPForm = this.fb.group({
      polId: new FormControl(0),
      policyName: new FormControl('', Validators.required),
      polcyType: new FormControl(false),
      remarks: new FormControl(''),
    });
  }

  onCancel() {
    this.detailArray = []
    this.submitted = false
    this.initForm()
  }

  onClickEdit(rowData: any) {

  }

  onEdit() {
    this.submitted = true
    if (this.GAPForm.invalid) {
      return
    }
    this.masterApiService.UpdateHrGratAmtPolicyMaster(this.GAPForm.value).subscribe((response: any[]) => {
      this.initForm()
      this.submitted = false
      this.isBtnEnable = true
      this.masterApiService.GetAllHrGratAmtPolicyMaster()
      this.policyMasterId = response[response.length - 1].polId
      this.masterApiService.GratuityMasterArray = response
      this.submitted = false
      this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Updated Successflly!' });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  onSave() {
    this.submitted = true
    if (this.GAPForm.invalid) {
      return
    }
    this.masterApiService.InsertHrGratAmtPolicyMaster(this.GAPForm.value).subscribe((response: any[]) => {
      this.initForm()
      this.submitted = false
      this.isBtnEnable = true
      this.masterApiService.GetAllHrGratAmtPolicyMaster()
      this.policyMasterId = response[response.length - 1].polId
      this.masterApiService.GratuityMasterArray = response
      this.submitted = false
      this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Added Successflly!' });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  onSaveDetail() {
    if (this.detailArray.length == 0) {
      // alert("Please select salary head")
      return
    }
    this.masterApiService.InsertHrGratAmtPolicyDetails(this.detailArray).subscribe((response: any[]) => {
      this.initForm()
      this.policyMasterId = response[response.length - 1].polId
      this.masterApiService.GratuityMasterArray = response
      this.masterApiService.GetAllHrGratAmtPolicyDetails()
      this.submitted = false
      this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Added Successflly!' });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  getpolName(polId: number) {
    return this.masterApiService.HrGratAmtPolicyMaster.find(o => o.polId == polId)?.policyName
  }

  getsalaryHeadName(Id: number) {
    return this.transactionApiService.SalaryHeadsArray.find(o => o.shid == Id)?.displayName
  }

  ViewDetails(polId) {
    this.detailData = this.masterApiService.HrGratAmtPolicyDetail.filter(o => o.polId == polId)
    this.viewDetailModal = true
  }

  onDeleteMaster(dataObj: any) {
    if (confirm("Are you sure. You want to delete this record ?")) {
      this.masterApiService.DeleteHrGratAmtPolicyMaster(dataObj).subscribe(response => {
        this.showListModal = false
        this.masterApiService.GetAllHrGratAmtPolicyMaster()
        this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Deleted Successflly!' });
        this.masterApiService.HrGratAmtPolicyMaster = response as any[]
      }, error => {
        this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
      });
    }
  }



  onDeleteDetail(dataObj: any) {
    if (confirm("Are you sure. You want to delete this record ?")) {
      this.masterApiService.DeleteHrGratAmtPolicyDetails(dataObj).subscribe(response => {
        this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Deleted Successflly!' });
        this.detailArray = this.detailArray.filter(o => o.detPolId != dataObj.detPolId)
        this.viewDetailModal = false
        this.masterApiService.GetAllHrGratAmtPolicyDetails()
      }, error => {
        this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
      });
    }
  }
}

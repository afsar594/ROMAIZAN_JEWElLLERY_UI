import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HotTableRegisterer } from '@handsontable/angular';
import { TranslateService } from '@ngx-translate/core';
import Handsontable from 'handsontable';
import { MessageService } from 'primeng/api';
import { MasterApiService } from 'src/app/routes/service/master.api.services';

@Component({
  selector: 'app-familydetails',
  templateUrl: './familydetails.component.html',
  styleUrls: ['./familydetails.component.scss']
})
export class FamilydetailsComponent implements OnInit {
  first = 0;
  rows = 10;
  title: string;
  subtitle: any;
  FDEForm: FormGroup;
  index: number = 0;
  isEditBtndisable: boolean = true;
  submitted: boolean = false;
  handleChange(e) {
    this.index = e.index;
  }

  constructor(private activatedroute: ActivatedRoute, private fb: FormBuilder, private translate: TranslateService,
    public masterApiService: MasterApiService, public messageService: MessageService) { }
  ngOnInit(): void {
    this.initForm()
    this.masterApiService.getAllStaffMasterWithSubscribe()
    this.masterApiService.GetAllHrFamilyDetailsproperty()
    this.masterApiService.GetAllHrRelationship()
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
      this.subtitle = data.title;
    });

  }

  initForm() {
    this.FDEForm = new FormGroup({
      id: new FormControl(0),
      staffId: new FormControl(null, Validators.required),
      fname: new FormControl(null, Validators.required),
      ftype: new FormControl(null),
      relId: new FormControl(null),
      visano: new FormControl(null),
      passportno: new FormControl(null),
      visaexpdate: new FormControl(new Date(new Date().setFullYear(new Date().getFullYear())), Validators.required),
      passportexpdate: new FormControl(new Date(new Date().setFullYear(new Date().getFullYear())), Validators.required),
      medicalinsurance: new FormControl(false),
      airticket: new FormControl(false),
      remarks: new FormControl(null),
      passporIssuDate: new FormControl(new Date(new Date().setFullYear(new Date().getFullYear())), Validators.required),
      visaissuDate: new FormControl(new Date(new Date().setFullYear(new Date().getFullYear())), Validators.required),
      emirateIssuDate: new FormControl(new Date(new Date().setFullYear(new Date().getFullYear())), Validators.required),
      emirateExpDate: new FormControl(new Date(new Date().setFullYear(new Date().getFullYear())), Validators.required),
    });
  }

  onSearch(value: string) {
    // this.masterApi.staffMasterArray = this.masterApi.staffMasterArrayDuplicate.filter(o => o.staffCode.toLowerCase().includes(value.toLowerCase()) || o.fullName.toLowerCase().includes(value.toLowerCase()))
  }

  get f() {
    return this.FDEForm.controls;
  }

  onDelete(rowData: any) {
    if (confirm("Are you sure. You want to delete this record ?")) {
      this.FDEForm.controls.staffId.setValue(this.FDEForm.controls.staffId.value?.staffId)
      this.masterApiService.DeleteHrFamilyDetailsproperty(rowData).subscribe((response: any[]) => {
        this.initForm()
        this.masterApiService.HrFamilyDetailsproperty = response;
        this.submitted = false
        this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Deleted Successflly!' });
      }, error => {
        this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
      });
    }
  }

  onClickEdit(rowData: any) {
    try {
      var staffObj = this.masterApiService.staffMasterArrayDuplicate.find(o => o.staffId == rowData.staffId)
      var relObj = this.masterApiService.HrRelationArray.find(o => o.relId == rowData.relId)
      this.isEditBtndisable = false
      this.FDEForm.controls.staffId.setValue(staffObj)
      this.FDEForm.controls.relId.setValue(relObj)
      this.FDEForm.controls.id.setValue(rowData.id)
      this.FDEForm.controls.fname.setValue(rowData.fname)
      this.FDEForm.controls.ftype.setValue(rowData.ftype)
      this.FDEForm.controls.visano.setValue(rowData.visano)
      this.FDEForm.controls.passportno.setValue(rowData.passportno)
      this.FDEForm.controls.visaexpdate.setValue(rowData.visaexpdate)
      this.FDEForm.controls.passportexpdate.setValue(rowData.passportexpdate)
      this.FDEForm.controls.medicalinsurance.setValue(rowData.medicalinsurance)
      this.FDEForm.controls.airticket.setValue(rowData.airticket)
      this.FDEForm.controls.remarks.setValue(rowData.remarks)
      this.FDEForm.controls.passporIssuDate.setValue(rowData.passporIssuDate)
      this.FDEForm.controls.visaissuDate.setValue(rowData.visaissuDate)
      this.FDEForm.controls.emirateIssuDate.setValue(rowData.emirateIssuDate)
      this.FDEForm.controls.emirateExpDate.setValue(rowData.emirateExpDate)
    } catch (error) {
      console.log(error)
    }
  }

  onEdit() {
    this.submitted = true
    if (this.FDEForm.invalid) {
      return
    }
    this.FDEForm.controls.staffId.setValue(this.FDEForm.controls.staffId.value?.staffId)
    this.masterApiService.UpdateHrFamilyDetailsproperty(this.FDEForm.value).subscribe((response: any[]) => {
      this.initForm()
      this.masterApiService.HrFamilyDetailsproperty = response;
      this.submitted = false
      this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Updated Successflly!' });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  onSave() {
    this.submitted = true
    if (this.FDEForm.invalid) {
      return
    }
    this.FDEForm.controls.staffId.setValue(this.FDEForm.controls.staffId.value?.staffId)
    this.masterApiService.InsertHrFamilyDetailsproperty(this.FDEForm.value).subscribe((response: any[]) => {
      this.initForm()
      this.masterApiService.HrFamilyDetailsproperty = response;
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

  getStaffName(staffID: any) {
    if (this.masterApiService.staffMasterArrayDuplicate && this.masterApiService.staffMasterArrayDuplicate.length > 0) {
      return this.masterApiService.staffMasterArrayDuplicate.find(o => o.staffId == staffID)?.fullName
    }
  }
  getRelationName(relId: any) {
    if (this.masterApiService.HrRelationArray && this.masterApiService.HrRelationArray.length > 0) {
      return this.masterApiService.HrRelationArray.find(o => o.relId == relId)?.relName
    }
  }

  onCancel() {
    this.isEditBtndisable = true
    this.initForm()
  }
}

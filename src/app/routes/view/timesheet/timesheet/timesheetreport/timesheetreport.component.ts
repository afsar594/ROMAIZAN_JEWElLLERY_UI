import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MasterApiService } from 'src/app/routes/service/master.api.services';

@Component({
  selector: 'app-timesheetreport',
  templateUrl: './timesheetreport.component.html',
  styleUrls: ['./timesheetreport.component.scss']
})
export class TimesheetreportComponent implements OnInit {
  first = 0;
  rows = 10;
  siteModal: boolean = false
  designationModal: boolean = false
  staffModal: boolean = false
  TSreportForm: FormGroup;
  gridHeader: string;
  dataArray: any[];
  tableData: any[] = [];
  cities: any[] = [];
  constructor(private fb: FormBuilder, private translate: TranslateService, public masterApiService: MasterApiService) {

  }
  ngOnInit(): void {
    this.TSreportForm = new FormGroup({
      Staff: new FormControl('', Validators.required),
      Designation: new FormControl('', Validators.required),
      Site: new FormControl('', Validators.required),
      FromDate: new FormControl(new Date(new Date().setFullYear(new Date().getFullYear())), Validators.required),
      ToDate: new FormControl(new Date(new Date().setFullYear(new Date().getFullYear())), Validators.required),
      ReportType: new FormControl('', Validators.required),

    });
  }

  get f() {
    return this.TSreportForm.controls;
  }

  setStaffName(value: string) {
    this.TSreportForm.controls.Staff.setValue(value)
    this.staffModal = false
  }

  setSiteName(value: string) {
    this.TSreportForm.controls.Site.setValue(value)
    this.siteModal = false
  }

  setDesignationName(value: string) {
    this.TSreportForm.controls.Designation.setValue(value)
    this.designationModal = false
  }

  onSearchStaff(value: string) {
    this.masterApiService.staffMasterArray = this.masterApiService.staffMasterArrayDuplicate.filter(o => o.staffCode.toLowerCase().includes(value.toLowerCase()) || o.fullName.toLowerCase().includes(value.toLowerCase()))
  }

  onSearchSite(value: string) {
    this.masterApiService.siteMasterArray = this.masterApiService.siteMasterArrayDuplicate.filter(o => o.siteName.toLowerCase().includes(value.toLowerCase()) || o.shortName.toLowerCase().includes(value.toLowerCase()))
  }

  onSearchDesignation(value: string) {
    this.masterApiService.designatinMasterArray = this.masterApiService.designatinMasterArrayDuplicate.filter(o => o.designation.toLowerCase().includes(value.toLowerCase()))
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
    return this.tableData ? this.first === this.tableData.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.tableData ? this.first === 0 : true;
  }
}

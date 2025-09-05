import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HotTableRegisterer } from '@handsontable/angular';
import { TranslateService } from '@ngx-translate/core';
import { defaults } from 'chart.js';
import Handsontable from 'handsontable';
import { MasterApiService } from 'src/app/routes/service/master.api.services';
import { TransactionService } from 'src/app/routes/service/transaction-service.service';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.scss']
})
export class PayrollComponent implements OnInit {
  title: string;
  subtitle: string;
  index: number = 0;
  licensekey: any;
  PMForm: FormGroup;
  dataset: any;
  gridHeader: string;
  handleChange(e) {
    this.index = e.index;
  }

  hotid = 'Payrolldetails';
  private hotRegisterer = new HotTableRegisterer();
  Payrolldetails: Handsontable.GridSettings;
  initializeControls() {
    this.Payrolldetails = {
      rowHeaders: true,
      viewportColumnRenderingOffset: 27,
      viewportRowRenderingOffset: 'auto',
      colWidths: [90, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40],
      minRows: 3,
      width: '100%',
      height: 300,
      rowHeights: 23,
      fillHandle: {
        direction: 'vertical',
        autoInsertRow: true
      },
      data: [],
      minSpareRows: 1,
      allowInsertRow: true,

      stretchH: "all",
      manualRowResize: true,
      manualColumnResize: true,
      columns: [
        {
          data: 'Name',
          type: 'text',
        },
        {
          data: 'Designation',
          type: 'text'
        },
        {
          data: 'Department',
          type: 'text',
        },
        {
          data: 'Staff Code',
          type: 'text'
        },
        {
          data: 'No.OfDay',
          type: 'text',
        },
        {
          data: 'Basic',
          type: 'text'
        },
        {
          data: 'Other Earnings',
          type: 'text'
        },
        {
          data: 'Earnings',
          type: 'text',
        },
        {
          data: 'Deductions',
          type: 'text'
        },
        {
          data: 'Net Salary',
          type: 'text'
        },
        {
          data: 'Proccess Mode',
          type: 'text'
        }

      ],
      colHeaders: [
        this.translate.instant('Name'),
        this.translate.instant('Designation'),
        this.translate.instant('Department'),
        this.translate.instant('Staff Code'),
        this.translate.instant('No.OfDay'),
        this.translate.instant('Basic'),
        this.translate.instant('Other Earnings'),
        this.translate.instant('Earnings'),
        this.translate.instant('Deductions'),
        this.translate.instant('Net Salary'),
        this.translate.instant('Proccess Mode'),
      ],
      manualRowMove: true,
      manualColumnMove: true,
      contextMenu: true,
      filters: true,
      dropdownMenu: true,
    }
  }
  PostingType: any[] = [{ name: "All" }, { name: "Paid" }, { name: "Posted" }]
  TransType: any[] = [{ name: "All" }, { name: "Bank" }, { name: "Cash" }]
  yearArray: { year: number; }[] = [];
  monthArray: any[] = [{ name: "January" }, { name: "February" }, { name: "March" }, { name: "April" }, { name: "May" }, { name: "June" },
  { name: "July" }, { name: "August" }, { name: "September" }, { name: "October" }, { name: "November" }, { name: "December" }]
  constructor(public masterApi: MasterApiService,
    private activatedroute: ActivatedRoute,
    private fb: FormBuilder, public transactionService: TransactionService,
    private translate: TranslateService,) { }

  ngOnInit(): void {
    this.masterApi.GetHrPayRollReport()
    this.masterApi.GetAllHrSites()
    this.masterApi.GetAllHrCampMaster()
    this.masterApi.GetAllHrSponserWithSubs()
    this.masterApi.GetHrBankMastersWithSubs()
    this.masterApi.getAllDepartmentWithSub()
    this.masterApi.getAllDesignationWithSubscribe()
    this.masterApi.getAllVisaCompanyWithSubs()
    this.masterApi.GetAllHrStaffTypeWithSubs()
    this.transactionService.GetPayroll()
    var year = (new Date()).getFullYear()
    var previousYear = year - 1
    var yearArray = [{ year: year }, { year: previousYear }]
    this.yearArray = yearArray
    this.PMForm = new FormGroup({
      month: new FormControl('', Validators.required),
      visaCompany: new FormControl('', Validators.required),
      year: new FormControl('', Validators.required),
      postingtype: new FormControl('', Validators.required),
      print: new FormControl('', Validators.required),
      department: new FormControl('', Validators.required),
      company: new FormControl('', Validators.required),
      sponsor: new FormControl('', Validators.required),
      designation: new FormControl('', Validators.required),
      transtype: new FormControl('', Validators.required),
      stafftype: new FormControl('', Validators.required),
      bank: new FormControl('', Validators.required),
      camp: new FormControl('', Validators.required),
      site: new FormControl('', Validators.required),
      cycle: new FormControl('', Validators.required),
      search: new FormControl('', Validators.required),
      date: new FormControl(new Date(new Date().setFullYear(new Date().getFullYear())), Validators.required),

    });
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
      this.subtitle = data.title;
      this.licensekey = defaults.hotlicensekey;
      this.gridHeader = "No Data";

    });
    this.initializeControls()
  }
  get f() {
    return this.PMForm.controls;
  }
  // this.masterApi.GetHrPayRollReport()
  // this.masterApi.GetAllHrSites()
  // this.masterApi.GetAllHrCampMaster()
  // this.masterApi.GetAllHrSponserWithSubs()
  // this.masterApi.GetHrBankMastersWithSubs()
  // this.masterApi.getAllDepartmentWithSub()
  // this.masterApi.getAllDesignationWithSubscribe()
  // this.masterApi.getAllVisaCompanyWithSubs()
  // this.masterApi.GetAllHrStaffTypeWithSubs()
  // var year = (new Date()).getFullYear()
  // var previousYear = year - 1
  // var yearArray = [{ year: year }, { year: previousYear }]
  // this.yearArray = yearArray
  //  this.initializeControls()


}

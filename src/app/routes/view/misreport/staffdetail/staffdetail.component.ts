import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MasterApiService } from 'src/app/routes/service/master.api.services';
import { ReportService } from 'src/app/routes/service/report.service';
import { PdfService } from 'src/app/routes/service/pdf.service';

@Component({
  selector: 'app-staffdetail',
  templateUrl: './staffdetail.component.html',
  styleUrls: ['./staffdetail.component.scss']
})
export class StaffdetailComponent implements OnInit {
  title: any;
  subtitle: any;
  reportForm: FormGroup
  showStaff: boolean = true;
  documentIds: any[];
  staffIds: any[];
  vehicleIds: any[];
  isReport: boolean = false
  constructor(private activatedroute: ActivatedRoute, private fb: FormBuilder, public masterApi: MasterApiService, public reportService: ReportService,
    public PdfService: PdfService) { }

  ngOnInit(): void {
    this.masterApi.getAllCompanyWithSubs()
    this.masterApi.getAllVisaCompanyWithSubs()
    this.masterApi.GetAllHrSponserWithSubs()
    this.masterApi.getAllDepartmentWithSub()
    this.masterApi.GetAllHrSites()
    this.masterApi.getAllDesignationWithSubscribe()
    this.masterApi.GetAllHrNationalityWithSubs()
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
      this.subtitle = data.subtitle;
    });
    this.initForm()
  }

  initForm() {
    this.reportForm = this.fb.group({
      companyID: [null],
      visaCompanyID: [null],
      sponsorID: [null],
      departmentID: [null],
      siteID: [null],
    })
  }

  onCategoryChange() {
    if (this.reportForm.controls.category.value?.name == "Vehicle") {
      this.showStaff = false
      this.staffIds = []
    }
    else {
      this.showStaff = true
      this.vehicleIds = []
    }
  }

  GenerateReport() {
    this.reportService.GetStaffReport(this.reportForm.controls.siteID.value?.siteId,
      this.reportForm.controls.sponsorID.value?.sponserId,
      this.reportForm.controls.companyID.value?.companyId,
      this.reportForm.controls.visaCompanyID.value?.visaCompanyId,
      this.reportForm.controls.departmentID.value?.departmentId)
    // this.reportService.isStaffReportGenerate.subscribe(res => {
    //   if (res) {
    //     this.isReport = true
    //     this.onPrint()
    //   }
    // })
  }
 
  getDepartmentName(departmentId) {
    try {
      return this.masterApi.DepartmentArray.find(o => o.departmentId == departmentId)?.department
    } catch (error) {
      console.log(error)
    }
  }

  getDesignationName(designationID: number) {
    try {
      return this.masterApi.designatinMasterArrayDuplicate.find(o => o.designationId == designationID)?.designation
    } catch (error) {
      console.log(error)
    }
  }

  getNationalityName(nationalityId: number) {
    try {
      return this.masterApi.NationalityArray.find(o => o.nationalityId == nationalityId)?.nationality
    } catch (error) {
      console.log(error)
    }
  }

  onPrint() {
    var css: string = `
    * {
    box-sizing: border-box;
}
.col-12 h1 {
    text-align: center;
    color: rgb(18, 21, 75);
    text-decoration: bold;
    font-size: 140%;
}
.col-12 h2 {
    text-align: center;
    color: rgb(6, 6, 20);
    font-size: 30px;
}
.col-12 h3 {
    color: rgb(50, 117, 68);
}
.col-12 body table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
}
td, th {
    width: 15rem;
    border: 1px solid #bbb9b9;
    text-align: center;
    padding: 9px;
    text-align: center;
}
tr:nth-child(even) {
    background-color: #bebbbb;
    border: 1px solid #dddddd;
}
p {
    text-align: center;
}
.heading {
    color: white;
    background-color: rgb(8, 145, 122);
    width: 96%;
    height: 5%;
    padding-left: 5%;
    text-align: center;
    padding: 0px;
    margin: 0px;
    border: 1px solid #979393;
}
.column {
    float: left;
    padding-left: 5%;
    width: 16%;
    padding: 10px;
    height: 30px;
    text-align: center;
    color: white;
    border: 1px solid #979393;
}
.row:after {
    content: "";
    display: table;
    clear: both;
    padding: 5%;
}
    `
    this.PdfService.PrintPDF("print", css)
  }

  calculateDays(issueDate, expDate) {
    try {
      return Math.floor((Date.UTC(expDate.getFullYear(), expDate.getMonth(), expDate.getDate()) - Date.UTC(issueDate.getFullYear(), issueDate.getMonth(), issueDate.getDate())) / (1000 * 60 * 60 * 24));
    } catch (error) {
      console.log(error)
    }
  }
}

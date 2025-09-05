import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { timeStamp } from 'console';
import { MasterApiService } from 'src/app/routes/service/master.api.services';
import { ReportService } from 'src/app/routes/service/report.service';

@Component({
  selector: 'app-nationalitygrade',
  templateUrl: './nationalitygrade.component.html',
  styleUrls: ['./nationalitygrade.component.scss']
})
export class NationalitygradeComponent implements OnInit {
  public pieChartType: string = 'pie';
  title: any;
  subtitle: any;
  yearArray: { year: number; }[] = [];
  monthNames: any[] = [{ month: "January" }, { month: "February" }, { month: "March" }, { month: "April" }, { month: "May" }, { month: "June" },
  { month: "July" }, { month: "August" }, { month: "September" }, { month: "October" }, { month: "November" }, { month: "December" },]
  first: any;
  rows: any;
  firstCompany: any;
  rowsCompany: any;

  NationalityCompanyID: any
  YearlySalaryYear: any
  YearlySalaryMonth: any
  DesignationDesignationID: any
  DesignationYear: any
  DesignationMonth: any
  DepartmentDepartmentID: any
  DepartmentYear: any
  DepartmentMonth: any
  EmpStatusYear: any

  NationalityLabel: any[] = []
  NationalityData: any[] = []
  showNationalityChar: boolean = false

  EmpStatusLabel: any[] = []
  EmpStatusData: any[] = []
  EmpStatusChart: boolean = false

  companyLabel: any[] = []
  CompanyData: any[] = []
  CompanyChart: boolean = false

  DepartmentLabel: any[] = []
  DepartmentData: any[] = []
  DepartmentChart: boolean = false

  DesignationLabel: any[] = []
  DesignationData: any[] = []
  DesignationChart: boolean = false

  YearSalaryLabel: any[] = []
  YearSalaryData: any[] = []
  YearSalaryChart: boolean = false
  constructor(public reportService: ReportService, private activatedroute: ActivatedRoute, public masterApi: MasterApiService) { }

  ngOnInit(): void {
    this.reportService.GetNationalityGradeReport()
    this.masterApi.getAllDepartmentWithSub()
    this.masterApi.getAllDesignationWithSubscribe()
    this.masterApi.getAllCompanyWithSubs()
    var year = (new Date()).getFullYear()
    var previousYear = year - 1
    var yearArray = [{ year: year }, { year: previousYear }]
    this.yearArray = yearArray
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
      this.subtitle = data.subtitle;
    });
    this.reportService.isNationalGradeReportCall.subscribe(res => {
      if (res) {
        if (this.reportService.NationalityGradeReport?.nationalityList) {
          this.reportService.NationalityGradeReport?.nationalityList.forEach(element => {
            this.NationalityLabel.push(element.nationality)
            this.NationalityData.push(element.qty)
          })
          this.showNationalityChar = true
        }
        if (this.reportService.NationalityGradeReport?.staffStatusList) {
          this.reportService.NationalityGradeReport?.staffStatusList.forEach(element => {
            this.EmpStatusLabel.push(element.empStatus)
            this.EmpStatusData.push(element.count)
          })
          this.EmpStatusChart = true
        }
        if (this.reportService.NationalityGradeReport?.companyList) {
          this.reportService.NationalityGradeReport?.companyList.forEach(element => {
            this.companyLabel.push(element.companyName)
            this.CompanyData.push(element.qty)
          })
          this.CompanyChart = true
        }
        if (this.reportService.NationalityGradeReport?.yearSalaryList) {
          this.reportService.NationalityGradeReport?.yearSalaryList.forEach(element => {
            this.YearSalaryLabel.push(element.mthName)
            this.YearSalaryData.push(element.total)
          })
          this.YearSalaryChart = true
        }
        if (this.reportService.NationalityGradeReport?.designationSalaryList) {
          this.reportService.NationalityGradeReport?.designationSalaryList.forEach(element => {
            this.DesignationLabel.push(element.designationName)
            this.DesignationData.push(element.netSal)
          })
          this.DesignationChart = true
        }
        if (this.reportService.NationalityGradeReport?.departmentSalaryList) {
          this.reportService.NationalityGradeReport?.departmentSalaryList.forEach(element => {
            this.DepartmentLabel.push(element.departmentName)
            this.DesignationData.push(element.netSal)
          })
          this.DepartmentChart = true
        }
      }
    })
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
    return this.reportService.NationalityGradeReport?.nationalityList ? this.first === this.reportService.NationalityGradeReport?.nationalityList.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.reportService.NationalityGradeReport?.nationalityList ? this.first === 0 : true;
  }

  getNationalityPercentage(qty: number, total: number) {
    var percentage = (qty / total) * 100
    return Math.round(percentage)
  }

  getCompanyPercentage(qty: number, total: number) {
    var percentage = (qty / total) * 100
    return Math.round(percentage)
  }

  getDepartmentPercentage(qty: number, total: number) {
    var percentage = (qty / total) * 100
    return Math.round(percentage)
  }

  getDesignationPercentage(qty: number, total: number) {
    var percentage = (qty / total) * 100
    return Math.round(percentage)
  }

  ChangeNationalityComany() {
    try {
      this.reportService.NationalityGradeReport.nationalityList = this.reportService.nationalityList.filter(o => this.NationalityCompanyID ? o.companyId == this.NationalityCompanyID?.companyId : true)
    } catch (error) {
    }
  }

  ChangeYearSalary() {
    try {
      this.reportService.NationalityGradeReport.yearSalaryList = this.reportService.yearSalaryList.filter(o => (this.YearlySalaryYear ? o.payYear == this.YearlySalaryYear?.year : true)
        || (this.YearlySalaryMonth ? o.mthName == this.YearlySalaryMonth?.month : true))
    } catch (error) {
    }
  }

  ChangeDesignationSalary() {
    try {
      this.reportService.NationalityGradeReport.designationSalaryList = this.reportService.designationSalaryList.filter(o => (this.DesignationDesignationID ? o.designationId == this.DesignationDesignationID?.designationId : true)
        || (this.DesignationYear ? o.payYear == this.DesignationYear?.year : true)
        || (this.DesignationMonth ? o.mthName == this.DesignationMonth?.month : true))
    } catch (error) {
    }
  }

  ChangeDepartmentSalary() {
    try {
      this.reportService.NationalityGradeReport.departmentSalaryList = this.reportService.departmentSalaryList.filter(o => (this.DepartmentDepartmentID ? o.departmentId == this.DepartmentDepartmentID?.departmentId : true)
        || (this.DepartmentYear ? o.payYear == this.DepartmentYear?.year : true)
        || (this.DepartmentMonth ? o.mthName == this.DepartmentMonth?.month : true))
    } catch (error) {
    }
  }

  ChangeEmpStatusYear() {
    try {
      this.reportService.NationalityGradeReport.staffStatusList = this.reportService.staffStatusList.filter(o => this.EmpStatusYear ? o.year == this.EmpStatusYear?.year : true)
    } catch (error) {
    }
  }
}

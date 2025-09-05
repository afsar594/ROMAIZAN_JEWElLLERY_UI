import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng';
import { environment } from 'src/environments/environment';
import { MasterUrls } from './url.api';
import { BehaviorSubject, Subject } from 'rxjs';
import { StaffMaster } from '../domain/StaffMaster';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  baseUrl: string = environment.apiRootURL;
  documentDetailArray: any[];
  isDocumenReportGenerate = new BehaviorSubject<boolean>(false);
  isStaffReportGenerate = new BehaviorSubject<boolean>(false);
  staffDetailArray: StaffMaster[] = [];
  loanDetailArray: any[] = [];
  HrLeaveDetailReportArray: any[] = [];
  HrPassportArray: any[] = [];
  StaffsBirthdayReport: any[] = [];
  IncrementHistoryReport: any[] = [];
  loanHistoryArray: any[] = [];
  salaryPackageReport: any[] = [];
  GrauityLeaveSalaryHistory: any
  AirTicketReport: any[] = [];
  AirTicketReportDuplicate: any[] = [];
  NationalityGradeReport: any;
  nationalityList: any[] = [];
  companyList: any[] = [];
  yearSalaryList: any[] = [];
  designationSalaryList: any[] = [];
  departmentSalaryList: any[] = [];
  staffStatusList: any[] = [];
  isNationalGradeReportCall = new Subject<boolean>();
  constructor(private httpClient: HttpClient, private messageService: MessageService) { }

  GetDocumentReport(paramBody: any) {
    this.httpClient.post<any[]>(this.baseUrl + MasterUrls.GetDocumentReport, paramBody).subscribe((res: any[]) => {
      this.documentDetailArray = res as any[]
      this.isDocumenReportGenerate.next(true)
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  GetLoanEntryReport(staffId: any) {
    this.httpClient.get<any[]>(this.baseUrl + MasterUrls.GetLoanEntryReport + "?staffId=" + staffId).subscribe((res: any[]) => {
      this.loanDetailArray = res as any[]
      this.isDocumenReportGenerate.next(true)
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  GetLoanHistoryReport(status: string) {
    this.httpClient.get<any[]>(this.baseUrl + MasterUrls.GetLoanHistoryReport + "?status=" + status).subscribe((res: any[]) => {
      this.loanHistoryArray = res as any[]
      this.isDocumenReportGenerate.next(true)
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  GetStaffReport(siteID?: number, sponsorID?: number, companyID?: number, visaCompanyID?: number, departmentID?: number) {
    var reportParam = {
      siteID: siteID == undefined ? null : siteID,
      sponsorID: sponsorID == undefined ? null : sponsorID,
      companyID: companyID == undefined ? null : companyID,
      visaCompanyID: visaCompanyID == undefined ? null : visaCompanyID,
      departmentID: departmentID == undefined ? null : departmentID,
    }
    this.httpClient.post<StaffMaster[]>(this.baseUrl + MasterUrls.GetStaffReport, reportParam).subscribe((res: StaffMaster[]) => {
      this.staffDetailArray = res as StaffMaster[]
      this.isStaffReportGenerate.next(true)
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }


  GetLeaveDummaryReport(reportBody: any) {
    this.httpClient.post<Array<any>>(this.baseUrl + MasterUrls.GetLeaveDummaryReport, reportBody).subscribe((res: any[]) => {
      this.HrLeaveDetailReportArray = res as any[]
      this.isStaffReportGenerate.next(true)
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  GetPassportReport(reportBody: any) {
    this.httpClient.post<Array<any>>(this.baseUrl + MasterUrls.GetPassportReport, reportBody).subscribe((res: any[]) => {
      this.HrPassportArray = res as any[]
      this.isStaffReportGenerate.next(true)
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  GetStaffsBirthday(monthName: any) {
    this.httpClient.get<any[]>(this.baseUrl + MasterUrls.GetStaffsBithday + "?monthName=" + monthName).subscribe((res: any[]) => {
      this.StaffsBirthdayReport = res as any[]
      this.isDocumenReportGenerate.next(true)
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  GetIncrementHistoryReport(reportBody: any) {
    this.httpClient.post<Array<any>>(this.baseUrl + MasterUrls.GetIncrementHistoryReport, reportBody).subscribe((res: any[]) => {
      this.IncrementHistoryReport = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  GetSalaryPackageReport(reportBody: any) {
    this.httpClient.post<Array<any>>(this.baseUrl + MasterUrls.GetSalaryPackageReport, reportBody).subscribe((res: any[]) => {
      this.salaryPackageReport = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  GetGrauityLeaveSalaryHistory() {
    this.httpClient.get<any>(this.baseUrl + MasterUrls.GetGrauityLeaveSalaryHistory).subscribe((res: any) => {
      this.GrauityLeaveSalaryHistory = res as any
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  GetAirTicketReport() {
    this.httpClient.get<any>(this.baseUrl + MasterUrls.GetAirTicketReport).subscribe((res: any) => {
      this.AirTicketReport = res as any
      this.AirTicketReportDuplicate = res as any
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  GetNationalityGradeReport() {
    this.httpClient.get<any>(this.baseUrl + MasterUrls.NationalityGradeReport).subscribe((res: any) => {
      this.NationalityGradeReport = res as any
      this.nationalityList = this.NationalityGradeReport?.nationalityList
      this.companyList = this.NationalityGradeReport?.companyList
      this.yearSalaryList = this.NationalityGradeReport?.yearSalaryList
      this.designationSalaryList = this.NationalityGradeReport?.designationSalaryList
      this.departmentSalaryList = this.NationalityGradeReport?.departmentSalaryList
      this.staffStatusList = this.NationalityGradeReport?.staffStatusList
      this.isNationalGradeReportCall.next(true)
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }
}

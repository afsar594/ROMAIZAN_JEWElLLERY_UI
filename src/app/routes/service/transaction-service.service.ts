import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SalaryHeadsModel } from '../domain/SalaryHeadsModel';
import { MasterUrls } from './url.api';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  baseUrl: string;
  SalaryHeadsArray: any[] = [];
  AssetsArray: any[] = [];
  OtherExpenseMasterArray: any[] = [];
  OtherExpensePropertiesArray: any[] = [];
  DocumentMasterArray: any[] = [];
  StaffDocumentMasterArray: any[] = [];
  VehicleDocumentMaster: any[] = [];
  DocumentIMagesArray: any[] = [];
  HrMotnSalarayArray: any[] = [];
  HrMotnSalarayDeductionStaffsArray: any[] = [];
  HrLeaveMasterAray: any[] = [];
  HrLeaveMasterStaffAray: any[] = [];
  CompanyCalendarArray: any[] = [];
  GenerateCalendarArray: any[] = [];
  ChangeDepartmentArray: any[] = [];
  isChangeDepartmentCall = new Subject<boolean>()
  ChangeDepartmentDetArray: any[] = [];
  MobilizationDetailArray: any[] = [];
  MobilizationArray: any[] = [];
  PassportArray: any[] = [];
  PassportStaffArray: any[] = [];
  CompanyCalendarWeekendArray: any[];
  HrDailyShiftArray: any[];
  HrDailyShiftDayoffDetailsArray: any[];
  IncremtnArray: any[];
  IncremtnDetailArray: any[];
  SalaryPckg: any[];
  HrALOpeningStaffArray: any[];
  LeaveRejoiningData: any[];
  LoanSalaryHeadsArray: any[] = [];
  StaffDocumentsArray: any[] = [];
  VehcileDocumentsArray: any[] = [];
  PayrollList: any[] = [];
  LeaveSalaryList: any[] = [];
  SaveLeaveSalary = new BehaviorSubject(false)
  EditLeaveSalary = new BehaviorSubject(false)
  RemoveLeaveSalary = new BehaviorSubject(false)
  constructor(private httpClient: HttpClient, private messageService: MessageService) {
    this.baseUrl = environment.apiRootURL;
  }
  InsertHrSalaryHead(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrSalaryHead, payload);
  }
  UpdateHrSalaryHead(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrSalaryHead, payload);
  }
  DeleteHrSalaryHead(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHrSalaryHead, payload);
  }
  GetAllHrSalaryHeads() {
    if (this.SalaryHeadsArray && this.SalaryHeadsArray.length > 0) {
      return
    }
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrSalaryHeads).subscribe((res: any[]) => {
      this.SalaryHeadsArray = res as any[];
      this.SalaryHeadsArray.map(elemt => {
        elemt.remarks = ""
        elemt.incAmount = 0
        elemt.currSalary = 0
        elemt.newsalamount = 0
      })
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  GetLoanSalaryHeads() {
    if (this.LoanSalaryHeadsArray && this.LoanSalaryHeadsArray.length > 0) {
      return
    }
    this.httpClient.get<Array<any>>(this.baseUrl + "HrSalaryHead/GetLoanSalaryHeads").subscribe((res: any[]) => {
      this.LoanSalaryHeadsArray = res as any[];
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  DeleteHrAssetMaster(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHrAssetMaster, payload);
  }
  UpdateHrAssetMaster(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrAssetMaster, payload);
  }
  InsertHrAssetMaster(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrAssetMaster, payload);
  }
  GetAllHrAssetMaster() {
    if (this.AssetsArray && this.AssetsArray.length > 0) {
      return
    }
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrAssetMaster).subscribe((res: any[]) => {
      this.AssetsArray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  DeleteHrOtherExpProperties(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHrOtherExpProperties, payload);
  }
  UpdateHrOtherExpProperties(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrOtherExpProperties, payload);
  }
  InsertHrOtherExpProperties(payload: any) {
    delete payload.id
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrOtherExpProperties, payload);
  }

  GetExpensePropertiesByMasterID(expenseID: any) {
    return this.httpClient.get(this.baseUrl + MasterUrls.GetExpensePropertiesByMasterID + "?expenseID=" + expenseID);
  }

  GetAllHrOtherExpProperties() {
    if (this.OtherExpensePropertiesArray && this.OtherExpensePropertiesArray.length > 0) {
      return
    }
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrOtherExpProperties).subscribe((res: any[]) => {
      this.OtherExpensePropertiesArray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  DeleteHrOtherExpenceMaster(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHrOtherExpenceMaster, payload);
  }
  UpdateHrOtherExpenceMaster(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrOtherExpenceMaster, payload);
  }
  InsertHrOtherExpenceMaster(payload: any) {
    delete payload.oeid
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrOtherExpenceMaster, payload);
  }
  GetAllHrOtherExpenceMaster() {
    if (this.OtherExpenseMasterArray && this.OtherExpenseMasterArray.length > 0) {
      return
    }
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrOtherExpenceMaster).subscribe((res: any[]) => {
      this.OtherExpenseMasterArray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  DeleteHrDocumentMaster(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHrDocumentMaster, payload);
  }
  UpdateHrDocumentMaster(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrDocumentMaster, payload);
  }
  InsertHrDocumentMaster(payload: any) {
    delete payload.documentId
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrDocumentMaster, payload);
  }
  GetAllHrDocumentMasters() {
    if (this.DocumentMasterArray && this.DocumentMasterArray.length > 0) {
      return
    }
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrDocumentMasters).subscribe((res: any[]) => {
      this.DocumentMasterArray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  GetAllStaffDocumentMaster() {
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllStaffDocumentMaster).subscribe((res: any[]) => {
      this.StaffDocumentMasterArray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  GetAllDocumentsVehicle() {
    this.httpClient.get<Array<any>>(this.baseUrl + "GetAllDocumentsVehicle").subscribe((res: any[]) => {
      this.VehcileDocumentsArray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  getDocumentImagesByMasterId(Id: any) {
    return this.httpClient.get<Array<any>>(this.baseUrl + "getDocumentImagesByMasterId?Id=" + Id)
  }

  GetAllDocumentsStaff() {
    this.httpClient.get<Array<any>>(this.baseUrl + "GetAllDocumentsStaff").subscribe((res: any[]) => {
      this.StaffDocumentsArray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  GetAllVehicleDocumentMaster() {
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllVeicleDocumentMaster).subscribe((res: any[]) => {
      this.VehicleDocumentMaster = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  GetDocumentMasterByStaffID(staffId: any) {
    return this.httpClient.get(this.baseUrl + MasterUrls.GetDocumentMasterByStaffID + "?staffId=" + staffId);
  }

  GetDocumentMasterByVehicleID(vehicleId: any) {
    return this.httpClient.get(this.baseUrl + MasterUrls.GetDocumentMasterByVehicleID + "?vehicleId=" + vehicleId);
  }

  DeleteHrDocumentImage(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHrDocumentImage, payload);
  }
  UpdateHrDocumentImage(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrDocumentImage, payload);
  }
  InsertHrDocumentImage(payload: any) {
    delete payload.docImageId
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrDocumentImage, payload);
  }
  GetAllHrDocumentImages() {
    if (this.DocumentIMagesArray && this.DocumentIMagesArray.length > 0) {
      return
    }
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrDocumentImages).subscribe((res: any[]) => {
      this.DocumentIMagesArray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  DeleteHR_MonthSalary(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHR_MonthSalary, payload);
  }
  UpdateHR_MonthSalary(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHR_MonthSalary, payload);
  }
  InsertHR_MonthSalary(payload: any) {
    delete payload.msId
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHR_MonthSalary, payload);
  }
  InsertHrMonthSalaryList(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrMonthSalaryList, payload);
  }
  GetAllHR_MonthSalary() {
    // if (this.HrMotnSalarayArray && this.HrMotnSalarayArray.length > 0) {
    //   return
    // }
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHR_MonthSalary).subscribe((res: any[]) => {
      this.HrMotnSalarayArray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }
  getDeductionStaffs() {
    // if (this.HrMotnSalarayDeductionStaffsArray && this.HrMotnSalarayDeductionStaffsArray.length > 0) {
    //   return
    // }
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.getDeductionStaffs).subscribe((res: any[]) => {
      this.HrMotnSalarayDeductionStaffsArray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }


  DeleteHrLeaveMaster(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHrLeaveMaster, payload);
  }
  UpdateHrLeaveMaster(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrLeaveMaster, payload);
  }
  InsertHrLeaveMaster(payload: any) {
    delete payload.leaveId
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrLeaveMaster, payload);
  }
  GetAllHrLeaveMasters() {
    if (this.HrLeaveMasterAray && this.HrLeaveMasterAray.length > 0) {
      return
    }
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrLeaveMasters).subscribe((res: any[]) => {
      this.HrLeaveMasterAray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  GetAllLeaveMasterStaff() {
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllLeaveMasterStaff).subscribe((res: any[]) => {
      this.HrLeaveMasterStaffAray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }




  DeleteHrCompanyCalender(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHrCompanyCalender, payload);
  }
  UpdateHrCompanyCalender(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrCompanyCalender, payload);
  }
  InsertHrCompanyCalender(payload: any) {
    delete payload.leaveId
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrCompanyCalender, payload);
  }
  GetAllHrCompanyCalender() {
    if (this.CompanyCalendarArray && this.CompanyCalendarArray.length > 0) {
      return
    }
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrCompanyCalender).subscribe((res: any[]) => {
      this.CompanyCalendarArray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  GenerateCalendar(startDate, endDate) {
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GenerateCalendar + "?startDate=" + startDate + "&endDate=" + endDate).subscribe((res: any[]) => {
      var dataArray = res
      this.GenerateCalendarArray = []
      if (dataArray && dataArray.length > 0) {
        dataArray.forEach(elemt => {
          this.GenerateCalendarArray.push({
            fullDate: elemt,
            dayName: new Date(elemt).toLocaleDateString('en-US', { weekday: 'long' }),
            dayType: new Date(elemt).toLocaleDateString('en-US', { weekday: 'long' }) == 'Sunday' ? 'Work Off' : '',
            description: new Date(elemt).toLocaleDateString('en-US', { weekday: 'long' }) == 'Sunday' ? 'Sunday' : '',
          })
        })
        console.log(this.GenerateCalendarArray)
      }
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }


  DeleteHrChangeDepartment(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHrChangeDepartment, payload);
  }
  UpdateHrChangeDepartment(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrChangeDepartment, payload);
  }
  InsertHrChangeDepartment(payload: any) {
    delete payload.hrChangeDepartmentId
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrChangeDepartment, payload);
  }
  GetAllHrChangeDepartment() {
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrChangeDepartment).subscribe((res: any[]) => {
      this.ChangeDepartmentArray = res as any[]
      this.isChangeDepartmentCall.next(true)
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  DeleteHrChangeDepartmentDet(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHrChangeDepartmentDet, payload);
  }
  UpdateHrChangeDepartmentDet(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrChangeDepartmentDet, payload);
  }
  InsertHrChangeDepartmentDet(payload: any) {
    delete payload.hrChangeDepartmentDetId
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrChangeDepartmentDet, payload);
  }
  GetAllHrChangeDepartmentDet() {
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrChangeDepartmentDet).subscribe((res: any[]) => {
      this.ChangeDepartmentDetArray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  DeleteHrMobilization(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHrMobilization, payload);
  }
  UpdateHrMobilization(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrMobilization, payload);
  }
  InsertHrMobilization(payload: any) {
    delete payload.hrChangeDepartmentDetId
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrMobilization, payload);
  }
  GetAllHrMobilization() {
    if (this.MobilizationArray && this.MobilizationArray.length > 0) {
      return
    }
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrMobilization).subscribe((res: any[]) => {
      this.MobilizationArray = res as any[]
      debugger
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  DeleteHrMobilizationDetails(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHrMobilizationDetails, payload);
  }
  UpdateHrMobilizationDetails(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrMobilizationDetails, payload);
  }
  InsertHrMobilizationDetails(payload: any) {
    delete payload.hrChangeDepartmentDetId
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrMobilizationDetails, payload);
  }
  GetAllHrMobilizationDetails() {
    if (this.MobilizationDetailArray && this.MobilizationDetailArray.length > 0) {
      return
    }
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrMobilizationDetails).subscribe((res: any[]) => {
      this.MobilizationDetailArray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  DeleteHrPassport(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHrPassport, payload);
  }
  UpdateHrPassport(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrPassport, payload);
  }
  InsertHrPassport(payload: any) {
    delete payload.id
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrPassport, payload);
  }
  GetAllHrPassport() {
    if (this.PassportArray && this.PassportArray.length > 0) {
      return
    }
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrPassport).subscribe((res: any[]) => {
      this.PassportArray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }
  GetPassportStaffList() {
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetPassportStaffList).subscribe((res: any[]) => {
      this.PassportStaffArray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  GetAllHrCompanyCalendarWeekEnd() {
    if (this.CompanyCalendarWeekendArray && this.CompanyCalendarWeekendArray.length > 0) {
      return
    }
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrCompanyCalendarWeekEnd).subscribe((res: any[]) => {
      this.CompanyCalendarWeekendArray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  DeleteHrDailyShift(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHrDailyShift, payload);
  }
  UpdateHrDailyShift(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrDailyShift, payload);
  }
  InsertHrDailyShift(payload: any) {
    delete payload.shiftId
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrDailyShift, payload);
  }
  GetAllHrDailyShift() {
    if (this.HrDailyShiftArray && this.HrDailyShiftArray.length > 0) {
      return
    }
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrDailyShift).subscribe((res: any[]) => {
      this.HrDailyShiftArray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  DeleteHrDailyShiftDayoffDetails(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHrDailyShiftDayoffDetails, payload);
  }
  UpdateHrDailyShiftDayoffDetails(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrDailyShiftDayoffDetails, payload);
  }
  InsertHrDailyShiftDayoffDetails(payload: any) {
    delete payload.id
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrDailyShiftDayoffDetails, payload);
  }
  GetAllHrDailyShiftDayoffDetails() {
    if (this.HrDailyShiftDayoffDetailsArray && this.HrDailyShiftDayoffDetailsArray.length > 0) {
      return
    }
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrDailyShiftDayoffDetails).subscribe((res: any[]) => {
      this.HrDailyShiftDayoffDetailsArray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }


  DeleteHrIncrementMaster(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHrIncrementMaster, payload);
  }
  UpdateHrIncrementMaster(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrIncrementMaster, payload);
  }
  InsertHrIncrementMaster(payload: any) {
    delete payload.id
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrIncrementMaster, payload);
  }
  GetAllHrIncrementMaster() {
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrIncrementMaster).subscribe((res: any[]) => {
      this.IncremtnArray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  GetStaffWiseIncrementDetails(staffID: number) {
    return this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetStaffWiseIncrementDetails + staffID)
  }

  getStaffSalary(staffID: number) {
    return this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.getStaffSalary + "?staffID=" + staffID)
  }

  DeleteHrIncrementDetail(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHrIncrementDetail, payload);
  }
  UpdateHrIncrementDetail(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrIncrementDetail, payload);
  }
  InsertHrIncrementDetail(payload: any) {
    delete payload.id
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrIncrementDetail, payload);
  }
  GetAllHrIncrementDetail() {
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrIncrementDetail).subscribe((res: any[]) => {
      this.IncremtnDetailArray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }


  DeleteHrSalaryPackage(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHrSalaryPackage, payload);
  }
  UpdateHrSalaryPackage(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrSalaryPackage, payload);
  }
  InsertHrSalaryPackage(payload: any) {
    delete payload.spid
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrSalaryPackage, payload);
  }
  GetAllHrSalaryPackages() {
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrSalaryPackages).subscribe((res: any[]) => {
      this.SalaryPckg = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  InsertHrAlOpenings(payload: any[], leaveID) {
    this.httpClient.post(this.baseUrl + MasterUrls.InsertHrAlOpenings + leaveID, payload).subscribe((res: any[]) => {
      this.HrALOpeningStaffArray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }
  GetALOpeningStaff(leaveID: number) {
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetALOpeningStaff + leaveID).subscribe((res: any[]) => {
      this.HrALOpeningStaffArray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  GetLeaveRejoiningData() {
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetLeaveRejoiningData).subscribe((res: any[]) => {
      this.LeaveRejoiningData = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }


  GetPayroll() {
    this.httpClient.get<Array<any>>(this.baseUrl + "HrPayrollMaster/GetPayroll").subscribe((res: any[]) => {
      this.PayrollList = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  GetAllLeaveSalary() {
    this.httpClient.get<Array<any>>(this.baseUrl + "HrLeaveSalary/GetAllLeaveSalary").subscribe((res: any[]) => {
      this.LeaveSalaryList = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  GetLeaveSalaryDetilsByID(leaveSalID: number, StaffID: number) {
    return this.httpClient.get<Array<any>>(this.baseUrl + "HrLeaveSalary/GetLeaveSalaryDetilsByID?leaveSalID=" + leaveSalID + "&StaffID=" + StaffID)
  }

  InsertLeaveSalary(dataObj: any) {
    this.httpClient.post<any>(this.baseUrl + "HrLeaveSalary/InsertLeaveSalary", dataObj).subscribe((res: any[]) => {
      this.LeaveSalaryList = res as any[]
      this.SaveLeaveSalary.next(true)
      // alert("Saved")
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  UpdateLeaveSalary(dataObj: any) {
    this.httpClient.put<any>(this.baseUrl + "HrLeaveSalary/UpdateLeaveSalary", dataObj).subscribe((res: any[]) => {
      this.LeaveSalaryList = res as any[]
      this.EditLeaveSalary.next(true)
      // alert("Updated")
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  DeleteLeaveSalary(leaveSalId: number) {
    this.httpClient.delete<any>(this.baseUrl + "HrLeaveSalary/DeleteLeaveSalary?leaveSalId=" + leaveSalId).subscribe((res: any[]) => {
      this.LeaveSalaryList = res as any[]
      this.RemoveLeaveSalary.next(true)
      // alert("Deleted")
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  DeletePayroll(staffID: number) {
    this.httpClient.delete<any>(this.baseUrl + "HrLeaveSalary/DeletePayroll?staffID=" + staffID).subscribe((res: any[]) => {
      this.LeaveSalaryList = res as any[]
      // alert("Deleted")
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  AddLeaveSalaryToPayrollProcess(dataObj: any, type: string) {
    this.httpClient.post<any>(this.baseUrl + "HrLeaveSalary/AddLeaveSalaryToPayrollProcess?Type=" + type, dataObj).subscribe((res: any[]) => {
      // alert("Saved")
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }
}
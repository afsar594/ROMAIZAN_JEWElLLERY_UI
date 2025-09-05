import { HttpHeaders, HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CurrencyMaster, ItemMaster } from '../domain';
import { MasterUrls } from './url.api';
import { environment } from 'src/environments/environment';
import { TreeNode } from 'primeng/api/treenode';
import { LanguageMaster } from '../domain/LanguageMaster';
import { AddressTypeMaster } from '../domain/AddressType';
import { CompanyMaster } from '../domain/CompanyMaster';
import { VisaCompanyMaster } from '../domain/VisaCompanyMaster';
import { DepartmentMaster } from '../domain/DepartmentMaster';
import { DesignationMaster } from '../domain/DesignationMaster';
import { StaffMaster } from '../domain/StaffMaster';
import { MessageService } from 'primeng/api';
import { SiteMaster } from '../domain/SiteMaster';
import { GradeMaster } from '../domain/GradeMaster';
import { Visacompanydesignation } from '../domain/VisaCompanyDesignationMaster';
import { VehicleMaster } from '../domain/VehicleMaster';
import { Qualificaton } from '../domain/Qualification';
import { GratuityAmountPolicy } from '../domain/GratuityAmountPolicy';
import { AssetsMaster } from '../domain/AssetsMaster';
import { AgentMaster } from '../domain/AgentMaster';
import { BankMaster } from '../domain/BankMaster';
import { Subject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};
@Injectable({
  providedIn: 'root'
})
export class MasterApiService {
  staffMasterArray: StaffMaster[] = []
  baseUrl: string = environment.apiRootURL;
  siteMasterArray: SiteMaster[] = [];
  designatinMasterArray: DesignationMaster[] = [];
  siteMasterArrayDuplicate: SiteMaster[] = [];
  designatinMasterArrayDuplicate: DesignationMaster[] = [];
  staffMasterArrayDuplicate: StaffMaster[] = [];
  CompanyMasterArray: CompanyMaster[];
  VisaCompanyMasterArray: VisaCompanyMaster[];
  LanguagerArray: LanguageMaster[];
  MaritalStatusArray: any[] = [];
  NationalityArray: any[] = [];
  VisadesignatinMasterArray: any[] = [];
  SubDepartmentArray: any[] = [];
  ReligionArray: any[] = [];
  BankMasterArray: any[] = [];
  LocationMasterArray: any[] = [];
  CurrencyMasterArray: CurrencyMaster[] = [];
  CadreMasterArray: any[] = [];
  GradeMasterArray: GradeMaster[];
  StaffTypeArray: any[] = [];
  AgentArray: any[] = [];
  ShiftTypeArray: any[] = [];
  ShiftArray: any[] = [];
  SponsorArray: any[] = [];
  VisaTypeArray: any[] = [];
  GratuityMasterArray: any[] = [];
  OverTimePolicyArray: any[] = [];
  ContactTYpeArray: any[] = [];
  CampMasterArray: any[] = [];
  HrLeaveSalAmtPolicyMaster: any[] = [];
  QualificationMasterArray: any[] = [];
  ActiveStatusrArray: any[] = [];
  BloodGroupArray: any[] = [];
  DepartmentArray: any[] = [];
  HrGratAmtPolicyMaster: any[] = [];
  TicketFrequencyAray: any[] = [];
  AirportLocationAray: any[] = [];
  HrFamilyDetailsproperty: any[] = [];
  HrRelationArray: any[] = [];
  HrPenaltyArray: any[] = [];
  HrTrainingDetailsArray: any[] = [];
  AllHrVehicleMasterArray: any[] = [];
  HrAllotedPropertiesArray: any[] = [];
  HrLeaveMultiStaffDetails: any[] = [];
  HrLeaveMultiStaffMasters: any[] = [];
  HrLeaveMasterArray: any[] = [];
  MultiLeaveDetailsStaffList: any[] = [];
  MultiLeaveDetailsStaffListDeplicate: any[] = [];
  HrLoandetails: any[] = [];
  HrLoanentrys: any[] = [];
  RewardArray: any[] = [];
  HrGratAmtPolicyDetail: any[] = [];
  HrLeaveSalAmtPolicyDetails: any[] = [];
  HrDocumentTypesArray: any[];
  HrDocumentStatusArray: any[];
  isStaffApiCall = new Subject<boolean>()
  HrLeaveTypeAray: any[];
  DepartmentWiseStaffArray: StaffMaster[];
  DepartmentWiseStaffArrayDuplicate: StaffMaster[];
  hrAddressArray: any[];
  AddressTypeArray: AddressTypeMaster[];
  AirTicketMasterArray: any[];
  AirTicketDetailArray: any[];
  HrFamilyDetailsArray: any[];
  HrPayrollReport: any[] = [];
  InitialBalanceReport: any[];
  JVReportBlabla: any[];
  INITJVReportBlabla: any[];
  HrLoanentryStaffWise: any[] = [];
  HrMultiLeaveDetailsByMasterID: any[] = [];
  constructor(private httpClient: HttpClient, private messageService: MessageService) { }

  public GetAllCurrency() {
    // let params = new HttpParams();  MasterUrls
    // params = params.append('PatFinEncounterID', encouter.PatFinEncounterID.toString());
    // { params: params }

    return this.httpClient.get<CurrencyMaster[]>(this.baseUrl + MasterUrls.GetAllCurrency);
  }
  public GetAllCurrencyWithSubs() {
    if (this.CurrencyMasterArray && this.CurrencyMasterArray.length > 0) {
      return
    }
    this.httpClient.get<CurrencyMaster[]>(this.baseUrl + MasterUrls.GetAllCurrency).subscribe((res: CurrencyMaster[]) => {
      this.CurrencyMasterArray = res as CurrencyMaster[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  public GetLastCurrencyCode() {
    return this.httpClient.get<CurrencyMaster>(this.baseUrl + MasterUrls.GetLastCurrencyCode);
  }
  // Save general Consent pdf  Data
  public InsertCurrency(data: CurrencyMaster) {
    return this.httpClient.post<CurrencyMaster[]>(this.baseUrl + MasterUrls.InsertCurrency, data, httpOptions);
  }

  public UpdateCurrency(data: CurrencyMaster) {
    return this.httpClient.post<CurrencyMaster[]>(this.baseUrl + MasterUrls.UpdateCurrency, data, httpOptions);
  }

  public DeleteCurrency(data: CurrencyMaster) {
    return this.httpClient.post<CurrencyMaster[]>(this.baseUrl + MasterUrls.DeleteCurrency, data, httpOptions);
  }

  public getItemTreeNode() {
    return this.httpClient.get('assets/demo/data/files.json')
      .toPromise()
      .then((res: { data: any }) => res.data as TreeNode[]);
  }

  public getItemsParentTreeNode() {
    return this.httpClient.get<ItemMaster[]>(this.baseUrl + MasterUrls.GetAllItem);
  }
  public getItemsChildrenByParentTreeNode(id: number) {
    return this.httpClient.get<ItemMaster[]>(this.baseUrl + MasterUrls.GetAllItemById + '/' + id);
  }

  ////////////////////////////HrDepartment   (Arslan)///////////////////////////////////////


  public getAllDepartment() {
    return this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllDepartments);
  }
  public getAllDepartmentWithSub() {
    return this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllDepartments).subscribe((res: any[]) => {
      this.DepartmentArray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }
  public insertDepartmentMaster(payload: DepartmentMaster) {
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertDepartment, payload);
  }
  public updateDepartmentMaster(payload: DepartmentMaster) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateDepartment, payload);
  }
  public deleteDepartmentMaster(payload: DepartmentMaster) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteDepartment, payload);
  }


  //////////////////////// HRDesignation     (Arslan)//////////////////////////////


  public insertDesignstion(payload: DesignationMaster) {
    return this.httpClient.post(this.baseUrl + 'HrDesignation/InsertDesignation', payload);

  }
  public getAllDesignation() {
    return this.httpClient.get<Array<any>>(this.baseUrl + 'HrDesignation/GetAllDesignation')
  }
  public updateDesignation(payload: DesignationMaster) {
    return this.httpClient.post(this.baseUrl + 'HrDesignation/UpdateDesignation', payload);
  }
  public deleteDesignation(payload: DesignationMaster) {
    return this.httpClient.post(this.baseUrl + 'HrDesignation/DeleteDesignation', payload);
  }

  public getAllDesignationWithSubscribe() {
    if (this.designatinMasterArray && this.designatinMasterArray.length > 0) {
      return
    }
    this.httpClient.get<Array<DesignationMaster>>(this.baseUrl + 'HrDesignation/GetAllDesignation').subscribe((res: DesignationMaster[]) => {
      this.designatinMasterArray = res
      this.designatinMasterArrayDuplicate = res
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }


  //////////////////////////// HR VisaDesignation        (Arslan) ////////////////////////////////
  public getAllVisaDesignation() {
    return this.httpClient.get<Array<any>>(this.baseUrl + 'HrVisaDesignation/GetAllVisaDesignation');
  }

  public getAllVisaDesignationWithSubs() {
    if (this.VisadesignatinMasterArray && this.VisadesignatinMasterArray.length > 0) {
      return
    }
    this.httpClient.get<Array<any>>(this.baseUrl + 'HrVisaDesignation/GetAllVisaDesignation').subscribe((res: any[]) => {
      this.VisadesignatinMasterArray = res
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  InsertVisaDesignation(payload: any) {
    return this.httpClient.post(this.baseUrl + 'HrVisaDesignation/InsertVisaDesignation', payload);
  }
  UpdateVisaDesignation(payload: any) {
    return this.httpClient.post(this.baseUrl + 'HrVisaDesignation/UpdateVisaDesignation', payload);
  }
  DeleteVisaDesignation(payload: any) {
    return this.httpClient.post(this.baseUrl + 'HrVisaDesignation/DeleteVisaDesignation', payload);
  }

  ////////////////////////////////// HR Grade Master         (Arslan)///////////////////////////
  public getAllGradeMaster() {
    return this.httpClient.get<Array<any>>(this.baseUrl + 'HrGradeMaster/getAllGradeMaster');
  }



  ////////////////  Done by Atique   //////////////////

  ///////   Company master service functions  //////

  getLastCompanyCode() {
    return this.httpClient.get<CompanyMaster>(this.baseUrl + MasterUrls.GetAllcompany); /////// to be changed
  }
  getAllCompany() {
    return this.httpClient.get<Array<CompanyMaster>>(this.baseUrl + MasterUrls.GetAllcompany);
  }
  insertCompany(payload: CompanyMaster) {
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertCompany, payload);
  }
  updateCompany(payload: CompanyMaster) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateCompany, payload);
  }
  deleteCompany(payload: CompanyMaster) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteCompany, payload);
  }
  getAllCompanyWithSubs() {
    if (this.CompanyMasterArray && this.CompanyMasterArray.length > 0) {
      return
    }
    this.httpClient.get<Array<CompanyMaster>>(this.baseUrl + MasterUrls.GetAllcompany).subscribe((res: CompanyMaster[]) => {
      this.CompanyMasterArray = res as CompanyMaster[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  ///////  Visa Company master service functions  //////

  getLastVisaCompanyCode() {
    return this.httpClient.get<VisaCompanyMaster>(this.baseUrl + MasterUrls.GetAllVisacompany); /////// to be changed
  }
  getAllVisaCompany() {
    return this.httpClient.get<Array<VisaCompanyMaster>>(this.baseUrl + MasterUrls.GetAllVisacompany);
  }
  insertVisaCompany(payload: VisaCompanyMaster) {
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertVisaCompany, payload);
  }
  updateVisaCompany(payload: VisaCompanyMaster) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateVisaCompany, payload);
  }
  deleteVisaCompany(payload: VisaCompanyMaster) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteVisaCompany, payload);
  }
  getAllVisaCompanyWithSubs() {
    if (this.VisaCompanyMasterArray && this.VisaCompanyMasterArray.length > 0) {
      return
    }
    return this.httpClient.get<Array<VisaCompanyMaster>>(this.baseUrl + MasterUrls.GetAllVisacompany).subscribe((res: VisaCompanyMaster[]) => {
      this.VisaCompanyMasterArray = res as VisaCompanyMaster[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }


  ///////   Address Types master service functions  //////
  getLastAddressCode() {
    return this.httpClient.get<AddressTypeMaster>(this.baseUrl + MasterUrls.GetLastAddressCode);
  }
  getAllAddressTypes() {
    return this.httpClient.get<Array<AddressTypeMaster>>(this.baseUrl + MasterUrls.GetAllAddresstypes);
  }
  getAllAddressTypesWithSubs() {
    this.httpClient.get<Array<AddressTypeMaster>>(this.baseUrl + MasterUrls.GetAllAddresstypes).subscribe(res => {
      this.AddressTypeArray = res as AddressTypeMaster[]
    });
  }
  insertAddressTypes(payload: AddressTypeMaster) {
    delete payload.addressTypeId
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertAddresstypes, payload);
  }
  updateAddressTypes(payload: AddressTypeMaster) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateAddresstypes, payload);
  }
  deleteAddressTypes(payload: AddressTypeMaster) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteAddresstypes, payload);
  }


  ///////   Staff master service functions  //////
  getLastStaffCode() {
    return this.httpClient.get<AddressTypeMaster>(this.baseUrl + MasterUrls.GetLastAddressCode);
  }
  getAllStaffMaster() {
    return this.httpClient.get<Array<StaffMaster>>(this.baseUrl + MasterUrls.GetAllStaffMaster);
  }
  insertStaffMaster(payload: StaffMaster) {
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertStaffMaster, payload);
  }
  updateStaffMaster(payload: StaffMaster) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateStaffMaster, payload);
  }
  deleteStaffMaster(payload: StaffMaster) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteStaffMaster, payload);
  }

  getAllStaffMasterWithSubscribe() {
    if (this.staffMasterArray && this.staffMasterArray.length > 0) {
      return
    }
    this.httpClient.get<Array<StaffMaster>>(this.baseUrl + MasterUrls.GetAllStaffMaster).subscribe((res: StaffMaster[]) => {
      this.staffMasterArray = res
      this.staffMasterArrayDuplicate = res
      this.isStaffApiCall.next(true)
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  GetDepartmentWiseStaff() {
    this.httpClient.get<Array<StaffMaster>>(this.baseUrl + MasterUrls.GetDepartmentWiseStaff).subscribe((res: StaffMaster[]) => {
      this.DepartmentWiseStaffArray = res
      this.DepartmentWiseStaffArrayDuplicate = res
      this.isStaffApiCall.next(true)
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  ///////   Language master service functions  //////
  getAllLanguagesList() {
    return this.httpClient.get(this.baseUrl + 'HrLanguage/GetAllHrLanguages');
  }
  insertNewLanguage(payload: LanguageMaster) {
    return this.httpClient.post(this.baseUrl + 'HrLanguage/InsertHrAssetMaster', payload);
  }
  updateLanguage(payload: LanguageMaster) {
    return this.httpClient.post(this.baseUrl + 'HrLanguage/UpdateHrLanguage', payload);
  }
  DeleteLanguage(payload: LanguageMaster) {
    return this.httpClient.post(this.baseUrl + 'HrLanguage/DeleteHrLanguageMaster', payload);
  }
  //////  Site Master Service Functions    /////

  GetAllHrSites() {
    if (this.siteMasterArray && this.siteMasterArray.length > 0) {
      return
    }
    this.httpClient.get<Array<SiteMaster>>(this.baseUrl + MasterUrls.GetAllHrSites).subscribe((res: SiteMaster[]) => {
      this.siteMasterArray = res
      this.siteMasterArrayDuplicate = res
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  insertSiteMaster(payload: SiteMaster) {
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrSites, payload);
  }
  updateSiteMaster(payload: SiteMaster) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrSites, payload);
  }
  deleteSiteMaster(payload: SiteMaster) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHrSites, payload);
  }

  ///////   Language master service functions  //////

  InsertHrLanguageMaster(payload: LanguageMaster) {
    delete payload.languageId
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrLanguageMaster, payload);
  }
  UpdateHrLanguageMaster(payload: LanguageMaster) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrLanguageMaster, payload);
  }
  DeleteHrLanguageMaster(payload: LanguageMaster) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHrLanguageMaster, payload);
  }

  GetAllHrLanguagesWithSubs() {
    if (this.LanguagerArray && this.LanguagerArray.length > 0) {
      return
    }
    this.httpClient.get<Array<LanguageMaster>>(this.baseUrl + MasterUrls.GetAllHrLanguages).subscribe((res: LanguageMaster[]) => {
      this.LanguagerArray = res as LanguageMaster[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  ///////   Marital Status service functions  //////

  InsertHrMaritalStatus(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrMaritalStatus, payload);
  }
  UpdateHrMaritalStatus(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrMaritalStatus, payload);
  }
  DeleteHrMaritalStatus(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHrMaritalStatus, payload);
  }

  GetAllHrMaritalStatusWithSubs() {
    if (this.MaritalStatusArray && this.MaritalStatusArray.length > 0) {
      return
    }
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrMaritalStatus).subscribe((res: any[]) => {
      this.MaritalStatusArray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  ///////   Nationality service functions  //////

  InsertHrNationality(payload: any) {
    delete payload.nationalityId
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrNationality, payload);
  }
  UpdateHrNationality(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrNationality, payload);
  }
  DeleteHrNationality(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHrNationality, payload);
  }

  GetAllHrNationalityWithSubs() {
    if (this.NationalityArray && this.NationalityArray.length > 0) {
      return
    }
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrNationality).subscribe((res: any[]) => {
      this.NationalityArray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  ///////   SubDepartment service functions  //////

  InsertHrSubDepartment(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrSubDepartment, payload);
  }
  UpdateHrSubDepartment(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrSubDepartment, payload);
  }
  DeleteHrSubDepartment(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHrSubDepartment, payload);
  }

  GetAllHrSubDepartmentWithSubs() {
    if (this.SubDepartmentArray && this.SubDepartmentArray.length > 0) {
      return
    }
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrSubDepartment).subscribe((res: any[]) => {
      this.SubDepartmentArray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  ///////   BloodGroup service functions  //////

  InsertHrBloodGroup(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrBloodGroup, payload);
  }
  UpdateHrBloodGroup(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrBloodGroup, payload);
  }
  DeleteHrBloodGroup(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHrBloodGroup, payload);
  }

  GetAllHrBloodGroupWithSubs() {
    if (this.BloodGroupArray && this.BloodGroupArray.length > 0) {
      return
    }
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrBloodGroup).subscribe((res: any[]) => {
      this.BloodGroupArray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  ///////   Religion service functions  //////

  InsertHrReligion(payload: any) {
    delete payload.religionId
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrReligion, payload);
  }
  UpdateHrReligion(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrReligion, payload);
  }
  DeleteHrReligion(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHrReligion, payload);
  }

  GetAllHrReligionWithSubs() {
    if (this.ReligionArray && this.ReligionArray.length > 0) {
      return
    }
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrReligion).subscribe((res: any[]) => {
      this.ReligionArray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  ///////   Bank master service functions  //////

  InserHrBankMaster(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.InserHrBankMaster, payload);
  }
  UpdateHrBankMaster(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrBankMaster, payload);
  }
  DeleteHrBankMaster(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHrBankMaster, payload);
  }

  GetHrBankMastersWithSubs() {
    if (this.BankMasterArray && this.BankMasterArray.length > 0) {
      return
    }
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetHrBankMasters).subscribe((res: any[]) => {
      this.BankMasterArray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  ///////   Active Status service functions  //////

  InsertHrActiveStatus(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrActiveStatus, payload);
  }
  UpdateHrActiveStatus(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrActiveStatus, payload);
  }
  DeleteHrActiveStatus(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHrActiveStatus, payload);
  }

  GetAllHrActiveStatusWithSubs() {
    if (this.ActiveStatusrArray && this.ActiveStatusrArray.length > 0) {
      return
    }
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrActiveStatus).subscribe((res: any[]) => {
      this.ActiveStatusrArray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  ///////   Location Master service functions  //////

  InsertHrLocationMaster(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrLocationMaster, payload);
  }
  UpdateHrLocationMaster(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrLocationMaster, payload);
  }
  DeleteHrLocationMaster(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHrLocationMaster, payload);
  }

  GetAllHrLocationMasterWithSubs() {
    if (this.LocationMasterArray && this.LocationMasterArray.length > 0) {
      return
    }
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrLocationMaster).subscribe((res: any[]) => {
      this.LocationMasterArray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  ///////   Location Master service functions  //////

  InsertCaderMaster(payload: any) {
    delete payload.cadreId
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertCaderMaster, payload);
  }
  UpdateCaderMaster(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateCaderMaster, payload);
  }
  DeleteCaderMaster(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteCaderMaster, payload);
  }
  GetAllCaderMasterWithSubs() {
    if (this.CadreMasterArray && this.CadreMasterArray.length > 0) {
      return
    }
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllCaderMaster).subscribe((res: any[]) => {
      this.CadreMasterArray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  ///////   Location Master service functions  //////

  InsertGradeMaster(payload: GradeMaster) {
    delete payload.gid
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertGradeMaster, payload);
  }
  UpdateGradeMaster(payload: GradeMaster) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateGradeMaster, payload);
  }
  DeleteGradeMaster(payload: GradeMaster) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteGradeMaster, payload);
  }
  GetAllGradeMasterWithSubs() {
    if (this.GradeMasterArray && this.GradeMasterArray.length > 0) {
      return
    }
    this.httpClient.get<Array<GradeMaster>>(this.baseUrl + MasterUrls.GetAllGradeMaster).subscribe((res: GradeMaster[]) => {
      this.GradeMasterArray = res as GradeMaster[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }
  ///////   Location Master service functions  //////
  InsertHrQualification(payload: any) {
    delete payload.qualificationId
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrQualification, payload);
  }
  UpdateHrQualification(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrQualification, payload);
  }
  DeleteHrQualification(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHrQualification, payload);
  }
  GetHrQualificationsWithSubs() {
    if (this.QualificationMasterArray && this.QualificationMasterArray.length > 0) {
      return
    }
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetHrQualifications).subscribe((res: any[]) => {
      this.QualificationMasterArray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  ///////   Location Master service functions  //////
  InsertHrStaffType(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrStaffType, payload);
  }
  UpdateHrStaffType(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrStaffType, payload);
  }
  DeleteHrStaffType(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHrStaffType, payload);
  }
  GetAllHrStaffTypeWithSubs() {
    if (this.StaffTypeArray && this.StaffTypeArray.length > 0) {
      return
    }
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrStaffType).subscribe((res: any[]) => {
      this.StaffTypeArray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  ///////   Location Master service functions  //////
  InsertHrAgentMaster(payload: any) {
    delete payload.agentId
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrAgentMaster, payload);
  }
  UpdateHrAgentMaster(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrAgentMaster, payload);
  }
  DeleteHrAgentMaster(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHrAgentMaster, payload);
  }
  GetAllHrAgentMasters() {
    return this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrAgentMasters)
  }
  GetAllHrAgentMastersWithSubs() {
    if (this.AgentArray && this.AgentArray.length > 0) {
      return
    }
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrAgentMasters).subscribe((res: any[]) => {
      this.AgentArray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  ///////   Location Master service functions  //////
  InsertHrShiftTypes(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrShiftTypes, payload);
  }
  UpdateHrShiftTypes(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrShiftTypes, payload);
  }
  DeleteHrShiftTypes(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHrShiftTypes, payload);
  }
  GetAllHrShiftTypesWithSubs() {
    if (this.ShiftTypeArray && this.ShiftTypeArray.length > 0) {
      return
    }
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrShiftTypes).subscribe((res: any[]) => {
      this.ShiftTypeArray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  ///////   Location Master service functions  //////
  InsertHrShifts(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrShifts, payload);
  }
  UpdateHrShifts(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrShifts, payload);
  }
  DeleteHrShifts(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHrShifts, payload);
  }
  GetAllHrShiftsWithSubs() {
    if (this.ShiftArray && this.ShiftArray.length > 0) {
      return
    }
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrShifts).subscribe((res: any[]) => {
      this.ShiftArray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  ///////   Location Master service functions  //////
  InsertHrSponser(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrSponser, payload);
  }
  UpdateHrSponser(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrSponser, payload);
  }
  DeleteHrSponser(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHrSponser, payload);
  }
  GetAllHrSponserWithSubs() {
    if (this.SponsorArray && this.SponsorArray.length > 0) {
      return
    }
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrSponser).subscribe((res: any[]) => {
      this.SponsorArray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  ///////   Location Master service functions  //////
  InsertHrVisaType(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrVisaType, payload);
  }
  UpdateHrVisaType(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrVisaType, payload);
  }
  DeleteHrVisaType(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHrVisaType, payload);
  }
  GetAllHrVisaTypeWithSubs() {
    if (this.VisaTypeArray && this.VisaTypeArray.length > 0) {
      return
    }
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrVisaType).subscribe((res: any[]) => {
      this.VisaTypeArray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  ///////   Location Master service functions  //////
  InsertGratuityMaster(payload: any) {
    delete payload.polId
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertGratuityMaster, payload);
  }
  UpdateGratuityMaster(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateGratuityMaster, payload);
  }
  DeleteGratuityMaster(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteGratuityMaster, payload);
  }
  GetAllGratuityMasterWithSubs() {
    if (this.GratuityMasterArray && this.GratuityMasterArray.length > 0) {
      return
    }
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllGratuityMaster).subscribe((res: any[]) => {
      this.GratuityMasterArray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  ///////   Location Master service functions  //////
  InsertHrOvertimeSettings(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrOvertimeSettings, payload);
  }
  UpdateHrOvertimeSettings(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrOvertimeSettings, payload);
  }
  DeleteHrOvertimeSettings(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHrOvertimeSettings, payload);
  }
  GetAllHrOvertimeSettings() {
    if (this.OverTimePolicyArray && this.OverTimePolicyArray.length > 0) {
      return
    }
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrOvertimeSettings).subscribe((res: any[]) => {
      this.OverTimePolicyArray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }
  ///////   Location Master service functions  //////
  InsertHrContractType(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrContractType, payload);
  }
  UpdateHrContractType(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrContractType, payload);
  }
  DeleteHrContractType(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHrContractType, payload);
  }
  GetAllHrContractType() {
    if (this.ContactTYpeArray && this.ContactTYpeArray.length > 0) {
      return
    }
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrContractType).subscribe((res: any[]) => {
      this.ContactTYpeArray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }
  ///////   Location Master service functions  //////
  InsertHrCampMaster(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrCampMaster, payload);
  }
  UpdateHrCampMaster(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrCampMaster, payload);
  }
  DeleteHrCampMaster(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHrCampMaster, payload);
  }
  GetAllHrCampMaster() {
    if (this.CampMasterArray && this.CampMasterArray.length > 0) {
      return
    }
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrCampMaster).subscribe((res: any[]) => {
      this.CampMasterArray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }
  ///////   Location Master service functions  //////
  InsertHrLeaveSalAmtPolicyMaster(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrLeaveSalAmtPolicyMaster, payload);
  }
  UpdateHrLeaveSalAmtPolicyMaster(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrLeaveSalAmtPolicyMaster, payload);
  }
  DeleteHrLeaveSalAmtPolicyMaster(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHrLeaveSalAmtPolicyMaster, payload);
  }
  GetAllHrLeaveSalAmtPolicyMaster() {
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrLeaveSalAmtPolicyMaster).subscribe((res: any[]) => {
      this.HrLeaveSalAmtPolicyMaster = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }
  ///////   Location Master service functions  //////
  GetHrGratAmtPolicyDetailsByMasterID(polId: any) {
    return this.httpClient.get(this.baseUrl + MasterUrls.GetHrGratAmtPolicyDetailsByMasterID + "?polId=" + polId);
  }
  InsertHrGratAmtPolicyMaster(payload: any) {
    delete payload.polId
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrGratAmtPolicyMaster, payload);
  }
  UpdateHrGratAmtPolicyMaster(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrGratAmtPolicyMaster, payload);
  }
  DeleteHrGratAmtPolicyMaster(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHrGratAmtPolicyMaster, payload);
  }
  GetAllHrGratAmtPolicyMaster() {
    if (this.HrGratAmtPolicyMaster && this.HrGratAmtPolicyMaster.length > 0) {
      return
    }
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrGratAmtPolicyMaster).subscribe((res: any[]) => {
      this.HrGratAmtPolicyMaster = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }
  ///////   Location Master service functions  //////
  InsertHrTicketFrequency(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrTicketFrequency, payload);
  }
  UpdateHrTicketFrequency(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrTicketFrequency, payload);
  }
  DeleteHrTicketFrequency(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHrTicketFrequency, payload);
  }
  GetAllHrTicketFrequency() {
    if (this.TicketFrequencyAray && this.TicketFrequencyAray.length > 0) {
      return
    }
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrTicketFrequency).subscribe((res: any[]) => {
      this.TicketFrequencyAray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }
  ///////   Location Master service functions  //////
  InsertHrAirportLocation(payload: any) {
    delete payload.airportLocId
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrAirportLocation, payload);
  }
  UpdateHrAirportLocation(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrAirportLocation, payload);
  }
  DeleteHrAirportLocation(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHrTicketFrequency, payload);
  }
  GetAllHrAirportLocation() {
    if (this.AirportLocationAray && this.AirportLocationAray.length > 0) {
      return
    }
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrAirportLocation).subscribe((res: any[]) => {
      this.AirportLocationAray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  ///////   Location Master service functions  //////
  InsertHrFamilyDetailsproperty(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrFamilyDetailsproperty, payload);
  }
  UpdateHrFamilyDetailsproperty(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrFamilyDetailsproperty, payload);
  }
  DeleteHrFamilyDetailsproperty(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHrFamilyDetailsproperty, payload);
  }
  GetAllHrFamilyDetailsproperty() {
    if (this.HrFamilyDetailsproperty && this.HrFamilyDetailsproperty.length > 0) {
      return
    }
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrFamilyDetailsproperty).subscribe((res: any[]) => {
      this.HrFamilyDetailsproperty = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  ///////   Location Master service functions  //////
  InsertHrRelationship(payload: any) {
    delete payload.relId
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrRelationship, payload);
  }
  UpdateHrRelationship(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrRelationship, payload);
  }
  DeleteHrRelationship(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHrRelationship, payload);
  }
  GetAllHrRelationship() {
    if (this.HrRelationArray && this.HrRelationArray.length > 0) {
      return
    }
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrRelationship).subscribe((res: any[]) => {
      this.HrRelationArray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  ///////   Location Master service functions  //////
  InsertFinePenalty(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertFinePenalty, payload);
  }
  UpdateFinePenalty(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateFinePenalty, payload);
  }
  DeleteFinePenalty(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteFinePenalty, payload);
  }
  GetAllFinePenalty() {
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllFinePenalty).subscribe((res: any[]) => {
      this.HrPenaltyArray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  ///////   Location Master service functions  //////
  InsertHrTraining(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrTraining, payload);
  }
  UpdateHrTraining(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrTraining, payload);
  }
  DeleteHrTraining(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHrTraining, payload);
  }
  GetAllHrTraining() {
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrTraining).subscribe((res: any[]) => {
      this.HrTrainingDetailsArray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  ///////   Location Master service functions  //////
  InsertHrVehicleMaster(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrVehicleMaster, payload);
  }
  UpdateHrVehicleMaster(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrVehicleMaster, payload);
  }
  DeleteHrVehicleMaster(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHrVehicleMaster, payload);
  }
  GetAllHrVehicleMaster() {
    if (this.AllHrVehicleMasterArray && this.AllHrVehicleMasterArray.length > 0) {
      return
    }
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrVehicleMaster).subscribe((res: any[]) => {
      this.AllHrVehicleMasterArray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  ///////   Location Master service functions  //////
  InsertHrAllotedProperties(payload: any) {
    delete payload.id
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrAllotedProperties, payload);
  }
  UpdateHrAllotedProperties(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrAllotedProperties, payload);
  }
  DeleteHrAllotedProperties(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHrAllotedProperties, payload);
  }
  GetAllHrAllotedProperties() {
    if (this.HrAllotedPropertiesArray && this.HrAllotedPropertiesArray.length > 0) {
      return
    }
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrAllotedProperties).subscribe((res: any[]) => {
      this.HrAllotedPropertiesArray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  ///////   Location Master service functions  //////
  InsertHrLeaveMultiStaffMasterr(payload: any) {
    payload.entryDate = payload.entryDate ? payload.entryDate.value : null
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrLeaveMultiStaffMasterr, payload);
  }
  UpdateHrLeaveMultiStaffMasterr(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrLeaveMultiStaffMasterr, payload);
  }
  DeleteHrLeaveMultiStaffMasterr(ID: any) {
    return this.httpClient.delete(this.baseUrl + MasterUrls.DeleteHrLeaveMultiStaffMasterr + ID);
  }
  GetAllHrLeaveMultiStaffMasters() {
    if (this.HrLeaveMultiStaffMasters && this.HrLeaveMultiStaffMasters.length > 0) {
      return
    }
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrLeaveMultiStaffMasters).subscribe((res: any[]) => {
      this.HrLeaveMultiStaffMasters = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  ///////   Location Master service functions  //////
  InsertHrLeaveMultiStaffDetails(payload: any) {
    delete payload.id
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrLeaveMultiStaffDetails, payload);
  }
  UpdateHrLeaveMultiStaffDetails(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrLeaveMultiStaffDetails, payload);
  }
  DeleteHrLeaveMultiStaffDetails(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHrLeaveMultiStaffDetails, payload);
  }
  GetAllHrLeaveMultiStaffDetailss() {
    if (this.HrLeaveMultiStaffDetails && this.HrLeaveMultiStaffDetails.length > 0) {
      return
    }
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrLeaveMultiStaffDetailss).subscribe((res: any[]) => {
      this.HrLeaveMultiStaffDetails = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  ///////   Location Master service functions  //////
  InsertHrLeaveMaster(payload: any) {
    delete payload.id
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrLeaveMaster, payload);
  }
  UpdateHrLeaveMaster(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrLeaveMaster, payload);
  }
  DeleteHrLeaveMaster(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHrLeaveMaster, payload);
  }
  GetAllHrLeaveMasters() {
    if (this.HrLeaveMasterArray && this.HrLeaveMasterArray.length > 0) {
      return
    }
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrLeaveMasters).subscribe((res: any[]) => {
      this.HrLeaveMasterArray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  GetAllMultiLeaveMaster() {
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllMultiLeaveMaster).subscribe((res: any[]) => {
      this.MultiLeaveDetailsStaffList = res as any[]
      this.MultiLeaveDetailsStaffListDeplicate = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  GetMultiLeaveDetailsByMasterID(ID: number) {
    return this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetMultiLeaveDetailsByMasterID + ID)
  }

  ///////   Location Master service functions  //////
  InsertHrLoandetails(payload: any) {
    delete payload.ldid
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrLoandetails, payload);
  }
  UpdateHrLoandetails(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrLoandetails, payload);
  }
  DeleteHrLoandetails(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHrLoandetails, payload);
  }
  GetDetailByStaffID(loanId: number, staffId: number) {
    return this.httpClient.get(this.baseUrl + MasterUrls.GetDetailByStaffID + "?loanId=" + loanId + "&staffId=" + staffId);
  }
  GetAllHrLoandetailss() {
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrLoandetailss).subscribe((res: any[]) => {
      this.HrLoandetails = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  ///////   Location Master service functions  //////
  InsertHrLoanentry(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrLoanentry, payload);
  }
  UpdateHrLoanentry(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrLoanentry, payload);
  }
  DeleteHrLoanentry(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHrLoanentry, payload);
  }
  GetAllHrLoanentrys() {
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrLoanentrys).subscribe((res: any[]) => {
      this.HrLoanentrys = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  GetAllLoanEntryStaffWise() {
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllLoanEntryStaffWise).subscribe((res: any[]) => {
      this.HrLoanentryStaffWise = res as any[]
      console.log(res)
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  InsertHR_Reward(payload: any) {
    delete payload.id
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHR_Reward, payload);
  }
  DeleteHR_Reward(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHR_Reward, payload);
  }
  UpdateHR_Reward(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHR_Reward, payload);
  }
  GetAllHR_Reward() {
    if (this.RewardArray && this.RewardArray.length > 0) {
      return
    }
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHR_Reward).subscribe((res: any[]) => {
      this.RewardArray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  ///////   Location Master service functions  //////
  InsertHrGratAmtPolicyDetails(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrGratAmtPolicyDetails, payload);
  }
  UpdateHrGratAmtPolicyDetails(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrGratAmtPolicyDetails, payload);
  }
  DeleteHrGratAmtPolicyDetails(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHrGratAmtPolicyDetails, payload);
  }
  GetAllHrGratAmtPolicyDetails() {
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrGratAmtPolicyDetails).subscribe((res: any[]) => {
      this.HrGratAmtPolicyDetail = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  ///////   Location Master service functions  //////
  InsertHrLeaveSalAmtPolicyDetails(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrLeaveSalAmtPolicyDetails, payload);
  }
  UpdateHrLeaveSalAmtPolicyDetails(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrLeaveSalAmtPolicyDetails, payload);
  }
  DeleteHrLeaveSalAmtPolicyDetails(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHrLeaveSalAmtPolicyDetails, payload);
  }
  GetAllHrLeaveSalAmtPolicyDetails() {
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrLeaveSalAmtPolicyDetails).subscribe((res: any[]) => {
      this.HrLeaveSalAmtPolicyDetails = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  ///////   Bank master service functions  //////

  InsertHrAssetMaster(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrAssetMaster, payload);
  }
  UpdateHrAssetMaster(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrAssetMaster, payload);
  }
  DeleteHrAssetMaster(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHrAssetMaster, payload);
  }

  GetAllHrAssetMaster() {
    return this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrAssetMaster)
  }

  GetAllHrAssetMasterWithSub() {
    if (this.BankMasterArray && this.BankMasterArray.length > 0) {
      return
    }
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrAssetMaster).subscribe((res: any[]) => {
      this.BankMasterArray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }



  ///////   Location Master service functions  //////
  InsertHrDocumentType(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrDocumentType, payload);
  }
  UpdateHrDocumentType(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrDocumentType, payload);
  }
  DeleteHrDocumentType(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHrDocumentType, payload);
  }
  GetAllDocumentTypes() {
    if (this.HrDocumentTypesArray && this.HrDocumentTypesArray.length > 0) {
      return
    }
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.HrGetAllDocumentTypes).subscribe((res: any[]) => {
      this.HrDocumentTypesArray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  ///////   Location Master service functions  //////
  InsertHrDocumentStatus(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrDocumentStatus, payload);
  }
  UpdateHrDocumentStatus(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrDocumentStatus, payload);
  }
  DeleteHrDocumentStatus(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHrDocumentStatus, payload);
  }
  GetAllHrDocumentStatus() {
    if (this.HrDocumentStatusArray && this.HrDocumentStatusArray.length > 0) {
      return
    }
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrDocumentStatus).subscribe((res: any[]) => {
      this.HrDocumentStatusArray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }
  ///////   Location Master service functions  //////
  InsertHrLeaveType(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrLeaveType, payload);
  }
  UpdateHrLeaveType(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrLeaveType, payload);
  }
  DeleteHrLeaveType(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHrLeaveType, payload);
  }
  GetAllHrLeaveType() {
    if (this.HrLeaveTypeAray && this.HrLeaveTypeAray.length > 0) {
      return
    }
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrLeaveType).subscribe((res: any[]) => {
      this.HrLeaveTypeAray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  ///////   Location Master service functions  //////
  InsertHrAddress(payload: any) {
    delete payload.addressId
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrAddress, payload);
  }
  UpdateHrAddress(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrAddress, payload);
  }
  DeleteHrAddress(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHrAddress, payload);
  }
  GetAllHrAddress() {
    if (this.hrAddressArray && this.hrAddressArray.length > 0) {
      return
    }
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrAddress).subscribe((res: any[]) => {
      this.hrAddressArray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  ///////   Location Master service functions  //////
  InsertHrAirTicketMaster(payload: any) {
    delete payload.atid
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrAirTicketMaster, payload);
  }
  UpdateHrAirTicketMaster(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrAirTicketMaster, payload);
  }
  DeleteHrAirTicketMaster(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHrAirTicketMaster, payload);
  }
  GetAllHrAirTicketMaster() {
    if (this.AirTicketMasterArray && this.AirTicketMasterArray.length > 0) {
      return
    }
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrAirTicketMaster).subscribe((res: any[]) => {
      this.AirTicketMasterArray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  ///////   Location Master service functions  //////
  InsertHrAirTicketDetails(payload: any) {
    delete payload.atdid
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrAirTicketDetails, payload);
  }
  UpdateHrAirTicketDetails(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrAirTicketDetails, payload);
  }
  DeleteHrAirTicketDetails(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHrAirTicketDetails, payload);
  }
  GetAllHrAirTicketDetails() {
    if (this.AirTicketDetailArray && this.AirTicketDetailArray.length > 0) {
      return
    }
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrAirTicketDetails).subscribe((res: any[]) => {
      this.AirTicketDetailArray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  InsertHrFamilyDetails(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrFamilyDetails, payload);
  }
  UpdateHrFamilyDetails(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.UpdateHrFamilyDetails, payload);
  }
  DeleteHrFamilyDetails(payload: any) {
    return this.httpClient.post(this.baseUrl + MasterUrls.DeleteHrFamilyDetails, payload);
  }
  GetAllHrFamilyDetails() {
    if (this.HrFamilyDetailsArray && this.HrFamilyDetailsArray.length > 0) {
      return
    }
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrFamilyDetails).subscribe((res: any[]) => {
      this.HrFamilyDetailsArray = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }
  GetHrPayRollReport() {
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetHrPayRollReport).subscribe((res: any[]) => {
      this.HrPayrollReport = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }
  GetInitialBalanceReport() {
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetInitialBalanceReport).subscribe((res: any[]) => {
      this.InitialBalanceReport = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }
  GetJVReportBlabla() {
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetJVReportBlabla).subscribe((res: any[]) => {
      this.JVReportBlabla = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }
  GetINITJVReportBlabla() {
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetINITJVReportBlabla).subscribe((res: any[]) => {
      this.INITJVReportBlabla = res as any[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }
}

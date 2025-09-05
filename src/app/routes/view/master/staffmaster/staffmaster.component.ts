import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
// import { MessageService } from 'primeng';
import { StaffMaster } from 'src/app/routes/domain/StaffMaster';
import { VisaCompanyMaster } from 'src/app/routes/domain/VisaCompanyMaster';
import { MasterApiService } from 'src/app/routes/service/master.api.services';

@Component({
  selector: 'app-staffmaster',
  templateUrl: './staffmaster.component.html',
  styleUrls: ['./staffmaster.component.scss']
})
export class StaffmasterComponent implements OnInit {
  index: number = 0;
  MaxDOB = new Date();
  MinJoiningDate = new Date();
  staffModal: boolean = false
  screenType: string = ""
  handleChange(e) {
    this.index = e.index;
  }
  title: string;
  subtitle: string;
  displayMaximizeable: boolean;
  isEditbtnDisable: boolean = true
  submitted: boolean = false
  StaffMasterForm: FormGroup;
  StaffMasterArray: Array<StaffMaster>;
  genderArray = [{ id: "0", name: "Male" }, { id: "1", name: "Female" }]
  AccomodationArray = [{ name: "YES" }, { name: "NO" }]
  TransferTypeArray = [{ name: "BANK" }, { name: "CASH" }]
  constructor(private activatedroute: ActivatedRoute, public masterApi: MasterApiService, private messageService: MessageService, private fb: FormBuilder) {
    this.displayMaximizeable = false;
  }

  ngOnInit(): void {
    this.MaxDOB.setDate(this.MaxDOB.getDate() - 1);
    this.MinJoiningDate.setDate(this.MinJoiningDate.getDate() + 1);
    this.masterApi.GetAllCurrencyWithSubs()
    this.masterApi.getAllDesignationWithSubscribe()
    this.masterApi.getAllVisaDesignationWithSubs()
    this.masterApi.getAllCompanyWithSubs()
    this.masterApi.getAllVisaCompanyWithSubs()
    this.masterApi.getAllStaffMasterWithSubscribe()
    this.masterApi.GetAllHrSites()
    this.masterApi.GetAllHrLanguagesWithSubs()
    this.masterApi.GetAllHrMaritalStatusWithSubs()
    this.masterApi.GetAllHrNationalityWithSubs()
    this.masterApi.GetAllHrSubDepartmentWithSubs()
    this.masterApi.GetAllHrBloodGroupWithSubs()
    this.masterApi.GetAllHrReligionWithSubs()
    this.masterApi.GetHrBankMastersWithSubs()
    this.masterApi.GetAllHrActiveStatusWithSubs()
    this.masterApi.GetAllHrLocationMasterWithSubs()
    this.masterApi.GetAllCaderMasterWithSubs()
    this.masterApi.GetAllGradeMasterWithSubs()
    this.masterApi.GetHrQualificationsWithSubs()
    this.masterApi.GetAllHrStaffTypeWithSubs()
    this.masterApi.GetAllHrAgentMastersWithSubs()
    this.masterApi.GetAllHrShiftTypesWithSubs()
    this.masterApi.GetAllHrShiftsWithSubs()
    this.masterApi.GetAllHrSponserWithSubs()
    this.masterApi.GetAllHrVisaTypeWithSubs()
    this.masterApi.GetAllHrOvertimeSettings()
    this.masterApi.GetAllHrContractType()
    this.masterApi.getAllDepartmentWithSub()
    this.masterApi.GetAllHrCampMaster()
    this.masterApi.GetAllHrLeaveSalAmtPolicyMaster()
    this.masterApi.GetAllHrGratAmtPolicyMaster()
    this.masterApi.GetAllHrTicketFrequency()
    this.masterApi.GetAllHrAirportLocation()
    this.initForm()
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
      this.subtitle = data.subtitle;
    });
  }

  FullName() {
    var value = this.StaffMasterForm.controls.firstName.value + " " + this.StaffMasterForm.controls.middleName.value + " " + this.StaffMasterForm.controls.lastName.value
    this.StaffMasterForm.controls.fullName.setValue(value)
    return value
  }

  initForm() {
    this.StaffMasterForm = new FormGroup({
      staffId: new FormControl(0),
      staffCode: new FormControl(null, Validators.required),
      companyId: new FormControl(null, Validators.required),
      fileNo: new FormControl(null),
      firstName: new FormControl('', Validators.required),
      enrollNo: new FormControl(null),
      middleName: new FormControl(''),
      lastName: new FormControl('', Validators.required),
      fullName: new FormControl(null),
      fatherName: new FormControl(null, Validators.required),
      familyName: new FormControl(null),
      gender: new FormControl(0),
      dob: new FormControl(null, Validators.required),
      religionId: new FormControl(null),
      languageId: new FormControl(null),
      nationalityId: new FormControl(null),
      bloodGroupId: new FormControl(null),
      maritalStatusId: new FormControl(null),
      departmentId: new FormControl(null, Validators.required),
      designationId: new FormControl(null, Validators.required),
      companyDesignationId: new FormControl(null),
      doj: new FormControl(null, Validators.required),
      lastReJoinDate: new FormControl(null),
      activeStatusId: new FormControl(null, Validators.required),
      bankId: new FormControl(null),
      bankAcNo: new FormControl(null),
      shiftTypeId: new FormControl(null),
      shiftId: new FormControl(null),
      siteId: new FormControl(null),
      staffPhoto: new FormControl(null),
      transType: new FormControl(null),
      qpspersonId: new FormControl(null),
      qpsIban: new FormControl(""),
      staffTypeId: new FormControl(null),
      visaDesignationId: new FormControl(null),
      visaCompanyId: new FormControl(null),
      lastWorkingDay: new FormControl(null),
      ttid: new FormControl(null),
      gradeId: new FormControl(null),
      levelId: new FormControl(null),
      previousEmployer: new FormControl(null),
      expInYrs: new FormControl(0),
      qulification1: new FormControl(null),
      qulification2: new FormControl(null),
      qulification3: new FormControl(null),
      leaveFreq: new FormControl(null),
      destFrm: new FormControl(null),
      destTo: new FormControl(null),
      locationId: new FormControl(null),
      cardNo: new FormControl(null),
      statusChangeDate: new FormControl(null),
      normalHr: new FormControl(null),
      oteligible: new FormControl(false),
      agentId: new FormControl(null),
      superVisorId: new FormControl(null),
      vehicleNo: new FormControl(null),
      preAlopnBal: new FormControl(null),
      portOfEntry: new FormControl(null),
      dateOfEntry: new FormControl(null),
      norOtrate: new FormControl(null),
      holOtrate: new FormControl(null),
      friOtrate: new FormControl(null),
      otremarks: new FormControl(null),
      currencyId: new FormControl(null),
      sponserId: new FormControl(null),
      visaTypeId: new FormControl(null),
      contTypeId: new FormControl(null),
      timePolcyId: new FormControl(null),
      leavePolcyId: new FormControl(null),
      overTiPolcyId: new FormControl(null),
      imgStaus: new FormControl(null),
      accommodation: new FormControl('NO'),
      empQid: new FormControl(null),
      empvisaId: new FormControl(null),
      normalHrFloat: new FormControl(null),
      costCenterId: new FormControl(null),
      gratStDate: new FormControl(null),
      grtAmtPolicy: new FormControl(null),
      leaveSalAmtPolicy: new FormControl(null),
      dontProcPayroll: new FormControl(false),
      jobCostAmt: new FormControl(null),
      uidno: new FormControl(null),
      routingCode: new FormControl(null),
      notEligForProcAtt: new FormControl(null),
      subDepId: new FormControl(null),
      cmpId: new FormControl(null),
      wpsIban: new FormControl(null),
      wpspersonId: new FormControl(null),
    });
  }

  get f() {
    return this.StaffMasterForm.controls;
  }

  setDataObj() {
    var dataObj: StaffMaster = {
      staffId: this.StaffMasterForm.controls.staffId.value,
      staffCode: this.StaffMasterForm.controls.staffCode.value,
      companyId: +this.StaffMasterForm.controls.companyId.value?.companyId,
      fileNo: this.StaffMasterForm.controls.fileNo.value,
      firstName: this.StaffMasterForm.controls.firstName.value,
      enrollNo: +this.StaffMasterForm.controls.enrollNo.value,
      middleName: this.StaffMasterForm.controls.middleName.value,
      lastName: this.StaffMasterForm.controls.lastName.value,
      fullName: this.StaffMasterForm.controls.fullName.value,
      fatherName: this.StaffMasterForm.controls.fatherName.value,
      familyName: this.StaffMasterForm.controls.familyName.value,
      gender: this.StaffMasterForm.controls.gender.value?.id,
      dob: this.StaffMasterForm.controls.dob.value,
      religionId: +this.StaffMasterForm.controls.religionId.value?.religionId,
      languageId: +this.StaffMasterForm.controls.languageId.value?.languageId,
      nationalityId: +this.StaffMasterForm.controls.nationalityId.value?.nationalityId,
      bloodGroupId: +this.StaffMasterForm.controls.bloodGroupId.value?.bloodGroupId,
      maritalStatusId: +this.StaffMasterForm.controls.maritalStatusId.value?.maritalStatusId,
      departmentId: +this.StaffMasterForm.controls.departmentId.value?.departmentId,
      designationId: +this.StaffMasterForm.controls.designationId.value?.designationId,
      qulification1: +this.StaffMasterForm.controls.qulification1.value?.qualificationId,
      qulification2: +this.StaffMasterForm.controls.qulification2.value?.qualificationId,
      qulification3: +this.StaffMasterForm.controls.qulification3.value?.qualificationId,
      doj: this.StaffMasterForm.controls.doj.value,
      lastReJoinDate: this.StaffMasterForm.controls.lastReJoinDate.value,
      // activeStatusId: +this.StaffMasterForm.controls.activeStatusId.value?.activeStatusId,
      activeStatusId: 0,
      bankId: +this.StaffMasterForm.controls.bankId.value?.bankMasterId,
      bankAcNo: this.StaffMasterForm.controls.bankAcNo.value,
      shiftTypeId: +this.StaffMasterForm.controls.shiftTypeId.value?.shiftTypeId,
      shiftId: +this.StaffMasterForm.controls.shiftId.value?.shiftId,
      siteId: +this.StaffMasterForm.controls.siteId.value?.siteId,
      transType: this.StaffMasterForm.controls.transType.value?.name,
      wpspersonId: this.StaffMasterForm.controls.wpspersonId.value,
      wpsIban: this.StaffMasterForm.controls.wpsIban.value,
      staffTypeId: +this.StaffMasterForm.controls.staffTypeId.value?.staffTypeId,
      visaDesignationId: +this.StaffMasterForm.controls.visaDesignationId.value?.visaDesignationId,
      visaCompanyId: +this.StaffMasterForm.controls.visaCompanyId.value?.visaCompanyId,
      // ttid: +this.StaffMasterForm.controls.value,
      gradeId: +this.StaffMasterForm.controls.gradeId.value?.gid,
      previousEmployer: this.StaffMasterForm.controls.previousEmployer.value,
      expInYrs: this.StaffMasterForm.controls.expInYrs.value,
      // destFrm: +this.StaffMasterForm.controls.DestFrm.value,
      // destTo: +this.StaffMasterForm.controls.DestTo.value,
      locationId: +this.StaffMasterForm.controls.locationId.value?.locationId,
      normalHr: this.StaffMasterForm.controls.normalHr.value,
      oteligible: this.StaffMasterForm.controls.oteligible.value,
      agentId: +this.StaffMasterForm.controls.agentId.value?.agentId,
      // superVisorId: +this.StaffMasterForm.controls.superVisorId.value,
      vehicleNo: this.StaffMasterForm.controls.vehicleNo.value,
      norOtrate: this.StaffMasterForm.controls.norOtrate.value,
      currencyId: +this.StaffMasterForm.controls.currencyId.value?.currencyId,
      sponserId: +this.StaffMasterForm.controls.sponserId.value?.sponserId,
      visaTypeId: +this.StaffMasterForm.controls.visaTypeId.value?.visaTypId,
      contTypeId: +this.StaffMasterForm.controls.contTypeId.value?.contTypeId,
      // timePolcyId: +this.StaffMasterForm.controls.TimePolcyId.value,
      overTiPolcyId: +this.StaffMasterForm.controls.overTiPolcyId.value?.ovtPlocyId,
      accommodation: this.StaffMasterForm.controls.accommodation.value?.name,
      empvisaId: this.StaffMasterForm.controls.empvisaId.value,
      gratStDate: this.StaffMasterForm.controls.gratStDate.value,
      grtAmtPolicy: +this.StaffMasterForm.controls.grtAmtPolicy.value?.polId,
      leaveSalAmtPolicy: +this.StaffMasterForm.controls.leaveSalAmtPolicy.value?.polId,
      dontProcPayroll: this.StaffMasterForm.controls.dontProcPayroll.value,
      jobCostAmt: this.StaffMasterForm.controls.jobCostAmt.value,
      uidno: this.StaffMasterForm.controls.uidno.value,
      routingCode: this.StaffMasterForm.controls.routingCode.value,
      subDepId: +this.StaffMasterForm.controls.subDepId.value?.subDepId,
      cmpId: +this.StaffMasterForm.controls.cmpId.value?.cadreId,
    }
    return dataObj;
  }

  onSearch(value: string) {
    this.masterApi.staffMasterArray = this.masterApi.staffMasterArrayDuplicate.filter(o => (o.staffCode && o.staffCode != "" && o.staffCode.toLowerCase().includes(value.toLowerCase())) || o.fullName && o.fullName != "" && o.fullName.toLowerCase().includes(value.toLowerCase()))
  }

  onSave() {
    this.submitted = true
    if (this.StaffMasterForm.invalid) {
      return
    }
    var dataObj = this.setDataObj()
    this.masterApi.insertStaffMaster(dataObj).subscribe((response: StaffMaster[]) => {
      this.initForm()
      this.masterApi.staffMasterArrayDuplicate = response;
      this.submitted = false
      this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Added Successflly!' });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  onClickEdit(rowData: StaffMaster) {
    try {
      this.staffModal = false
      this.isEditbtnDisable = false
      this.StaffMasterForm.patchValue(rowData)
      var companyObj = this.masterApi.CompanyMasterArray.find(o => o.companyId == rowData.companyId)
      var visaCompanyObj = this.masterApi.VisaCompanyMasterArray.find(o => o.visaCompanyId == rowData.visaCompanyId)
      var maritalStatusObj = this.masterApi.MaritalStatusArray.find(o => o.maritalStatusId == rowData.maritalStatusId)
      var languageObj = this.masterApi.LanguagerArray.find(o => o.languageId == rowData.languageId)
      var nationalityObj = this.masterApi.NationalityArray.find(o => o.nationalityId == rowData.nationalityId)
      var designationObj = this.masterApi.designatinMasterArray.find(o => o.designationId == rowData.designationId)
      var visaDesignationObj = this.masterApi.VisadesignatinMasterArray.find(o => o.visaDesignationId == rowData.visaDesignationId)
      var departmentObj = this.masterApi.DepartmentArray.find(o => o.departmentId == rowData.departmentId)
      var subDepObj = this.masterApi.SubDepartmentArray.find(o => o.subDepId == rowData.subDepId)
      var bloodGroupObj = this.masterApi.BloodGroupArray.find(o => o.bloodGroupId == rowData.bloodGroupId)
      var religionObj = this.masterApi.ReligionArray.find(o => o.religionId == rowData.religionId)
      var transTypeObj = this.TransferTypeArray.find(o => o.name == rowData.transType)
      var bankObj = this.masterApi.BankMasterArray.find(o => o.bankMasterId == rowData.bankId)
      var activeStatusObj = this.masterApi.ActiveStatusrArray.find(o => o.activeStatusId == rowData.activeStatusId)
      var locationObj = this.masterApi.LocationMasterArray.find(o => o.locationId == rowData.locationId)
      var currencyObj = this.masterApi.CurrencyMasterArray.find(o => o.currencyId == rowData.currencyId)
      var genderObj = this.genderArray.find(o => o.name == rowData.gender)
      // var cmpObj = this.masterApi.CadreMasterArray.find(o => o.cadreId == rowData.cmpId)
      var gradeObj = this.masterApi.GradeMasterArray.find(o => o.gid == rowData.gradeId)
      var qulification1Obj = this.masterApi.QualificationMasterArray.find(o => o.qualificationId == rowData.qulification1)
      var qulification2Obj = this.masterApi.QualificationMasterArray.find(o => o.qualificationId == rowData.qulification2)
      var qulification3Obj = this.masterApi.QualificationMasterArray.find(o => o.qualificationId == rowData.qulification3)
      var tfObj = this.masterApi.TicketFrequencyAray.find(o => o.tfId == rowData.ttid)
      var staffTypeObj = this.masterApi.StaffTypeArray.find(o => o.staffTypeId == rowData.staffTypeId)
      var agentObj = this.masterApi.AgentArray.find(o => o.agentId == rowData.agentId)
      var superVisorObj = this.masterApi.siteMasterArrayDuplicate.find(o => o.siteId == rowData.superVisorId)
      var siteObj = this.masterApi.siteMasterArrayDuplicate.find(o => o.siteId == rowData.siteId)
      var shiftTypeObj = this.masterApi.ShiftTypeArray.find(o => o.shiftTypeId == rowData.shiftTypeId)
      var shiftObj = this.masterApi.ShiftArray.find(o => o.shiftId == rowData.shiftId)
      var sponserObj = this.masterApi.SponsorArray.find(o => o.sponserId == rowData.sponserId)
      var visaTypeObj = this.masterApi.VisaTypeArray.find(o => o.visaTypId == rowData.visaTypeId)
      var contTypeObj = this.masterApi.ContactTYpeArray.find(o => o.contTypeId == rowData.contTypeId)
      var accommodationObj = this.AccomodationArray.find(o => o.name == rowData.accommodation)
      var grtAmtPolicyObj = this.masterApi.HrGratAmtPolicyMaster.find(o => o.polId == rowData.grtAmtPolicy)
      var leaveSalAmtPolicyObj = this.masterApi.HrLeaveSalAmtPolicyMaster.find(o => o.polId == rowData.leaveSalAmtPolicy)
      var overTiPolcyObj = this.masterApi.OverTimePolicyArray.find(o => o.ovtPlocyId == rowData.overTiPolcyId)
      var cmpObj = this.masterApi.CampMasterArray.find(o => o.cmpId == rowData.cmpId)
      var destFrmObj = this.masterApi.AirportLocationAray.find(o => o.airportLocId == rowData.destFrm)
      var destToObj = this.masterApi.AirportLocationAray.find(o => o.airportLocId == rowData.destTo)

      this.StaffMasterForm.controls.companyId.setValue(companyObj)
      this.StaffMasterForm.controls.visaCompanyId.setValue(visaCompanyObj)
      this.StaffMasterForm.controls.maritalStatusId.setValue(maritalStatusObj)
      this.StaffMasterForm.controls.languageId.setValue(languageObj)
      this.StaffMasterForm.controls.nationalityId.setValue(nationalityObj)
      this.StaffMasterForm.controls.designationId.setValue(designationObj)
      this.StaffMasterForm.controls.visaDesignationId.setValue(visaDesignationObj)
      this.StaffMasterForm.controls.departmentId.setValue(departmentObj)
      this.StaffMasterForm.controls.subDepId.setValue(subDepObj)
      this.StaffMasterForm.controls.bloodGroupId.setValue(bloodGroupObj)
      this.StaffMasterForm.controls.religionId.setValue(religionObj)
      this.StaffMasterForm.controls.transType.setValue(transTypeObj)
      this.StaffMasterForm.controls.bankId.setValue(bankObj)
      this.StaffMasterForm.controls.activeStatusId.setValue(activeStatusObj)
      this.StaffMasterForm.controls.locationId.setValue(locationObj)
      this.StaffMasterForm.controls.currencyId.setValue(currencyObj)
      this.StaffMasterForm.controls.gender.setValue(genderObj)
      // this.StaffMasterForm.controls.cmpId.setValue(companyObj)
      this.StaffMasterForm.controls.gradeId.setValue(gradeObj)
      this.StaffMasterForm.controls.qulification1.setValue(qulification1Obj)
      this.StaffMasterForm.controls.qulification2.setValue(qulification2Obj)
      this.StaffMasterForm.controls.qulification3.setValue(qulification3Obj)
      this.StaffMasterForm.controls.ttid.setValue(tfObj)
      this.StaffMasterForm.controls.staffTypeId.setValue(staffTypeObj)
      this.StaffMasterForm.controls.agentId.setValue(agentObj)
      this.StaffMasterForm.controls.superVisorId.setValue(superVisorObj)
      this.StaffMasterForm.controls.siteId.setValue(siteObj)
      this.StaffMasterForm.controls.shiftTypeId.setValue(shiftTypeObj)
      this.StaffMasterForm.controls.shiftId.setValue(shiftObj)
      this.StaffMasterForm.controls.sponserId.setValue(sponserObj)
      this.StaffMasterForm.controls.visaTypeId.setValue(visaTypeObj)
      this.StaffMasterForm.controls.contTypeId.setValue(contTypeObj)
      this.StaffMasterForm.controls.accommodation.setValue(accommodationObj)
      this.StaffMasterForm.controls.grtAmtPolicy.setValue(grtAmtPolicyObj)
      this.StaffMasterForm.controls.leaveSalAmtPolicy.setValue(leaveSalAmtPolicyObj)
      this.StaffMasterForm.controls.overTiPolcyId.setValue(overTiPolcyObj)
      this.StaffMasterForm.controls.cmpId.setValue(cmpObj)
      this.StaffMasterForm.controls.destFrm.setValue(destFrmObj)
      this.StaffMasterForm.controls.destTo.setValue(destToObj)
    } catch (error) {
      console.log(error)
    }
  }

  onEdit() {
    this.submitted = true
    if (this.StaffMasterForm.invalid) {
      return
    }
    var dataObj = this.setDataObj()
    this.masterApi.updateStaffMaster(dataObj).subscribe((response: StaffMaster[]) => {
      this.initForm()
      this.masterApi.staffMasterArrayDuplicate = response;
      this.submitted = false
      this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Updated Successflly!' });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  onDelete(rowData: StaffMaster) {
    if (confirm("Are you sure. You want to delete this record ?")) {
      this.masterApi.deleteStaffMaster(rowData).subscribe((response: StaffMaster[]) => {
        this.initForm()
        this.masterApi.staffMasterArrayDuplicate = response;
        this.submitted = false
        this.staffModal = false
        this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Deleted Successflly!' });
      }, error => {
        this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
      });
    }
  }

  onCancel() {
    this.isEditbtnDisable = true
    this.initForm()
  }
}
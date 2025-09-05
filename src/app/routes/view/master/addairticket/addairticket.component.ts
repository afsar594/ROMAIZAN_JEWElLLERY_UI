import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AddressTypeMaster } from 'src/app/routes/domain/AddressType';
import { StaffMaster } from 'src/app/routes/domain/StaffMaster';
import { MasterApiService } from 'src/app/routes/service/master.api.services';

@Component({
  selector: 'app-addairticket',
  templateUrl: './addairticket.component.html',
  styleUrls: ['./addairticket.component.scss']
})
export class AddairticketComponent implements OnInit {
  index: any;
  ticketListModal: boolean = false
  title: any;
  subtitle: any;
  first: any;
  rows: any;
  FamilyDetailArray: any[];
  ticketMasterId: any;
  ticketStaffId: any;
  submittedDetails: boolean = false;
  isEditDetailBtndisable: boolean = false;
  staffName: string;
  airTicketDetailArray: any[] = [];
  handleChange(e) {
    this.index = e == 0 ? 0 : e.index;
  }
  isEditBtndisable: boolean = false
  submitted: boolean = false
  ticketDetailModal: boolean = false
  AirTicketForm: FormGroup
  AirTicketDetailForm: FormGroup
  typeArray: any[] = [{ name: "TST" }]
  constructor(private fb: FormBuilder, public masterApiService: MasterApiService, private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.masterApiService.GetAllHrFamilyDetails()
    this.masterApiService.GetAllHrAirTicketDetails()
    this.masterApiService.GetAllHrAirTicketMaster()
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
      this.subtitle = data.subtitle
    });
    this.initForm()
    this.masterApiService.getAllStaffMasterWithSubscribe()
    this.masterApiService.GetAllHrNationalityWithSubs()
  }

  initForm() {
    this.AirTicketForm = this.fb.group({
      atid: new FormControl(0),
      lsid: new FormControl(null),
      staffid: new FormControl(null, Validators.required),
      flyFromId: new FormControl(null, Validators.required),
      flyToId: new FormControl(null, Validators.required),
      depDate: new FormControl(new Date(), Validators.required),
      retDate: new FormControl(new Date(), Validators.required),
      noOfTicket: new FormControl(null),
      lastTicketTaken: new FormControl(new Date()),
      remarks: new FormControl(null),
      amount: new FormControl(null, Validators.required),
      ticket: new FormControl(false),
      retFlyFromId: new FormControl(null, Validators.required),
      retFlyToId: new FormControl(null, Validators.required),
      isOneWay: new FormControl(false),
      issueDate: new FormControl(new Date()),
      ticketSettDate: new FormControl(new Date()),
      availableTicket: new FormControl(null),
    })
    this.AirTicketDetailForm = this.fb.group({
      atdid: new FormControl(0),
      atid: new FormControl(null),
      sno: new FormControl(0),
      staffid: new FormControl(null),
      familyId: new FormControl(null, Validators.required),
      ticketAvailable: new FormControl(false),
      type: new FormControl(null, Validators.required),
    })
  }

  get f() {
    return this.AirTicketForm.controls
  }

  get d() {
    return this.AirTicketDetailForm.controls
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
    return this.masterApiService.AirTicketMasterArray ? this.first === this.masterApiService.AirTicketMasterArray.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.masterApiService.AirTicketMasterArray ? this.first === 0 : true;
  }

  getDataObj() {
    var dataObj = {
      atid: this.AirTicketForm.controls.atid.value,
      lsid: this.AirTicketForm.controls.lsid.value,
      staffid: this.AirTicketForm.controls.staffid.value?.staffId,
      flyFromId: this.AirTicketForm.controls.flyFromId.value?.nationalityId,
      flyToId: this.AirTicketForm.controls.flyToId.value?.nationalityId,
      depDate: this.AirTicketForm.controls.depDate.value,
      retDate: this.AirTicketForm.controls.retDate.value,
      noOfTicket: this.AirTicketForm.controls.noOfTicket.value,
      lastTicketTaken: this.AirTicketForm.controls.lastTicketTaken.value,
      remarks: this.AirTicketForm.controls.remarks.value,
      amount: this.AirTicketForm.controls.amount.value,
      ticket: this.AirTicketForm.controls.ticket.value,
      retFlyFromId: this.AirTicketForm.controls.retFlyFromId.value?.nationalityId,
      retFlyToId: this.AirTicketForm.controls.retFlyToId.value?.nationalityId,
      isOneWay: this.AirTicketForm.controls.isOneWay.value,
      issueDate: this.AirTicketForm.controls.issueDate.value,
      ticketSettDate: this.AirTicketForm.controls.ticketSettDate.value,
      availableTicket: this.AirTicketForm.controls.availableTicket.value,
    }
    return dataObj
  }

  getDetailDataObj() {
    var dataObj = {
      atdid: this.AirTicketDetailForm.controls.atdid.value,
      atid: this.ticketMasterId,
      sno: this.AirTicketDetailForm.controls.sno.value,
      staffid: this.ticketStaffId,
      familyId: this.AirTicketDetailForm.controls.familyId.value?.id,
      ticketAvailable: this.AirTicketDetailForm.controls.ticketAvailable.value,
      type: this.AirTicketDetailForm.controls.type.value?.name,
    }
    return dataObj
  }

  onSave() {
    this.submitted = true
    if (this.AirTicketForm.invalid) {
      return
    }
    this.masterApiService.InsertHrAirTicketMaster(this.getDataObj()).subscribe((response: any[]) => {
      this.initForm()
      this.isEditBtndisable = false
      this.submitted = false
      this.masterApiService.AirTicketMasterArray = response
    }, error => {
    })
  }

  onSaveDetails() {
    this.submittedDetails = true
    if (this.AirTicketDetailForm.invalid) {
      return
    }
    this.masterApiService.InsertHrAirTicketDetails(this.getDetailDataObj()).subscribe((response: any[]) => {
      this.initForm()
      this.isEditDetailBtndisable = false
      this.ticketDetailModal = false
      this.submittedDetails = false
      this.masterApiService.AirTicketDetailArray = response
    }, error => {
    })
  }

  onDelete(rowData: any) {
    if (confirm("Are you sure. You want to delete this record ?")) {
      this.masterApiService.DeleteHrAirTicketMaster(rowData).subscribe((response: any[]) => {
        this.masterApiService.AirTicketMasterArray = response
      }, error => {
      });
    }
  }

  onDeleteDetails(rowData: any) {
    if (confirm("Are you sure. You want to delete this record ?")) {
      this.masterApiService.DeleteHrAirTicketDetails(rowData).subscribe((response: any[]) => {
        this.masterApiService.AirTicketDetailArray = response
        this.ticketDetailModal = false
      }, error => {
      });
    }
  }

  onCancel() {
    this.initForm()
    this.submitted = false
  }

  onEditDetail() {
    this.submitted = true
    if (this.AirTicketForm.invalid) {
      return
    }
    this.masterApiService.UpdateHrAirTicketDetails(this.getDetailDataObj()).subscribe((response: any[]) => {
      this.initForm()
      this.ticketDetailModal = false
      this.submitted = false
      this.isEditDetailBtndisable = false
      this.masterApiService.AirTicketDetailArray = response
    }, error => {
    })
  }

  onEdit() {
    this.submitted = true
    if (this.AirTicketForm.invalid) {
      return
    }
    this.masterApiService.UpdateHrAirTicketMaster(this.getDataObj()).subscribe((response: any[]) => {
      this.initForm()
      this.submitted = false
      this.isEditBtndisable = false
      this.masterApiService.AirTicketMasterArray = response
    }, error => {
    })
  }

  onClickEdit(item) {
    this.isEditBtndisable = true
    this.AirTicketForm.patchValue(item)
    this.AirTicketForm.controls.staffid.setValue(this.getStaffObj(item.staffid))
    this.AirTicketForm.controls.flyFromId.setValue(this.getNationalityObj(item.flyFromId))
    this.AirTicketForm.controls.flyToId.setValue(this.getNationalityObj(item.flyToId))
    this.AirTicketForm.controls.retFlyFromId.setValue(this.getNationalityObj(item.retFlyFromId))
    this.AirTicketForm.controls.retFlyToId.setValue(this.getNationalityObj(item.retFlyToId))
  }

  onClickEditDetails(item) {
    this.isEditDetailBtndisable = true
    this.AirTicketDetailForm.patchValue(item)
    this.AirTicketForm.controls.familyId.setValue(this.getFamilyObj(item.familyId))
    this.AirTicketForm.controls.type.setValue(this.getTypeObj(item.type))
  }

  getStaffObj(staffId): StaffMaster {
    return this.masterApiService.staffMasterArrayDuplicate.find(o => o.staffId == staffId)
  }

  getNationalityObj(nationalityID) {
    return this.masterApiService.NationalityArray.find(o => o.nationalityId == nationalityID)
  }

  getStaffFamily(staffid) {
    this.FamilyDetailArray = this.masterApiService.HrFamilyDetailsArray.filter(o => o.staffID == staffid)
  }

  getFamilyObj(id) {
    var obj = this.masterApiService.HrFamilyDetailsArray.find(o => o.id == id)
    return obj
  }

  getTypeObj(id) {
    var obj = this.typeArray.find(o => o.name == id)
    return obj
  }

  onDetailDialog(item) {
    this.staffName = this.getStaffObj(item.staffid)?.fullName
    this.ticketStaffId = item.staffid
    this.ticketMasterId = item.atid
    this.ticketDetailModal = true
    this.getStaffFamily(item.staffdd)
    this.getTicketDetais(item.atid)
  }

  getTicketDetais(atid: number) {
    this.airTicketDetailArray = this.masterApiService.AirTicketDetailArray.filter(o => o.atid == atid)
  }
}


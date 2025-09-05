import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng';
import { MasterApiService } from 'src/app/routes/service/master.api.services';
import { TransactionService } from 'src/app/routes/service/transaction-service.service';

@Component({
  selector: 'app-mobilization',
  templateUrl: './mobilization.component.html',
  styleUrls: ['./mobilization.component.scss'],
  providers: [DatePipe]
})
export class MobilizationComponent implements OnInit {
  index: any;
  title: any;
  listModal: boolean = false
  detaillistModal: boolean = false
  subtitle: any;
  detailArray: any[];
  MobilizationDetailArray: any[] = [];
  handleChange(e) {
    this.index = e.index;
  }
  showDetail: boolean = false
  MobilizationForm: FormGroup
  constructor(private activatedroute: ActivatedRoute, public transactionApi: TransactionService, private datePipe: DatePipe,
    public masterApi: MasterApiService, public messageService: MessageService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm()
    this.masterApi.getAllDesignationWithSubscribe()
    this.masterApi.getAllStaffMasterWithSubscribe()
    this.masterApi.GetAllHrSites()
    this.masterApi.GetAllHrLocationMasterWithSubs()
    this.transactionApi.GetAllHrMobilization()
    this.transactionApi.GetAllHrMobilizationDetails()
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
      this.subtitle = data.subtitle
    });
  }

  initForm() {
    this.MobilizationForm = this.fb.group({
      mobId: new FormControl(0),
      mobDate: new FormControl(new Date()),
      remarks: new FormControl(null),
      submitMob: new FormControl(false)
    })
  }

  pushEmptyDataArray() {
    this.MobilizationDetailArray.push({
      MobDetId: 0,
      MobId: this.MobilizationForm.controls.mobId.value,
      Sno: null,
      Staffid: null,
      DesigId: null,
      SiteId: null,
      LocationId: null,
      RemarksDet: "",
      IsEdit: false,
      JoinDate: new Date()
    })
  }

  spliceData(index: number) {
    if (this.MobilizationDetailArray.length == 1) {
      return
    }
    else {
      this.MobilizationDetailArray.splice(index, 1)
    }
  }

  onCacnel() {
    this.showDetail = false
    this.initForm()
  }

  onSaveMaster() {
    this.transactionApi.InsertHrMobilization(this.MobilizationForm.value).subscribe(res => {
      this.transactionApi.MobilizationArray = res as any[]
      this.pushEmptyDataArray()
      this.MobilizationForm.controls.mobId.setValue(this.transactionApi.MobilizationArray[this.transactionApi.MobilizationArray.length - 1].mobId)
      this.showDetail = true
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    })
  }

  onSaveDetail() {
    if (!this.showDetail) {
      // alert("Save Master Record First")
      return
    }
    var dataArray = []
    this.MobilizationDetailArray.forEach(element => {
      dataArray.push({
        MobDetId: 0,
        MobId: this.MobilizationForm.controls.mobId.value,
        Sno: element.Sno,
        Staffid: element.Staffid?.staffId,
        DesigId: element.DesigId?.designationId,
        SiteId: element.SiteId?.siteId,
        LocationId: element.LocationId?.locationId,
        RemarksDet: element.RemarksDet,
        IsEdit: false,
        JoinDate: element.JoinDate,
      })
    });
    this.transactionApi.InsertHrMobilizationDetails(dataArray).subscribe(res => {
      this.transactionApi.MobilizationDetailArray = res as any[]
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    })
  }

  viewDetails(mobID) {
    debugger
    this.detailArray = this.transactionApi.MobilizationDetailArray.filter(o => o.mobID == mobID)
    this.detaillistModal = true
  }

  getStaffName(staffId: number) {
    debugger
    return this.masterApi.staffMasterArrayDuplicate.find(o => o.staffId == staffId)?.fullName
  }

  getLocationName(locationID: number) {
    return this.masterApi.LocationMasterArray.find(o => o.locationId == locationID)?.locationName
  }

  getDesignationName(designationID: number) {
    return this.masterApi.designatinMasterArrayDuplicate.find(o => o.designationId == designationID)?.designation
  }

  getSiteName(siteID: number) {
    return this.masterApi.siteMasterArrayDuplicate.find(o => o.siteId == siteID)?.siteName
  }

  onDelete(rowData: any) {
    if (confirm("Are you sure. You want to delete this record ?")) {
      this.transactionApi.DeleteHrMobilizationDetails(rowData).subscribe((response: any[]) => {
        this.initForm()
        this.transactionApi.MobilizationDetailArray = response
        this.detaillistModal = false
        this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Deleted Successflly!' });
      }, error => {
        this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
      });
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HotTableRegisterer } from '@handsontable/angular';
import { TranslateService } from '@ngx-translate/core';
import Handsontable from 'handsontable';
import { MessageService } from 'primeng/api';
import { StaffMaster } from 'src/app/routes/domain/StaffMaster';
import { MasterApiService } from 'src/app/routes/service/master.api.services';


@Component({
  selector: 'app-multileaveentry',
  templateUrl: './multileaveentry.component.html',
  styleUrls: ['./multileaveentry.component.scss']
})
export class MultileaveentryComponent implements OnInit {
  multiLeaveData: boolean = false
  leaveModal: boolean = false
  staffModal: boolean = false
  title: string;
  dataset: any;
  subtitle: string;
  MLForm: FormGroup;
  gridHeader: string;
  index: number = 0;
  submitted: boolean = false;
  staffIndex: number;
  leaveDetailData: any[];
  detailDataModal: boolean = false;
  staffName: any;
  handleChange(e) {
    this.index = e.index;
  }

  multiLeaveDetailArray: any[] = []

  constructor(private activatedroute: ActivatedRoute, private fb: FormBuilder, private translate: TranslateService,
    public masterApiService: MasterApiService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.masterApiService.GetAllMultiLeaveMaster()
    this.initForm()
    this.masterApiService.GetAllHrLeaveType()
    this.masterApiService.getAllStaffMasterWithSubscribe()
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
      this.subtitle = data.subtitle;
    });
  }

  get f() {
    return this.MLForm.controls;
  }

  initForm() {
    this.MLForm = new FormGroup({
      lvMulId: new FormControl(0),
      entryDate: new FormControl(new Date()),
      remarks: new FormControl(''),
      HrLeaveMultiStaffDetails: new FormControl([])
    });
  }

  pushEmptyDataInDetails(isSave?: boolean) {
    this.multiLeaveDetailArray.push({
      DetLvMulId: 0,
      LvMulId: this.MLForm.controls.lvMulId.value,
      StaffId: null,
      LeaveId: null,
      DateFrom: new Date(),
      DateTo: new Date(),
      NoOfDays: 0,
      Remarks: '',
      LeaveMasterId: null
    })
  }

  onSave() {
    var DataArray = []
    this.multiLeaveDetailArray.forEach(element => {
      if (element.StaffId && element.LeaveId) {
        DataArray.push({
          DetLvMulId: element.DetLvMulId,
          LvMulId: this.MLForm.controls.lvMulId.value,
          StaffId: element.StaffId?.staffId,
          LeaveId: element.LeaveId?.leaveTypeId,
          DateFrom: element.DateFrom,
          DateTo: element.DateTo,
          NoOfDays: element.NoOfDays,
          Remarks: element.Remarks,
          LeaveMasterId: element.LeaveMasterId,
        })
      }
    });
    // this.MLForm.controls.HrLeaveMultiStaffDetails.setValue(DataArray)
    var dataObj = {
      HrLeaveMultiStaffMaster: this.MLForm.value,
      HrLeaveMultiStaffDetailsList: DataArray
    }
    this.masterApiService.InsertHrLeaveMultiStaffMasterr(dataObj).subscribe((response: any[]) => {
      debugger
      var dataObj = response[response.length - 1]
      this.MLForm.controls.lvMulId.setValue(dataObj.lvMulId)
      this.pushEmptyDataInDetails(true)
      this.submitted = true
      // this.initForm()
      // this.multiLeaveDetailArray = []
      this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Added Successflly!' });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  onSearch(value: string) {
    this.masterApiService.staffMasterArray = this.masterApiService.staffMasterArrayDuplicate.filter(o => o.staffCode.toLowerCase().includes(value.toLowerCase()) || o.fullName.toLowerCase().includes(value.toLowerCase()))
  }

  onSearchDetailLeave(value: string) {
    this.masterApiService.MultiLeaveDetailsStaffList = this.masterApiService.MultiLeaveDetailsStaffListDeplicate.filter(o => o.staffCode.toLowerCase().includes(value.toLowerCase()) || o.fullName.toLowerCase().includes(value.toLowerCase()))
  }

  setStaffName(staffObj: StaffMaster) {
    this.multiLeaveDetailArray[this.staffIndex].StaffId = staffObj.staffId;
    this.multiLeaveDetailArray[this.staffIndex].staffCode = staffObj.staffCode;
    this.multiLeaveDetailArray[this.staffIndex].fullName = staffObj.fullName;
    this.staffModal = false
  }

  keyDownStaffModal(rowIndex: number) {
    this.staffModal = true
    this.staffIndex = rowIndex
  }

  setLeaveName(leaveObj: any) {
    this.multiLeaveDetailArray[this.staffIndex].LeaveMasterId = leaveObj.leaveId;
    this.multiLeaveDetailArray[this.staffIndex].LappCode = leaveObj.lappCode;
    this.leaveModal = false
  }

  keyDownLeaveModal(rowIndex: number) {
    this.leaveModal = true
    this.staffIndex = rowIndex
  }

  calculateDiff(fromDate: any, toDate: any) {
    let currentDate = new Date(toDate);
    var dateSent = new Date(fromDate);
    return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate())) / (1000 * 60 * 60 * 24));
  }

  changeDate(rowIndex: number) {
    this.staffIndex = rowIndex;
    if (this.multiLeaveDetailArray[this.staffIndex].DateFrom && this.multiLeaveDetailArray[this.staffIndex].DateTo) {
      var fromDate = new Date(this.multiLeaveDetailArray[this.staffIndex].DateFrom)
      var toDate = new Date(this.multiLeaveDetailArray[this.staffIndex].DateTo)
      this.multiLeaveDetailArray[this.staffIndex].NoOfDays = this.calculateDiff(fromDate, toDate)
    }
  }

  onCancel() {
    this.submitted = false
    this.multiLeaveDetailArray = []
    this.MLForm.reset()
    this.pushEmptyDataInDetails(false)
  }

  getStaffObj(staffId: any) {
    return this.masterApiService.staffMasterArray.find(o => o.staffId == staffId)
  }

  getLeaveObj(leaveId: any) {
    return this.masterApiService.HrLeaveTypeAray.find(o => o.leaveTypeId == leaveId)
  }

  viewDetails(item: any) {
    this.masterApiService.GetMultiLeaveDetailsByMasterID(item.lvMulId).subscribe((res: any[]) => {
      this.multiLeaveData = false
      this.multiLeaveDetailArray = []
      this.masterApiService.HrMultiLeaveDetailsByMasterID = res as any[]
      if (res && res.length > 0) {
        res.forEach(elet => {
          this.multiLeaveDetailArray.push({
            DetLvMulId: elet.detLvMulId,
            LvMulId: elet.lvMulId,
            StaffId: this.getStaffObj(elet.staffId),
            LeaveId: this.getLeaveObj(elet.leaveId),
            DateFrom: new Date(elet.dateFrom),
            DateTo: new Date(elet.dateTo),
            NoOfDays: elet.noOfDays,
            Remarks: elet.remarks,
            LeaveMasterId: elet.leaveMasterId
          })
        })
      }
      else {
        this.pushEmptyDataInDetails()
      }
      this.MLForm.controls.lvMulId.setValue(item.lvMulId)
      this.MLForm.controls.entryDate.setValue(item.entryDate)
      this.MLForm.controls.remarks.setValue(item.remarks)

    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });

  }

  onDelete() {
    if (this.MLForm.controls.lvMulId.value > 0) {
      if (confirm("Are you sure. You want to delete this record?")) {
        this.masterApiService.DeleteHrLeaveMultiStaffMasterr(this.MLForm.controls.lvMulId.value).subscribe(res => {
          this.masterApiService.MultiLeaveDetailsStaffList = res as any[]
          this.onCancel()
        })
      }
    }
  }

}



import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng';
import { MasterApiService } from 'src/app/routes/service/master.api.services';
import { TransactionService } from 'src/app/routes/service/transaction-service.service';

@Component({
  selector: 'app-changedepartment',
  templateUrl: './changedepartment.component.html',
  styleUrls: ['./changedepartment.component.scss'],
  providers: [DatePipe]
})
export class ChangedepartmentComponent implements OnInit {
  index: any;
  title: any;
  listModal: boolean = false
  detaillistModal: boolean = false
  subtitle: any;
  detailArray: any[];
  handleChange(e) {
    this.index = e.index;
  }
  showDetail: boolean = false
  ChangeDepartmentForm: FormGroup
  constructor(private activatedroute: ActivatedRoute, public transactionApi: TransactionService, private datePipe: DatePipe,
    public masterApi: MasterApiService, public messageService: MessageService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm()
    this.masterApi.getAllDepartmentWithSub()
    this.masterApi.GetDepartmentWiseStaff()
    this.transactionApi.GetAllHrChangeDepartment()
    this.transactionApi.GetAllHrChangeDepartmentDet()
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
      this.subtitle = data.subtitle
    });
  }

  initForm() {
    this.ChangeDepartmentForm = this.fb.group({
      HrChangeDepartmentId: new FormControl(0),
      Date: new FormControl(new Date()),
      Remarks: new FormControl(null)
    })
  }

  onSearch(value: string) {
    this.masterApi.DepartmentWiseStaffArray = this.masterApi.DepartmentWiseStaffArrayDuplicate.filter(o => o.staffCode.toLowerCase().includes(value.toLowerCase()) || (o.fullName && o.fullName.toLowerCase().includes(value.toLowerCase())))
  }

  onCacnel() {
    this.showDetail = false
    this.initForm()
  }

  onSaveMaster() {
    this.transactionApi.InsertHrChangeDepartment(this.ChangeDepartmentForm.value).subscribe(res => {
      this.transactionApi.ChangeDepartmentArray = res as any[]
      this.ChangeDepartmentForm.controls.HrChangeDepartmentId.setValue(this.transactionApi.ChangeDepartmentArray[this.transactionApi.ChangeDepartmentArray.length - 1].hrChangeDepartmentId)
      this.showDetail = true
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    })
  }

  onSaveDetail(item: any) {
    if (!item.newDepartment) {
      // alert("Select new department")
      return
    }
    var dataObj = {
      StaffCode: item.staffCode,
      StaffName: item.fullName,
      CurrDept: item.departmentId,
      NewDept: item.newDepartment.departmentId,
      Remarks: item.remarks,
      DepId: this.ChangeDepartmentForm.controls.HrChangeDepartmentId.value
    }
    this.transactionApi.InsertHrChangeDepartmentDet(dataObj).subscribe(res => {
      this.transactionApi.ChangeDepartmentDetArray = res as any[]
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    })
  }

  viewDetails(hrChangeDepartmentId) {
    this.detailArray = this.transactionApi.ChangeDepartmentDetArray.filter(o => o.depId == hrChangeDepartmentId)
    this.detaillistModal = true
  }

  getDepartmentName(departmentId) {
    return this.masterApi.DepartmentArray.find(o => o.departmentId == departmentId)?.department
  }
}

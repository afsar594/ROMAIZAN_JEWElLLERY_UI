import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng';
import { MasterApiService } from 'src/app/routes/service/master.api.services';
import { TransactionService } from 'src/app/routes/service/transaction-service.service';

@Component({
  selector: 'app-increment',
  templateUrl: './increment.component.html',
  styleUrls: ['./increment.component.scss']
})
export class IncrementComponent implements OnInit {
  index: any;
  title: any;
  subtitle: any;
  dataListModal: boolean = false
  first: any;
  rows: any;
  showAddModal: boolean = false;
  StaffName: string;
  submittedDetail: boolean = false;
  incrementMasterId: number;
  detailArray: any[] = [];
  showSalaryHeadsList: boolean = false;
  incrementDataObj: any;
  handleChange(e) {
    this.index = e == 0 ? 0 : e.index;
  }
  submitted: boolean = false
  IncrementForm: FormGroup
  // IncrementdetailForm: FormGroup
  constructor(private fb: FormBuilder, public masterApiService: MasterApiService, public transactionService: TransactionService,
    private messageService: MessageService, private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
      this.subtitle = data.subtitle
    });
    this.initForm()
    this.transactionService.GetAllHrIncrementMaster()
    this.masterApiService.getAllStaffMasterWithSubscribe()
    this.transactionService.GetAllHrSalaryHeads()
    this.transactionService.GetAllHrIncrementDetail()
  }

  initForm() {
    this.IncrementForm = this.fb.group({
      id: new FormControl(0),
      staffId: new FormControl(null, Validators.required),
      entryDate: new FormControl(new Date(), Validators.required),
      effectiveDate: new FormControl(new Date(), Validators.required),
      remarks: new FormControl(""),
      status: new FormControl(true),
    })

    // this.IncrementdetailForm = this.fb.group({
    //   id: new FormControl(0),
    //   sno: new FormControl(null),
    //   salheadcode: new FormControl(null, Validators.required),
    //   currSalary: new FormControl(null),
    //   incramount: new FormControl(null, Validators.required),
    //   newsalamount: new FormControl(null),
    //   remarks: new FormControl(null),
    //   incrementId: new FormControl(0),
    // })
  }

  get f() {
    return this.IncrementForm.controls
  }

  // get detailForm() {
  //   return this.IncrementdetailForm.controls
  // }


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
    return this.transactionService.IncremtnArray ? this.first === this.transactionService.IncremtnArray.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.transactionService.IncremtnArray ? this.first === 0 : true;
  }

  getDataObj() {
    var dataArray = []
    this.transactionService.SalaryHeadsArray.forEach(elemt => {
      if (elemt.incAmount > 0) {
        dataArray.push({
          // Id: 0,
          Sno: 0,
          Salheadcode: elemt.shid,
          CurrSalary: elemt.currSalary,
          Incramount: elemt.incAmount,
          Newsalamount: elemt.currSalary + elemt.incAmount,
          Remarks: elemt.remarks,
          IncrementId: 0,
        })
      }
    })
    var dataObj = {
      id: 0,
      entryDate: this.IncrementForm.controls.entryDate.value,
      staffId: this.IncrementForm.controls.staffId.value?.staffId,
      effectiveDate: this.IncrementForm.controls.effectiveDate.value,
      remarks: this.IncrementForm.controls.remarks.value,
      status: this.IncrementForm.controls.status.value,
      HrIncrementDetailList: dataArray
    }
    return dataObj
  }

  onSave() {
    this.submitted = true
    if (this.IncrementForm.invalid) {
      return
    }
    if (this.transactionService.SalaryHeadsArray.filter(o => o.incAmount > 0)?.length == 0) {
      this.messageService.add({ severity: 'error', summary: 'error', detail: "Please enter increment amount" });
      return
    }

    this.transactionService.InsertHrIncrementMaster(this.getDataObj()).subscribe((response: any[]) => {
      this.initForm()
      this.transactionService.SalaryHeadsArray.map(elemt => {
        elemt.remarks = ""
        elemt.incAmount = 0
        elemt.currSalary = 0
        elemt.newSalary = 0
      })
      this.showSalaryHeadsList = false
      this.submitted = false
      this.transactionService.GetAllHrIncrementMaster()
      // alert("Record Added Successflly!")
      this.transactionService.IncremtnArray = response
      this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Added Successflly!' });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    })
  }

  onDelete() {
    if (confirm("Are you sure. You want to delete this record ?")) {
      this.transactionService.DeleteHrIncrementMaster(this.incrementDataObj).subscribe((response: any[]) => {
        this.transactionService.IncremtnDetailArray = response
        this.showAddModal = false
        this.transactionService.GetAllHrIncrementMaster()
        this.showSalaryHeadsList = false
        // alert("Record Deleted Successflly!")
        this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Deleted Successflly!' });
      }, error => {
        this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
      });
    }
  }

  onCancel() {
    this.initForm()
    this.submitted = false
    this.transactionService.SalaryHeadsArray.map(elemt => {
      elemt.remarks = ""
      elemt.incAmount = 0
      elemt.currSalary = 0
      elemt.newsalamount = 0
    })
    this.showSalaryHeadsList = false
  }

  getDetailId(item: any) {
    var dataObj = this.incrementDataObj.hrIncrementDetailList.find(o => o.salheadcode == item.shid)
    return dataObj ? dataObj.id : null;
  }

  onEdit() {
    this.submittedDetail = true
    if (this.IncrementForm.invalid) {
      return
    }
    if (this.transactionService.SalaryHeadsArray.filter(o => o.incAmount > 0)?.length == 0) {
      this.messageService.add({ severity: 'error', summary: 'error', detail: "Please enter increment amount" });
      return
    }
    var dataArray = []
    this.transactionService.SalaryHeadsArray.forEach(elemt => {
      if (elemt.incAmount > 0) {
        dataArray.push({
          Id: this.getDetailId(elemt),
          Sno: 0,
          Salheadcode: elemt.shid,
          CurrSalary: elemt.currSalary,
          Incramount: elemt.incAmount,
          Newsalamount: elemt.currSalary + elemt.incAmount,
          Remarks: elemt.remarks,
          IncrementId: this.IncrementForm.controls.id.value,
        })
      }
    })
    var dataObj = {
      id: this.IncrementForm.controls.id.value,
      entryDate: this.IncrementForm.controls.entryDate.value,
      staffId: this.IncrementForm.controls.staffId.value?.staffId,
      effectiveDate: this.IncrementForm.controls.effectiveDate.value,
      remarks: this.IncrementForm.controls.remarks.value,
      status: this.IncrementForm.controls.status.value,
      HrIncrementDetailList: dataArray
    }
    this.transactionService.UpdateHrIncrementMaster(dataObj).subscribe((response: any[]) => {
      this.initForm()
      this.transactionService.GetAllHrIncrementMaster()
      this.transactionService.IncremtnDetailArray = response
      this.submittedDetail = false
      // alert("Record Updated Successflly!")
      this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Updated Successflly!' });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  // onClickAddDetails(item: any, incrementMasterId: number, staffId: number) {
  //   this.transactionService.getStaffSalary(staffId).subscribe(res => {
  //     this.IncrementdetailForm.controls.currSalary.setValue(res)
  //     this.detailArray = this.transactionService.IncremtnDetailArray.filter(o => o.incrementId == incrementMasterId)
  //     this.showAddModal = true
  //     this.incrementMasterId = incrementMasterId
  //     this.StaffName = item.staffCode + "-" + item.fullName
  //   })

  // }

  // ChangeincramountSalary() {
  //   this.IncrementdetailForm.controls.newsalamount.setValue(this.IncrementdetailForm.controls.currSalary.value + this.IncrementdetailForm.controls.incramount.value)
  // }

  // onSaveDetail() {
  //   this.submittedDetail = true
  //   if (this.IncrementdetailForm.invalid) {
  //     return
  //   }
  //   var dataObj = {
  //     id: this.IncrementdetailForm.controls.id.value,
  //     sno: this.IncrementdetailForm.controls.sno.value,
  //     salheadcode: this.IncrementdetailForm.controls.salheadcode.value?.shid,
  //     currSalary: +this.IncrementdetailForm.controls.currSalary.value,
  //     incramount: +this.IncrementdetailForm.controls.incramount.value,
  //     newsalamount: +this.IncrementdetailForm.controls.newsalamount.value,
  //     remarks: this.IncrementdetailForm.controls.remarks.value,
  //     incrementId: this.incrementMasterId
  //   }
  //   this.transactionService.InsertHrIncrementDetail(dataObj).subscribe((response: any[]) => {
  //     this.initForm()
  //     this.submittedDetail = false
  //     this.showAddModal = false
  //     this.transactionService.IncremtnDetailArray = response
  //     this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Added Successflly!' });
  //   }, error => {
  //     this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
  //   })
  // }

  // onClickEdit(item) {
  //   this.IncrementdetailForm.patchValue(item)
  // }

  ChangeIncrement(item: any, index: number) {
    this.transactionService.SalaryHeadsArray[index].newsalamount = item.currSalary + item.incAmount
  }

  onChangeStaff() {
    if (this.IncrementForm.controls.staffId.value?.staffId) {
      this.transactionService.GetStaffWiseIncrementDetails(this.IncrementForm.controls.staffId.value?.staffId).subscribe((res: any) => {
        console.log(res)
        this.transactionService.SalaryHeadsArray.map(elemt => {
          elemt.remarks = ""
          elemt.incAmount = 0
          elemt.currSalary = 0
          elemt.newsalamount = 0
        })
        res?.hrIncrementDetailList?.forEach(element => {
          var index = this.transactionService.SalaryHeadsArray.findIndex(o => o.shid == element.salheadcode)
          if (index >= 0) {
            this.transactionService.SalaryHeadsArray[index].currSalary = element.currSalary == 0 ? element.incramount : element.currSalary
            this.transactionService.SalaryHeadsArray[index].newsalamount = element.newsalamount
            this.transactionService.SalaryHeadsArray[index].incAmount = element.incramount
          }
        });
      }, (error: any) => {
        this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
      })
    }
    if (this.IncrementForm.controls.staffId.value?.staffId != 0) {
      this.showSalaryHeadsList = true
    }
    else {
      this.showSalaryHeadsList = false
    }
    console.log(this.showSalaryHeadsList)
  }

  onClickStaff(item: any) {
    this.showSalaryHeadsList = true
    this.dataListModal = false
    this.transactionService.GetStaffWiseIncrementDetails(item.staffId).subscribe((res: any) => {
      console.log(res)
      this.incrementDataObj = res
      this.transactionService.SalaryHeadsArray.map(elemt => {
        elemt.remarks = ""
        elemt.incAmount = 0
        elemt.currSalary = 0
        elemt.newsalamount = 0
      })
      res?.hrIncrementDetailList?.forEach(element => {
        var index = this.transactionService.SalaryHeadsArray.findIndex(o => o.shid == element.salheadcode)
        if (index >= 0) {
          this.transactionService.SalaryHeadsArray[index].currSalary = element.currSalary == 0 ? element.incramount : element.currSalary
          this.transactionService.SalaryHeadsArray[index].newsalamount = element.newsalamount
          this.transactionService.SalaryHeadsArray[index].incAmount = element.incramount
        }
      });
      var staffObj = this.masterApiService.staffMasterArrayDuplicate.find(o => o.staffId == res.staffId)
      // this.IncrementForm.patchValue(res)
      this.IncrementForm.controls.staffId.setValue(staffObj)
      this.IncrementForm.controls.remarks.setValue(res.remarks)
      this.IncrementForm.controls.effectiveDate.setValue(res.effectiveDate)
      this.IncrementForm.controls.entryDate.setValue(res.entryDate)
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    })
  }

  getCurrenctSalary() {
    var value = 0
    this.transactionService.SalaryHeadsArray.forEach(elemt => {
      value += elemt.currSalary
    })
    return value
  }

  getNewSalary() {
    var value = 0
    this.transactionService.SalaryHeadsArray.forEach(elemt => {
      value += elemt.newsalamount
    })
    return value
  }

  getIncrementAmount() {
    var value = 0
    this.transactionService.SalaryHeadsArray.forEach(elemt => {
      value += elemt.incAmount
    })
    return value
  }
}


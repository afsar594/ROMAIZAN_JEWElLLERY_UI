import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from 'src/app/routes/service/transaction-service.service';

@Component({
  selector: 'app-shiftmaster',
  templateUrl: './shiftmaster.component.html',
  styleUrls: ['./shiftmaster.component.scss']
})
export class ShiftmasterComponent implements OnInit {
  shiftmasterForm: FormGroup
  title: any;
  subtitle: any;
  submitted: boolean = false
  isEdit: boolean;
  shifeDetailArray: any[] = [];
  addDetail: boolean = false;
  viewDetail: boolean = false;
  shiftId: any;
  viewDetailArray: any[];
  constructor(private fb: FormBuilder, public transactionService: TransactionService, private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
      this.subtitle = data.subtitle;
    });
    this.initForm()
    this.transactionService.GetAllHrDailyShift()
    this.transactionService.GetAllHrCompanyCalendarWeekEnd()
    this.transactionService.GetAllHrDailyShiftDayoffDetails()
  }

  initForm() {
    this.shiftmasterForm = this.fb.group({
      shiftId: [0],
      shiftName: [null, Validators.required],
      shiftCode: [null, Validators.required],
      shiftType: ["Break Shift", Validators.required],
      inTime: [null],
      outTime: [null],
      breakInTime: [null],
      breakOutTime: [null],
      isNextDay: [false],
      isPrevDay: [false],
      normWorkHr: [null],
      timeVariation: [null],
    })
  }

  onPatchValue(item) {
    this.isEdit = true
    this.shiftmasterForm.patchValue(item)
  }

  get f() {
    return this.shiftmasterForm.controls;
  }

  getObject() {
    var Indate = new Date(), outDate = new Date(), breakInTime = new Date(), breakOutTime = new Date(), normWorkHr = new Date(), timeVariation = new Date()
    Indate.setHours(this.shiftmasterForm.controls.inTime.value?.split(":")[0])
    Indate.setMinutes(this.shiftmasterForm.controls.inTime.value?.split(":")[1])

    outDate.setHours(this.shiftmasterForm.controls.outTime.value?.split(":")[0])
    outDate.setMinutes(this.shiftmasterForm.controls.outTime.value?.split(":")[1])

    breakInTime.setHours(this.shiftmasterForm.controls.breakInTime.value?.split(":")[0])
    breakInTime.setMinutes(this.shiftmasterForm.controls.breakInTime.value?.split(":")[1])

    breakOutTime.setHours(this.shiftmasterForm.controls.breakOutTime.value?.split(":")[0])
    breakOutTime.setMinutes(this.shiftmasterForm.controls.breakOutTime.value?.split(":")[1])

    normWorkHr.setHours(this.shiftmasterForm.controls.normWorkHr.value?.split(":")[0])
    normWorkHr.setMinutes(this.shiftmasterForm.controls.normWorkHr.value?.split(":")[1])

    timeVariation.setHours(this.shiftmasterForm.controls.timeVariation.value?.split(":")[0])
    timeVariation.setMinutes(this.shiftmasterForm.controls.timeVariation.value?.split(":")[1])
    var dataObj = {
      shiftId: this.shiftmasterForm.controls.shiftId.value,
      shiftName: this.shiftmasterForm.controls.shiftName.value,
      shiftCode: this.shiftmasterForm.controls.shiftCode.value,
      shiftType: this.shiftmasterForm.controls.shiftType.value,
      inTime: Indate,
      outTime: outDate,
      breakInTime: breakInTime,
      breakOutTime: breakOutTime,
      isNextDay: this.shiftmasterForm.controls.isNextDay.value,
      isPrevDay: this.shiftmasterForm.controls.isPrevDay.value,
      normWorkHr: normWorkHr,
      timeVariation: timeVariation,
    }
    return dataObj;
  }

  onSave() {
    this.submitted = true
    if (this.shiftmasterForm.invalid) {
      return
    }
    this.transactionService.InsertHrDailyShift(this.getObject()).subscribe(res => {
    
      this.transactionService.HrDailyShiftArray = res as any[]
      this.submitted = false
      this.initForm()
    })
  }

  onEdit() {
    this.submitted = true
    if (this.shiftmasterForm.invalid) {
      return
    }
    this.transactionService.UpdateHrDailyShift(this.getObject()).subscribe(res => {
    
      this.transactionService.HrDailyShiftArray = res as any[]
      this.submitted = false
      this.initForm()
    })
  }

  onCancel() {
    this.submitted = false
    this.isEdit = false
    this.viewDetailArray = []
    this.initForm()
  }

  onDelete(rowData: any) {
    if (confirm("Are you sure. You want to delete this record ?")) {
      this.transactionService.DeleteHrDailyShift(rowData).subscribe((response: any[]) => {
        this.initForm()
        this.transactionService.HrDailyShiftArray = response
        this.submitted = false
      }, error => {
      });
    }
  }

  onDeleteDetail(rowData: any) {
    if (confirm("Are you sure. You want to delete this record ?")) {
      this.transactionService.DeleteHrDailyShiftDayoffDetails(rowData).subscribe((response: any[]) => {
        this.transactionService.HrDailyShiftDayoffDetailsArray = response
        this.viewDetail = false
      }, error => {
      });
    }
  }

  onSaveDetails() {
    if (this.shifeDetailArray.length == 0) {
      // alert("Selecy day first")
      return
    }
    this.transactionService.InsertHrDailyShiftDayoffDetails(this.shifeDetailArray).subscribe(res => {
    
      this.transactionService.HrDailyShiftDayoffDetailsArray = res as any[]
      this.submitted = false
      this.addDetail = false
      this.initForm()
    })
  }

  AddDetails(shiftID) {
    this.addDetail = true
    this.shiftId = shiftID
  }

  getDayName(dayId: number) {
    return this.transactionService.CompanyCalendarWeekendArray.find(o => o.dayId == dayId)?.dayNames
  }

  viewDetails(shiftID: number) {
    debugger
    this.viewDetailArray = this.transactionService.HrDailyShiftDayoffDetailsArray.filter(o => o.shiftId == shiftID)
    this.viewDetail = true
  }


  setDetailData(item: any) {
    debugger
    var index = this.shifeDetailArray.findIndex(o => o.dayID == item.dayId)
    if (index >= 0) {
      this.shifeDetailArray.splice(index, 1)
    }
    else {
      this.shifeDetailArray.push({
        dayID: item.dayId,
        shiftID: this.shiftId,
        dayOff: false
      })
    }
  }
}

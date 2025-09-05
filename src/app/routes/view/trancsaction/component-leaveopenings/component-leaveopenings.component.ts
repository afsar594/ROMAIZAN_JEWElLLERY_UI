import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HotTableRegisterer } from '@handsontable/angular';
import { TranslateService } from '@ngx-translate/core';
import Handsontable from 'handsontable';
import { MasterApiService } from 'src/app/routes/service/master.api.services';
import { TransactionService } from 'src/app/routes/service/transaction-service.service';

@Component({
  selector: 'app-component-leaveopenings',
  templateUrl: './component-leaveopenings.component.html',
  styleUrls: ['./component-leaveopenings.component.scss']
})
export class ComponentLeaveopeningsComponent implements OnInit {
  title: string;
  subtitle: string;
  index: number = 0;
  submitted: boolean = false;
  handleChange(e) {
    this.index = e.index;
  }
  leaveID: any
  constructor(private activatedroute: ActivatedRoute, public masterApi: MasterApiService,
    public _TransactionService: TransactionService) { }

  ngOnInit(): void {
    this.masterApi.GetAllHrLeaveType()
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
      this.subtitle = data.subtitle;
    }
    );
  }

  onChangeLeave() {
    this._TransactionService.GetALOpeningStaff(this.leaveID?.leaveTypeId)
  }

  onSave() {
    if (this.leaveID == null || this.leaveID == undefined) {
      this.submitted = true
      return
    }
    else {
      var dataArray: any[] = []
      this._TransactionService.HrALOpeningStaffArray.forEach(elemt => {
        dataArray.push({
          staffid: elemt.staffID,
          al: elemt.al,
          remarks: elemt.remarks,
          leaveId: elemt.leaveID,
          uptodate: elemt.uptodate,
        })
      })
      this.submitted = false
      this._TransactionService.InsertHrAlOpenings(dataArray, this.leaveID?.leaveTypeId)
    }
  }
}



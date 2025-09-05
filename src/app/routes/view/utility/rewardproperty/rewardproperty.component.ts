import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HotTableRegisterer } from '@handsontable/angular';
import { TranslateService } from '@ngx-translate/core';
import Handsontable from 'handsontable';
import { MessageService } from 'primeng/api';
import { MasterApiService } from 'src/app/routes/service/master.api.services';

@Component({
  selector: 'app-rewardproperty',
  templateUrl: './rewardproperty.component.html',
  styleUrls: ['./rewardproperty.component.scss']
})
export class RewardpropertyComponent implements OnInit {
  title: string;
  subtitle: any;
  RPForm: FormGroup;
  gridHeader: string;
  index: number = 0;
  isEditBtndisable: boolean;
  submitted: boolean;
  first: any;
  rows: any;
  handleChange(e) {
    this.index = e.index;
  }
  typeArray: any = [{ name: 'Cash' }, { name: 'Cheque' }]
  constructor(
    private activatedroute: ActivatedRoute, public masterApiService: MasterApiService,
    private fb: FormBuilder, private messageService: MessageService, private translate: TranslateService) { }
  ngOnInit(): void {
    this.masterApiService.getAllStaffMasterWithSubscribe()
    this.masterApiService.GetAllHR_Reward()
    this.initForm()
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
      this.subtitle = data.title;
    });
  }

  initForm() {
    this.RPForm = new FormGroup({
      id: new FormControl(0),
      date: new FormControl(new Date(), Validators.required),
      nature: new FormControl('', Validators.required),
      achievement: new FormControl('', Validators.required),
      remarks: new FormControl(''),
      staffCode: new FormControl('', Validators.required),
      rwdtype: new FormControl('', Validators.required),
    });
  }

  get f() {
    return this.RPForm.controls;
  }

  onCancel() {
    this.isEditBtndisable = true
    this.initForm()
  }

  onDelete(rowData: any) {
    if (confirm("Are you sure. You want to delete this record ?")) {
      this.masterApiService.DeleteHR_Reward(rowData).subscribe((response: any[]) => {
        this.initForm()
        this.masterApiService.RewardArray = response
        this.submitted = false
        this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Deleted Successflly!' });
      }, error => {
        this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
      });
    }
  }

  onClickEdit(rowData: any) {
    try {
      this.isEditBtndisable = false
      this.RPForm.controls.id.setValue(rowData.id)
      this.RPForm.controls.date.setValue(new Date(rowData.date))
      this.RPForm.controls.nature.setValue(rowData.nature)
      this.RPForm.controls.achievement.setValue(rowData.achievement)
      this.RPForm.controls.remarks.setValue(rowData.remarks)
      this.RPForm.controls.staffCode.setValue(rowData.staffCode)
      this.RPForm.controls.rwdtype.setValue(rowData.rwdtype)
    } catch (error) {
      console.log(error)
    }
  }

  onEdit() {
    this.submitted = true
    if (this.RPForm.invalid) {
      return
    }
    this.RPForm.controls.staffCode.setValue(this.RPForm.controls.staffCode.value?.staffCode)
    this.RPForm.controls.rwdtype.setValue(this.RPForm.controls.rwdtype.value?.name)
    this.masterApiService.UpdateHR_Reward(this.RPForm.value).subscribe((response: any[]) => {
      this.initForm()
      this.masterApiService.RewardArray = response
      this.submitted = false
      this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Updated Successflly!' });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  onSave() {
    this.submitted = true
    if (this.RPForm.invalid) {
      return
    }
    this.RPForm.controls.staffCode.setValue(this.RPForm.controls.staffCode.value?.staffCode)
    this.RPForm.controls.rwdtype.setValue(this.RPForm.controls.rwdtype.value?.name)
    this.masterApiService.InsertHR_Reward(this.RPForm.value).subscribe((response: any[]) => {
      this.initForm()
      this.masterApiService.RewardArray = response
      this.submitted = false
      this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Added Successflly!' });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
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
    return this.masterApiService.HrFamilyDetailsproperty ? this.first === this.masterApiService.HrFamilyDetailsproperty.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.masterApiService.HrFamilyDetailsproperty ? this.first === 0 : true;
  }
}




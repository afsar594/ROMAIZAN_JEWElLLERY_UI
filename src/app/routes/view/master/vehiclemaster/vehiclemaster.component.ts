import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MasterApiService } from 'src/app/routes/service/master.api.services';

@Component({
  selector: 'app-vehiclemaster',
  templateUrl: './vehiclemaster.component.html',
  styleUrls: ['./vehiclemaster.component.scss']
})
export class VehiclemasterComponent implements OnInit {


  title: string;
  vehiclemasterForm: FormGroup;
  subtitle: string;
  first: any;
  rows: any;
  isEditBtndisable: boolean;
  submitted: boolean;
  constructor(public masterApiService: MasterApiService, private messageService: MessageService,
    private activatedroute: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.masterApiService.getAllCompanyWithSubs()
    this.masterApiService.getAllStaffMasterWithSubscribe()
    this.masterApiService.GetAllHrLocationMasterWithSubs()
    this.masterApiService.GetAllHrVehicleMaster()
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
      this.subtitle = data.title;
    });
    this.initForm()
  }

  initForm() {
    this.vehiclemasterForm = this.fb.group({
      id: new FormControl(0),
      vehicleTye: new FormControl('', Validators.required),
      vehicleNo: new FormControl('', Validators.required),
      engineNo: new FormControl('', Validators.required),
      chasisNo: new FormControl('', Validators.required),
      staffId: new FormControl(null),
      locationId: new FormControl(null),
      companyId: new FormControl(null),
      sold: new FormControl(false),
    });
  }

  get f() {
    return this.vehiclemasterForm.controls;
  }


  onCancel() {
    this.isEditBtndisable = true
    this.initForm()
  }

  onDelete(rowData: any) {
    if (confirm("Are you sure. You want to delete this record ?")) {
      this.masterApiService.DeleteHrVehicleMaster(rowData).subscribe((response: any[]) => {
        this.initForm()
        this.masterApiService.AllHrVehicleMasterArray = response
        this.submitted = false
        this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Deleted Successflly!' });
      }, error => {
        this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
      });
    }
  }

  onClickEdit(rowData: any) {
    try {
      debugger
      this.isEditBtndisable = false
      this.vehiclemasterForm.patchValue(rowData)
    } catch (error) {
      console.log(error)
    }
  }

  onEdit() {
    this.submitted = true
    if (this.vehiclemasterForm.invalid) {
      return
    }
    this.masterApiService.UpdateHrVehicleMaster(this.setData()).subscribe((response: any[]) => {
      this.initForm()
      this.masterApiService.AllHrVehicleMasterArray = response
      this.submitted = false
      this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Updated Successflly!' });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  setData() {
    var dataObj = {
      id: this.vehiclemasterForm.controls.id.value,
      vehicleTye: this.vehiclemasterForm.controls.vehicleTye.value,
      vehicleNo: this.vehiclemasterForm.controls.vehicleNo.value,
      engineNo: this.vehiclemasterForm.controls.engineNo.value,
      chasisNo: this.vehiclemasterForm.controls.chasisNo.value,
      staffId: this.vehiclemasterForm.controls.staffId.value?.staffId,
      locationId: this.vehiclemasterForm.controls.locationId.value?.locationId,
      companyId: this.vehiclemasterForm.controls.companyId.value?.companyId,
      sold: this.vehiclemasterForm.controls.sold.value,
    }
    return dataObj;
  }

  onSave() {
    this.submitted = true
    if (this.vehiclemasterForm.invalid) {
      return
    }
    this.masterApiService.InsertHrVehicleMaster(this.setData()).subscribe((response: any[]) => {
      this.initForm()
      this.masterApiService.AllHrVehicleMasterArray = response
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




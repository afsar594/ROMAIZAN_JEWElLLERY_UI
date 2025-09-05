import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng';
import { AddressTypeMaster } from 'src/app/routes/domain/AddressType';
import { StaffMaster } from 'src/app/routes/domain/StaffMaster';
import { MasterApiService } from 'src/app/routes/service/master.api.services';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  index: any;
  title: any;
  subtitle: any;
  first: any;
  rows: any;
  handleChange(e) {
    this.index = e == 0 ? 0 : e.index;
  }
  isEditBtndisable: boolean = false
  submitted: boolean = false
  AddressForm: FormGroup
  constructor(private fb: FormBuilder, public masterApiService: MasterApiService, private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.masterApiService.GetAllHrAddress()
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
      this.subtitle = data.subtitle
    });
    this.initForm()
    this.masterApiService.getAllStaffMasterWithSubscribe()
    this.masterApiService.getAllAddressTypesWithSubs()
  }

  initForm() {
    this.AddressForm = this.fb.group({
      addressId: new FormControl(0),
      staffId: new FormControl(null, Validators.required),
      addressTypeId: new FormControl(null, Validators.required),
      contactPerson: new FormControl(null, Validators.required),
      houseName: new FormControl(null, Validators.required),
      street: new FormControl(null, Validators.required),
      pobox: new FormControl(null),
      phone: new FormControl(null),
      fax: new FormControl(null),
      mobile: new FormControl(null),
      email: new FormControl(null),
    })
  }

  get f() {
    return this.AddressForm.controls
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
    return this.masterApiService.hrAddressArray ? this.first === this.masterApiService.hrAddressArray.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.masterApiService.hrAddressArray ? this.first === 0 : true;
  }

  getDataObj() {
    var dataObj = {
      addressId: this.AddressForm.controls.addressId.value,
      staffId: this.AddressForm.controls.staffId.value?.staffId,
      addressTypeId: this.AddressForm.controls.addressTypeId.value?.addressTypeId,
      contactPerson: this.AddressForm.controls.contactPerson.value,
      houseName: this.AddressForm.controls.houseName.value,
      street: this.AddressForm.controls.street.value,
      pobox: this.AddressForm.controls.pobox.value,
      phone: this.AddressForm.controls.phone.value,
      fax: this.AddressForm.controls.fax.value,
      mobile: this.AddressForm.controls.mobile.value,
      email: this.AddressForm.controls.email.value,
    }
    return dataObj
  }

  onSave() {
    this.submitted = true
    if (this.AddressForm.invalid) {
      return
    }
    this.masterApiService.InsertHrAddress(this.getDataObj()).subscribe((response: any[]) => {
      this.initForm()
      this.isEditBtndisable = false
      this.submitted = false
      this.masterApiService.hrAddressArray = response
    }, error => {
    })
  }

  onDelete(rowData: any) {
    if (confirm("Are you sure. You want to delete this record ?")) {
      this.masterApiService.DeleteHrAddress(rowData).subscribe((response: any[]) => {
        this.masterApiService.hrAddressArray = response
      }, error => {
      });
    }
  }

  onCancel() {
    this.initForm()
    this.submitted = false
  }

  onEdit() {
    this.submitted = true
    if (this.AddressForm.invalid) {
      return
    }
    this.masterApiService.UpdateHrAddress(this.getDataObj()).subscribe((response: any[]) => {
      this.initForm()
      this.submitted = false
      this.isEditBtndisable = false
      this.masterApiService.hrAddressArray = response
    }, error => {
    })
  }

  onClickEdit(item) {
    this.isEditBtndisable = true
    this.AddressForm.patchValue(item)
    this.AddressForm.controls.addressTypeId.setValue(this.getAddressTypeObj(item.addressTypeId))
    this.AddressForm.controls.staffId.setValue(this.getStaffObj(item.staffId))
  }

  getStaffObj(staffId): StaffMaster {
    return this.masterApiService.staffMasterArrayDuplicate.find(o => o.staffId == staffId)
  }

  getAddressTypeObj(addressTypeId): AddressTypeMaster {
    return this.masterApiService.AddressTypeArray.find(o => o.addressTypeId == addressTypeId)
  }
}


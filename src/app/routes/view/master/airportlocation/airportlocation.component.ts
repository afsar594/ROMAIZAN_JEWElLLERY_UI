import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MasterApiService } from 'src/app/routes/service/master.api.services';

@Component({
  selector: 'app-airportlocation',
  templateUrl: './airportlocation.component.html',
  styleUrls: ['./airportlocation.component.scss']
})
export class AirportlocationComponent implements OnInit {
  title: string;
  AirportLocationForm: FormGroup;
  subtitle: string;
  index: any;
  isEditBtndisable: boolean;
  submitted: boolean;
  first: any;
  rows: any;
  handleChange(e) {
    this.index = e.index;
  }
  constructor(
    private activatedroute: ActivatedRoute,
    private fb: FormBuilder,
    public masterApiService: MasterApiService, private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.masterApiService.GetAllHrAirportLocation()
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
      this.subtitle = data.title;
    });
    this.initForm()
  }

  initForm() {
    this.AirportLocationForm = this.fb.group({
      airportLocId: new FormControl(0),
      airportLocName: new FormControl('', Validators.required),
    });
  }

  get f() {
    return this.AirportLocationForm.controls;
  }


  onCancel() {
    this.isEditBtndisable = true
    this.initForm()
  }

  onDelete(rowData: any) {
    if (confirm("Are you sure. You want to delete this record ?")) {
      this.masterApiService.DeleteHrAirportLocation(rowData).subscribe((response: any[]) => {
        this.initForm()
        this.masterApiService.AirportLocationAray = response
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
      this.AirportLocationForm.patchValue(rowData)
    } catch (error) {
      console.log(error)
    }
  }

  onEdit() {
    this.submitted = true
    if (this.AirportLocationForm.invalid) {
      return
    }
    this.masterApiService.UpdateHrAirportLocation(this.AirportLocationForm.value).subscribe((response: any[]) => {
      this.initForm()
      this.masterApiService.AirportLocationAray = response
      this.submitted = false
      this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Updated Successflly!' });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  onSave() {
    this.submitted = true
    if (this.AirportLocationForm.invalid) {
      return
    }
    this.masterApiService.InsertHrAirportLocation(this.AirportLocationForm.value).subscribe((response: any[]) => {
      this.initForm()
      this.masterApiService.AirportLocationAray = response
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
    return this.masterApiService.AirportLocationAray ? this.first === this.masterApiService.AirportLocationAray.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.masterApiService.AirportLocationAray ? this.first === 0 : true;
  }
}





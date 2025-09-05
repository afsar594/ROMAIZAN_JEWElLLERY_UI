import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MasterApiService } from 'src/app/routes/service/master.api.services';

@Component({
  selector: 'app-cadermaster',
  templateUrl: './cadermaster.component.html',
  styleUrls: ['./cadermaster.component.scss']
})
export class CadermasterComponent implements OnInit {
  submitted: boolean = false
  title: string;
  CadremasterForm: FormGroup;
  subtitle: string;
  displayMaximizeable: boolean = false;
  cols: Array<any> = [];
  // designationList: Array<DesignationMaster> = [];
  constructor(public masterApi: MasterApiService,
    private activatedroute: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.masterApi.GetAllCaderMasterWithSubs()
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
      this.subtitle = data.title;
    });
    this.initForm()
  }

  initForm() {
    this.CadremasterForm = this.fb.group({
      cadreId: new FormControl(0),
      cadreName: new FormControl('', Validators.required),
    });
  }

  onSave() {
    this.submitted = true
    if (this.CadremasterForm.invalid) {
      return
    }
    this.masterApi.InsertCaderMaster(this.CadremasterForm.value).subscribe(res => {
      this.submitted = false
      this.initForm()
      this.masterApi.CadreMasterArray = res as any[]
    })
  }

  onUpdate() {
    this.submitted = true
    if (this.CadremasterForm.invalid) {
      return
    }
    this.masterApi.UpdateCaderMaster(this.CadremasterForm.value).subscribe(res => {
      this.submitted = false
      this.initForm()
      this.masterApi.CadreMasterArray = res as any[]
    })
  }

  onDelete(item: any) {
    this.masterApi.DeleteCaderMaster(item).subscribe(res => {
      this.displayMaximizeable = false
      this.masterApi.CadreMasterArray = res as any[]
    })
  }

  public get f() {
    return this.CadremasterForm.controls;
  }

  selectForEdit(item) {
    this.displayMaximizeable = false
    this.CadremasterForm.patchValue(item)
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MasterApiService } from 'src/app/routes/service/master.api.services';

@Component({
  selector: 'app-sitemaster',
  templateUrl: './sitemaster.component.html',
  styleUrls: ['./sitemaster.component.scss']
})
export class SitemasterComponent implements OnInit {
  SMForm: FormGroup
  isEditBtndisable: boolean = true;
  submitted: boolean = false;
  first: any;
  rows: any;
  index: any;
  title: any;
  subtitle: any;
  handleChange(e) {
    this.index = e.index;
  }
  constructor(private fb: FormBuilder, public masterApiService: MasterApiService, private messageService: MessageService,
    private activatedroute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
      this.subtitle = data.subtitle;
    });
    this.initForm()
    this.masterApiService.GetAllHrSites()
  }

  initForm() {
    this.SMForm = this.fb.group({
      siteId: new FormControl(0),
      siteName: new FormControl('', Validators.required),
      shortName: new FormControl(''),
      erpSiteId: new FormControl(null),
      stDate: new FormControl(new Date(new Date().setFullYear(new Date().getFullYear()))),
      endDate: new FormControl(new Date(new Date().setFullYear(new Date().getFullYear()))),
    })
  }

  get f() {
    return this.SMForm.controls;
  }

  onCancel() {
    this.isEditBtndisable = true
    this.initForm()
  }

  onDelete(rowData: any) {
    if (confirm("Are you sure. You want to delete this record ?")) {
      this.masterApiService.deleteSiteMaster(rowData).subscribe((response: any[]) => {
        this.initForm()
        this.masterApiService.siteMasterArrayDuplicate = response
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
      this.SMForm.controls.siteId.setValue(rowData.siteId)
      this.SMForm.controls.siteName.setValue(rowData.siteName)
      this.SMForm.controls.shortName.setValue(rowData.shortName)
      this.SMForm.controls.erpSiteId.setValue(rowData.erpSiteId)
      this.SMForm.controls.stDate.setValue(new Date(rowData.stDate))
      this.SMForm.controls.endDate.setValue(new Date(rowData.endDate))
    } catch (error) {
      console.log(error)
    }
  }

  onEdit() {
    this.submitted = true
    if (this.SMForm.invalid) {
      return
    }
    this.masterApiService.updateSiteMaster(this.SMForm.value).subscribe((response: any[]) => {
      this.initForm()
      this.masterApiService.siteMasterArrayDuplicate = response
      this.submitted = false
      this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Updated Successflly!' });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  onSave() {
    this.submitted = true
    if (this.SMForm.invalid) {
      return
    }
    this.masterApiService.insertSiteMaster(this.SMForm.value).subscribe((response: any[]) => {
      this.initForm()
      this.masterApiService.siteMasterArrayDuplicate = response
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



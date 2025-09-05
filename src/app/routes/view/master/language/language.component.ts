import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LanguageMaster } from 'src/app/routes/domain/LanguageMaster';
import { MasterApiService } from 'src/app/routes/service/master.api.services';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {
  title: string;
  languageForm: FormGroup;
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
    this.masterApiService.GetAllHrLanguagesWithSubs()
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
      this.subtitle = data.title;
    });
    this.initForm()
  }

  initForm() {
    this.languageForm = this.fb.group({
      languageId: new FormControl(0),
      language: new FormControl('', Validators.required),
    });
  }

  get f() {
    return this.languageForm.controls;
  }


  onCancel() {
    this.isEditBtndisable = true
    this.initForm()
  }

  onDelete(rowData: any) {
    if (confirm("Are you sure. You want to delete this record ?")) {
      this.masterApiService.DeleteHrLanguageMaster(rowData).subscribe((response: any[]) => {
        this.initForm()
        this.masterApiService.LanguagerArray = response
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
      this.languageForm.patchValue(rowData)
    } catch (error) {
      console.log(error)
    }
  }

  onEdit() {
    this.submitted = true
    if (this.languageForm.invalid) {
      return
    }
    this.masterApiService.UpdateHrLanguageMaster(this.languageForm.value).subscribe((response: any[]) => {
      this.initForm()
      this.masterApiService.LanguagerArray = response
      this.submitted = false
      this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Updated Successflly!' });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  onSave() {
    this.submitted = true
    if (this.languageForm.invalid) {
      return
    }
    this.masterApiService.InsertHrLanguageMaster(this.languageForm.value).subscribe((response: any[]) => {
      this.initForm()
      this.masterApiService.LanguagerArray = response
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
    return this.masterApiService.LanguagerArray ? this.first === this.masterApiService.LanguagerArray.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.masterApiService.LanguagerArray ? this.first === 0 : true;
  }
}




import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MasterApiService } from 'src/app/routes/service/master.api.services';

@Component({
  selector: 'app-agentmaster',
  templateUrl: './agentmaster.component.html',
  styleUrls: ['./agentmaster.component.scss']
})
export class AgentmasterComponent implements OnInit {
  title: string;
  subtitle: string;
  displayMaximizeable: boolean = false;
  AgentForm: FormGroup;
  index: number = 0;
  isEditBtndisable: boolean = true;
  submitted: boolean = false;
  first: any;
  rows: any;
  handleChange(e) {
    this.index = e.index;
  }
  constructor(private activatedroute: ActivatedRoute, private fb: FormBuilder, public masterApiService: MasterApiService
    , private messageService: MessageService) { }

  ngOnInit(): void {
    this.initForm()
    this.masterApiService.GetAllHrAgentMastersWithSubs()
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
      this.subtitle = data.subtitle
    });
    this.displayMaximizeable = false;

    this.AgentForm = new FormGroup({
      ID: new FormControl('', Validators.required),
      AgentName: new FormControl('', Validators.required),
    });
  }

  initForm() {
    this.AgentForm = this.fb.group({
      agentId: new FormControl(0),
      agentName: new FormControl('', Validators.required),
    });
  }

  get f() {
    return this.AgentForm.controls;
  }


  onCancel() {
    this.isEditBtndisable = true
    this.initForm()
  }

  onDelete(rowData: any) {
    if (confirm("Are you sure. You want to delete this record ?")) {
      this.masterApiService.DeleteHrAgentMaster(rowData).subscribe((response: any[]) => {
        this.initForm()
        this.masterApiService.AgentArray = response
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
      this.AgentForm.patchValue(rowData)
    } catch (error) {
      console.log(error)
    }
  }

  onEdit() {
    this.submitted = true
    if (this.AgentForm.invalid) {
      return
    }
    this.masterApiService.UpdateHrAgentMaster(this.AgentForm.value).subscribe((response: any[]) => {
      this.initForm()
      this.masterApiService.AgentArray = response
      this.submitted = false
      this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Updated Successflly!' });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  onSave() {
    this.submitted = true
    if (this.AgentForm.invalid) {
      return
    }
    this.masterApiService.InsertHrAgentMaster(this.AgentForm.value).subscribe((response: any[]) => {
      this.initForm()
      this.masterApiService.AgentArray = response
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
    return this.masterApiService.AgentArray ? this.first === this.masterApiService.AgentArray.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.masterApiService.AgentArray ? this.first === 0 : true;
  }
}





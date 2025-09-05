import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AgentMaster } from 'src/app/routes/domain/AgentMaster';
import { MasterApiService } from 'src/app/routes/service/master.api.services';

@Component({
  selector: 'app-agentmaster',
  templateUrl: './agentmaster.component.html',
  styleUrls: ['./agentmaster.component.scss']
})
export class AgentmasterComponent implements OnInit {
  submitted: boolean = false
  title: string;
  subtitle: string;
  displayMaximizeable: boolean = false;
  AgentForm: FormGroup;
  index: number = 0;
  handleChange(e) {
    this.index = e.index;
  }
  constructor(

    private activatedroute: ActivatedRoute,
    private fb: FormBuilder,
    private masterApiService: MasterApiService,
    private messageService: MessageService,


  ) { }

  ngOnInit(): void {

    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
      this.subtitle = data.subtitle
    });
    this.cols = [
      { field: 'agentId', header: 'ID' },
      { field: 'agentName', header: 'AgentName' },
      { field: '', header: 'Actions' }
    ]
    this.displayMaximizeable = false;
    this.initForm()
  }

  initForm() {
    this.AgentForm = new FormGroup({
      agentId: new FormControl(0),
      agentName: new FormControl('', Validators.required),
    });
  }

  agentMasterList: Array<AgentMaster> = [];
  cols: Array<any> = [
  ];

  getAllAgentMAster() {
    this.masterApiService.GetAllHrAgentMasters().subscribe((response: any) => {
      this.agentMasterList = response;
      this.displayMaximizeable = true;
      //console.log('Visa designation list :',this.visadesignationList)
    });
  }

  insertAgentMAster() {
    this.submitted = true
    if (this.AgentForm.invalid) {
      return
    }
    this.masterApiService.InsertHrAgentMaster(this.AgentForm.value).subscribe(response => {
      this.submitted = false
      this.initForm()
      this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'New Record Added Successflly!' });
    },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
      });
  }

  selectForEdit(item: AgentMaster) {
    this.displayMaximizeable = false;
    this.AgentForm.controls['AgentName'].setValue(item.agentName);
    this.AgentForm.controls['ID'].setValue(item.agentId);
  }

  updateAgentMAster() {
    this.submitted = true
    if (this.AgentForm.invalid) {
      return
    }
    this.masterApiService.UpdateHrAgentMaster(this.AgentForm.value).subscribe(response => {
      this.submitted = false
      this.initForm()
      this.messageService.add({ severity: 'success', summary: 'Success!', detail: 'Record Updated Successflly!' });
    },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
      });
  }

  deleteAgentMAster(agentName: AgentMaster) {
    this.masterApiService.DeleteHrAgentMaster(agentName).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Record deleted successfully!', closable: true });
    },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Delete Operation failed!', closable: true });
      })
  }
  get f() {
    return this.AgentForm.controls;
  }
}

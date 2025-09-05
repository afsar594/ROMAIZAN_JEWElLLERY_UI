import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MasterApiService } from 'src/app/routes/service/master.api.services';
import { ReportService } from 'src/app/routes/service/report.service';
import { PdfService } from 'src/app/routes/service/pdf.service';

@Component({
  selector: 'app-leavedetail',
  templateUrl: './leavedetail.component.html',
  styleUrls: ['./leavedetail.component.scss']
})
export class LeavedetailComponent implements OnInit {
  title: any;
  subtitle: any;
  reportForm: FormGroup
  CategoryArray = [{ name: 'Staff' }, { name: 'Vehicle' }]
  showStaff: boolean = true;
  staffIds: any[];
  leaveTypeIds: any[];
  isReport: boolean = true;
  reportTypeArray: any[] = [{ name: "Summary" }]
  constructor(private activatedroute: ActivatedRoute, private fb: FormBuilder, public masterApi: MasterApiService, public reportService: ReportService,
    public PdfService: PdfService) { }

  ngOnInit(): void {
    this.masterApi.getAllStaffMasterWithSubscribe()
    this.masterApi.GetAllHrLeaveType()
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
      this.subtitle = data.subtitle;
    });
    this.initForm()
  }

  initForm() {
    this.reportForm = this.fb.group({
      reportType: [{ name: "Summary" }],
      leaveType: [[]],
      staff: [[]],
    })
  }

  GenerateReport() {
    this.leaveTypeIds = []
    this.staffIds = []
    console.log(this.reportForm.value)
    if (this.reportForm.controls.staff.value?.length > 0) {
      this.reportForm.controls.staff.value.forEach(element => {
        this.staffIds.push(element.staffId)
      });
    }
    if (this.reportForm.controls.leaveType.value?.length > 0) {
      this.reportForm.controls.leaveType.value.forEach(element => {
        this.leaveTypeIds.push(element.leaveTypeId)
      });
    }
    var paramBody = {
      staffIds: this.staffIds,
      leaveTypeIds: this.leaveTypeIds,
    }
    this.reportService.GetLeaveDummaryReport(paramBody)
    // this.reportService.isStaffReportGenerate.subscribe(res => {
    //   if (res) {
    //     // this.onPrint()
    //   }
    // })
  }

  getLeaveTypeName(leavetypeId: number) {
    return this.masterApi.HrLeaveTypeAray.find(o => o.leaveTypeId == leavetypeId)?.leaveType
  }

  onPrint() {
    var css: string = `
    h1{
      margin-top: 2%;
     color: rgb(63, 77, 158); 
     text-align: center;
     margin-bottom: 2%;
     font-size: 45px;
  }
   
  h3{
      text-align: center;
      margin-top: 5%;
      font-size: 1.5rem;
  }
  .def {
      font-family: Arial, Helvetica, sans-serif;
      border-collapse: collapse;
      width: 80.5%;
      margin-left: 10%;
    }
    
    .def td, .def th {
      border: 1px solid #a1a3a5;
      padding: 8px;
    }
    
    .def tr:nth-child(even){background-color: #f2f2f2;}
    
    .def tr:hover {background-color: #e4dada;}
    
    .def th {
      padding-top: 12px;
      padding-bottom: 12px;
      text-align: left;
      background-color: rgb(200, 208, 211);
      color: black;
    
    }
    .staff{
      background-color: rgb(35, 189, 189);
      text-align: center;
      color: white;
      font-size: 16px;
      font-weight: bold;
    }
    .name{
      color: rgb(23, 141, 82);
   font-weight: bold;
    }
    `
    this.PdfService.PrintPDF("print", css)
  }
}

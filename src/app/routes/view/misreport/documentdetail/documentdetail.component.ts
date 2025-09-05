import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MasterApiService } from 'src/app/routes/service/master.api.services';
import { ReportService } from 'src/app/routes/service/report.service';
import { PdfService } from 'src/app/routes/service/pdf.service';

@Component({
  selector: 'app-documentdetail',
  templateUrl: './documentdetail.component.html',
  styleUrls: ['./documentdetail.component.scss']
})
export class DocumentdetailComponent implements OnInit {
  title: any;
  subtitle: any;
  reportForm: FormGroup
  CategoryArray = [{ name: 'Staff' }, { name: 'Vehicle' }]
  showStaff: boolean = true;
  documentIds: any[];
  staffIds: any[];
  vehicleIds: any[];
  isReport: boolean = true;
  constructor(private activatedroute: ActivatedRoute, private fb: FormBuilder, public masterApi: MasterApiService, public reportService: ReportService,
    public PdfService: PdfService) { }

  ngOnInit(): void {
    this.masterApi.GetAllHrDocumentStatus()
    this.masterApi.getAllStaffMasterWithSubscribe()
    this.masterApi.GetAllHrVehicleMaster()
    this.masterApi.GetAllDocumentTypes()
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
      this.subtitle = data.subtitle;
    });
    this.initForm()
  }

  initForm() {
    this.reportForm = this.fb.group({
      category: [{ name: 'Staff' }],
      status: [null],
      documentType: [null],
      reportType: [null],
      staff: [[]],
      vehicle: [[]]
    })
  }

  onCategoryChange() {
    if (this.reportForm.controls.category.value?.name == "Vehicle") {
      this.showStaff = false
      this.staffIds = []
    }
    else {
      this.showStaff = true
      this.vehicleIds = []
    }
  }

  GenerateReport() {
    this.documentIds = []
    this.staffIds = []
    this.vehicleIds = []
    console.log(this.reportForm.value)
    if (this.reportForm.controls.documentType.value?.length > 0) {
      this.reportForm.controls.documentType.value.forEach(element => {
        this.documentIds.push(element.documentTypeId)
      });
    }
    if (this.reportForm.controls.staff.value?.length > 0) {
      this.reportForm.controls.staff.value.forEach(element => {
        this.staffIds.push(element.staffId)
      });
    }
    if (this.reportForm.controls.vehicle.value?.length > 0) {
      this.reportForm.controls.vehicle.value.forEach(element => {
        this.vehicleIds.push(element.id)
      });
    }
    var paramBody = {
      staffIds: this.staffIds,
      documentTypeIds: this.documentIds,
      documentStatudId: null,
      reportType: "GetStaffDocumentReport",
      vehicleIds: this.vehicleIds
    }
    this.reportService.GetDocumentReport(paramBody)
    // this.reportService.isDocumenReportGenerate.subscribe(res => {
    //   if (res) {
    //     this.isReport = true
    //     this.onPrint()
    //     // this.isReport = true
    //   }
    // })
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

  calculateDays(issueDate, expDate) {
    try {
      return Math.floor((Date.UTC(expDate.getFullYear(), expDate.getMonth(), expDate.getDate()) - Date.UTC(issueDate.getFullYear(), issueDate.getMonth(), issueDate.getDate())) / (1000 * 60 * 60 * 24));
    } catch (error) {
      console.log(error)
    }
  }
}

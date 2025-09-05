import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportService } from 'src/app/routes/service/report.service';
import { PdfService } from 'src/app/routes/service/pdf.service';
import { MasterApiService } from 'src/app/routes/service/master.api.services';

@Component({
  selector: 'app-airticketreport',
  templateUrl: './airticketreport.component.html',
  styleUrls: ['./airticketreport.component.scss']
})
export class AirticketreportComponent implements OnInit {
  title: any;
  depFrom: any = new Date()
  depTo: any = new Date()
  subtitle: any;
  staffId: any = 0
  airTicketDetails: any[];
  airTicketObj: any;
  ticketDetailModal: boolean = false;
  constructor(public reportService: ReportService, private activatedroute: ActivatedRoute, public PdfService: PdfService,
    public masterApi: MasterApiService) { }

  ngOnInit(): void {
    this.masterApi.GetAllHrFamilyDetails()
    this.masterApi.GetAllHrNationalityWithSubs()
    this.masterApi.getAllStaffMasterWithSubscribe()
    this.reportService.GetAirTicketReport()
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
      this.subtitle = data.subtitle;
    });
  }

  onClickSearch() {
    var dateFrom = Date.parse(this.depFrom)
    var dateTo = Date.parse(this.depTo)
    this.reportService.AirTicketReport = this.reportService.AirTicketReportDuplicate.filter(o => (this.staffId == 0 || this.staffId == null || this.staffId == undefined ? true : o.staffId == this.staffId?.staffId) &&
      (Date.parse(o.depDate).valueOf() >= dateFrom.valueOf() && Date.parse(o.depDate).valueOf() <= dateTo.valueOf()))
  }

  getNationaityName(id) {
    return this.masterApi.NationalityArray.find(o => o.nationalityId == id)?.nationality
  }

  getStaffName(id) {
    return this.masterApi.staffMasterArray.find(o => o.staffId == id)?.fullName
  }

  getFamilyName(id) {
    return this.masterApi.HrFamilyDetailsArray.find(o => o.id == id)?.name
  }

  onClickDetails(item) {
    this.ticketDetailModal = true
    this.airTicketObj = item
    this.airTicketDetails = item.airTicketDetails as any[]
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

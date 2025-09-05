import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportService } from 'src/app/routes/service/report.service';
import { PdfService } from 'src/app/routes/service/pdf.service';

@Component({
  selector: 'app-birthdayalert',
  templateUrl: './birthdayalert.component.html',
  styleUrls: ['./birthdayalert.component.scss']
})
export class BirthdayalertComponent implements OnInit {
  selectedMonth: any
  monthArray: any[] = [{ name: "January" }, { name: "February" }, { name: "March" }, { name: "April" }, { name: "May" }, { name: "June" },
  { name: "July" }, { name: "August" }, { name: "September" }, { name: "October" }, { name: "November" }, { name: "December" }]
  title: any;
  subtitle: any;
  constructor(public reportService: ReportService, private activatedroute: ActivatedRoute, public PdfService: PdfService) { }

  ngOnInit(): void {
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
      this.subtitle = data.subtitle;
    });
    var currentMonth = new Date().toLocaleString('default', { month: 'long' });
    this.selectedMonth = { name: currentMonth }
    this.reportService.GetStaffsBirthday(this.selectedMonth?.name)
  }

  getReport() {
    this.reportService.GetStaffsBirthday(this.selectedMonth?.name)
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

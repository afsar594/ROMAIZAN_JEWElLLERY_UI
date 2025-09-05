import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MasterApiService } from 'src/app/routes/service/master.api.services';
import { ReportService } from 'src/app/routes/service/report.service';
import { PdfService } from 'src/app/routes/service/pdf.service';

@Component({
  selector: 'app-salarypackagereport',
  templateUrl: './salarypackagereport.component.html',
  styleUrls: ['./salarypackagereport.component.scss']
})
export class SalarypackagereportComponent implements OnInit {
  title: any;
  subtitle: any;
  reportForm: FormGroup
  constructor(private activatedroute: ActivatedRoute, private fb: FormBuilder, public masterApi: MasterApiService, public reportService: ReportService,
    public PdfService: PdfService) { }

  ngOnInit(): void {
    this.initForm()
    this.reportService.GetSalaryPackageReport(null)
    this.masterApi.getAllStaffMasterWithSubscribe()
    this.masterApi.getAllDepartmentWithSub()
    this.masterApi.GetAllCaderMasterWithSubs()
    this.masterApi.getAllCompanyWithSubs()
    this.masterApi.GetAllHrActiveStatusWithSubs()
    //Package is missing
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
      this.subtitle = data.subtitle;
    });
  }

  initForm() {
    this.reportForm = this.fb.group({
      staffId: new FormControl(null),
      departmentId: new FormControl(null),
      cadreId: new FormControl(null),
      companyId: new FormControl(null),
      packageId: new FormControl(null),
      activeStatusId: new FormControl(null),
    })
  }

  getTotalPackage() {
    return this.reportService.salaryPackageReport.forEach(elemt => {
      elemt.dataList.reduce((sum, current) => sum + Number(current.package), 0);
    })
  }

  getTotal(item: any) {
  }
}

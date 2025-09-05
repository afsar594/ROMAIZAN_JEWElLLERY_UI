import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng';
import { MasterApiService } from 'src/app/routes/service/master.api.services';
import { TransactionService } from 'src/app/routes/service/transaction-service.service';

@Component({
  selector: 'app-companycalendar',
  templateUrl: './companycalendar.component.html',
  styleUrls: ['./companycalendar.component.scss'],
  providers: [DatePipe]
})
export class CompanycalendarComponent implements OnInit {
  index: any;
  title: any;
  listModal: boolean = false
  subtitle: any;
  handleChange(e) {
    this.index = e.index;
  }
  fromDate = new Date()
  toDate = new Date()
  constructor(private activatedroute: ActivatedRoute, public transactionApi: TransactionService, private datePipe: DatePipe,
    public masterApi: MasterApiService, public messageService: MessageService) { }

  ngOnInit(): void {
    this.transactionApi.GetAllHrCompanyCalender()
    this.masterApi.GetAllHrStaffTypeWithSubs()
    this.activatedroute.data.subscribe(data => {
      this.title = data.title;
      this.subtitle = data.subtitle
    });
  }

  generateCalender() {
    this.transactionApi.GenerateCalendar(this.datePipe.transform(this.fromDate, "M/d/yy"), this.datePipe.transform(this.toDate, "M/d/yy"))
  }

  getStaffTypeName(staffTypeId) {
    return this.masterApi.StaffTypeArray.find(o => o.staffTypeId == staffTypeId)?.staffType
  }

  onSave(item: any) {
    debugger
    if (!item.dayType) {
      // alert("Select Day Type")
      return
    }
    var dataObj = {
      Id: 0,
      Mdate: item.fullDate,
      Mday: item.dayName.substring(0, 3),
      Mdesc: item.description,
      staffTypeId: item.dayType?.staffTypeId
    }
    this.transactionApi.InsertHrCompanyCalender(dataObj).subscribe((response: any[]) => {
      this.transactionApi.CompanyCalendarArray = response
      this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Deleted Successflly!' });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    });
  }

  onDelete(rowData: any) {
    if (confirm("Are you sure. You want to delete this record ?")) {
      this.transactionApi.DeleteHrCompanyCalender(rowData).subscribe((response: any[]) => {
        this.transactionApi.CompanyCalendarArray = response
        this.messageService.add({ severity: 'Success', summary: 'Success!', detail: 'Record Deleted Successflly!' });
      }, error => {
        this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
      });
    }
  }
}

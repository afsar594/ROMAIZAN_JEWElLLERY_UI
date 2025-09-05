import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TimeSheet2 } from '../domain/TimeSheet2';
import { environment } from 'src/environments/environment';
import { MasterUrls } from './url.api';
import { TimeSheet2Details } from '../domain/TimeSheet2Details';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};
@Injectable({
  providedIn: 'root'
})
export class TimesheetService {
  baseUrl: string = environment.apiRootURL;
  allTimeSheet2Data: TimeSheet2[] = []
  allTimeSheet2DetailsData: TimeSheet2Details[] = [];
  constructor(private httpClient: HttpClient, private messageService: MessageService) { }

  GetAllHrTimeSheet2() {
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrTimeSheet2).subscribe((res: TimeSheet2[]) => {
      this.allTimeSheet2Data = res as TimeSheet2[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    })
  }

  InsertHrTimeSheet2(data: TimeSheet2) {
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrTimeSheet2, data)
  }

  UpdateHrTimeSheet2(data: TimeSheet2) {
    this.httpClient.put(this.baseUrl + MasterUrls.UpdateHrTimeSheet2, data).subscribe((res: TimeSheet2[]) => {
      this.allTimeSheet2Data = res as TimeSheet2[]
      this.messageService.add({ severity: 'success', summary: 'Saved', detail: 'Updated Successfully.' });
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    })
  }

  DeleteHrTimeSheet2(tsID: number) {
    this.httpClient.delete(this.baseUrl + MasterUrls.DeleteHrTimeSheet2 + tsID).subscribe((res: TimeSheet2[]) => {
      this.allTimeSheet2Data = res as TimeSheet2[]
      this.messageService.add({ severity: 'success', summary: 'Saved', detail: 'Deleted Successfully.' });
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    })
  }


  GetAllHrTimeSheet2Details() {
    this.httpClient.get<Array<any>>(this.baseUrl + MasterUrls.GetAllHrTimeSheet2Details).subscribe((res: TimeSheet2Details[]) => {
      this.allTimeSheet2DetailsData = res as TimeSheet2Details[]
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    })
  }

  GetTimeSheetDataDateWise(tsDate: string) {
    return this.httpClient.get(this.baseUrl + MasterUrls.GetTimeSheetDataDateWise + "?tsDate=" + tsDate)
  }

  InsertHrTimeSheet2Details(data: TimeSheet2Details[]) {
    return this.httpClient.post(this.baseUrl + MasterUrls.InsertHrTimeSheet2Details, data)
  }

  UpdateHrTimeSheet2Details(data: TimeSheet2Details[]) {
   return this.httpClient.put(this.baseUrl + MasterUrls.UpdateHrTimeSheet2Details, data)
  }

  DeleteHrTimeSheet2Details(TsDetailsId: number) {
    this.httpClient.delete(this.baseUrl + MasterUrls.DeleteHrTimeSheet2Details + TsDetailsId).subscribe((res: TimeSheet2Details[]) => {
      this.allTimeSheet2DetailsData = res as TimeSheet2Details[]
      this.messageService.add({ severity: 'success', summary: 'Saved', detail: 'Deleted Successfully.' });
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Api response error', detail: error });
    })
  }

}

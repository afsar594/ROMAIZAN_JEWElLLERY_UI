import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MasterApiService } from 'src/app/routes/service/master.api.services';

@Component({
    selector: 'timesheet',
    templateUrl: 'timesheet.component.html',
    styleUrls: ['timesheet.component.scss']
})
export class TimesheetComponent implements OnInit {
    title: string;
    subtitle: any;
    index: number = 0;
    screenType: string = ""
    handleChange(e) {
        this.index = e.index;
    }
    constructor(private activatedroute: ActivatedRoute, private masterApiService: MasterApiService) {

    }
    ngOnInit(): void {
        this.screenType = "Time Sheet Details"
        this.masterApiService.GetAllHrSites()
        this.masterApiService.getAllDesignationWithSubscribe()
        this.masterApiService.getAllStaffMasterWithSubscribe()
        this.activatedroute.data.subscribe(data => {
            this.title = data.title;
            this.subtitle = data.title;
        });
    }
}

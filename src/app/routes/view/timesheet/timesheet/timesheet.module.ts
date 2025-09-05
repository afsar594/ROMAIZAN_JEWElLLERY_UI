// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { TimesheetComponent } from './timesheet.component';
import { TimesheetdetailsComponent } from './timesheetdetails/timesheetdetails.component';
import { TimesheetreportComponent } from './timesheetreport/timesheetreport.component';
import { TimeSheetRoutingModule } from './timesheet.routing.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HotTableModule } from '@handsontable/angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'primeng/api';
import { ListboxModule } from 'primeng/listbox';
import { PrimeModuleModule } from 'src/app/shared/module/prime-module/prime-module.module';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TimesheetbreakupComponent } from './timesheetbreakup/timesheetbreakup.component';
import { TimesheetmultiplestaffComponent } from './timesheetmultiplestaff/timesheetmultiplestaff.component';
import { TimsheetkzComponent } from './timsheetkz/timsheetkz.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        PrimeModuleModule,
        ReactiveFormsModule,
        FormsModule,
        ListboxModule,
        HotTableModule,
        TranslateModule,
        TimeSheetRoutingModule
    ],
    declarations: [
        TimesheetComponent,
        TimesheetdetailsComponent,
        TimesheetreportComponent,
        TimesheetbreakupComponent,
        TimesheetmultiplestaffComponent,
        TimsheetkzComponent,
    ],
    exports: [
        TimesheetComponent,
    ]
})
export class TimesheetModule {

}

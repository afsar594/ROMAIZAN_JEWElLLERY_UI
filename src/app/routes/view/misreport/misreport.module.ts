import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MisreportRoutingModule } from './misreport-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DocumentdetailComponent } from './documentdetail/documentdetail.component';
import { HotTableModule } from '@handsontable/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule, ListboxModule, DropdownModule } from 'primeng';
import { PrimeModuleModule } from 'src/app/shared/module/prime-module/prime-module.module';
import { SaleRoutingModule } from '../sale/sale-routing.module';
import { StaffdetailComponent } from './staffdetail/staffdetail.component';
import { LoandetailComponent } from './loandetail/loandetail.component';
import { LeavedetailComponent } from './leavedetail/leavedetail.component';
import { PassportinoutdetailComponent } from './passportinoutdetail/passportinoutdetail.component';
import { BirthdayalertComponent } from './birthdayalert/birthdayalert.component';
import { IncrementreportComponent } from './incrementreport/incrementreport.component';
import { LoanhistoryComponent } from './loanhistory/loanhistory.component';
import { SalarypackagereportComponent } from './salarypackagereport/salarypackagereport.component';
import { GratuityleavesalaryreportComponent } from './gratuityleavesalaryreport/gratuityleavesalaryreport.component';
import { AirticketreportComponent } from './airticketreport/airticketreport.component';
import { NationalitygradeComponent } from './nationalitygrade/nationalitygrade.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [DocumentdetailComponent, StaffdetailComponent, LoandetailComponent, LeavedetailComponent, PassportinoutdetailComponent,
    BirthdayalertComponent, IncrementreportComponent, LoanhistoryComponent, SalarypackagereportComponent, GratuityleavesalaryreportComponent, AirticketreportComponent, NationalitygradeComponent],
  imports: [
    ChartsModule,
    CommonModule,
    SharedModule,
    PrimeModuleModule,
    ReactiveFormsModule,
    FormsModule,
    ListboxModule,
    HotTableModule,
    TranslateModule,
    SaleRoutingModule,
    MisreportRoutingModule,
    DropdownModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MisreportModule { }

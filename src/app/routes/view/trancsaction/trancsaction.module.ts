import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionRoutingModule } from './transaction.routing.module';
import { LoanentryComponent } from './loanentry/loanentry.component';
import { PrimeModuleModule } from 'src/app/shared/module/prime-module/prime-module.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { SharedModule, ListboxModule } from 'primeng';
import { MasterRoutingModule } from '../master/master-routing.module';
import { SaleRoutingModule } from '../sale/sale-routing.module';
import { HotTableModule } from '@handsontable/angular';
import { MultileaveentryComponent } from './multileaveentry/multileaveentry.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ComponentLeaveopeningsComponent } from './component-leaveopenings/component-leaveopenings.component';
import { InsertsalarydetailComponent } from './insertsalarydetail/insertsalarydetail.component';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { EmployeepromotionComponent } from './employeepromotion/employeepromotion.component';
import { SalaryheadsComponent } from './salaryheads/salaryheads.component';
import { AssetmasterComponent } from './assetmaster/assetmaster.component';
import { AgentmasterComponent } from './agentmaster/agentmaster.component';
import { BankmasterComponent } from './bankmaster/bankmaster.component';
import { AllottedpropertyComponent } from './allottedproperty/allottedproperty.component';
import { ExpensepropertiesComponent } from './expenseproperties/expenseproperties.component';
import { SharedModule } from 'primeng/api';
import { ListboxModule } from 'primeng/listbox';
import { DocumentsComponent } from './documents/documents.component';
import { AllowancedeductionComponent } from './allowancededuction/allowancededuction.component';
import { LeavemasterComponent } from './leavemaster/leavemaster.component';
import { CompanycalendarComponent } from './companycalendar/companycalendar.component';
import { ChangedepartmentComponent } from './changedepartment/changedepartment.component';
import { MobilizationComponent } from './mobilization/mobilization.component';
import { PassportComponent } from './passport/passport.component';
import { IncrementComponent } from './increment/increment.component';
import { SalarypackageComponent } from './salarypackage/salarypackage.component';
import { PayrollComponent } from './payroll/payroll.component';
import { LeaverejoinComponent } from './leaverejoin/leaverejoin.component';
import { LeaveSettlementComponent } from './leave-settlement/leave-settlement.component';

@NgModule({
  declarations: [InsertsalarydetailComponent, LoanentryComponent, MultileaveentryComponent,
    ComponentLeaveopeningsComponent, TimesheetComponent, EmployeepromotionComponent,
    SalaryheadsComponent, AssetmasterComponent, AgentmasterComponent, BankmasterComponent, AllottedpropertyComponent,
    ExpensepropertiesComponent, DocumentsComponent, AllowancedeductionComponent, LeavemasterComponent,
     CompanycalendarComponent, ChangedepartmentComponent, MobilizationComponent, PassportComponent,
      IncrementComponent, SalarypackageComponent, PayrollComponent, LeaverejoinComponent,LeaveSettlementComponent],
  imports: [

    CommonModule,
    SharedModule,
    PrimeModuleModule,
    ReactiveFormsModule,
    FormsModule,
    ListboxModule,
    HotTableModule,
    TranslateModule,
    SaleRoutingModule,
    TransactionRoutingModule
  ]
})
export class TrancsactionModule { }

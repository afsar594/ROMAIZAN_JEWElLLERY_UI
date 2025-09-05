import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgentmasterComponent } from './agentmaster/agentmaster.component';
import { AllottedpropertyComponent } from './allottedproperty/allottedproperty.component';
import { AssetmasterComponent } from './assetmaster/assetmaster.component';
import { BankmasterComponent } from './bankmaster/bankmaster.component';
import { ComponentLeaveopeningsComponent } from './component-leaveopenings/component-leaveopenings.component';
import { EmployeepromotionComponent } from './employeepromotion/employeepromotion.component';
import { ExpensepropertiesComponent } from './expenseproperties/expenseproperties.component';
import { InsertsalarydetailComponent } from './insertsalarydetail/insertsalarydetail.component';
import { LoanentryComponent } from './loanentry/loanentry.component';
import { MultileaveentryComponent } from './multileaveentry/multileaveentry.component';
import { SalaryheadsComponent } from './salaryheads/salaryheads.component';
import { TimesheetComponent } from './timesheet/timesheet.component';
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

const routes: Routes = [
  {

    path: 'Loanentry',
    component: LoanentryComponent,
    data: { title: 'Loan Entry', titleI18n: 'Loan Entry' },
  },
  {

    path: 'leaveopenings',
    component: ComponentLeaveopeningsComponent,
    data: { title: 'Leave Openings', titleI18n: 'Leave Openings' },
  },
  {

    path: 'multileaveentry',
    component: MultileaveentryComponent,
    data: { title: 'Multi Leave Entry', titleI18n: 'Multi Leave Entry' },
  },
  {
    path: 'insertsalarydetails',
    component: InsertsalarydetailComponent,
    data: { title: 'Insert Salary Details', titleI18n: 'Insert Salary Details' },
  },
  {
    path: 'timesheet',
    component: TimesheetComponent,
    data: { title: 'TimeSheet Multiple Staff', titleI18n: 'TimeSheet Multiple Staff' },
  },
  {
    path: 'employeepromotion',
    component: EmployeepromotionComponent,
    data: { title: 'Employee Promotion/Designation Change Entry', titleI18n: 'Employee Promotion/Designation Change Entry' },
  },
  {
    path: 'salaryheads',
    component: SalaryheadsComponent,
    data: { title: 'Salary Heads ', titleI18n: 'Salary Heads' },
  },
  {
    path: 'assetmaster',
    component: AssetmasterComponent,
    data: { title: 'Asset Master', titleI18n: 'Asset Master' },
  },
  {
    path: 'agentmaster',
    component: AgentmasterComponent,
    data: { title: 'Agent Master', titleI18n: 'Agent Master' },
  },
  {
    path: 'bankmaster',
    component: BankmasterComponent,
    data: { title: 'Bank Master', titleI18n: 'Bank Master' },
  },
  {
    path: 'allottedproperty',
    component: AllottedpropertyComponent,
    data: { title: 'Allotted Property', titleI18n: 'Allotted Property' },
  },
  {
    path: 'expenseproperties',
    component: ExpensepropertiesComponent,
    data: { title: 'Other Expense Properties', titleI18n: 'Other Expense Properties' },
  },
  {
    path: 'documents',
    component: DocumentsComponent,
    data: { title: 'Documents', titleI18n: 'Documents' },
  },
  {
    path: 'allowance',
    component: AllowancedeductionComponent,
    data: { title: 'Allowance / Deduction', titleI18n: 'Allowance / Deduction' },
  },
  {
    path: 'leave',
    component: LeavemasterComponent,
    data: { title: 'Leave Entry', titleI18n: 'Leave Entry' },
  },
  {
    path: 'calendar',
    component: CompanycalendarComponent,
    data: { title: 'Calendar', titleI18n: 'Calendar' },
  },
  {
    path: 'changedepartment',
    component: ChangedepartmentComponent,
    data: { title: 'Change Department', titleI18n: 'Change Department' },
  },
  {
    path: 'mobilization',
    component: MobilizationComponent,
    data: { title: 'Mobilization', titleI18n: 'Mobilization' },
  },
  {
    path: 'passport',
    component: PassportComponent,
    data: { title: 'Passport', titleI18n: 'Passport' },
  },
  {
    path: 'increment',
    component: IncrementComponent,
    data: { title: 'Increment Entry', titleI18n: 'Increment Entry' },
  },
  {
    path: 'salarypckg',
    component: SalarypackageComponent,
    data: { title: 'Salary Package', titleI18n: 'Salary Package' },
  },
  {
    path: 'payroll',
    component: PayrollComponent,
    data: { title: 'Payroll Master', titleI18n: 'Payroll Master' },
  },
  {
    path: 'leaverejoining',
    component: LeaverejoinComponent,
    data: { title: 'Leave Rejoining', titleI18n: 'Leave Rejoining' },
  },
  {
    path: 'leavesettlement',
    component: LeaveSettlementComponent,
    data: { title: 'Leave/Finel Settlement', titleI18n: 'Leave/Finel Settlement' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TransactionRoutingModule { }

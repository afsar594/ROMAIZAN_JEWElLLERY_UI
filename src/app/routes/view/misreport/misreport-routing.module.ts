import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentdetailComponent } from './documentdetail/documentdetail.component';
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

const routes: Routes = [
  {
    path: 'documentdetail',
    component: DocumentdetailComponent,
    data: { title: 'Document Detail', titleI18n: 'Document Detail' },
  },
  {
    path: 'staffdetail',
    component: StaffdetailComponent,
    data: { title: 'Staff Detail', titleI18n: 'Staff Detail' },
  },
  {
    path: 'loandetail',
    component: LoandetailComponent,
    data: { title: 'Loan Detail', titleI18n: 'Loan Detail' },
  },
  {
    path: 'leavedetail',
    component: LeavedetailComponent,
    data: { title: 'Leave Detail', titleI18n: 'Leave Detail' },
  },
  {
    path: 'passport',
    component: PassportinoutdetailComponent,
    data: { title: 'Passport In/Out Detail', titleI18n: 'Passport In/Out Detail' },
  },
  {
    path: 'birthdayalert',
    component: BirthdayalertComponent,
    data: { title: 'Birthday Alert', titleI18n: 'Birthday Alert' },
  },
  {
    path: 'incrementhistory',
    component: IncrementreportComponent,
    data: { title: 'Increment History', titleI18n: 'Increment History' },
  },
  {
    path: 'loanhistory',
    component: LoanhistoryComponent,
    data: { title: 'Loan History', titleI18n: 'Loan History' },
  },
  {
    path: 'salarypackagereport',
    component: SalarypackagereportComponent,
    data: { title: 'Salary Package', titleI18n: 'Salary Package' },
  },
  {
    path: 'graruity-leave-salary',
    component: GratuityleavesalaryreportComponent,
    data: { title: 'Gratuity / Leave Salary History', titleI18n: 'Gratuity / Leave Salary History' },
  },
  {
    path: 'airticket',
    component: AirticketreportComponent,
    data: { title: 'Air Ticket', titleI18n: 'Air Ticket' },
  },
  {
    path: 'nationalitygrade',
    component: NationalitygradeComponent,
    data: { title: 'Nationality Grade' , titleI18n: 'Nationality Grade' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MisreportRoutingModule { }

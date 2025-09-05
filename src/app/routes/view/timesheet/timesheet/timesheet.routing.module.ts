import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimesheetComponent } from './timesheet.component';

const routes: Routes = [
  {
    path: '',
    component: TimesheetComponent,
    data: { title: 'Time Sheet', titleI18n: 'Time Sheet' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TimeSheetRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeavereportComponent } from './leavereport/leavereport.component';
import { AdvanceSearchComponent } from './advance-search/advance-search.component';
import { CustomPrintComponent } from './custom-print/custom-print.component';


const routes: Routes = [
    {
        path: 'leavereport',
        component: LeavereportComponent,
        data: { title: 'Leave Report', titleI18n: 'Leave Report' },
    },

    {
        path: 'advance-search',
        component: AdvanceSearchComponent,
        data: { title: 'Advance Search', titleI18n: 'Advance Search' },
    },
    {
        path: 'custom-print',
        component: CustomPrintComponent,
        data: { title: 'Custom Print', titleI18n: 'Custom Print' },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ReportRoutingModule { }

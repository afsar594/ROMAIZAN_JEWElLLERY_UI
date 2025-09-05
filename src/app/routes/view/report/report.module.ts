import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeavereportComponent } from './leavereport/leavereport.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HotTableModule } from '@handsontable/angular';
import { TranslateModule } from '@ngx-translate/core';
import { PrimeModuleModule } from 'src/app/shared/module/prime-module/prime-module.module';
import { SaleRoutingModule } from '../sale/sale-routing.module';
import { TransactionRoutingModule } from '../trancsaction/transaction.routing.module';
import { ReportRoutingModule } from './report.routing.module';
import { MasterRoutingModule } from '../master/master-routing.module';
import { UtilityRoutingModule } from '../utility/utility-routing.module';
import { SharedModule } from 'primeng/api';
import { ListboxModule } from 'primeng/listbox';
import { AdvanceSearchComponent } from './advance-search/advance-search.component';
import { CustomPrintComponent } from './custom-print/custom-print.component';



@NgModule({
  declarations: [LeavereportComponent,AdvanceSearchComponent,CustomPrintComponent],
  imports: [
    CommonModule,
    SharedModule,
    PrimeModuleModule,
    ReactiveFormsModule,
    FormsModule,
    MasterRoutingModule,
    SaleRoutingModule,
    ListboxModule,
    HotTableModule,
    TranslateModule,
    UtilityRoutingModule,
    TransactionRoutingModule,
    ReportRoutingModule
  ]
})
export class ReportModule { }

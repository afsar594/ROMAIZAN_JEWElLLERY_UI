import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilityRoutingModule } from './utility-routing.module';
import { FamilydetailsComponent } from './familydetails/familydetails.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HotTableModule } from '@handsontable/angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
// import { SharedModule, ListboxModule } from 'primeng';
import { PrimeModuleModule } from 'src/app/shared/module/prime-module/prime-module.module';
import { MasterRoutingModule } from '../master/master-routing.module';
import { SaleRoutingModule } from '../sale/sale-routing.module';
import { TransactionRoutingModule } from '../trancsaction/transaction.routing.module';
import { RewardpropertyComponent } from './rewardproperty/rewardproperty.component';
import { TrainingdetailComponent } from './trainingdetail/trainingdetail.component';
import { FineentryComponent } from './fineentry/fineentry.component';
import { SharedModule } from 'primeng/api';
import { ListboxModule } from 'primeng/listbox';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


@NgModule({
  declarations: [FamilydetailsComponent, RewardpropertyComponent, TrainingdetailComponent, FineentryComponent],
  imports: [
    CommonModule,
    UtilityRoutingModule,
    CommonModule,
    SharedModule,
    PrimeModuleModule,
    ReactiveFormsModule,
    FormsModule,
    ListboxModule,
    HotTableModule,
    TranslateModule,
    SaleRoutingModule,
    TransactionRoutingModule,
    MasterRoutingModule,

  ]
})
export class UtilityModule { }

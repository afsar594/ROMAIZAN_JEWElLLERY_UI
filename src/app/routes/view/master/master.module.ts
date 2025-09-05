import { AirportlocationComponent } from './airportlocation/airportlocation.component';
import { AssetmasterComponent } from './assetmaster/assetmaster.component';
import { CurrencyMasterComponent } from './currencymaster/currencymaster.component';
import { SalaryheadsComponent } from './salaryheads/salaryheads.component';
import { VehiclemasterComponent } from './vehiclemaster/vehiclemaster.component';
import { LeavetypesComponent } from './leavetypes/leavetypes.component';
import { StafftypeComponent } from './stafftype/stafftype.component';
import { AddresstypesComponent } from './addresstypes/addresstypes.component';
// import { BankmasterComponent } from './bankmaster/bankmaster.component';
import { AgentmasterComponent } from './agentmaster/agentmaster.component';
import { SitemasterComponent } from './sitemaster/sitemaster.component';
import { DocumenttypeComponent } from './documenttype/documenttype.component';
import { ShiftmasterComponent } from './shiftmaster/shiftmaster.component';
import { ShifttypeComponent } from './shifttype/shifttype.component';
import { RelationmasterComponent } from './relationmaster/relationmaster.component';
import { ReligionmasterComponent } from './religionmaster/religionmaster.component';
import { BloodgroupComponent } from './bloodgroup/bloodgroup.component';
import { NationalmasterComponent } from './nationalmaster/nationalmaster.component';
import { LeavesalaryamountpolicyComponent } from './leavesalaryamountpolicy/leavesalaryamountpolicy.component';
import { GratuityamountpolicyComponent } from './gratuityamountpolicy/gratuityamountpolicy.component';
import { LanguageComponent } from './language/language.component';
import { QualificationComponent } from './qualification/qualification.component';
import { GradeComponent } from './grade/grade.component';
import { CadermasterComponent } from './cadermaster/cadermaster.component';
import { VisacompanydesignationComponent } from './visacompanydesignation/visacompanydesignation.component';
import { DesignationmasterComponent } from './designationmaster/designationmaster.component';
import { DepartmentmasterComponent } from './departmentmaster/departmentmaster.component';
import { StaffmasterComponent } from './staffmaster/staffmaster.component';
import { VisacompanymasterComponent } from './visacompanymaster/visacompanymaster.component';
import { CompanymasterComponent } from './companymaster/companymaster.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterRoutingModule } from './master-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrimeModuleModule } from 'src/app/shared/module/prime-module/prime-module.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SaleRoutingModule } from '../sale/sale-routing.module';
// import { ListboxModule } from 'primeng';
import { HotTableModule } from '@handsontable/angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ChangdepartmentComponent } from './changdepartment/changdepartment.component';
//import { UtilityRoutingModule } from '../utility/utility-routing.module';
import { TransactionRoutingModule } from '../trancsaction/transaction.routing.module';
import { ListboxModule } from 'primeng/listbox';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AddressComponent } from './address/address.component';
import { AddairticketComponent } from './addairticket/addairticket.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [CompanymasterComponent,
    VisacompanymasterComponent, StaffmasterComponent, DepartmentmasterComponent,
    DesignationmasterComponent, VisacompanydesignationComponent, CadermasterComponent,
    GradeComponent, QualificationComponent, LanguageComponent, GratuityamountpolicyComponent,
    LeavesalaryamountpolicyComponent, NationalmasterComponent, BloodgroupComponent,
    ReligionmasterComponent, RelationmasterComponent, ShifttypeComponent, ShiftmasterComponent,
    DocumenttypeComponent, SitemasterComponent, AgentmasterComponent,
    AddresstypesComponent, StafftypeComponent, LeavetypesComponent, VehiclemasterComponent,
    SalaryheadsComponent, CurrencyMasterComponent, AssetmasterComponent, AirportlocationComponent, ChangdepartmentComponent, AddressComponent, AddairticketComponent, DashboardComponent],
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
    //UtilityRoutingModule,
    TransactionRoutingModule,
  ]
})
export class MasterModule { }

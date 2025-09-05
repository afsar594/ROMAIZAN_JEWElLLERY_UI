import { CurrencyMasterComponent } from './currencymaster/currencymaster.component';
import { AirportlocationComponent } from './airportlocation/airportlocation.component';
import { AssetmasterComponent } from './assetmaster/assetmaster.component';
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
import { Routes, RouterModule } from '@angular/router';
import { ChangdepartmentComponent } from './changdepartment/changdepartment.component';
import { AddressComponent } from './address/address.component';
import { AddairticketComponent } from './addairticket/addairticket.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [

  {
    path: 'companymaster',
    component: CompanymasterComponent,
    data: { title: 'Company Master', titleI18n: 'Company Master Component' },
  },
  {
    path: 'visacompanymaster',
    component: VisacompanymasterComponent,
    data: { title: 'Visa Company Master', titleI18n: 'Visa Company Master' },
  },
  {
    path: 'staffmaster',
    component: StaffmasterComponent,
    data: { title: 'Staff Master', titleI18n: 'Staff Master' },
  },
  {
    path: 'departmentmaster',
    component: DepartmentmasterComponent,
    data: { title: 'Department Master', titleI18n: 'Department Master' },
  },
  {
    path: 'designationmaster',
    component: DesignationmasterComponent,
    data: { title: 'Designation Master', titleI18n: 'Designation Master' },
  },
  
  {
    path: 'visacompanydesignation',
    component: VisacompanydesignationComponent,
    data: { title: 'Visa Company Designation', titleI18n: 'Visa Company Designation' },
  },
  {
    path: 'cadermaster',
    component: CadermasterComponent,
    data: { title: 'Cader Master', titleI18n: 'Cader Master' },
  },
  {
    path: 'grade',
    component: GradeComponent,
    data: { title: 'Grade / Level', titleI18n: 'Grade / Level' },
  },
  
  {
    path: 'qualification',
    component: QualificationComponent,
    data: { title: 'Qualification Master', titleI18n: 'Qualification Master' },
  },
  {
    path: 'language',
    component: LanguageComponent,
    data: { title: 'Language', titleI18n: 'Language' },
  },
  {
    path: 'gratuityamountpolicy',
    component: GratuityamountpolicyComponent,
    data: { title: 'Gratuity Amount Policy', titleI18n: 'Gratuity Amount Policy' },
  },
  {
    path: 'leavesalaryamountpolicy',
    component: LeavesalaryamountpolicyComponent,
    data: { title: 'Leave Salary Amount Policy', titleI18n: 'Leave Salary Amount Policy' },
  },
  {
    path: 'nationalmaster',
    component: NationalmasterComponent,
    data: { title: 'Nationality Master', titleI18n: 'Nationality Master' },
  },
  {
    path: 'bloodgroup',
    component: BloodgroupComponent,
    data: { title: 'Blood Group', titleI18n: 'Blood Group' },
  },
  {
    path: 'religionmaster',
    component: ReligionmasterComponent,
    data: { title: 'Religion Master', titleI18n: 'Religion Master' },
  },
  {
    path: 'relationmaster',
    component: RelationmasterComponent,
    data: { title: 'Relation Master', titleI18n: 'Relation Master' },
  },
  {
    path: 'shifttype',
    component: ShifttypeComponent,
    data: { title: 'Shift Types', titleI18n: 'Shift Types' },
  },
  {
    path: 'shiftmaster',
    component: ShiftmasterComponent,
    data: { title: 'Shift Master', titleI18n: 'Shift Master' },
  },
  {
    path: 'documenttype',
    component: DocumenttypeComponent,
    data: { title: 'Document Type', titleI18n: 'Document Type' },
  },
  {
    path: 'sitemaster',
    component: SitemasterComponent,
    data: { title: 'Site Master', titleI18n: 'Site Master' },
  },
  {
    path: 'agentmaster',
    component: AgentmasterComponent,
    data: { title: 'Agent Master', titleI18n: 'Agent Master' },
  },

   {
      path: 'dashboard',
      component: DashboardComponent,
    data: { title: 'Dashboard', titleI18n: 'Dashboard' },
   },
  {
    path: 'addresstypes',
    component: AddresstypesComponent,
    data: { title: 'Address Properties', titleI18n: 'Address Properties' },
  },
  {
    path: 'stafftype',
    component: StafftypeComponent,
    data: { title: 'Staff Type', titleI18n: 'Staff Type' },
  },
  {
    path: 'leavetypes',
    component: LeavetypesComponent,
    data: { title: 'Leave Type', titleI18n: 'Leave Type' },
  },
  {
    path: 'vehiclemaster',
    component: VehiclemasterComponent,
    data: { title: 'Vehicle Master', titleI18n: 'Vehicle Master' },
  },
  {
    path: 'salaryheads',
    component: SalaryheadsComponent,
    data: { title: 'Salary Heads', titleI18n: 'Salary Heads' },
  },
  {
    path: 'currencymaster',
    component: CurrencyMasterComponent,
    data: { title: 'Currency Master', titleI18n: 'Currency Master' },
  },

  {
    path: 'assetmaster',
    component: AssetmasterComponent,
    data: { title: 'Asset Master', titleI18n: 'Asset Master' },
  },
  {
    path: 'airportlocation',
    component: AirportlocationComponent,
    data: { title: 'Airport Location', titleI18n: 'Airport Location' },
  },
  {
    path: 'changdepartment',
    component: ChangdepartmentComponent,
    data: { title: 'Change Department', titleI18n: 'Change Department' },
  },
  {
    path: 'address',
    component: AddressComponent,
    data: { title: 'Address', titleI18n: 'Address' },
  },
  {
    path: 'addairticket',
    component: AddairticketComponent,
    data: { title: 'Air Ticket', titleI18n: 'Air Ticket' },
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }

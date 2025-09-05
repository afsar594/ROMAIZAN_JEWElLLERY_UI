import { NgModule } from '@angular/core';
import { RoutesRoutingModule } from './routes-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './view/dashboard/dashboard.component';
import { CoreModule } from '../core/core.module';
import { PrimeModuleModule } from '../shared/module/prime-module/prime-module.module';
import { MaindashboardComponent } from './view/maindashboard/maindashboard.component';
const COMPONENTS = [DashboardComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [CoreModule, SharedModule, RoutesRoutingModule, PrimeModuleModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC, MaindashboardComponent],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class RoutesModule { }

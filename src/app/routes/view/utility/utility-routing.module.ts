import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FamilydetailsComponent } from './familydetails/familydetails.component';
import { FineentryComponent } from './fineentry/fineentry.component';
import { RewardpropertyComponent } from './rewardproperty/rewardproperty.component';
import { TrainingdetailComponent } from './trainingdetail/trainingdetail.component';

const routes: Routes = [
   {
        
        path: 'familydetails',
        component: FamilydetailsComponent,
        data: { title: 'Family Details Entry', titleI18n: 'Family Details Entry' },
      }, 
      {
        
        path: 'rewardproperty',
        component: RewardpropertyComponent,
        data: { title: 'Incr/Reward Property', titleI18n: 'Reward Property' },
      },
      {      
      path: 'trainingdetail',
      component:  TrainingdetailComponent,
      data: { title: 'Training Details Properties', titleI18n: 'Training Details Properties' },
    }, 
    {
        
      path: 'fineentry',
      component: FineentryComponent,
      data: { title: 'Fine/Penalty Entry', titleI18n: 'Fine/Penalty Entry' },
    },   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UtilityRoutingModule { }

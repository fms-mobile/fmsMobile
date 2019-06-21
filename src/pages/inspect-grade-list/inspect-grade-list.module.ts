import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InspectGradeListPage } from './inspect-grade-list';

@NgModule({
  declarations: [
    InspectGradeListPage,
  ],
  imports: [
    IonicPageModule.forChild(InspectGradeListPage),
  ],
})
export class InspectGradeListPageModule {}

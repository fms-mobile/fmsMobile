import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DigrTabs } from './digr-tabs';

@NgModule({
  declarations: [
    DigrTabs,
  ],
  imports: [
    IonicPageModule.forChild(DigrTabs),
  ],
})
export class DigrTabsModule {}

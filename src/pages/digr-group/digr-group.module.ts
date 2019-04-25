import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DigrGroupPage } from './digr-group';

@NgModule({
  declarations: [
    DigrGroupPage,
  ],
  imports: [
    IonicPageModule.forChild(DigrGroupPage),
  ],
  exports:[DigrGroupPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DigrGroupPageModule {}

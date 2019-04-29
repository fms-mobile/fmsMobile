import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Digr02ListModalPage } from './digr02-list-modal';

@NgModule({
  declarations: [
    Digr02ListModalPage,
  ],
  imports: [
    IonicPageModule.forChild(Digr02ListModalPage),
  ],
  exports:[Digr02ListModalPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Digr02ListModalPageModule {}

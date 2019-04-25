import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Digr13SelectModalPage } from './digr13-select-modal';

@NgModule({
  declarations: [
    Digr13SelectModalPage,
  ],
  imports: [
    IonicPageModule.forChild(Digr13SelectModalPage),
  ],
  exports:[Digr13SelectModalPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Digr13SelectModalPageModule {}

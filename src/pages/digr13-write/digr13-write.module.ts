import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Digr13WritePage } from './digr13-write';

@NgModule({
  declarations: [
    Digr13WritePage,
  ],
  imports: [
    IonicPageModule.forChild(Digr13WritePage),
  ],
  exports:[Digr13WritePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Digr13WritePageModule {}

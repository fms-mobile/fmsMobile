import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Digr02WritePage } from './digr02-write';

@NgModule({
  declarations: [
    Digr02WritePage,
  ],
  imports: [
    IonicPageModule.forChild(Digr02WritePage),
  ],
  exports:[Digr02WritePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Digr02WritePageModule {}

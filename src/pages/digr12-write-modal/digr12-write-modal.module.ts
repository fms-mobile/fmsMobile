import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Digr12WriteModalPage } from './digr12-write-modal';

@NgModule({
  declarations: [
    Digr12WriteModalPage,
  ],
  imports: [
    IonicPageModule.forChild(Digr12WriteModalPage),
  ],
  exports:[Digr12WriteModalPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Digr12WriteModalPageModule {}

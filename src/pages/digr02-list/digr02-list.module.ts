import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Digr02ListPage } from './digr02-list';

@NgModule({
  declarations: [
    Digr02ListPage,
  ],
  imports: [
    IonicPageModule.forChild(Digr02ListPage),
  ],
  exports:[Digr02ListPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Digr02ListPageModule {}

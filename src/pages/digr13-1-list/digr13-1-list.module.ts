import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Digr13_1ListPage } from './digr13-1-list';

@NgModule({
  declarations: [
    Digr13_1ListPage,
  ],
  imports: [
    IonicPageModule.forChild(Digr13_1ListPage),
  ],
  exports :[
    Digr13_1ListPage,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Digr13_1ListPageModule {}

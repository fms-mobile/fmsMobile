import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Digr12ListPage } from './digr12-list';

@NgModule({
  declarations: [
    Digr12ListPage,
  ],
  imports: [
    IonicPageModule.forChild(Digr12ListPage),
  ],
  exports:[
    Digr12ListPage,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Digr12ListPageModule {}

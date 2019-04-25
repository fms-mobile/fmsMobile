import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Mast01ListPage } from './mast01-list';

@NgModule({
  declarations: [
    Mast01ListPage,
  ],
  imports: [
    IonicPageModule.forChild(Mast01ListPage),
  ],
  exports:[Mast01ListPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Mast01ListPageModule {}

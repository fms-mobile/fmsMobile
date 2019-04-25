import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Digr11ListPage } from './digr11-list';

@NgModule({
  declarations: [
    Digr11ListPage,
  ],
  imports: [
    IonicPageModule.forChild(Digr11ListPage),
  ],
  exports:[Digr11ListPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Digr11ListPageModule {}

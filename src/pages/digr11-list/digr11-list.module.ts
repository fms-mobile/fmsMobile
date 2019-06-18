import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Digr11ListPage } from './digr11-list';
import { BastbTree01ComponentModule } from '../../components/bastb-tree01/bastb-tree01.module';

@NgModule({
  declarations: [
    Digr11ListPage,
  ],
  imports: [
    IonicPageModule.forChild(Digr11ListPage),
    BastbTree01ComponentModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Digr11ListPageModule {}

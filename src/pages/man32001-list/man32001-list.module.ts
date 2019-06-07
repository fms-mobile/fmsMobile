import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Man32001ListPage } from './man32001-list';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    Man32001ListPage,
  ],
  imports: [
    IonicPageModule.forChild(Man32001ListPage),
    PipesModule,
  ],
  exports :[
    Man32001ListPage,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Man32001ListPageModule {}

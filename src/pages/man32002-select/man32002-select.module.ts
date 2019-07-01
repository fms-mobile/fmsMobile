import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Man32002SelectPage } from './man32002-select';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    Man32002SelectPage,
  ],
  imports: [
    IonicPageModule.forChild(Man32002SelectPage),
    PipesModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Man32002SelectPageModule {}

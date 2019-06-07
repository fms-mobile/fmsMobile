import { NgModule } from '@angular/core';
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
})
export class Man32002SelectPageModule {}

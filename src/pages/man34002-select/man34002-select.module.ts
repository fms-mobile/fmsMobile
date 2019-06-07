import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Man34002SelectPage } from './man34002-select';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    Man34002SelectPage,
  ],
  imports: [
    IonicPageModule.forChild(Man34002SelectPage),
    PipesModule,
  ],
})
export class Man34002SelectPageModule {}

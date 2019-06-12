import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Inf01002SelectPage } from './inf01002-select';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    Inf01002SelectPage,
  ],
  imports: [
    IonicPageModule.forChild(Inf01002SelectPage),
    PipesModule,
  ],
})
export class Inf01002SelectPageModule {}

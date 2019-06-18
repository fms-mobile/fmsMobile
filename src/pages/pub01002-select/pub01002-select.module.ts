import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Pub01002SelectPage } from './pub01002-select';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    Pub01002SelectPage,
  ],
  imports: [
    IonicPageModule.forChild(Pub01002SelectPage),
    PipesModule,
  ],
})
export class Pub01002SelectPageModule {}

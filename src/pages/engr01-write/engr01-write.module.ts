import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Engr01WritePage } from './engr01-write';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    Engr01WritePage,
  ],
  imports: [
    IonicPageModule.forChild(Engr01WritePage),
    PipesModule,
  ],
  exports:[Engr01WritePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Engr01WritePageModule {}

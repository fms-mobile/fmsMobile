import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Digr01WritePage } from './digr01-write';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    Digr01WritePage,
  ],
  imports: [
    IonicPageModule.forChild(Digr01WritePage),
    PipesModule,
  ],
  exports:[
    Digr01WritePage,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Digr01WritePageModule {}

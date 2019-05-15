import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Digr11WritePage } from './digr11-write';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    Digr11WritePage,
  ],
  imports: [
    IonicPageModule.forChild(Digr11WritePage),
    PipesModule,
  ],
  exports:[Digr11WritePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Digr11WritePageModule {}

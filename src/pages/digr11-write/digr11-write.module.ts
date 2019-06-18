import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Digr11WritePage } from './digr11-write';
import { BastbTree01ComponentModule } from '../../components/bastb-tree01/bastb-tree01.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    Digr11WritePage,
  ],
  imports: [
    IonicPageModule.forChild(Digr11WritePage),
    BastbTree01ComponentModule,
    PipesModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Digr11WritePageModule {}

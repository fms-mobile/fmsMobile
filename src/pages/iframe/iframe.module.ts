import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Iframe } from './iframe';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    Iframe,
  ],
  imports: [
    IonicPageModule.forChild(Iframe),
    PipesModule
  ],
})
export class IframeModule {}

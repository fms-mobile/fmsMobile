import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Pub01001ListPage } from './pub01001-list';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    Pub01001ListPage,
  ],
  imports: [
    IonicPageModule.forChild(Pub01001ListPage),
    PipesModule,
  ],
})
export class Pub01001ListPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Inf01001ListPage } from './inf01001-list';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    Inf01001ListPage,
  ],
  imports: [
    IonicPageModule.forChild(Inf01001ListPage),
    PipesModule,
  ],
})
export class Inf01001ListPageModule {}

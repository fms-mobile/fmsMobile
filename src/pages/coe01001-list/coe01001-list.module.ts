import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Coe01001ListPage } from './coe01001-list';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    Coe01001ListPage,
  ],
  imports: [
    IonicPageModule.forChild(Coe01001ListPage),
    PipesModule,
  ],
})
export class Coe01001ListPageModule {}

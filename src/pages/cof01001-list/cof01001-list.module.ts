import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Cof01001ListPage } from './cof01001-list';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    Cof01001ListPage,
  ],
  imports: [
    IonicPageModule.forChild(Cof01001ListPage),
    PipesModule,
  ],
})
export class Cof01001ListPageModule {}

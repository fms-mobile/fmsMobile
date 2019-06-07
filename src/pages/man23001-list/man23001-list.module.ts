import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Man23001ListPage } from './man23001-list';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    Man23001ListPage,
  ],
  imports: [
    IonicPageModule.forChild(Man23001ListPage),
    PipesModule
  ],
})
export class Man23001ListPageModule {}

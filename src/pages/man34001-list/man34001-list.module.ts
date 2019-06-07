import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Man34001ListPage } from './man34001-list';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    Man34001ListPage,
  ],
  imports: [
    IonicPageModule.forChild(Man34001ListPage),
    PipesModule,
  ],
})
export class Man34001ListPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManMainPage } from './man-main';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    ManMainPage,
  ],
  imports: [
    IonicPageModule.forChild(ManMainPage),
    PipesModule,
  ],
})
export class ManMainPageModule {}

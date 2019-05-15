import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Orgn11ListPage } from './orgn11-list';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    Orgn11ListPage,
  ],
  imports: [
    IonicPageModule.forChild(Orgn11ListPage),
    PipesModule,
  ],
})
export class Orgn11ListModule {}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Engr01ListPage } from './engr01-list';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    Engr01ListPage,
  ],
  imports: [
    IonicPageModule.forChild(Engr01ListPage),
    PipesModule,
  ],
  exports:[Engr01ListPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Engr01ListPageModule {}

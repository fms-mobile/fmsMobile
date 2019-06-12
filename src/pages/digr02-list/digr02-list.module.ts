import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Digr02ListPage } from './digr02-list';
import { SwipeToDismissLayout2Module } from '../../components/list-view/swipe-to-dismiss/layout-2/swipe-to-dismiss-layout-2.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    Digr02ListPage,
  ],
  imports: [
    IonicPageModule.forChild(Digr02ListPage),
    SwipeToDismissLayout2Module,
    PipesModule,
  ],
  exports:[Digr02ListPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Digr02ListPageModule {}

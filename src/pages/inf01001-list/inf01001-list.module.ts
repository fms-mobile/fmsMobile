import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Inf01001ListPage } from './inf01001-list';
import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    Inf01001ListPage,
  ],
  imports: [
    IonicPageModule.forChild(Inf01001ListPage),
    PipesModule,
    ComponentsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Inf01001ListPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DigrTabWrite } from './digr-tab-write';

@NgModule({
  declarations: [
    DigrTabWrite,
  ],
  imports: [
    IonicPageModule.forChild(DigrTabWrite),
  ],
})
export class DigrTabWriteModule {}

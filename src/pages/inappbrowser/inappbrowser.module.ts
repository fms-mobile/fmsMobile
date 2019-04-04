import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Inappbrowser } from './inappbrowser';

@NgModule({
  declarations: [
    Inappbrowser,
  ],
  imports: [
    IonicPageModule.forChild(Inappbrowser),
  ],
})
export class InappbrowserModule {}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FacilPartSearchModalPage } from './facil-part-search-modal';

@NgModule({
  declarations: [
    FacilPartSearchModalPage,
  ],
  imports: [
    IonicPageModule.forChild(FacilPartSearchModalPage),
  ],
  exports:[FacilPartSearchModalPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FacilPartSearchModalPageModule {}

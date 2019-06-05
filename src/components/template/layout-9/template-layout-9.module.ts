import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TemplateLayout9 } from './template-layout-9';

@NgModule({
    declarations: [
        TemplateLayout9,
    ],
    imports: [
        IonicPageModule.forChild(TemplateLayout9),
    ],
    exports: [
        TemplateLayout9
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class TemplateLayout9Module { }

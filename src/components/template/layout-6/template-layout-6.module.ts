import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TemplateLayout6 } from './template-layout-6';

@NgModule({
    declarations: [
        TemplateLayout6,
    ],
    imports: [
        IonicPageModule.forChild(TemplateLayout6),
    ],
    exports: [
        TemplateLayout6
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class TemplateLayout6Module { }

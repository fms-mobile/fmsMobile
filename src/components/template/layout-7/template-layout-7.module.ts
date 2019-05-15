import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TemplateLayout7 } from './template-layout-7';

@NgModule({
    declarations: [
        TemplateLayout7,
    ],
    imports: [
        IonicPageModule.forChild(TemplateLayout7),
    ],
    exports: [
        TemplateLayout7
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class TemplateLayout7Module { }

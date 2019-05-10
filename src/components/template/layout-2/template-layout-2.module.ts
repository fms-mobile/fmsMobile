import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TemplateLayout2 } from './template-layout-2';

@NgModule({
    declarations: [
        TemplateLayout2,
    ],
    imports: [
        IonicPageModule.forChild(TemplateLayout2),
    ],
    exports: [
        TemplateLayout2
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class TemplateLayout2Module { }

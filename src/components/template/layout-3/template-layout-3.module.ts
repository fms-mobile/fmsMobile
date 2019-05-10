import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TemplateLayout3 } from './template-layout-3';
import { ElasticHeaderModule } from '../../elastic-header/elastic-header.module';

@NgModule({
    declarations: [
        TemplateLayout3,
    ],
    imports: [
        IonicPageModule.forChild(TemplateLayout3),
        ElasticHeaderModule
    ],
    exports: [
        TemplateLayout3
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class TemplateLayout3Module { }

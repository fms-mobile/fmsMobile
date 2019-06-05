import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TemplateLayout8 } from './template-layout-8';
import { ElasticHeaderModule } from '../../elastic-header/elastic-header.module';

@NgModule({
    declarations: [
        TemplateLayout8,
    ],
    imports: [
        IonicPageModule.forChild(TemplateLayout8),
        ElasticHeaderModule
    ],
    exports: [
        TemplateLayout8
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class TemplateLayout8Module { }

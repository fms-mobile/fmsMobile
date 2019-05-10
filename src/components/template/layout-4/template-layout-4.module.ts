import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TemplateLayout4 } from './template-layout-4';
import { ElasticHeaderModule } from '../../elastic-header/elastic-header.module';

@NgModule({
    declarations: [
        TemplateLayout4,
    ],
    imports: [
        IonicPageModule.forChild(TemplateLayout4),
        ElasticHeaderModule
    ],
    exports: [
        TemplateLayout4
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class TemplateLayout4Module { }

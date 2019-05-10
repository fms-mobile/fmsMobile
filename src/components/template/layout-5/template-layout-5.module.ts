import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TemplateLayout5 } from './template-layout-5';
import { ElasticHeaderModule } from '../../elastic-header/elastic-header.module';

@NgModule({
    declarations: [
        TemplateLayout5,
    ],
    imports: [
        IonicPageModule.forChild(TemplateLayout5),
        ElasticHeaderModule
    ],
    exports: [
        TemplateLayout5
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class TemplateLayout5Module { }

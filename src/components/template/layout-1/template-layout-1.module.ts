import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TemplateLayout1 } from './template-layout-1';
import { ElasticHeaderModule } from '../../elastic-header/elastic-header.module';

@NgModule({
    declarations: [
        TemplateLayout1,
    ],
    imports: [
        IonicPageModule.forChild(TemplateLayout1),
        ElasticHeaderModule
    ],
    exports: [
        TemplateLayout1
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class TemplateLayout1Module { }

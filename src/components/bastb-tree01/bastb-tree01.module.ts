import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BastbTree01Component } from './bastb-tree01';
import { Tree01ChildComponent } from './tree01-child-item';

@NgModule({
    declarations: [
        BastbTree01Component,
        Tree01ChildComponent,
    ],
    imports: [
        IonicPageModule.forChild(BastbTree01Component),
    ],
    exports: [
        BastbTree01Component
    ],
    entryComponents: [Tree01ChildComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class BastbTree01ComponentModule { }

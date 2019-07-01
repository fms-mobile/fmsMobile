import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchBoxComponent } from './search-box';

@NgModule({
    declarations: [
        SearchBoxComponent,
    ],
    imports: [
        IonicPageModule.forChild(SearchBoxComponent),
    ],
    exports: [
        SearchBoxComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class SearchBoxComponentModule { }

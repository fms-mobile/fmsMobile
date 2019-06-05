import { Component, Input, OnChanges } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'template-layout-9',
    templateUrl: 'template.html'
})
export class TemplateLayout9 implements OnChanges {
    @Input('data') data: any;
    @Input('events') events: any;

    constructor() { }

    ngOnChanges(changes: { [propKey: string]: any }) {
        this.data = changes['data'].currentValue;
    }
    
    onEvent = (event: string, item: any): void => {
        if (this.events[event]) {
            this.events[event](item);
        }
    }
}

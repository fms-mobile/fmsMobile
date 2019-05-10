import { Component, Input, ViewChild, OnChanges, AfterViewInit } from '@angular/core';
import { IonicPage, Content, FabButton } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'template-layout-3',
    templateUrl: 'template.html'
})
export class TemplateLayout3 implements OnChanges, AfterViewInit {
    @Input() data: any;
    @Input() events: any;
    @ViewChild(Content)
    content: Content;
    @ViewChild(FabButton)
    fabButton: FabButton;

    constructor() { }

    onEvent(event: string, item: any, e: any) {
        if (e) {
            e.stopPropagation();
        }
        if (this.events[event]) {
            this.events[event](item);
        }
    }

    ngOnChanges(changes: { [propKey: string]: any }) {
        this.subscribeToIonScroll();
     }

     ngAfterViewInit() {
         this.subscribeToIonScroll();
     }

     subscribeToIonScroll() {
         if (this.content != null && this.content.ionScroll != null) {
             this.content.ionScroll.subscribe((d) => {
                 this.fabButton.setElementClass("fab-button-out", d.directionY == "down");
             });
         }
     }
}

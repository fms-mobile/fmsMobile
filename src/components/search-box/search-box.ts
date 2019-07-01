import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicPage } from 'ionic-angular';

/**
 * Generated class for the SearchBoxComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@IonicPage()
@Component({
  selector: 'search-box',
  templateUrl: 'search-box.html'
})
export class SearchBoxComponent {
  headerImage : string = 'assets/images/background/31.jpg';
  searchTerm : string;
  @Input('title') title : string;
  @Input('subTitle') subTitle : string;
  @Input('searchDataList') searchDataList : Array<any>;

  @Output() blurEmitter : EventEmitter<Object> = new EventEmitter();

  constructor() {
  }

  blurEvent() {
    this.blurEmitter.emit();
  }
}

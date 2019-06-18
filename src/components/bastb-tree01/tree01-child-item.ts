import { Component, Input } from '@angular/core';

/**
 * Generated class for the BastbTree01Component component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

export interface ChildComponentIterface {
  treeList : any;
  changeSearchTree01 : Function;
  parentTree : any;
}

@Component({
  selector: 'tree01-child-item',
  template: `
    <ion-item *ngIf="treeList">
      <ion-label item-title>부재선택 {{treeList[0].ranking}}</ion-label>
      <ion-select (ionChange)="changeSearchTree01.call(parentTree,$event, treeList)" multiple="false" interface="action-sheet">
        <ion-label>부재선택 {{treeList[0].ranking}}</ion-label>
        <ion-option *ngFor="let treeObj of treeList;" [value]="treeObj.object_no">{{treeObj.object_nm}}</ion-option>
        <ion-option value=''>해당없음</ion-option>
      </ion-select>
    </ion-item>
  `,
})
export class Tree01ChildComponent implements ChildComponentIterface{
  @Input('treeList') treeList;
  @Input('changeSearchTree01') changeSearchTree01;
  @Input('parent') parentTree;
  
  constructor() {}
}

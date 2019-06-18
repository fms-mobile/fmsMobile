import { Component, Input, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, Inject } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage } from 'ionic-angular';
import { Tree01ChildComponent, ChildComponentIterface } from './tree01-child-item';

/**
 * Generated class for the BastbTree01Component component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
const TREE01_KEY = 'PR_BASTB_TREE01_LIST';



@IonicPage()
@Component({
  selector: 'bastb-tree01',
  templateUrl: 'bastb-tree01.html',
})
export class BastbTree01Component implements OnInit {
  @Input('facil_no') facil_no: string;
  @ViewChild('treeList',{ read : ViewContainerRef }) treeList : ViewContainerRef;

  tree01List : Array<any>;
  recursiveTreeList: Array<any>;
  searchTree01 : any;

  factoryResolver : any;

   constructor(private storage : Storage, @Inject(ComponentFactoryResolver) factoryResolver
  ) {
    this.factoryResolver = factoryResolver;
  }

  ngOnInit(){
    this.storage.get(TREE01_KEY).then(res => {
      this.tree01List = res[this.facil_no];
    }).then(() => {
      let tree01List = this.tree01List;

      if(tree01List.length > 0) {
        this.recursiveTreeList = tree01List.filter(item => item.ranking == '1');
        this.recursiveSearch(this.recursiveTreeList);
        this.createItem(this.recursiveTreeList);
      }
    });
  }

  recursiveSearch(recursiveTreeList : Array<any>) {
    if(!recursiveTreeList) return;

    if(recursiveTreeList.length < 1) return;

    let tree01List = Object.assign(new Array<any>(),this.tree01List) ;

    recursiveTreeList.forEach(parentItem => {
      let children = tree01List.filter(childItem => childItem.upper_no == parentItem.object_no);
      parentItem.children = children;
      this.recursiveSearch(parentItem.children);
    });
  }

  changeSearchTree01(object_no, treeList){
    if(object_no) {
      this.searchTree01 = treeList.find(item => item.object_no == object_no);
      if(this.searchTree01.children.length > 0) {
        this.createItem(this.searchTree01.children);
      }
    } else {
      this.searchTree01 = null;
    }
  }

  createItem(treeList) {
    const childComponent = this.factoryResolver
                        .resolveComponentFactory(Tree01ChildComponent);

    let ref = this.treeList.createComponent(childComponent);
    (<ChildComponentIterface>ref.instance).treeList = treeList;
    (<ChildComponentIterface>ref.instance).changeSearchTree01 = this.changeSearchTree01;
    (<ChildComponentIterface>ref.instance).parentTree = this;
  }
}


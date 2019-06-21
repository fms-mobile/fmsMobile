import { Component, Input, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, Inject, ViewChildren, QueryList, Output, EventEmitter } from '@angular/core';
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

export class SearchData {
  data : any;
  isLast : boolean;
  parentList : Array<any>;
}

@IonicPage()
@Component({
  selector: 'bastb-tree01',
  templateUrl: 'bastb-tree01.html',
})
export class BastbTree01Component implements OnInit {
  @Input('facil_no') facil_no: string;
  @ViewChild('treeList',{ read : ViewContainerRef }) treeList : ViewContainerRef;
  @ViewChildren(Tree01ChildComponent) treeChildren : QueryList<Tree01ChildComponent>;
  
  @Output() changeEmitter : EventEmitter<SearchData> = new EventEmitter();

  components : Array<any> = [];
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
        const ranking = Number(treeList[0].ranking);

        let removeArr = this.components.filter((item,index) => {
          if(index + 1 > ranking) return true;
        })
        this.components.splice(ranking);
        removeArr.forEach((item) => {
          this.treeList.remove(this.treeList.indexOf(item));
        });

        this.createItem(this.searchTree01.children);
      }
    } else {
      this.searchTree01 = null;
    }

    let searchData = new SearchData();
    searchData.data = this.searchTree01;
    searchData.isLast = this.isTree01Last();
    let parentList = [];
    this.recursiveParentTree01(this.searchTree01,parentList);
    searchData.parentList = parentList
    
    this.changeEmitter.emit(searchData);
  }

  createItem(children) {
    const childComponentFactory = this.factoryResolver
                        .resolveComponentFactory(Tree01ChildComponent);

    const childComponent = this.treeList.createComponent(childComponentFactory);
    (<ChildComponentIterface>childComponent.instance).treeList = children;
    (<ChildComponentIterface>childComponent.instance).changeSearchTree01 = this.changeSearchTree01;
    (<ChildComponentIterface>childComponent.instance).parentTree = this;
    this.components.push(childComponent);
  }

  getTree01() {
    return this.searchTree01;
  }

  isTree01Last() {
    let isLast : boolean = false;
    if(this.searchTree01) {
      if(!this.searchTree01.children || this.searchTree01.children.length < 1) {
        isLast = true;
      } else {
        isLast = false;
      }
    }

    return isLast;
  }

  getParentTree01(tree01) {
    return this.tree01List.find(item => item.object_no == tree01.upper_no);
  }

  recursiveParentTree01(tree01, array :Array<any>) {
    let parentTree01 = this.getParentTree01(tree01);
    if(parentTree01) {
      array.push(parentTree01);
      this.recursiveParentTree01(parentTree01,array);
    }
  }

}


import { BASTB_MAST01VO } from './../../model/BASTB_MAST01VO';
import { Digr02List } from './../digr02-list/digr02-list';
import { Component, Renderer2, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GlobalVars } from '../../services/GlobalVars';

/**
 * Generated class for the Mast01List page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-mast01-list',
  templateUrl: 'mast01-list.html',
})
export class Mast01List {
  public bastbMast01List : [BASTB_MAST01VO];
  public numberOfItemsToDisplay : number = 10;
  selectedList : [{}];

  constructor(public navCtrl: NavController, public navParams: NavParams, public globalVars:GlobalVars
    ,private renderer: Renderer2,private elementRef : ElementRef) {
    this.goSearch();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Mast01List');
  }

  goSearch(){
    this.globalVars.db.bastbMast01.list001({pagCount:this.numberOfItemsToDisplay}, (res) => {
      this.bastbMast01List = res;
    });
  }

  selectMast01(event :any){
    let ionItem = event.target.closest("ion-item");

    const selected = ionItem.classList.contains("selected");

    if(selected) {
      this.renderer.removeClass(ionItem, "selected");
    } else {
      this.renderer.addClass(ionItem, "selected");
    }
  }

  goSave(){
    this.selectedList = this.elementRef.nativeElement.querySelectorAll('.selected');
    let itemList = this.elementRef.nativeElement.querySelectorAll('ion-item');

    let i = 0;
    let selectMast01List = this.globalVars.selectedMast01List;
    let item :any;

    for(i;i<itemList.length;i++) {
      item = itemList[i];

      if(item.classList.contains("selected")) {
        let mast01Item : BASTB_MAST01VO =  this.bastbMast01List[i];
        if(!this.matchMast01(mast01Item)) {
          selectMast01List.push(this.bastbMast01List[i]);
        }
      }
    }

    this.navCtrl.push(Digr02List,selectMast01List);
  }

  private matchMast01(item : any){
    let isResult : Boolean = false; 
    let selectMast01List = this.globalVars.selectedMast01List;
    let len = selectMast01List.length;
    let i = 0;

    for (i;i<len;i++) {
      let selectMast01 : BASTB_MAST01VO = selectMast01List[i];

      switch (typeof item) {
        case "string":
          if(selectMast01.facil_no == item) {
            isResult = true;
            break;
          }
          break;
        case "object":
          if(selectMast01.facil_no == item.facil_no) {
            isResult = true;
            break;
          }
          break;
        default:
          break;
      }
    }

    return isResult;
  }
}

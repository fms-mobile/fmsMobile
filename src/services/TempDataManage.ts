
import { Injectable } from '@angular/core';

import { DIGR01_GROUPDTO } from './../model/DIGR01_GROUPDTO';
import { LOCTB_DATA01DTO } from './../model/LOCTB_DATA01DTO';
import { GlobalVars } from './GlobalVars';
import { AuthService } from './AuthService';
import { Storage } from '@ionic/storage';
import { LoadingService } from './loading-service';
import { AuthGuardService } from './AuthGuardService';

@Injectable()
export class TempDataManage {
    public digr01GroupList : Array<DIGR01_GROUPDTO>;

    /**
     * 데이터 구조
     * DIGR01_GROUPDTO => 점검진단실적  {
     *  uuid string => 임시키
     *  digr01 MANTB_DIGR01DTO => 점검개요
     *  digr02List Array<MANTB_DIGR01DTO> => 대상 시설물 
     *  engr01List Array<MANTB_ENGR01DTO> => 참여기술자
     *  selectedMast01List Array<BASTB_MAST01DTO> => 선택 시설물 기본현황
     * }
     */
    constructor(public globalVars : GlobalVars, public authService : AuthService, private authGuardService :AuthGuardService,
        private storage: Storage,private loadingService: LoadingService,){
        this.digr01GroupList = new Array<DIGR01_GROUPDTO>();
    }
    
    public createDigr01Group() : DIGR01_GROUPDTO {
        let digr01Group = new DIGR01_GROUPDTO();
        this.digr01GroupList.push(digr01Group);

        return digr01Group;
    }

    public checkDigr01GroupValidate(index : number): boolean {
        let isChecked = true;
        index ? "" : index = this.digr01GroupList.length - 1;

        let digr01Group = this.digr01GroupList[index];

        if(!digr01Group.digr01.start_ymd) isChecked = false;
        if(!digr01Group.digr01.end_ymd) isChecked = false;
        if(!digr01Group.digr01.regular_gbn) isChecked = false;
        if(digr01Group.digr02List.length < 1) isChecked = false;

        return isChecked;
    }
    
    public indexDigr01Group(searchDigr01Group:DIGR01_GROUPDTO) : number {
        let index : number;
        let len = this.digr01GroupList.length;
        let i = 0;

        for (i;i<len;i++) {
            let digr01Group : DIGR01_GROUPDTO = this.digr01GroupList[i];

            if(digr01Group.uuid == searchDigr01Group.uuid) {
                index = i;
                break;
            }
        }

        return index;
    }

    public localSave(){
        this.loadingService.show();
        this.storage.set(this.authService.user.sub,JSON.stringify(this.digr01GroupList)).then(res => {
            this.loadingService.hide();
        });
    }

    public localDelete(digr01) {
        this.localSave();
    }

    public autoSave() {
        if(this.authGuardService.canActivate()) {
            this.storage.set(this.authService.user.sub,JSON.stringify(this.digr01GroupList));
        }
    }

    public loadLoctbData01() {
        let user_id = this.authService.user.sub;
        //
        this.digr01GroupList = new Array<DIGR01_GROUPDTO>();
        let that = this;

        this.loadingService.show();
        return this.storage.get(this.authService.user.sub).then((res : string) => {
            if(res) {
                let parseArray : Array<DIGR01_GROUPDTO> = JSON.parse(res);

                parseArray.forEach(loctbData01 => {
                    let digr01Group : DIGR01_GROUPDTO = new DIGR01_GROUPDTO();
                    Object.assign(digr01Group,loctbData01);
                    that.digr01GroupList.push(digr01Group);
                });
            }
            that.loadingService.hide();
        });

    }
}
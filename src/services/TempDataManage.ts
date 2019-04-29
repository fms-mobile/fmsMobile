
import { Injectable } from '@angular/core';

import { DIGR01_GROUPDTO } from './../model/DIGR01_GROUPDTO';
import { LOCTB_DATA01DTO } from './../model/LOCTB_DATA01DTO';
import { GlobalVars } from './GlobalVars';

@Injectable()
export class TempDataManage {
    public digr01GroupList : Array<DIGR01_GROUPDTO>;

    /**
     * 데이터 구조
     * DIGR01_GROUPDTO => 점검진단실적  {
     *  uuid string => 임시키
     *  digr01 MANTB_DIGR01DTO => 점검개요
     *  digr02List Array<MANTB_DIGR01DTO> => 대상 시설물 
     *  digr11List Array<MANTB_DIGR11DTO> => 참여기술자
     *  selectedMast01List Array<BASTB_MAST01DTO> => 선택 시설물 기본현황
     * }
     */

    constructor(public globalVars : GlobalVars){
        this.digr01GroupList = new Array<DIGR01_GROUPDTO>();
        this.loadLoctbData01();
    }
    
    public createDigr01Group() : DIGR01_GROUPDTO {
        let digr01Group = new DIGR01_GROUPDTO();
        this.digr01GroupList.push(digr01Group);

        return digr01Group;
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
        this.digr01GroupList.forEach(digr01 => {
            let loctbData01 : LOCTB_DATA01DTO = new LOCTB_DATA01DTO();
            let jsonStr = JSON.stringify(digr01);

            loctbData01.object_contents = jsonStr;
            loctbData01.object_id = digr01.uuid;
            loctbData01.user_id = this.globalVars.userInfo.user_id;
            // 
            loctbData01.user_id = 'chonju';
            this.globalVars.db.loctbData01.insert(loctbData01,(res) =>{

            });
        });
    }

    public loadLoctbData01() {
        let user_id = this.globalVars.userInfo.user_id;
        //
        user_id = 'chonju';
        let that = this;
        this.globalVars.db.loctbData01.list001({"user_id":user_id},(res) =>{
            res.forEach(loctbData01 => {
                let digr01Group : DIGR01_GROUPDTO = new DIGR01_GROUPDTO();
                let parseObject = JSON.parse(loctbData01.object_contents);
                Object.assign(digr01Group,parseObject);
                that.digr01GroupList.push(digr01Group);
            });
        });
    }
}
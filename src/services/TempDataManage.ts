
import { Injectable } from '@angular/core';

import { DIGR01_GROUPVO } from './../model/DIGR01_GROUPVO';

@Injectable()
export class TempDataManage {
    public digr01GroupList : Array<DIGR01_GROUPVO>;

    /**
     * 데이터 구조
     * DIGR01_GROUPVO => 점검진단실적  {
     *  uuid string => 임시키
     *  digr01 MANTB_DIGR01VO => 점검개요
     *  digr02List Array<MANTB_DIGR01VO> => 대상 시설물 
     *  digr11List Array<MANTB_DIGR11VO> => 참여기술자
     *  selectedMast01List Array<BASTB_MAST01VO> => 선택 시설물 기본현황
     * }
     */

    constructor(){
		this.digr01GroupList = new Array<DIGR01_GROUPVO>();
    }
    
    public createDigr01Group() : DIGR01_GROUPVO {
        let digr01Group = new DIGR01_GROUPVO();
        this.digr01GroupList.push(digr01Group);

        return digr01Group;
    }
    
    public indexDigr01Group(searchDigr01Group:DIGR01_GROUPVO) : number {
        let index : number;
        let len = this.digr01GroupList.length;
        let i = 0;

        for (i;i<len;i++) {
            let digr01Group : DIGR01_GROUPVO = this.digr01GroupList[i];

            if(digr01Group.uuid == searchDigr01Group.uuid) {
                index = i;
                break;
            }
        }

        return index;
    }
}
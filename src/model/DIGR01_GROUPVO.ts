import { Injectable } from '@angular/core';
import { BASTB_MAST01VO } from './BASTB_MAST01VO';
import { MANTB_DIGR01VO } from './MANTB_DIGR01VO';
import { MANTB_DIGR11VO } from './MANTB_DIGR11VO';
import { UUID } from 'angular2-uuid';

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
@Injectable()
export class DIGR01_GROUPVO {
    public uuid : string;
    public digr01 : MANTB_DIGR01VO;
    public digr02List : Array<MANTB_DIGR01VO>;
    public digr11List : Array<MANTB_DIGR11VO>;
    
    public selectedMast01List : Array<BASTB_MAST01VO>;

    constructor(){
        this.uuid = UUID.UUID();
        this.digr01 = new MANTB_DIGR01VO();
        this.digr02List = new Array<MANTB_DIGR01VO>();
        this.digr11List = new Array<MANTB_DIGR11VO>();
        this.selectedMast01List = new Array<BASTB_MAST01VO>();
    }
    
    public matchSelectedMast01List(bastbMast01VO : BASTB_MAST01VO){
        let isResult : Boolean = false; 
        let selectedMast01List = this.selectedMast01List;
        let len = selectedMast01List.length;
        let i = 0;

        for (i;i<len;i++) {
            let selectMast01 : BASTB_MAST01VO = selectedMast01List[i];

            if(selectMast01.facil_no == bastbMast01VO.facil_no) {
                isResult = true;
                break;
            }
        }

        return isResult;
    }
}
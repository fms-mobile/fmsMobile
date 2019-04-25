import { Injectable } from '@angular/core';
import { BASTB_MAST01DTO } from './BASTB_MAST01DTO';
import { MANTB_DIGR01DTO } from './MANTB_DIGR01DTO';
import { MANTB_DIGR11DTO } from './MANTB_DIGR11DTO';
import { UUID } from 'angular2-uuid';

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
@Injectable()
export class DIGR01_GROUPDTO {
    public uuid : string;
    public digr01 : MANTB_DIGR01DTO;
    public digr02List : Array<MANTB_DIGR01DTO>;
    public digr11List : Array<MANTB_DIGR11DTO>;
    
    public selectedMast01List : Array<BASTB_MAST01DTO>;

    constructor(){
        this.uuid = UUID.UUID();
        this.digr01 = new MANTB_DIGR01DTO();
        this.digr02List = new Array<MANTB_DIGR01DTO>();
        this.digr11List = new Array<MANTB_DIGR11DTO>();
        this.selectedMast01List = new Array<BASTB_MAST01DTO>();
    }
    
    public matchSelectedMast01List(bastbMast01DTO : BASTB_MAST01DTO){
        let isResult : Boolean = false; 
        let selectedMast01List = this.selectedMast01List;
        let len = selectedMast01List.length;
        let i = 0;

        for (i;i<len;i++) {
            let selectMast01 : BASTB_MAST01DTO = selectedMast01List[i];

            if(selectMast01.facil_no == bastbMast01DTO.facil_no) {
                isResult = true;
                break;
            }
        }

        return isResult;
    }
}
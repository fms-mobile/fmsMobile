import { Injectable } from '@angular/core';
import { BASTB_MAST01DTO } from './BASTB_MAST01DTO';
import { MANTB_DIGR01DTO } from './MANTB_DIGR01DTO';
import { MANTB_DIGR11DTO } from './MANTB_DIGR11DTO';
import { UUID } from 'angular2-uuid';
import { MANTB_DIGR12DTO } from './MANTB_DIGR12DTO';
import { MANTB_DIGR13DTO } from './MANTB_DIGR13DTO';
import { COMTB_REPT01DTO } from './COMTB_REPT01DTO';
import { COMTB_FILE01DTO } from './COMTB_FILE01DTO';

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
    
    matchSelectedMast01List(bastbMast01DTO : BASTB_MAST01DTO){
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

    convertServerObject() : Object {
        // MANTB_DIGR01로 변환
        let returnObject = {};
        let digr01 = this.digr01;
        let digr02List : Array<MANTB_DIGR01DTO> = new Array<MANTB_DIGR01DTO>();
        let digr12List : Array<MANTB_DIGR12DTO> = new Array<MANTB_DIGR12DTO>();
        let digr13List : Array<MANTB_DIGR13DTO> = new Array<MANTB_DIGR13DTO>();
        let rept01List : Array<COMTB_REPT01DTO> = new Array<COMTB_REPT01DTO>();
        let file01List : Array<COMTB_FILE01DTO> = new Array<COMTB_FILE01DTO>();

        this.digr02List.forEach((data : MANTB_DIGR01DTO)=> {
            let copyData = Object.assign({}, data);

            copyData.regular_gbn = digr01.regular_gbn;
            copyData.start_ymd = digr01.start_ymd;
            copyData.end_ymd = digr01.end_ymd;
            copyData.wrt_person_nm = digr01.wrt_person_nm;
            
            if(copyData.digr12Object) {
                copyData.digr12Object.forEach((digr12)=> {
                    digr12List.push(digr12);
                });
                delete copyData.digr12Object;
            }

            if(copyData.digr13Object){
                copyData.digr13Object.forEach((digr13)=> {
                    digr13List.push(digr13);
                });
                delete copyData.digr13Object;
            }

            if(copyData.comtbRept01) {
                rept01List.push(copyData.comtbRept01);
                delete copyData.comtbRept01;
            }

            if(copyData.comtbFile01Array) {
                copyData.comtbFile01Array.forEach((file01)=>{
                    file01List.push(file01);
                });
                delete copyData.comtbFile01Array;
            }

            digr02List.push(copyData);
        });
        returnObject["MANTB_DIGR01"] = digr02List;
        returnObject["MANTB_DIGR11"] = this.digr11List;
        returnObject["MANTB_DIGR12"] = digr12List;
        returnObject["MANTB_DIGR13"] = digr13List;
        returnObject["COMTB_REPT01"] = rept01List;
        returnObject["COMTB_FILE01"] = file01List;

        return returnObject;
    }
}
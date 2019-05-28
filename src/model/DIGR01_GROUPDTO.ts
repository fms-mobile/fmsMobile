import { Injectable } from '@angular/core';
import { BASTB_MAST01DTO } from './BASTB_MAST01DTO';
import { MANTB_DIGR01DTO } from './MANTB_DIGR01DTO';
import { MANTB_DIGR11DTO } from './MANTB_DIGR11DTO';
import { UUID } from 'angular2-uuid';
import { MANTB_DIGR12DTO } from './MANTB_DIGR12DTO';
import { MANTB_DIGR13DTO } from './MANTB_DIGR13DTO';
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
    public transFlag : boolean = false;
    public digr01 : MANTB_DIGR01DTO;
    public digr02List : Array<MANTB_DIGR01DTO>;
    public digr11List : Array<MANTB_DIGR11DTO>;
    responseObject : any;
    
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
        returnObject["uuid"] = this.uuid;
        let digr01 = this.digr01;
        let digr02List : Array<MANTB_DIGR01DTO> = new Array<MANTB_DIGR01DTO>();
        let file01List : Array<COMTB_FILE01DTO> = new Array<COMTB_FILE01DTO>();

        this.digr02List.forEach((data : MANTB_DIGR01DTO)=> {
            let digr11List : Array<MANTB_DIGR11DTO> = new Array<MANTB_DIGR11DTO>();
            let digr12List : Array<MANTB_DIGR12DTO> = new Array<MANTB_DIGR12DTO>();
            let digr13List : Array<MANTB_DIGR13DTO> = new Array<MANTB_DIGR13DTO>();

            let tempData = Object.assign({}, data);

            let copyData = this.convertBoolean(tempData);
            
            copyData.regular_gbn = digr01.regular_gbn;
            copyData.start_ymd = digr01.start_ymd;
            copyData.end_ymd = digr01.end_ymd;
            copyData.wrt_person_nm = digr01.wrt_person_nm;
            copyData.dign_corp_cd = digr01.dign_corp_cd;
            copyData.dign_corp_nm = digr01.dign_corp_nm;

            // 환기구 로직 적용
            if('TU|AR|UC'.indexOf(copyData.facil_no.slice(0,2)) > -1 ) {
                const splitKey = 'Ð';
                let vent_yn = (copyData.vent_yn == 'Y') ? 'Y' : 'N';
                copyData.vent_content = vent_yn + splitKey + copyData.vent_chk_result + splitKey + copyData.vent_amend_yn
            } else {
                copyData.vent_content = '';
            }
            
            // 중대결함
            if(copyData.digr12Array) {
                copyData.digr12Array.forEach((digr12)=> {
                    digr12.comtbFile01Array.forEach((file01)=>{
                        file01["facil_no"] = copyData.facil_no;
                        file01["defect_cd"] = digr12.defect_cd;
                        file01List.push(file01);
                    });
                    digr12List.push(digr12);
                });
                delete copyData.digr12Array;
                copyData["MANTB_DIGR12"] = digr12List;
            }

            // 정기점검표
            if(copyData.digr13Array){
                copyData.digr13Array.forEach((digr13)=> {
                    digr13List.push(this.convertBoolean(digr13));
                });
                delete copyData.digr13Array;
                copyData["MANTB_DIGR13"] = digr13List;
            }

            // 참여 기술자 -> 모든 시설물 정보에 바인딩됨
            this.digr11List.forEach((data : MANTB_DIGR11DTO)=> {
                let tempData = Object.assign({}, data);

                if(tempData.rep_yn) {
                    copyData.rep_engineer_nm = tempData.engineer_nm;
                }
    
                let copydigr11Data = this.convertBoolean(tempData);
                digr11List.push(copydigr11Data);
            });
            copyData["MANTB_DIGR11"] = digr11List;

            digr02List.push(copyData);
        });

        returnObject["MANTB_DIGR01"] = digr02List;
        returnObject["COMTB_FILE01"] = file01List;

        return returnObject;
    }

    private convertBoolean<T> (obj : T) : any {
        let copyData = Object.assign({}, obj);
        Object.getOwnPropertyNames(obj).forEach((key)=> {
            if(typeof obj[key] === 'boolean') {
                copyData[key] = (obj[key]) ? 'Y' : 'N';
            }
        });
        return copyData;
    }

    validateServerObject() : Object{
        let returnObject = new Object();
        let passFlag = true;
        let msg = "";

        // MANTB_DIGR01 체크
        let digr01 = this.digr01;

        while(true) {
            if(!digr01.regular_gbn || digr01.regular_gbn == '') {
                passFlag = false;
                msg = '점검개요 > 기간구분을 입력해주세요.';
                break;
            }
            if(!digr01.start_ymd || digr01.start_ymd == '') {
                passFlag = false;
                msg = '점검개요 > 점검진단 시작일을 입력해주세요.';
                break;
            }
            if(!digr01.end_ymd || digr01.end_ymd == '') {
                passFlag = false;
                msg = '점검개요 > 점검진단 종료일을 입력해주세요.';
                break;
            }
            if(!digr01.wrt_person_nm || digr01.wrt_person_nm == '') {
                passFlag = false;
                msg = '점검개요 > 작성자명을 입력해주세요.';
                break;
            }
            let digr02List = this.digr02List;
            if(digr02List.length < 1) {
                passFlag = false;
                msg = '대상시설물 목록 > 대상시설물을 최소 1개이상 입력해주세요.';
                break;
            }
            digr02List.forEach((digr02 : MANTB_DIGR01DTO)=> {
            });
    
            let digr11List = this.digr11List;
            if(digr11List.length < 1) {
                passFlag = false;
                msg = '참여기술자 목록 > 참여기술자를 최소 1명이상 입력해주세요.';
                break;
            }
    
            let digr11_rep_yn = false;
            digr11List.forEach((digr11 : MANTB_DIGR11DTO)=> {
                if(digr11.rep_yn) {
                    digr11_rep_yn = true;
                }
            });
            if(!digr11_rep_yn) {
                passFlag = false;
                msg = '참여기술자 목록 > 책임 참여기술자를 최소 1명이상 입력해주세요.';
                break;
            }
            break;
        }


        returnObject["passFlag"] = passFlag;
        returnObject["msg"] = msg;
        return returnObject;
    }

}
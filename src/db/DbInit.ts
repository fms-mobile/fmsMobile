import { Events, Platform  } from 'ionic-angular';
import { Injectable } from '@angular/core';

import { GlobalVars } from '../services/GlobalVars';
import { UtilService } from '../services/UtilService';

import { DbInitData } from './DbInitData';

import { COMTB_TEST01 } from './COMTB_TEST01';
import { BASTB_META01 } from './BASTB_META01';
import { COMTB_CODE02 } from './COMTB_CODE02';
import { COMTB_FILE01 } from './COMTB_FILE01';
import { COMTB_ORGN01 } from './COMTB_ORGN01';
import { COMTB_ORGN11 } from './COMTB_ORGN11';
import { COMTB_USER01 } from './COMTB_USER01';
import { BASTB_MAST01 } from './BASTB_MAST01';
import { MANTB_DIGR01 } from './MANTB_DIGR01';
import { MANTB_ENGR01 } from './MANTB_ENGR01';
import { MANTB_DIGR12 } from './MANTB_DIGR12';
import { MANTB_DIGR13 } from './MANTB_DIGR13';

@Injectable()
export class DbInit {
    public comtbTest01 : COMTB_TEST01;
    public bastbMeta01 : BASTB_META01;
    public comtbCode02 : COMTB_CODE02;
    public comtbFile01 : COMTB_FILE01;
    public comtbOrgn01 : COMTB_ORGN01;
    public comtbOrgn11 : COMTB_ORGN11;
    public comtbUser01 : COMTB_USER01;
    public bastbMast01 : BASTB_MAST01;
    public mantbDigr01 : MANTB_DIGR01;
    public mantbengr01 : MANTB_ENGR01;
    public mantbDigr12 : MANTB_DIGR12;
    public mantbDigr13 : MANTB_DIGR13;
    public wsdb;
    public daoMap;

    constructor(public events: Events,
        public platform: Platform,
        public globalVars: GlobalVars,
        public utilService : UtilService,
        public dbInitData : DbInitData) {
            var dbSize = 10 * 1024 * 1024; // 10MB
        
            this.globalVars.db = this;
            this.wsdb = (<any> window).openDatabase("db", "1.0", "SAMPLE DB", dbSize, function() {
                console.log('db successfully opened or created');
            }); 
            this.dbInitData;
            this.createTables(); 
            this.bastbMeta01 = new BASTB_META01(globalVars, utilService, this.wsdb);
            this.mantbDigr01 = new MANTB_DIGR01(globalVars, utilService, this.wsdb);
            this.bastbMast01 = new BASTB_MAST01(globalVars, utilService, this.wsdb);
            this.comtbCode02 = new COMTB_CODE02(globalVars, utilService, this.wsdb);
            this.mantbDigr13 = new MANTB_DIGR13(globalVars, utilService, this.wsdb);
            this.bastbMeta01 = new BASTB_META01(globalVars, utilService, this.wsdb);
            this.comtbUser01 = new COMTB_USER01(globalVars, utilService, this.wsdb);
            this.comtbOrgn01 = new COMTB_ORGN01(globalVars, utilService, this.wsdb);
            this.comtbOrgn11 = new COMTB_ORGN11(globalVars, utilService, this.wsdb);

            this.daoMap = {
                "BASTB_META01" : this.bastbMeta01,
                "COMTB_ORGN01" : this.comtbOrgn01,
                "COMTB_ORGN11" : this.comtbOrgn11,
                "BASTB_MAST01" : this.bastbMast01,
                "COMTB_USER01" : this.comtbUser01,
                "COMTB_CODE02" : this.comtbCode02,
            }
    }

    public createTables() {
        console.log("create tables");
        this.wsdb.transaction((txn) => {
            // 메타정보
		    txn.executeSql(" create table BASTB_META01 "
                    + " ( "
                    + "   entity_id     text, "
                    + "   entity_nm     text, "
                    + "   abbr_nm       text, "
                    + "   entity_type   text, "
                    + "   input_yn      char(1), "
                    + "   eval_entity   text, "
                    + "   entity_lvl    integer, "
                    + "   upper_id      text, "
                    + "   struct_kind   text, "
                    + "   object_key    text, "
                    + "   search_key    text, "
                    + "   weight        real, "
                    + "   sort_order    integer, "
                    + "   use_yn        char(1) "
                    + " ) ");
            txn.executeSql("select count(*) as cnt from BASTB_META01", [],  
            (transaction, resultSet) => {
            if (resultSet.rows.item(0).cnt == 0) {
                this.dbInitData.insertBASTB_META01(txn);
            }
            });
            // 공통코드
		    txn.executeSql("create table if not exists COMTB_CODE02 "
                    + " (code_group    text, "
                    + "  code1         text, "
                    + "  code2         text, "
                    + "  code3         text, "
                    + "  data1         text, "
                    + "  data2         text, "
                    + "  data3         text, "
                    + "  data4         text, "
                    + "  data5         text, "
                    + "  data6         text, "
                    + "  data7         text, "
                    + "  etc_yn        char(1), "
                    + "  use_yn        char(1), "
                    + "  sort_order    integer ) ");
            txn.executeSql("select count(*) as cnt from COMTB_CODE02", [],  
            (transaction, resultSet) => {
            if (resultSet.rows.item(0).cnt == 0) {
                this.dbInitData.insertCOMTB_CODE02(txn);
            }
            });
            // 첨부파일
		    txn.executeSql(" create table COMTB_FILE01 "
                    + " ( "
                    + "   file_no       integer, "
                    + "   file_nm       text, "
                    + "   file_path     text, "
                    + "   file_desc     text, "
                    + "   file_type     text, "
                    + "   file_size     integer, "
                    + "   download_cnt  integer, "
                    + "   ref_table     text, "
                    + "   ref_pk        text, "
                    + "   etc_remark    text "
                    + " ) ");
            txn.executeSql("select count(*) as cnt from COMTB_FILE01", [],  
            (transaction, resultSet) => {
            if (resultSet.rows.item(0).cnt == 0) {
                //this.dbInitData.insertCOMTB_FILE01(txn);
            }
            });
            // 기관정보
            txn.executeSql("create table if not exists COMTB_ORGN01 "
					 + " (group_cd      text, "
					 + "  group_nm      text, "
					 + "  upper_cd      text, "
					 + "  ref_cd        text, "
					 + "  region_cd     text, "
					 + "  sort_order    integer, "
					 + "  etc_remark    text "
					 + "   ) ");
            txn.executeSql("select count(*) as cnt from COMTB_ORGN01", [],  
            (transaction, resultSet) => {
            if (resultSet.rows.item(0).cnt == 0) {
                this.dbInitData.insertCOMTB_ORGN01(txn);
            }
            });
            // 관리주체 기술인력
            txn.executeSql(" create table COMTB_ORGN11 "
                    + " ( "
                    + "   group_cd          text, "
                    + "   member_seq        integer, "
                    + "   member_nm         text, "
                    + "   birth_ymd         text, "
                    + "   sex               char(1), "
                    + "   certi_field       text, "
                    + "   tech_items        text, "
                    + "   tech_items_etc    text, "
                    + "   tech_field        text, "
                    + "   school_career_cd  text, "
                    + "   career_year       integer, "
                    + "   tech_grade        text, "
                    + "   license_cd        text, "
                    + "   license_no        text, "
                    + "   certi_aqu_ymd     text, "
                    + "   certi_mod_ymd     text, "
                    + "   certi_ymd_from    text, "
                    + "   certi_ymd_to      text, "
                    + "   entry_ymd         text, "
                    + "   retire_ymd        text, "
                    + "   retire_yn         char(1) "
                    + " ) ");
            txn.executeSql("select count(*) as cnt from COMTB_ORGN11", [],  
            (transaction, resultSet) => {
            if (resultSet.rows.item(0).cnt == 0) {
                this.dbInitData.insertCOMTB_ORGN11(txn);
            }
            });
            // 회원정보
		    txn.executeSql(" create table COMTB_USER01 "
                    + " ( "
                    + "   user_id           text, "
                    + "   user_nm           text, "
                    + "   group_cd          text, "
                    + "   group_nm          text, "
                    + "   dept_nm           text, "
                    + "   position_nm       text, "
                    + "   pswd              text, "
                    + "   reside_key        text, "
                    + "   rep_user_yn       char(1), "
                    + "   facil_auth        text, "
                    + "   charge_auth       text, "
                    + "   sign_status       char(1) "
                    + " ) ");
            txn.executeSql("select count(*) as cnt from COMTB_USER01", [],  
            (transaction, resultSet) => {
            if (resultSet.rows.item(0).cnt == 0) {
                this.dbInitData.insertCOMTB_USER01(txn);
            }
            });
            // 시설물기본현황
		    txn.executeSql(" create table BASTB_MAST01 "
                    + " ( "
                    + "   facil_no         text, "
                    + "   facil_nm         text, "
                    + "   mng_main_cd      text, "
                    + "   facil_class      char(1), "
                    + "   facil_gbn        text, "
                    + "   facil_kind       text, "
                    + "   facil_desc_cd    text, "
                    + "   facil_form_cd    text, "
                    + "   facil_gbn_nm        text, "
                    + "   facil_kind_nm       text, "
                    + "   facil_desc_nm    text, "
                    + "   addr_sido        text, "
                    + "   addr_gugun       text, "
                    + "   addr_dong        text, "
                    + "   addr_detail      text, "
                    + "   remove_yn        char(1), "
                    + "   sign_status      char(1), "
                    + "   next_dign_ymd1   text, "
                    + "   next_dign_ymd2   text, "
                    + "   next_dign_ymd4   text, "
                    + "   next_dign_ymd5   text, "
                    + "   state_grade      char(1), "
                    + "   map_x           real, "
                    + "   map_y           real, "
                    + "   facil_spec1     text, "
                    + "   facil_spec2     text, "
                    + "   facil_spec3     text, "
                    + "   facil_spec4     text, "
                    + "   facil_spec5     text "
                    + " ) ");
            txn.executeSql("select count(*) as cnt from BASTB_MAST01", [],  
            (transaction, resultSet) => {
            if (resultSet.rows.item(0).cnt == 0) {
                this.dbInitData.insertBASTB_MAST01(txn);
            }
            });
            // 점검진단실적
            txn.executeSql(" create table MANTB_DIGR01 "
                    + " ( "
                    + "   facil_no         text, "
                    + "   dign_seq         integer, "
                    + "   project_no       text, "
                    + "   report_yy        text, "
                    + "   start_ymd        text, "
                    + "   end_ymd          text, "
                    + "   dign_gbn         text, "
                    + "   regular_gbn      text, "
                    + "   dign_corp_cd     text, "
                    + "   dign_corp_nm     text, "
                    + "   rep_engineer_nm  text, "
                    + "   dign_amt         real, "
                    + "   state_grade      char(1), "
                    + "   dign_content     text, "
                    + "   amend_content    text, "
                    + "   dign4_need_yn    char(1), "
                    + "   wrt_ymd          text, "
                    + "   wrt_person_nm    text, "
                    + "   local_yn         char(1) "
                    + " ) ");
            txn.executeSql("select count(*) as cnt from MANTB_DIGR01", [],  
            (transaction, resultSet) => {
            if (resultSet.rows.item(0).cnt == 0) {
                this.dbInitData.insertMANTB_DIGR01(txn);
            }
            });
            // 점검진단실적_참여기술자
            txn.executeSql(" create table MANTB_ENGR01 "
                    + " ( "
                    + "   facil_no      text, "
                    + "   dign_seq      integer, "
                    + "   engineer_seq  integer, "
                    + "   engineer_nm   text, "
                    + "   birth_ymd     text, "
                    + "   sex           char(1), "
                    + "   rep_yn        char(1), "
                    + "   start_ymd     text, "
                    + "   end_ymd       text, "
                    + "   parti_days    integer, "
                    + "   parti_rate    real, "
                    + "   tech_grade    text "
                    + " ) ");
            txn.executeSql("select count(*) as cnt from MANTB_ENGR01", [],  
            (transaction, resultSet) => {
            if (resultSet.rows.item(0).cnt == 0) {
                this.dbInitData.insertMANTB_ENGR01(txn);
            }
            });
            // 점검진단실적_중대결함
            txn.executeSql(" create table MANTB_DIGR12 "
                    + " ( "
                    + "   facil_no          text, "
                    + "   dign_seq          integer, "
                    + "   defect_cd         text, "
                    + "   object_no         text "
                    + " ) ");
            txn.executeSql("select count(*) as cnt from MANTB_DIGR12", [],  
            (transaction, resultSet) => {
            if (resultSet.rows.item(0).cnt == 0) {
                this.dbInitData.insertMANTB_DIGR12(txn);
            }
            });
            // 정기점검표
            txn.executeSql(" create table if not exists MANTB_DIGR13 "
                    + "  ( "
                    + "    facil_no       text, "
                    + "    dign_seq       integer, "
                    + "    check_seq      integer, "
                    + "    check_cd       text, "
                    + "    check_nm       text, "
                    + "    check_result   char(1), "
                    + "    amend_need_yn  char(1), "
                    + "    dign_opinion   text "
                    + "  ) ");

            txn.executeSql("select count(*) as cnt from MANTB_DIGR13", [],  
            (transaction, resultSet) => {
            if (resultSet.rows.item(0).cnt == 0) {
                this.dbInitData.insertMANTB_DIGR13(txn);
            }
            });
            // 공통보고서
            txn.executeSql(" create table if not exists COMTB_REPT01 "
                    + "  ( "
                    + "   rpt_no       integer, "
                    + "   ref_pk       text, "
                    + "   rpt_class    text, "
                    + "   rpt_content  text "
                    + "  ) ");

            txn.executeSql("select count(*) as cnt from COMTB_REPT01", [],  
            (transaction, resultSet) => {
            if (resultSet.rows.item(0).cnt == 0) {
                this.dbInitData.insertCOMTB_REPT01(txn);
            }
            });
        });
    }

    
}
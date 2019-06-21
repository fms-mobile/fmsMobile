import { GlobalVars } from '../services/GlobalVars';
import { UtilService } from '../services/UtilService';
import { COMMON_DAO } from './COMMON_DAO';

export class COMTB_ORGN11 implements COMMON_DAO {
    public wsdb : any;
    public utilService : UtilService;
    public globalVars : GlobalVars;
    constructor(public gv : GlobalVars,
                public us : UtilService,
                public db : any) {
            this.wsdb = db;
            this.utilService = us;
            this.globalVars = gv;
    }
    public insert(params, okFunction) {
        this.wsdb.transaction((txn) =>{
            var sqlMain = "insert into COMTB_ORGN11 ( "
			+ " group_cd "
			+ " , member_seq "
			+ " , member_nm "
			+ " , birth_ymd "
			+ " , sex "
			+ " , certi_field "
			+ " , tech_items "
			+ " , tech_items_etc "
			+ " , tech_field "
			+ " , school_career_cd "
			+ " , career_year "
			+ " , tech_grade "
			+ " , license_cd "
			+ " , license_no "
			+ " , certi_aqu_ymd "
			+ " , certi_mod_ymd "
			+ " , certi_ymd_from "
			+ " , certi_ymd_to "
			+ " , entry_ymd "
			+ " , retire_ymd "
			+ " , retire_yn "
    		+ " ) values ( "
			+ " "+this.utilService.nvl2(params.group_cd)+" "
			+ " , "+this.utilService.nvl2(params.member_seq)+" "
			+ " , "+this.utilService.nvl2(params.member_nm)+" "
			+ " , "+this.utilService.nvl2(params.birth_ymd)+" "
			+ " , "+this.utilService.nvl2(params.sex)+" "
			+ " , "+this.utilService.nvl2(params.certi_field)+" "
			+ " , "+this.utilService.nvl2(params.tech_items)+" "
			+ " , "+this.utilService.nvl2(params.tech_items_etc)+" "
			+ " , "+this.utilService.nvl2(params.tech_field)+" "
			+ " , "+this.utilService.nvl2(params.school_career_cd)+" "
			+ " , "+this.utilService.nvl2(params.career_year)+" "
			+ " , "+this.utilService.nvl2(params.tech_grade)+" "
			+ " , "+this.utilService.nvl2(params.license_cd)+" "
			+ " , "+this.utilService.nvl2(params.license_no)+" "
			+ " , "+this.utilService.nvl2(params.certi_aqu_ymd)+" "
			+ " , "+this.utilService.nvl2(params.certi_mod_ymd)+" "
			+ " , "+this.utilService.nvl2(params.certi_ymd_from)+" "
			+ " , "+this.utilService.nvl2(params.certi_ymd_to)+" "
			+ " , "+this.utilService.nvl2(params.entry_ymd)+" "
			+ " , "+this.utilService.nvl2(params.retire_ymd)+" "
			+ " , "+this.utilService.nvl2(params.retire_yn)+" "
    		+" ) ";
            //console.log(sqlMain);
            txn.executeSql(sqlMain, [],
                function(transaction, resultSet) {
                    okFunction(true);
            }, function (transaction, error) {
                console.log(error);
            });
        });
    }
    public delete(params, okFunction) {
        this.wsdb.transaction((txn) =>{
            var sqlMain = "delete from COMTB_ORGN11  "
            			+ " where 1=1 "
				+ " and group_cd = "+this.utilService.nvl2(params.group_cd)+" "
				+ " and member_seq = "+this.utilService.nvl2(params.member_seq)+" "

            //console.log(sqlMain);
            txn.executeSql(sqlMain, [],
                function(transaction, resultSet) {
                    okFunction(true);
            }, function (transaction, error) {
                console.log(error);
            });
        });
	}
	
	public deleteAll(params, okFunction) {
        this.wsdb.transaction((txn) =>{
            var sqlMain = "delete from COMTB_ORGN11 "

            //console.log(sqlMain);
            txn.executeSql(sqlMain, [],
                function(transaction, resultSet) {
                    okFunction(true);
            }, function (transaction, error) {
                console.log(error);
            });
        });
    }

    public list001(params, okFunction) {
        this.wsdb.transaction((txn) =>{
            var sqlMain = " select "
						+ " t1.group_cd "
						+ " , t1.member_seq "
						+ " , t1.member_nm "
						+ " , t1.birth_ymd "
						+ " , t1.sex "
						+ " , t1.certi_field "
						+ " , t1.tech_items "
						+ " , t1.tech_items_etc "
						+ " , t1.tech_field "
						+ " , t1.school_career_cd "
						+ " , t1.career_year "
						+ " , t1.tech_grade "
						+ " , t1.license_cd "
						+ " , t1.license_no "
						+ " , t1.certi_aqu_ymd "
						+ " , t1.certi_mod_ymd "
						+ " , t1.certi_ymd_from "
						+ " , t1.certi_ymd_to "
						+ " , t1.entry_ymd "
						+ " , t1.retire_ymd "
						+ " , t1.retire_yn "
			            + "  from COMTB_ORGN11 t1 "
			        + " where 1=1 "
			        ;

            //console.log(sqlMain);
            txn.executeSql(sqlMain, [], (transaction, resultSet) => {
                var res = [];
                for (var i=0; i < resultSet.rows.length; i++) {
                    res.push(resultSet.rows.item(i));
                }
                if (okFunction) {
                    okFunction(res);
                }
            });
        });
	}
	
    public list002(params, okFunction) {
        this.wsdb.transaction((txn) =>{
            var sqlMain = ""
						+ " select t1.group_cd as corp_cd, t2.group_nm as corp_nm, t1.member_seq,  "
						+ " 	   t1.member_nm, t1.birth_ymd, t1.sex, t1.tech_grade, "
						+ " 	   t1.member_nm||'|'||t1.birth_ymd||'|'||t1.sex as reside_key, "
						+ " 	   "+ this.utilService.codeConvertQuery({code_group:"tech_grade",code1:"t1.tech_grade"}) +" as tech_grade_nm, "
						+ " 	   "+ this.utilService.codeConvertQuery({code_group:"certi_field",code1:"t1.certi_field"}) +" as certi_field_nm "
						+ "   from COMTB_ORGN11 t1  "
						+ " 	   inner join COMTB_ORGN01 t2 on t2.group_cd = t1.group_cd "
						+ "  where 1=1 "
						+ "    and t1.member_nm like '%' || '"+this.utilService.nvl(params.member_nm,'')+"' || '%' "
						+ "    and ("+this.utilService.nvl2(params.retire_yn)+" = 'Y' or ifnull(t1.retire_yn,'N') = 'N') "
					;

					if(params.selectedIds != ""){
						sqlMain += " and t1.member_seq not in ("+this.utilService.nvl(params.selectedIds,'')+") ";
					}

					if(params.group_cd != '') {
						sqlMain += "  and t1.group_cd = "+this.utilService.nvl2(params.group_cd)+" "
					}

					sqlMain += " order by t1.group_cd, t1.member_nm ";

					if(params.page != "" && params.pagCount != "") {
						let startCount = params.start * params.pagCount;
						sqlMain += " LIMIT "+this.utilService.nvl(params.pagCount,'')+ " OFFSET "+this.utilService.nvl(String(startCount),'');
					}

            //console.log(sqlMain);
            txn.executeSql(sqlMain, [], (transaction, resultSet) => {
                var res = [];
                for (var i=0; i < resultSet.rows.length; i++) {
                    res.push(resultSet.rows.item(i));
                }
                if (okFunction) {
                    okFunction(res);
                }
            }, (transaction, resultSet) => {
				console.log(sqlMain);
			});
        });
    }
}

import { GlobalVars } from '../services/GlobalVars';
import { UtilService } from '../services/UtilService';
import { COMMON_DAO } from './COMMON_DAO';

export class MANTB_DIGR13 implements COMMON_DAO {
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
            var sqlMain = "insert into MANTB_DIGR13 ( "
			+ " dign_seq "
    		+ " , check_seq "
    		+ " , check_cd "
    		+ " , facil_no "
    		+ " , amend_need_yn "
    		+ " , dign_opinion "
    		+ " , check_result "
    		+ " , check_nm "
    		+ " ) values ( "
			+ " '"+this.utilService.nvl(params.dign_seq,'')+"' "
			+ " , '"+this.utilService.nvl(params.check_seq,'')+"' "
			+ " , '"+this.utilService.nvl(params.check_cd,'')+"' "
			+ " , '"+this.utilService.nvl(params.facil_no,'')+"' "
			+ " , '"+this.utilService.nvl(params.amend_need_yn,'')+"' "
			+ " , '"+this.utilService.nvl(params.dign_opinion,'')+"' "
			+ " , '"+this.utilService.nvl(params.check_result,'')+"' "
			+ " , '"+this.utilService.nvl(params.check_nm,'')+"' "
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
            var sqlMain = "delete from MANTB_DIGR13  "
            			+ " where 1=1 "
				+ " and dign_seq = '"+this.utilService.nvl(params.dign_seq,'')+"' "

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
            var sqlMain = "delete from MANTB_DIGR13 "

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
						+ "  t1.dign_seq "
			    		+ "  , t1.check_seq "
			    		+ "  , t1.check_cd "
			    		+ "  , t1.facil_no "
			    		+ "  , t1.amend_need_yn "
			    		+ "  , t1.dign_opinion "
			    		+ "  , t1.check_result "
			    		+ "  , t1.check_nm "
			            + "  from MANTB_DIGR13 t1 "
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
            var sqlMain = " with t_temp as ( "
                        + " select t1.code2 as check_cd, "
                        + "    substr(t1.code2,1,2) as check_cd1, "
                        + "    substr(t1.code2,3,2) as check_cd2,  "
                        + "    substr(t1.code2,5,2) as check_cd3,  "
                        + "    substr(t1.code2,7,2) as check_cd4,  "
                        + "    t1.data2 as check_nm1,  "
                        + "    t1.data3 as check_nm2,  "
                        + "    t1.data4 as check_nm3,  "
                        + "    t1.data5 as check_nm4,  "
                        + "    t1.etc_yn, t1.code3 as facil_class  "
                        + " from COMTB_CODE02 t1 "
                        + " where t1.code_group = 'dign1_checklist' "
                        + " and t1.code1 = substr('"+this.utilService.nvl(params.facil_no,'')+"',1,2) "
                        + " and ifnull(t1.use_yn,'Y') = 'Y' "
                        + " ) "
                        + " , t as ( "
                        + " select a.* "
                        + " , (select count(*) from t_temp b where a.check_cd1 = b.check_cd1 and a.check_cd >= b.check_cd) as check_cd1_rownum "
                        + " , (select count(*) from t_temp b where a.check_cd1 = b.check_cd1 and a.check_cd2 = b.check_cd2 and a.check_cd >= b.check_cd) as check_cd2_rownum "
                        + " , (select count(*) from t_temp b where a.check_cd1 = b.check_cd1 and a.check_cd2 = b.check_cd2 and a.check_cd3 = b.check_cd3 and a.check_cd >= b.check_cd) as check_cd3_rownum "
                        + " , (select count(*) from t_temp b where a.check_cd1 = b.check_cd1 and a.check_cd2 = b.check_cd2 and a.check_cd3 = b.check_cd3 and a.check_cd4 = b.check_cd4 and a.check_cd >= b.check_cd) as check_cd4_rownum "
                        + " from t_temp a"
                        + " ) "
                        + " , t_cd1 as (select check_cd1, count(*) as cd1_len from t group by check_cd1) "
                        + " , t_cd2 as (select check_cd1,check_cd2, count(*) as cd2_len from t group by check_cd1,check_cd2) "
                        + " , t_cd3 as (select check_cd1,check_cd2,check_cd3, count(*) as cd3_len from t group by check_cd1,check_cd2,check_cd3) "
                        + " , t_cd4 as (select check_cd1,check_cd2,check_cd3,check_cd4, count(*) as cd4_len from t group by check_cd1,check_cd2,check_cd3,check_cd4) "
                        + "  "
                        + " select t.*, ifnull(t_cd1.cd1_len,1) as cd1_len, ifnull(t_cd2.cd2_len,1) as cd2_len, ifnull(t_cd3.cd3_len,1) as cd3_len, ifnull(t_cd4.cd4_len,1) as cd4_len "
                        + " from t "
                        + " left outer join t_cd1 on (t.check_cd1 = t_cd1.check_cd1) "
                        + " left outer join t_cd2 on (t.check_cd1 = t_cd2.check_cd1 and t.check_cd2 = t_cd2.check_cd2) "
                        + " left outer join t_cd3 on (t.check_cd1 = t_cd3.check_cd1 and t.check_cd2 = t_cd3.check_cd2 and t.check_cd3 = t_cd3.check_cd3) "
                        + " left outer join t_cd4 on (t.check_cd1 = t_cd4.check_cd1 and t.check_cd2 = t_cd4.check_cd2 and t.check_cd3 = t_cd4.check_cd3 and t.check_cd4 = t_cd4.check_cd4) "
                        + " order by t.check_cd "
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
            },
            (transaction, error) => {
                console.log("Error : " + error.message);
            }
            );
        });
    }
}
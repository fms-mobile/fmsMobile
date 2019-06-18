import { GlobalVars } from '../services/GlobalVars';
import { UtilService } from '../services/UtilService';
import { COMMON_DAO } from './COMMON_DAO';
 
export class COMTB_CODE02 implements COMMON_DAO {
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
            var sqlMain = "insert into COMTB_CODE02 ( code_group, code1, code2, code3, data1, data2, data3, data4, data5, data6, data7, etc_yn, use_yn, sort_order ) "
                        + " values ( "
                        + " '"+this.utilService.nvl(params.code_group,'')+"' "
                        + " , '"+this.utilService.nvl(params.code1,'')+"' "
                        + " , '"+this.utilService.nvl(params.code2,'')+"' "
                        + " , '"+this.utilService.nvl(params.code3,'')+"' "
                        + " , '"+this.utilService.nvl(params.data1,'')+"' "
                        + " , '"+this.utilService.nvl(params.data2,'')+"' "
                        + " , '"+this.utilService.nvl(params.data3,'')+"' "
                        + " , '"+this.utilService.nvl(params.data4,'')+"' "
                        + " , '"+this.utilService.nvl(params.data5,'')+"' "
                        + " , '"+this.utilService.nvl(params.data6,'')+"' "
                        + " , '"+this.utilService.nvl(params.data7,'')+"' "
                        + " , '"+this.utilService.nvl(params.etc_yn,'')+"' "
                        + " , '"+this.utilService.nvl(params.use_yn,'')+"' "
                        + " , '"+this.utilService.nvl(params.sort_order,'')+"' "
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
            var sqlMain = "delete from COMTB_CODE02  "
                        + " where code_group = '"+this.utilService.nvl(params.code_group,'')+"'";
                        + " and code1 = '"+this.utilService.nvl(params.code1,'')+"'";
                        + " and code2 = '"+this.utilService.nvl(params.code2,'')+"'";
                        + " and code3 = '"+this.utilService.nvl(params.code3,'')+"'";

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
            var sqlMain = "delete from COMTB_CODE02 "

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
            var sqlMain = "select t1.code_group, t1.code1, t1.code2, t1.code3, t1.data1, t1.data2, t1.data3, "
                        + "  t1.data4, t1.data5, t1.data6, t1.data7, t1.etc_yn, t1.use_yn, t1.sort_order "
                        + "  from COMTB_CODE02 t1"
                        + " where t1.code_group = '"+this.utilService.nvl(params.code_group,'')+"'"
                        + "   and t1.code1 like '"+this.utilService.nvl(params.code1,'')+"' || '%'"
                        + "   and nvl(t1.use_yn,'Y') like '"+this.utilService.nvl(params.code1,'')+"' || '%'"
                        + "order by t1.sort_order, t1.code1, nvl(t1.code2,'0'), nvl(t1.code3,'0')";

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
            var sqlMain = "select t1.code_group, t1.code1, t1.code2, t1.code3, t1.data1, t1.data2, t1.data3, "
                        + "  t1.data4, t1.data5, t1.data6, t1.data7, t1.etc_yn, t1.use_yn, t1.sort_order "
                        + "  from COMTB_CODE02 t1"
                        + " where t1.code_group = '"+this.utilService.nvl(params.code_group,'')+"'"
                        + "   and t1.use_yn = 'Y' "

                        if(params.code1) {
                            sqlMain += " and t1.code1 = '"+this.utilService.nvl(params.code1,'')+"' ";
                        }

                        if(params.data5) {
                            sqlMain += " and t1.data5 like '%"+this.utilService.nvl(params.data5,'')+"%' ";
                        }

                        sqlMain += "order by t1.sort_order, t1.code1, t1.code2, t1.code3";

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
}
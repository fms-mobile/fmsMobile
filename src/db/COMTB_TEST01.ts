import { GlobalVars } from '../services/GlobalVars';
import { UtilService } from '../services/UtilService';
 
export class COMTB_TEST01 {
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
            var sqlMain = "insert into COMTB_TEST01 ( f1, f2, f3 ) "
                        + " values ( '"+this.utilService.nvl(params.f1,'')+"', '"+this.utilService.nvl(params.f2,'')+"', "
                        + " 		 '"+this.utilService.nvl(params.f3,'')+"' ) ";

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
            var sqlMain = "delete from COMTB_TEST01  "
                        + " where f1 = '"+this.utilService.nvl(params.f1,'')+"'";

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
            var sqlMain = "select f1, f2, f3 "
                        + "  from COMTB_TEST01 "
                        + "order by f1, f2, f3 ";

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
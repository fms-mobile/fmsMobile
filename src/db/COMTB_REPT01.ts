
import { GlobalVars } from '../services/GlobalVars';
import { UtilService } from '../services/UtilService';
import { COMMON_DAO } from './COMMON_DAO';

export class COMTB_REPT01 implements COMMON_DAO {
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
            var sqlMain = "insert into COMTB_REPT01 ( "
			+ " rpt_no "
    		+ " , ref_pk "
    		+ " , rpt_content "
    		+ " , rpt_class "
    		+ " ) values ( "
			+ " '"+this.utilService.nvl(params.rpt_no,'')+"' "
			+ " , '"+this.utilService.nvl(params.ref_pk,'')+"' "
			+ " , '"+this.utilService.nvl(params.rpt_content,'')+"' "
			+ " , '"+this.utilService.nvl(params.rpt_class,'')+"' "
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
            var sqlMain = "delete from COMTB_REPT01  "
            			+ " where 1=1 "
				+ " and rpt_no = '"+this.utilService.nvl(params.rpt_no,'')+"' "
				;

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
            var sqlMain = "delete from COMTB_REPT01 "

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
						+ "  t1.rpt_no "
			    		+ "  , t1.ref_pk "
			    		+ "  , t1.rpt_content "
			    		+ "  , t1.rpt_class "
			            + "  from COMTB_REPT01 t1 "
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
}
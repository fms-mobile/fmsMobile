
import { GlobalVars } from '../services/GlobalVars';
import { UtilService } from '../services/UtilService';

export class MANTB_DIGR13 {
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
}
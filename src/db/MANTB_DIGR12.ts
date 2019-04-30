
import { GlobalVars } from '../services/GlobalVars';
import { UtilService } from '../services/UtilService';
import { COMMON_DAO } from './COMMON_DAO';

export class MANTB_DIGR12 implements COMMON_DAO {
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
            var sqlMain = "insert into MANTB_DIGR12 ( "
			+ " object_no "
    		+ " , facil_no "
    		+ " , defect_cd "
    		+ " , dign_seq "
    		+ " ) values ( "
			+ " '"+this.utilService.nvl(params.object_no,'')+"' "
			+ " , '"+this.utilService.nvl(params.facil_no,'')+"' "
			+ " , '"+this.utilService.nvl(params.defect_cd,'')+"' "
			+ " , '"+this.utilService.nvl(params.dign_seq,'')+"' "
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
            var sqlMain = "delete from MANTB_DIGR12  "
            			+ " where 1=1 "
				+ " and object_no = '"+this.utilService.nvl(params.object_no,'')+"' "

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
            var sqlMain = "delete from MANTB_DIGR12 "

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
						+ "  t1.object_no "
			    		+ "  , t1.facil_no "
			    		+ "  , t1.defect_cd "
			    		+ "  , t1.dign_seq "
			            + "  from MANTB_DIGR12 t1 "
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

import { GlobalVars } from '../services/GlobalVars';
import { UtilService } from '../services/UtilService';

export class COMTB_ORGN01 {
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
            var sqlMain = "insert into COMTB_ORGN01 ( "
			+ " group_nm "
    		+ " , etc_remark "
    		+ " , upper_cd "
    		+ " , ref_cd "
    		+ " , group_cd "
    		+ " , sort_order "
    		+ " , region_cd "
    		+ " ) values ( "
			+ " '"+this.utilService.nvl(params.group_nm,'')+"' "
			+ " , '"+this.utilService.nvl(params.etc_remark,'')+"' "
			+ " , '"+this.utilService.nvl(params.upper_cd,'')+"' "
			+ " , '"+this.utilService.nvl(params.ref_cd,'')+"' "
			+ " , '"+this.utilService.nvl(params.group_cd,'')+"' "
			+ " , '"+this.utilService.nvl(params.sort_order,'')+"' "
			+ " , '"+this.utilService.nvl(params.region_cd,'')+"' "
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
            var sqlMain = "delete from COMTB_ORGN01  "
            			+ " where 1=1 "
				+ " and group_nm = '"+this.utilService.nvl(params.group_nm,'')+"' "

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
						+ "  t1.group_nm "
			    		+ "  , t1.etc_remark "
			    		+ "  , t1.upper_cd "
			    		+ "  , t1.ref_cd "
			    		+ "  , t1.group_cd "
			    		+ "  , t1.sort_order "
			    		+ "  , t1.region_cd "
			            + "  from COMTB_ORGN01 t1 "
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

import { GlobalVars } from '../services/GlobalVars';
import { UtilService } from '../services/UtilService';

export class COMTB_USER01 {
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
            var sqlMain = "insert into COMTB_USER01 ( "
			+ " dept_nm "
    		+ " , reside_key "
    		+ " , pswd "
    		+ " , position_nm "
    		+ " , group_nm "
    		+ " , user_nm "
    		+ " , user_id "
    		+ " , charge_auth "
    		+ " , rep_user_yn "
    		+ " , facil_auth "
    		+ " , sign_status "
    		+ " , group_cd "
    		+ " ) values ( "
			+ " '"+this.utilService.nvl(params.dept_nm,'')+"' "
			+ " , '"+this.utilService.nvl(params.reside_key,'')+"' "
			+ " , '"+this.utilService.nvl(params.pswd,'')+"' "
			+ " , '"+this.utilService.nvl(params.position_nm,'')+"' "
			+ " , '"+this.utilService.nvl(params.group_nm,'')+"' "
			+ " , '"+this.utilService.nvl(params.user_nm,'')+"' "
			+ " , '"+this.utilService.nvl(params.user_id,'')+"' "
			+ " , '"+this.utilService.nvl(params.charge_auth,'')+"' "
			+ " , '"+this.utilService.nvl(params.rep_user_yn,'')+"' "
			+ " , '"+this.utilService.nvl(params.facil_auth,'')+"' "
			+ " , '"+this.utilService.nvl(params.sign_status,'')+"' "
			+ " , '"+this.utilService.nvl(params.group_cd,'')+"' "
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
            var sqlMain = "delete from COMTB_USER01  "
            			+ " where 1=1 "
				+ " and dept_nm = '"+this.utilService.nvl(params.dept_nm,'')+"' "

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
						+ "  t1.dept_nm "
			    		+ "  , t1.reside_key "
			    		+ "  , t1.pswd "
			    		+ "  , t1.position_nm "
			    		+ "  , t1.group_nm "
			    		+ "  , t1.user_nm "
			    		+ "  , t1.user_id "
			    		+ "  , t1.charge_auth "
			    		+ "  , t1.rep_user_yn "
			    		+ "  , t1.facil_auth "
			    		+ "  , t1.sign_status "
			    		+ "  , t1.group_cd "
			            + "  from COMTB_USER01 t1 "
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
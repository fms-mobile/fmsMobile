
import { GlobalVars } from '../services/GlobalVars';
import { UtilService } from '../services/UtilService';
import { COMMON_DAO } from './COMMON_DAO';

export class MANTB_ENGR01 implements COMMON_DAO {
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
            var sqlMain = "insert into MANTB_ENGR01 ( "
			+ " facil_no "
    		+ " , engineer_nm "
    		+ " , start_ymd "
    		+ " , sex "
    		+ " , rep_yn "
    		+ " , dign_seq "
    		+ " , engineer_seq "
    		+ " , birth_ymd "
    		+ " , tech_grade "
    		+ " , parti_rate "
    		+ " , end_ymd "
    		+ " , parti_days "
    		+ " ) values ( "
			+ " '"+this.utilService.nvl(params.facil_no,'')+"' "
			+ " , '"+this.utilService.nvl(params.engineer_nm,'')+"' "
			+ " , '"+this.utilService.nvl(params.start_ymd,'')+"' "
			+ " , '"+this.utilService.nvl(params.sex,'')+"' "
			+ " , '"+this.utilService.nvl(params.rep_yn,'')+"' "
			+ " , '"+this.utilService.nvl(params.dign_seq,'')+"' "
			+ " , '"+this.utilService.nvl(params.engineer_seq,'')+"' "
			+ " , '"+this.utilService.nvl(params.birth_ymd,'')+"' "
			+ " , '"+this.utilService.nvl(params.tech_grade,'')+"' "
			+ " , '"+this.utilService.nvl(params.parti_rate,'')+"' "
			+ " , '"+this.utilService.nvl(params.end_ymd,'')+"' "
			+ " , '"+this.utilService.nvl(params.parti_days,'')+"' "
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
            var sqlMain = "delete from MANTB_ENGR01  "
            			+ " where 1=1 "
				+ " and facil_no = '"+this.utilService.nvl(params.facil_no,'')+"' "

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
            var sqlMain = "delete from MANTB_ENGR01 "

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
						+ "  t1.facil_no "
			    		+ "  , t1.engineer_nm "
			    		+ "  , t1.start_ymd "
			    		+ "  , t1.sex "
			    		+ "  , t1.rep_yn "
			    		+ "  , t1.dign_seq "
			    		+ "  , t1.engineer_seq "
			    		+ "  , t1.birth_ymd "
			    		+ "  , t1.tech_grade "
			    		+ "  , t1.parti_rate "
			    		+ "  , t1.end_ymd "
			    		+ "  , t1.parti_days "
			            + "  from MANTB_ENGR01 t1 "
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
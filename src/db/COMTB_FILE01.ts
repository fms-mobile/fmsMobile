
import { GlobalVars } from '../services/GlobalVars';
import { UtilService } from '../services/UtilService';

export class COMTB_FILE01 {
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
            var sqlMain = "insert into COMTB_FILE01 ( "
			+ " file_size "
    		+ " , file_path "
    		+ " , ref_table "
    		+ " , ref_pk "
    		+ " , file_type "
    		+ " , file_nm "
    		+ " , file_no "
    		+ " , etc_remark "
    		+ " , download_cnt "
    		+ " , file_desc "
    		+ " ) values ( "
			+ " '"+this.utilService.nvl(params.file_size,'')+"' "
			+ " , '"+this.utilService.nvl(params.file_path,'')+"' "
			+ " , '"+this.utilService.nvl(params.ref_table,'')+"' "
			+ " , '"+this.utilService.nvl(params.ref_pk,'')+"' "
			+ " , '"+this.utilService.nvl(params.file_type,'')+"' "
			+ " , '"+this.utilService.nvl(params.file_nm,'')+"' "
			+ " , '"+this.utilService.nvl(params.file_no,'')+"' "
			+ " , '"+this.utilService.nvl(params.etc_remark,'')+"' "
			+ " , '"+this.utilService.nvl(params.download_cnt,'')+"' "
			+ " , '"+this.utilService.nvl(params.file_desc,'')+"' "
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
            var sqlMain = "delete from COMTB_FILE01  "
            			+ " where 1=1 "
				+ " and file_size = '"+this.utilService.nvl(params.file_size,'')+"' "

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
						+ "  t1.file_size "
			    		+ "  , t1.file_path "
			    		+ "  , t1.ref_table "
			    		+ "  , t1.ref_pk "
			    		+ "  , t1.file_type "
			    		+ "  , t1.file_nm "
			    		+ "  , t1.file_no "
			    		+ "  , t1.etc_remark "
			    		+ "  , t1.download_cnt "
			    		+ "  , t1.file_desc "
			            + "  from COMTB_FILE01 t1 "
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
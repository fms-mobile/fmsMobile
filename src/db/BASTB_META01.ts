
import { GlobalVars } from '../services/GlobalVars';
import { UtilService } from '../services/UtilService';

export class BASTB_META01 {
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
            var sqlMain = "insert into BASTB_META01 ( "
			+ " sort_order "
    		+ " , entity_id "
    		+ " , search_key "
    		+ " , entity_type "
    		+ " , use_yn "
    		+ " , abbr_nm "
    		+ " , object_key "
    		+ " , entity_nm "
    		+ " , struct_kind "
    		+ " , eval_entity "
    		+ " , upper_id "
    		+ " , weight "
    		+ " , entity_lvl "
    		+ " , input_yn "
    		+ " ) values ( "
			+ " '"+this.utilService.nvl(params.sort_order,'')+"' "
			+ " , '"+this.utilService.nvl(params.entity_id,'')+"' "
			+ " , '"+this.utilService.nvl(params.search_key,'')+"' "
			+ " , '"+this.utilService.nvl(params.entity_type,'')+"' "
			+ " , '"+this.utilService.nvl(params.use_yn,'')+"' "
			+ " , '"+this.utilService.nvl(params.abbr_nm,'')+"' "
			+ " , '"+this.utilService.nvl(params.object_key,'')+"' "
			+ " , '"+this.utilService.nvl(params.entity_nm,'')+"' "
			+ " , '"+this.utilService.nvl(params.struct_kind,'')+"' "
			+ " , '"+this.utilService.nvl(params.eval_entity,'')+"' "
			+ " , '"+this.utilService.nvl(params.upper_id,'')+"' "
			+ " , '"+this.utilService.nvl(params.weight,'')+"' "
			+ " , '"+this.utilService.nvl(params.entity_lvl,'')+"' "
			+ " , '"+this.utilService.nvl(params.input_yn,'')+"' "
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
            var sqlMain = "delete from BASTB_META01  "
            			+ " where 1=1 "
				+ " and sort_order = '"+this.utilService.nvl(params.sort_order,'')+"' "

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
						+ "  t1.sort_order "
			    		+ "  , t1.entity_id "
			    		+ "  , t1.search_key "
			    		+ "  , t1.entity_type "
			    		+ "  , t1.use_yn "
			    		+ "  , t1.abbr_nm "
			    		+ "  , t1.object_key "
			    		+ "  , t1.entity_nm "
			    		+ "  , t1.struct_kind "
			    		+ "  , t1.eval_entity "
			    		+ "  , t1.upper_id "
			    		+ "  , t1.weight "
			    		+ "  , t1.entity_lvl "
			    		+ "  , t1.input_yn "
			            + "  from BASTB_META01 t1 "
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
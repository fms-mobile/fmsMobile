
import { GlobalVars } from '../services/GlobalVars';
import { UtilService } from '../services/UtilService';
import { COMMON_DAO } from './COMMON_DAO';

export class BASTB_META01 implements COMMON_DAO {
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
			+ " entity_id "
            + " , entity_nm "
            + " , abbr_nm "
            + " , entity_type "
            + " , input_yn "
            + " , eval_entity "
            + " , entity_lvl "
            + " , upper_id "
            + " , struct_kind "
            + " , object_key "
            + " , search_key "
            + " , weight "
            + " , sort_order "
            + " , use_yn "
    		+ " ) values ( "
			+ " '"+this.utilService.nvl(params.entity_id,'')+"' "
            + " , '"+this.utilService.nvl(params.entity_nm,'')+"' "
            + " , '"+this.utilService.nvl(params.abbr_nm,'')+"' "
            + " , '"+this.utilService.nvl(params.entity_type,'')+"' "
            + " , '"+this.utilService.nvl(params.input_yn,'')+"' "
            + " , '"+this.utilService.nvl(params.eval_entity,'')+"' "
            + " , '"+this.utilService.nvl(params.entity_lvl,'')+"' "
            + " , '"+this.utilService.nvl(params.upper_id,'')+"' "
            + " , '"+this.utilService.nvl(params.struct_kind,'')+"' "
            + " , '"+this.utilService.nvl(params.object_key,'')+"' "
            + " , '"+this.utilService.nvl(params.search_key,'')+"' "
            + " , '"+this.utilService.nvl(params.weight,'')+"' "
            + " , '"+this.utilService.nvl(params.sort_order,'')+"' "
            + " , '"+this.utilService.nvl(params.use_yn,'')+"' "
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
				+ " and entity_id = '"+this.utilService.nvl(params.entity_id,'')+"' "

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
            var sqlMain = "delete from BASTB_META01 "

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
                        + "  t.entity_id "
                        + "  , t.entity_nm "
                        + "  , t.abbr_nm "
                        + "  , t.entity_type "
                        + "  , t.input_yn "
                        + "  , t.eval_entity "
                        + "  , t.entity_lvl "
                        + "  , t.upper_id "
                        + "  , t.struct_kind "
                        + "  , t.object_key "
                        + "  , t.search_key "
                        + "  , t.weight "
                        + "  , t.sort_order "
                        + "  , t.use_yn "
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

    public list002(params, okFunction) {
        this.wsdb.transaction((txn) =>{
            var sqlMain = ""
                        + " WITH "
                        + "     t AS (SELECT  "
                        + " 			 entity_id as part_cd "
                        + " 			 , entity_nm as part_nm "
                        + " 			 , abbr_nm "
                        + " 			 , entity_type as object_type "
                        + " 			 , input_yn "
                        + " 			 , eval_entity "
                        + " 			 , entity_lvl as ranking "
                        + " 			 , upper_id as upper_cd "
                        + " 			 , struct_kind "
                        + " 			 , object_key "
                        + " 			 , search_key "
                        + " 			 , weight "
                        + " 			 , sort_order "
                        + " 			 , use_yn "
                        + " 			FROM BASTB_META01 "
                        + " 		   WHERE ifnull(use_yn,'Y') = 'Y'), "
                        + "     t1 AS "
                        + "         (SELECT t.* "
                        + "            FROM t "
                        + "           WHERE     object_type = '"+this.utilService.nvl(params.entity_type,'')+"' "
                        + "                 AND part_cd LIKE '"+this.utilService.nvl(params.entity_id,'')+"' || '%' "
                        + "                 AND upper_cd IS NULL "
                        + "          UNION ALL "
                        + "          SELECT t.* "
                        + "            FROM t INNER JOIN t x ON t.upper_cd = x.part_cd "
                        + "           WHERE t.object_type = '"+this.utilService.nvl(params.entity_type,'')+"' AND t.part_cd LIKE '"+this.utilService.nvl(params.entity_id,'')+"' || '%') "
                        + "   SELECT * "
                        + "     FROM t1 "
                        + " ORDER BY sort_order, part_cd "
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
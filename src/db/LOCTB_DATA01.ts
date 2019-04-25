
import { Events, Platform  } from 'ionic-angular';
import { Injectable, Component } from '@angular/core';
import { GlobalVars } from '../services/GlobalVars';
import { UtilService } from '../services/UtilService';
import { global } from '@angular/core/src/util';

export class LOCTB_DATA01 {
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
            var sqlMain = "insert or replace into LOCTB_DATA01 ( "
			+ " user_id "
    		+ " , object_id "
    		+ " , object_contents "
    		+ " , sort_order "
    		+ " , send_yn "
    		+ " , send_result "
    		+ " , sys_reg_id "
    		+ " , sys_reg_date "
    		+ " , sys_upd_id "
    		+ " , sys_upd_date "
    		+ " ) values ( "
			+ " '"+this.utilService.nvl(params.user_id,'')+"' "
			+ " , '"+this.utilService.nvl(params.object_id,'')+"' "
			+ " , '"+this.utilService.nvl(params.object_contents,'')+"' "
			+ " , '"+this.utilService.nvl(params.sort_order,'')+"' "
			+ " , '"+this.utilService.nvl(params.send_yn,'')+"' "
			+ " , '"+this.utilService.nvl(params.send_result,'')+"' "
			+ " , '"+this.utilService.nvl(params.sys_reg_id,'')+"' "
			+ " , '"+this.utilService.nvl(params.sys_reg_date,'')+"' "
			+ " , '"+this.utilService.nvl(params.sys_upd_id,'')+"' "
			+ " , '"+this.utilService.nvl(params.sys_upd_date,'')+"' "
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
            var sqlMain = "delete from LOCTB_DATA01  "
            			+ " where 1=1 "
                + " and user_id = '"+this.utilService.nvl(params.user_id,'')+"' "
                + " and object_id = '"+this.utilService.nvl(params.object_id,'')+"' "

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
						+ "  t1.user_id "
			    		+ "  , t1.object_id "
			    		+ "  , t1.object_contents "
			    		+ "  , t1.sort_order "
			    		+ "  , t1.send_yn "
			    		+ "  , t1.send_result "
			    		+ "  , t1.sys_reg_id "
			    		+ "  , t1.sys_reg_date "
			    		+ "  , t1.sys_upd_id "
			    		+ "  , t1.sys_upd_date "
			            + "  from LOCTB_DATA01 t1 "
			        + " where 1=1 "
			        ;

            //console.log(sqlMain);
            var rtn = txn.executeSql(sqlMain, [], (transaction, resultSet) => {
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

import { GlobalVars } from '../services/GlobalVars';
import { UtilService } from '../services/UtilService';

export class BASTB_MAST01 {
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
            var sqlMain = "insert into BASTB_MAST01 ( "
			+ " facil_no "
			+ " , facil_nm "
			+ " , mng_main_cd "
			+ " , facil_class "
			+ " , facil_gbn "
			+ " , facil_kind "
			+ " , facil_desc_cd "
			+ " , facil_form_cd "
			+ " , facil_gbn_nm "
			+ " , facil_kind_nm "
			+ " , facil_desc_nm "
			+ " , addr_sido "
			+ " , addr_gugun "
			+ " , addr_dong "
			+ " , addr_detail "
			+ " , remove_yn "
			+ " , sign_status "
			+ " , next_dign_ymd1 "
			+ " , next_dign_ymd2 "
			+ " , next_dign_ymd4 "
			+ " , next_dign_ymd5 "
			+ " , state_grade "
			+ " , map_x "
			+ " , map_y "
			+ " , facil_spec1 "
			+ " , facil_spec2 "
			+ " , facil_spec3 "
			+ " , facil_spec4 "
			+ " , facil_spec5 "
    		+ " ) values ( "
			+ " '"+this.utilService.nvl(params.facil_no,'')+"' "
			+ " , '"+this.utilService.nvl(params.facil_nm,'')+"' "
			+ " , '"+this.utilService.nvl(params.mng_main_cd,'')+"' "
			+ " , '"+this.utilService.nvl(params.facil_class,'')+"' "
			+ " , '"+this.utilService.nvl(params.facil_gbn,'')+"' "
			+ " , '"+this.utilService.nvl(params.facil_kind,'')+"' "
			+ " , '"+this.utilService.nvl(params.facil_desc_cd,'')+"' "
			+ " , '"+this.utilService.nvl(params.facil_form_cd,'')+"' "
			+ " , '"+this.utilService.nvl(params.facil_gbn_nm,'')+"' "
			+ " , '"+this.utilService.nvl(params.facil_kind_nm,'')+"' "
			+ " , '"+this.utilService.nvl(params.facil_desc_nm,'')+"' "
			+ " , '"+this.utilService.nvl(params.addr_sido,'')+"' "
			+ " , '"+this.utilService.nvl(params.addr_gugun,'')+"' "
			+ " , '"+this.utilService.nvl(params.addr_dong,'')+"' "
			+ " , '"+this.utilService.nvl(params.addr_detail,'')+"' "
			+ " , '"+this.utilService.nvl(params.remove_yn,'')+"' "
			+ " , '"+this.utilService.nvl(params.sign_status,'')+"' "
			+ " , '"+this.utilService.nvl(params.next_dign_ymd1,'')+"' "
			+ " , '"+this.utilService.nvl(params.next_dign_ymd2,'')+"' "
			+ " , '"+this.utilService.nvl(params.next_dign_ymd4,'')+"' "
			+ " , '"+this.utilService.nvl(params.next_dign_ymd5,'')+"' "
			+ " , '"+this.utilService.nvl(params.state_grade,'')+"' "
			+ " , '"+this.utilService.nvl(params.map_x,'')+"' "
			+ " , '"+this.utilService.nvl(params.map_y,'')+"' "
			+ " , '"+this.utilService.nvl(params.facil_spec1,'')+"' "
			+ " , '"+this.utilService.nvl(params.facil_spec2,'')+"' "
			+ " , '"+this.utilService.nvl(params.facil_spec3,'')+"' "
			+ " , '"+this.utilService.nvl(params.facil_spec4,'')+"' "
			+ " , '"+this.utilService.nvl(params.facil_spec5,'')+"' "
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
            var sqlMain = "delete from BASTB_MAST01  "
            			+ " where 1=1 "
				+ " and next_dign_ymd5 = '"+this.utilService.nvl(params.next_dign_ymd5,'')+"' "

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
						+ " t1.facil_no "
						+ " , t1.facil_nm "
						+ " , t1.mng_main_cd "
						+ " , t1.facil_class "
						+ " , t1.facil_gbn "
						+ " , t1.facil_kind "
						+ " , t1.facil_desc_cd "
						+ " , t1.facil_form_cd "
						+ " , t1.facil_gbn_nm "
						+ " , t1.facil_kind_nm "
						+ " , t1.facil_desc_nm "
						+ " , t1.addr_sido "
						+ " , t1.addr_gugun "
						+ " , t1.addr_dong "
						+ " , t1.addr_detail "
						+ " , t1.remove_yn "
						+ " , t1.sign_status "
						+ " , t1.next_dign_ymd1 "
						+ " , t1.next_dign_ymd2 "
						+ " , t1.next_dign_ymd4 "
						+ " , t1.next_dign_ymd5 "
						+ " , t1.state_grade "
						+ " , t1.map_x "
						+ " , t1.map_y "
						+ " , t1.facil_spec1 "
						+ " , t1.facil_spec2 "
						+ " , t1.facil_spec3 "
						+ " , t1.facil_spec4 "
						+ " , t1.facil_spec5 "						
			            + "  from BASTB_MAST01 t1 "
			        + " where 1=1 "
					;
			
			if(params.pagCount != "") {
				sqlMain += " LIMIT "+this.utilService.nvl(params.pagCount,'');
			}		

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
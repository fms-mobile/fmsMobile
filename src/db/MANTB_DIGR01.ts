import { GlobalVars } from '../services/GlobalVars';
import { UtilService } from '../services/UtilService';

export class MANTB_DIGR01 {
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
            var sqlMain = "insert into MANTB_DIGR01 ( "
			+ " facil_no "
			+ " , dign_seq "
			+ " , project_no "
			+ " , report_yy "
			+ " , start_ymd "
			+ " , end_ymd "
			+ " , dign_gbn "
			+ " , regular_gbn "
			+ " , dign_corp_cd "
			+ " , dign_corp_nm "
			+ " , rep_engineer_nm "
			+ " , dign_amt "
			+ " , state_grade "
			+ " , dign_content "
			+ " , amend_content "
			+ " , dign4_need_yn "
			+ " , wrt_ymd "
			+ " , wrt_person_nm "
			+ " , local_yn "
    		+ " ) values ( "
			+ " '"+this.utilService.nvl(params.end_ymd,'')+"' "
			+ " , '"+this.utilService.nvl(params.dign4_need_yn,'')+"' "
			+ " , '"+this.utilService.nvl(params.wrt_person_nm,'')+"' "
			+ " , '"+this.utilService.nvl(params.report_yy,'')+"' "
			+ " , '"+this.utilService.nvl(params.dign_corp_cd,'')+"' "
			+ " , '"+this.utilService.nvl(params.regular_gbn,'')+"' "
			+ " , '"+this.utilService.nvl(params.dign_content,'')+"' "
			+ " , '"+this.utilService.nvl(params.dign_corp_nm,'')+"' "
			+ " , '"+this.utilService.nvl(params.dign_gbn,'')+"' "
			+ " , '"+this.utilService.nvl(params.amend_content,'')+"' "
			+ " , '"+this.utilService.nvl(params.state_grade,'')+"' "
			+ " , '"+this.utilService.nvl(params.rep_engineer_nm,'')+"' "
			+ " , '"+this.utilService.nvl(params.start_ymd,'')+"' "
			+ " , '"+this.utilService.nvl(params.wrt_ymd,'')+"' "
			+ " , '"+this.utilService.nvl(params.facil_no,'')+"' "
			+ " , '"+this.utilService.nvl(params.project_no,'')+"' "
			+ " , '"+this.utilService.nvl(params.dign_seq,'')+"' "
			+ " , '"+this.utilService.nvl(params.dign_amt,'')+"' "
			+ " , '"+this.utilService.nvl(params.local_yn,'')+"' "
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
            var sqlMain = "delete from MANTB_DIGR01  "
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

    public list001(params, okFunction) {
        this.wsdb.transaction((txn) =>{
            var sqlMain = " select "
						+ " t1.facil_no "
						+ " , t1.dign_seq "
						+ " , t1.project_no "
						+ " , t1.report_yy "
						+ " , t1.start_ymd "
						+ " , t1.end_ymd "
						+ " , t1.dign_gbn "
						+ " , "+ this.utilService.codeConvertQuery({code_group:"dign_gbn",code1:"t1.dign_gbn"}) +" as dign_gbn_nm "
						+ " , t1.regular_gbn "
						+ " , "+ this.utilService.codeConvertQuery({code_group:"regular_gbn",code1:"t1.regular_gbn"}) +" as regular_gbn_nm "
						+ " , t1.dign_corp_cd "
						+ " , t1.dign_corp_nm "
						+ " , t1.rep_engineer_nm "
						+ " , t1.dign_amt "
						+ " , t1.state_grade "
						+ " , t1.dign_content "
						+ " , t1.amend_content "
						+ " , t1.dign4_need_yn "
						+ " , t1.wrt_ymd "
						+ " , t1.wrt_person_nm "
						+ " , t1.local_yn "
			            + "  from MANTB_DIGR01 t1 "
			        + " where 1=1 "
			        ;
			// 정기안전점검
			sqlMain += " and dign_gbn = '100' ";

			sqlMain += " order by end_ymd desc ";
			
			if(params.pagCount != "") {
				sqlMain += " LIMIT "+this.utilService.nvl(params.pagCount,'');
				//sqlMain += " and rownum <= 10";
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
	
	public gorup_list001(params, okFunction) {
        this.wsdb.transaction((txn) =>{
            var sqlMain = " select "
						+ " t1.report_yy "
						+ " , t1.dign_gbn "
						+ " , "+ this.utilService.codeConvertQuery({code_group:"dign_gbn",code1:"t1.dign_gbn"}) +" as dign_gbn_nm "
						+ " , t1.regular_gbn "
						+ " , "+ this.utilService.codeConvertQuery({code_group:"regular_gbn",code1:"t1.regular_gbn"}) +" as regular_gbn_nm "
						+ " , max(t2.sort_order) sort_order "
						+ "  from MANTB_DIGR01 t1 "
						+ "  left outer join COMTB_CODE02 t2 on t2.code_group = 'regular_gbn' and t1.regular_gbn = t2.code1"
			        + " where 1=1 "
			        ;
			// 정기안전점검
			sqlMain += " and dign_gbn = '100' ";

			sqlMain += " group by report_yy, dign_gbn, regular_gbn ";

			sqlMain += " order by report_yy desc, sort_order desc";
			
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
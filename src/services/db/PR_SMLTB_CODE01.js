/*************************************************************************************************************
**	Script Id    : PR_SMLTB_CODE01
**	Script Name  : 조사항목코드 관련 쿼리 모음
*************************************************************************************************************/
app.service('PR_SMLTB_CODE01', [function() {  
	var self = this;

	/*********************************************************************************************************
	**	Function Id  : insert
	**	Description  : 조사항목코드 입력
	*********************************************************************************************************/
	self.insert = function(params, okFunction) {
		wsdb.transaction(function(txn) {
			var sqlMain = "insert into SMLTB_CODE01 ( facil_gbn, check_cd, check_nm, object_gbn, code_lvl, upper_cd, "
						+ "							  inner_cd, input_mask, disp_yn, method_file, use_yn ) "
						+ " values ( '"+nvl(params.facil_gbn)+"', '"+nvl(params.check_cd)+"', '"+nvl(params.check_nm)+"', '"+nvl(params.object_gbn)+"', '"+nvl(params.code_lvl)+"', "
						+ "			 case when '"+nvl(params.upper_cd)+"' = '' then null else '"+params.upper_cd+"' end, "
						+ "			 '"+nvl(params.inner_cd)+"', '"+nvl(params.input_mask)+"', '"+nvl(params.disp_yn)+"', '"+nvl(params.method_file)+"', '"+nvl(params.use_yn)+"' ) ";

			//console.log(sqlMain);
			txn.executeSql(sqlMain, [],
				function(transaction, resultSet) {
					okFunction(true);
			}, function (transaction, error) {
				console.log("error:" + error);
			});
		});
	};

	/*********************************************************************************************************
	**	Function Id  : delete
	**	Description  : 조사항목코드 삭제
	*********************************************************************************************************/
	self.delete = function(params, okFunction) {
		wsdb.transaction(function(txn) {
			var sqlMain = "delete from SMLTB_CODE01 where 1=1 ";
			if (params.facil_gbn != undefined && params.facil_gbn != '') { sqlMain += " and facil_gbn = '"+params.facil_gbn+"' " }
			if (params.check_cd != undefined && params.check_cd != '') { sqlMain += " and check_cd like '"+params.check_cd+"%' " }

			//console.log(sqlMain);
			txn.executeSql(sqlMain, [],
				function(transaction, resultSet) {
					okFunction(true);
			}, function (error) {
				console.log("error:" + error);
			});
		});
	};

	/*********************************************************************************************************
	**	Function Id  : list
	**	Description  : 조사항목코드 목록
	*********************************************************************************************************/
   	self.list001 = function(params, okFunction) { 
		wsdb.transaction(function(txn) {
			var sqlMain = "select check_cd, check_nm, inner_cd, object_gbn, code_lvl, upper_cd, input_mask, disp_yn, method_file, "
						+ "		  (select check_nm from SMLTB_CODE01 where facil_gbn = t1.facil_gbn and check_cd = substr(t1.check_cd,1,4) and object_gbn = t1.object_gbn) as upper_check_nm "
						+ "  from SMLTB_CODE01 t1 "
						+ " where t1.facil_gbn = '"+params.facil_gbn+"' "
						+ "   and ifnull(t1.use_yn,'Y') = 'Y' ";
	
			if (nvl(params.check_cd) != '') { sqlMain += " and t1.check_cd like '"+params.check_cd+"%' "; }
			if (nvl(params.check_nm) != '') { sqlMain += " and t1.check_nm like '%"+params.check_nm+"%' "; }
			if (nvl(params.object_gbn) != '') { sqlMain += " and t1.object_gbn like '%"+params.object_gbn+"%' "; }
			if (nvl(params.upper_cd) != '') { sqlMain += " and (t1.upper_cd is null or t1.upper_cd like '"+params.upper_cd+"%') "; }
			if (nvl(params.min_lvl) != '') { sqlMain += " and t1.code_lvl >= "+params.min_lvl; }
			if (nvl(params.max_lvl) != '') { sqlMain += " and t1.code_lvl <= "+params.max_lvl; }
			if (nvl(params.frequent_nm) != '') { sqlMain += " and t1.check_nm like '%"+params.frequent_nm+"%' "; }
			
			if (params.check_cd == 'MA') { // 유지관리방안
				sqlMain += " union "
						+ "select check_cd, check_nm, inner_cd, object_gbn, code_lvl, upper_cd, input_mask, disp_yn, method_file, "
						+ "		  null as upper_check_nm "
						+ "  from SMLTB_CODE01 t1 "
						+ " where t1.facil_gbn = '"+params.facil_gbn+"' "
						+ "   and t1.object_gbn like '%"+params.object_gbn+"%' "
						+ "   and (   (substr(t1.check_cd,1,2) = 'MT' and t1.upper_cd like '"+params.upper_cd+"%' and t1.code_lvl >= 3) "
						+ "   	   or (substr(t1.check_cd,1,2) = 'MD') ) "
						+ "   and ifnull(t1.use_yn,'Y') = 'Y' ";
			}

			sqlMain += " order by 3,1 ";
	
			//console.log(sqlMain);
			var rtn = txn.executeSql(sqlMain, [], 
			   function(transaction, resultSet) {
				   console.log(resultSet);
				    var res = [];
					for (var i=0; i < resultSet.rows.length; i++) {
						res.push(resultSet.rows.item(i));
					}
					if (okFunction) {
						okFunction(res);
					}
				});
		});
	};

}]);

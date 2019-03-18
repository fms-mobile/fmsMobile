/*************************************************************************************************************
**	Script Id    : PR_SMLTB_CIVL01
**	Script Name  : 토목시설 관련 쿼리 모음
*************************************************************************************************************/
app.service('PR_SMLTB_CIVL01', [function() {
	var self = this;

	/*********************************************************************************************************
	**	Function Id  : insert
	**	Description  : 토목시설 입력
	*********************************************************************************************************/
	self.insert = function(params, okFunction) {
		wsdb.transaction(function(txn) {
			txn.executeSql("select 'C'||substr(ifnull(max(substr(civil_no,2)),0)+1001,2) as civil_no from SMLTB_CIVL01 where facil_no = '"+params.facil_no+"' ", [],
				function(transaction, resultSet) {
					params.civil_no = resultSet.rows.item(0).civil_no;
					var sqlMain = "insert into SMLTB_CIVL01 ( facil_no, civil_no, civil_kind, col01, col02, "
								+ "							  col03, col04, col05, civil_loc ) "
								+ " values ( '"+params.facil_no+"', '"+params.civil_no+"', '"+nvl(params.civil_kind)+"', '"+nvl(params.col01)+"', '"+nvl(params.col02)+"', "
								+ "			 '"+nvl(params.col03)+"', '"+nvl(params.col04)+"', '"+nvl(params.col05)+"', '"+nvl(params.civil_loc)+"' ) ";

					//console.log(sqlMain);
					txn.executeSql(sqlMain, [],
						function(transaction, resultSet) {
							okFunction(true);
					}, function (transaction, error) {
						console.log("error:" + error);
					});
			});
		});
	};

	/*********************************************************************************************************
	**	Function Id  : update
	**	Description  : 토목시설 수정
	*********************************************************************************************************/
	self.update = function(params, okFunction) {
		wsdb.transaction(function(txn) {
			var sqlMain = "update SMLTB_CIVL01 "
						+ "   set col01        = '" + nvl(params.col01) + "', "
						+ "       col02        = '" + nvl(params.col02) + "', "
						+ "       col03        = '" + nvl(params.col03) + "', "
						+ "       col04        = '" + nvl(params.col04) + "', "
						+ "       col05        = '" + nvl(params.col05) + "', "
						+ "       civil_loc    = '" + nvl(params.civil_loc) + "' "
						+ " where facil_no     = '" + params.facil_no + "' "
						+ "   and civil_no     = '" + params.civil_no + "' ";

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
	**	Function Id  : delete
	**	Description  : 토목시설 삭제
	*********************************************************************************************************/
	self.delete = function(params, okFunction) { 
		wsdb.transaction(function(txn) {
			var sqlMain = "delete from SMLTB_CIVL01 where facil_no = '" + params.facil_no + "' ";
			if (params.civil_no != undefined && params.civil_no != '') { sqlMain += " and civil_no = '"+params.civil_no+"' " }

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
	**	Function Id  : select
	**	Description  : 토목시설 1건 조회
	*********************************************************************************************************/
	self.select = function(params, okFunction, dataNotFound) {
		wsdb.transaction(function(txn) {
			var sqlMain = "select t1.facil_no, t1.civil_no, t1.civil_kind, t1.col01, t1.col02, "
						+ "		  t1.col03, t1.col04, t1.col05, t1.civil_loc, ifnull(t3.data2, t2.data1)||'('||substr(t1.civil_no,4,1)||')' as civil_nm, "
						+ "		  case when substr(t1.civil_kind,1,2) in ('CA','CB','CE') then 'A' "
						+ "		  	   when substr(t1.civil_kind,1,2) in ('CC') then 'B' "
						+ "		  	   when substr(t1.civil_kind,1,2) in ('CD') then 'C' "
						+ "		  	   else 'D' "
						+ "		  end as civil_type "
						+ "  from SMLTB_CIVL01 t1 "
						+ "  	  left outer join COMTB_CODE02 t2 on t2.code_group = 'civil_kind' and t2.code1 = substr(t1.civil_kind,1,2) and t2.code2 is null "
						+ "  	  left outer join COMTB_CODE02 t3 on t3.code_group = 'civil_kind' and t3.code2 = t1.civil_kind "
						+ " where t1.facil_no = '" + params.facil_no + "' "
						+ "   and t1.civil_no = '" + params.civil_no + "' ";

			//console.log(sqlMain);
			txn.executeSql(sqlMain, [], 
				function(transaction, resultSet) {
					if (resultSet.rows.length > 0) {
						var rsBox = resultSet.rows.item(0);
						rsBox.object_no = rsBox.civil_no;
						rsBox.object_nm = rsBox.civil_nm;
						okFunction(rsBox);
					} else {
						if ( dataNotFound != undefined) { dataNotFound(); }
					}
			}, function (error) {
				console.log("error:" + error);
			});
		});
	};

	/*********************************************************************************************************
	**	Function Id  : list
	**	Description  : 토목시설 목록
	*********************************************************************************************************/
	// 시설세부정보 - 시설목록
	self.list001 = function(params, okFunction) { 
		wsdb.transaction(function(txn) {
			var sqlMain = "select t1.facil_no, t1.civil_no, ifnull(t3.data2, t2.data1) as civil_nm, "
						+ "		  t1.civil_kind, t1.col01, t1.col02, t1.col03, t1.col04, t1.col05, t1.civil_loc "
						+ "  from SMLTB_CIVL01 t1 "
						+ "  	  left outer join COMTB_CODE02 t2 on t2.code_group = 'civil_kind' and t2.code1 = substr(t1.civil_kind,1,2) and t2.code2 is null "
						+ "  	  left outer join COMTB_CODE02 t3 on t3.code_group = 'civil_kind' and t3.code2 = t1.civil_kind "
						+ " where t1.facil_no = '" + params.facil_no + "' "
						+ "order by t1.civil_kind, t1.civil_no ";
	
			//console.log(sqlMain);
			var rtn = txn.executeSql(sqlMain, [], 
				function(transaction, resultSet) {
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
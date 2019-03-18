/*************************************************************************************************************
**	Script Id    : PR_SMLTB_DIGN01
**	Script Name  : 안전점검 마스터 관련 쿼리 모음
*************************************************************************************************************/
app.service('PR_SMLTB_DIGN01', [function() {  
	var self = this;

	/*********************************************************************************************************
	**	Function Id  : insert
	**	Description  : 안전점검 마스터 입력
	*********************************************************************************************************/
	self.insert = function(params, okFunction) { 
		wsdb.transaction(function(txn) {
			var sqlMain = "insert into SMLTB_DIGN01 ( facil_no, upper_no, plan_ymd, plan_team, dign_ymd, dign_dong_cnt, "
						+ "							  dign_team, dign_person, with_person, unable_reason, add_dign_ymd, report_ymd, "
						+ "							  pre_report_chk, state_grade_ar, state_grade_cv, emerg_yn, emerg_ymd, pro_status ) "
						+ " values ( '"+params.facil_no+"', '"+nvl(params.upper_no)+"', '"+nvl(params.plan_ymd)+"', '"+nvl(params.plan_team)+"', '"+nvl(params.dign_ymd)+"', '"+nvl(params.dign_dong_cnt,1)+"', "
						+ "			 '"+nvl(params.dign_team)+"', '"+nvl(params.dign_person)+"', '"+nvl(params.with_person)+"', '"+nvl(params.unable_reason)+"', '"+nvl(params.add_dign_ymd)+"', '"+nvl(params.report_ymd)+"', "
						+ "			 '"+nvl(params.pre_report_chk)+"', '"+nvl(params.state_grade_ar)+"', '"+nvl(params.state_grade_cv)+"', '"+nvl(params.emerg_yn,'N')+"', '"+nvl(params.emerg_ymd)+"', '"+nvl(params.pro_status)+"' ) ";

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
	**	Function Id  : update
	**	Description  : 안전점검 마스터 수정
	*********************************************************************************************************/
	// 시설개요 - 일반개요
	self.update = function(params, okFunction) { 
		wsdb.transaction(function(txn) {
			var sqlMain = "update SMLTB_DIGN01 "  
						+ "   set dign_team 	= '"+nvl(params.dign_team)+"', "
						+ "		  dign_ymd		= '"+nvl(params.dign_ymd)+"', "
						+ "		  dign_dong_cnt = '"+nvl(params.dign_dong_cnt)+"', "
						+ "		  dign_person	= '"+nvl(params.dign_person) + "', "
						+ "		  with_person	= '"+nvl(params.with_person) + "'  "
						+ " where facil_no		= '"+params.facil_no + "' ";

			//console.log(sqlMain);
			txn.executeSql(sqlMain, [],
				function(transaction, resultSet) {
					okFunction(true);
			}, function (error) {
				console.log("error:" + error);
			});
		});  
	};

	// 기타사항
   	self.update_etc = function(params, okFunction) { 
		wsdb.transaction(function(txn) {
			params.pre_report_chk = concatStr(params.pre_dign_gbn, params.pre_chk_person, params.pre_facil_class, 
											  params.pre_start_ymd, params.pre_end_ymd,	
											  params.pre_grade_ar, params.pre_grade_cv);
			var sqlMain = "update SMLTB_DIGN01 "  
						+ "   set pre_report_chk = '"+nvl(params.pre_report_chk) + "' "
						+ " where facil_no		 = '"+params.facil_no + "' ";

			//console.log(sqlMain);
			txn.executeSql(sqlMain, [],
				function(transaction, resultSet) {
					okFunction(true);
			}, function (error) {
				console.log("error:" + error);
			});
		});
	};

	// 서버전송
   	self.update_submit = function(params, okFunction) { 
		wsdb.transaction(function(txn) {
			var sqlMain = "update SMLTB_DIGN01 "  
						+ "   set submit_yn = 'Y' "
						+ " where facil_no	= '"+params.facil_no + "' ";

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
	**	Description  : 안전점검 마스터 삭제
	*********************************************************************************************************/
	self.delete = function(params, okFunction) { 
		wsdb.transaction(function(txn) {
			var sqlMain = "delete from SMLTB_DIGN01 where facil_no = '"+params.facil_no+"' ";

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
	**	Description  : 안전점검 마스터 1건 조회
	*********************************************************************************************************/
	self.select = function(params, okFunction, dataNotFound) { 
		wsdb.transaction(function(txn) {
			var sqlMain = "select t1.facil_no, t1.upper_no, t1.plan_ymd, t1.plan_team, t1.dign_ymd, t1.dign_dong_cnt, "
						+ "		  t1.dign_team, t1.dign_person, t1.with_person, t1.unable_reason, t1.add_dign_ymd, t1.report_ymd, "
						+ "		  t1.pre_report_chk, t1.state_grade_ar, t1.state_grade_cv, t1.emerg_yn, t1.emerg_ymd, t1.pro_status, "
						+ "		  substr(t1.dign_ymd,1,4) as dign_yy, substr(t1.dign_ymd,5,2) as dign_mm, substr(t1.dign_ymd,7,2) as dign_dd " 
						+ "  from SMLTB_DIGN01 t1 "
						+ " where t1.facil_no = '" + params.facil_no + "'";

			//console.log(sqlMain);
			txn.executeSql(sqlMain, [], 
				function(transaction, resultSet) {
					if (resultSet.rows.length > 0) {
						okFunction(resultSet.rows.item(0));
					} else {
						if ( dataNotFound != undefined) { dataNotFound(); }
					}
			}, function (error) {
				console.log("error:" + error);
			});
		});
	};

	// 기타사항
	self.select_etc = function(params, okFunction, dataNotFound) { 
		wsdb.transaction(function(txn) {		
			var sqlMain = "select t1.facil_no, t1.pre_report_chk, " 
						+ "       (select rpt_content from SMLTB_REPT01 where facil_no = t1.facil_no and rpt_class = 'AS1401') as pre_chk_content, "
						+ "       (select rpt_content from SMLTB_REPT01 where facil_no = t1.facil_no and rpt_class = 'AS1501') as req_dign_part, "
						+ "       (select rpt_content from SMLTB_REPT01 where facil_no = t1.facil_no and rpt_class = 'AS1502') as etc_special "
						+ "  from SMLTB_DIGN01 t1"
						+ " where t1.facil_no = '" + params.facil_no + "'";

			//console.log(sqlMain);
			txn.executeSql(sqlMain, [], 
			   function(transaction, resultSet) {
					if (resultSet.rows.length > 0) {
						var rsBox = resultSet.rows.item(0);
				   		var pre_report_chk 		= rsBox.pre_report_chk.split('|');
						rsBox.pre_dign_gbn		= pre_report_chk.length > 0 ? pre_report_chk[0] : "";
						rsBox.pre_chk_person	= pre_report_chk.length > 1 ? pre_report_chk[1] : "";
						rsBox.pre_facil_class	= pre_report_chk.length > 2 ? pre_report_chk[2] : "";
						rsBox.pre_start_yy		= pre_report_chk.length > 3 ? pre_report_chk[3].substring(0,4) : "";
						rsBox.pre_start_mm		= pre_report_chk.length > 3 ? pre_report_chk[3].substring(4,6) : "";
						rsBox.pre_start_dd		= pre_report_chk.length > 3 ? pre_report_chk[3].substring(6,8) : "";
						rsBox.pre_end_yy		= pre_report_chk.length > 4 ? pre_report_chk[4].substring(0,4) : "";
						rsBox.pre_end_mm		= pre_report_chk.length > 4 ? pre_report_chk[4].substring(4,6) : "";
						rsBox.pre_end_dd		= pre_report_chk.length > 4 ? pre_report_chk[4].substring(6,8) : "";
						rsBox.pre_grade_ar		= pre_report_chk.length > 5 ? pre_report_chk[5] : "";
						rsBox.pre_grade_cv		= pre_report_chk.length > 6 ? pre_report_chk[6] : "";
						okFunction(rsBox);
					} else {
						if ( dataNotFound != undefined) { dataNotFound(); }
					}
			}, function (error) {
				console.log("error:" + error);
			});
		});
	};

}]);

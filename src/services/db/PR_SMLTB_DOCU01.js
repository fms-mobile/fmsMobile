/*************************************************************************************************************
**	Script Id    : PR_SMLTB_DOCU01
**	Script Name  : 설계도서 관련 쿼리 모음
*************************************************************************************************************/
app.service('PR_SMLTB_DOCU01', [function() {  
	var self = this;

	/*********************************************************************************************************
	**	Function Id  : insert
	**	Description  : 설계도서 입력
	*********************************************************************************************************/
	self.insert = function(params, okFunction) {
		wsdb.transaction(function(txn) {
			var sqlMain = "insert into SMLTB_DOCU01 ( facil_no, object_no, doc_status01, doc_status02, doc_status11, doc_status12, doc_status21, doc_status22, "
						+ "							  doc_status23, doc_status24, eq_dsn_tar_yn, eq_dsn_status, eq_dsn_law, eq_dsn_remark ) "
						+ " values ( '"+params.facil_no+"', '"+nvl(params.object_no,'A001')+"', '"+nvl(params.doc_status01)+"', '"+nvl(params.doc_status02)+"', '"+nvl(params.doc_status11)+"', '"+nvl(params.doc_status12)+"', '"+nvl(params.doc_status21)+"', '"+nvl(params.doc_status22)+"', "
						+ "			 '"+nvl(params.doc_status23)+"', '"+nvl(params.doc_status24)+"', '"+nvl(params.eq_dsn_tar_yn)+"', '"+nvl(params.eq_dsn_status)+"', '"+nvl(params.eq_dsn_law)+"', '"+nvl(params.eq_dsn_remark)+"' ) ";

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
	**	Description  : 설계도서 수정
	*********************************************************************************************************/
	self.update = function(params, okFunction) {
		wsdb.transaction(function(txn) {
			var sqlMain = "update SMLTB_DOCU01 "
						+ "   set doc_status01  = '"+nvl(params.doc_status01)+"', "
						+ "       doc_status02  = '"+nvl(params.doc_status02)+"', "
						+ "       doc_status11  = '"+nvl(params.doc_status11)+"', "
						+ "       doc_status12  = '"+nvl(params.doc_status12)+"', "
						+ "       eq_dsn_tar_yn = '"+nvl(params.eq_dsn_tar_yn)+"', "
						+ "       eq_dsn_status = '"+nvl(params.eq_dsn_status)+"', "
						+ "       eq_dsn_law    = '"+nvl(params.eq_dsn_law)+"', "
						+ "       eq_dsn_remark = '"+nvl(params.eq_dsn_remark)+"' "
						+ " where facil_no      = '"+params.facil_no+"' "
						+ "   and object_no     = '"+nvl(params.object_no,'*')+"' ";

			//console.log(sqlMain);
			txn.executeSql(sqlMain, [],
				function(transaction, resultSet) {
					okFunction(true);
			}, function (error) {
				console.log("error:" + error);
			});
		});
	};
 
 	// 허가당시기준
	self.update_dsn_law = function(params, okFunction) {
		wsdb.transaction(function(txn) {
			var sqlMain = "select max(t2.code1) as eq_dsn_law, max(t3.object_no) as object_no "
						+ "  from SMLTB_ARCH01 t1 "
						+ "  	  inner join COMTB_CODE02 t2 on t2.code_group = 'eq_dsn_law' and t2.code1 <= t1.cpl_ymd "
						+ "  	  left outer join SMLTB_DOCU01 t3 on t3.facil_no = t1.facil_no and t3.object_no = t1.building_no "
						+ " where t1.facil_no = '"+params.facil_no+"' "
						+ "   and t1.building_no = '"+params.object_no+"' ";
	
			//console.log(sqlMain);
			txn.executeSql(sqlMain, [],
				function(transaction, resultSet) {
					if(resultSet.rows.length > 0) {
						var rsBox = resultSet.rows.item(0);
						if(nvl(rsBox.object_no) == "") {
							sqlMain = "insert into SMLTB_DOCU01(facil_no, object_no, eq_dsn_law) values('"+params.facil_no+"', '"+params.object_no+"', '"+nvl(rsBox.eq_dsn_law)+"')";
						}else {
							sqlMain = "update SMLTB_DOCU01 set eq_dsn_law = '"+nvl(rsBox.eq_dsn_law)+"' where facil_no = '"+params.facil_no+"' and object_no = '"+params.object_no+"'";
						}	
						//console.log(sqlMain);
						txn.executeSql(sqlMain, [],
							function(transaction, resultSet) {
								okFunction(true);
						}, function (error) {
							console.log("error:" + error);
						});
					}
					okFunction(true);
			}, function (error) {
				console.log("error:" + error);
			});
		});
	};
 
	/*********************************************************************************************************
	**	Function Id  : delete
	**	Description  : 설계도서 삭제
	*********************************************************************************************************/
	self.delete = function(params, okFunction) { 
		wsdb.transaction(function(txn) {
			var sqlMain = "delete from SMLTB_DOCU01 where facil_no = '"+params.facil_no+"' ";

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
	**	Description  : 설계도서 1건 조회
	*********************************************************************************************************/
	self.select = function(params, okFunction, dataNotFound) {
		wsdb.transaction(function(txn) {
			var sqlMain = "select t1.facil_no, t1.building_no as object_no, t1.building_nm, t1.rep_yn, "
						+ "		  t2.doc_status01, t2.doc_status02, t2.doc_status11, t2.doc_status12, "
						+ "		  t2.doc_status21, t2.doc_status22, t2.doc_status23, t2.doc_status24, "
						+ "		  t2.eq_dsn_tar_yn, t2.eq_dsn_status, t2.eq_dsn_law, t2.eq_dsn_remark, "
						+ "		  (select data1 from COMTB_CODE02 where code_group='eq_dsn_law' and code1 = t2.eq_dsn_law) as eq_dsn_law_nm, "
						+ "		  case when t2.facil_no is null then 'INSERT' else 'UPDATE' end as action_type "
						+ "  from SMLTB_ARCH01 t1 "
						+ "		  left outer join SMLTB_DOCU01 t2 on t2.facil_no = t1.facil_no and t2.object_no = t1.building_no "
						+ " where t1.facil_no = '" + params.facil_no + "' "
						+ "   and t1.building_no = '" + params.object_no + "' ";

			//console.log(sqlMain);
			txn.executeSql(sqlMain, [], 
				function(transaction, resultSet) {
					if (resultSet.rows.length > 0) {
						var rsBox = resultSet.rows.item(0);
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
	**	Description  : 설계도서 목록
	*********************************************************************************************************/
	self.list001 = function(params, okFunction) { 
		wsdb.transaction(function(txn) {		
			var sqlMain = "select distinct t1.facil_no, t1.object_no, "
						+ "		  t1.doc_status01, t1.doc_status02, t1.doc_status11, t1.doc_status12, "
						+ "		  t1.eq_dsn_tar_yn, t1.eq_dsn_status, t1.eq_dsn_law, t1.eq_dsn_remark "
						+ "  from SMLTB_DOCU01 t1 "
						+ " where t1.facil_no = '" + params.facil_no + "' "
						+ "order by 2 ";
	
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

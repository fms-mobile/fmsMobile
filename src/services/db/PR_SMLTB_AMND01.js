/*************************************************************************************************************
**	Script Id    : PR_SMLTB_AMND01
**	Script Name  : 보수보강이력 관련 쿼리 모음
*************************************************************************************************************/
app.service('PR_SMLTB_AMND01', [function() {  
	var self = this;

	/*********************************************************************************************************
	**	Function Id  : insert
	**	Description  : 보수보강이력 입력
	*********************************************************************************************************/
	self.insert = function(params, okFunction) {
		wsdb.transaction(function(txn) {
			txn.executeSql("select ifnull(max(amend_seq),0)+1 as amend_seq from SMLTB_AMND01 where facil_no = '"+params.facil_no+"' ", [],
				function(transaction, resultSet) {
					params.amend_seq = resultSet.rows.item(0).amend_seq;
					params.struct_chk_yn = nvl(params.struct_chk_yn) == "true" ? "Y" : "N";
					var sqlMain = "insert into SMLTB_AMND01 ( facil_no, amend_seq, object_no, amend_flag, amend_content, "
								+ "							  const_yy, ref_data_yn, ref_data_content, struct_chk_yn ) "
								+ " values ( '"+nvl(params.facil_no)+"', '"+nvl(params.amend_seq)+"', '"+nvl(params.object_no)+"', '"+nvl(params.amend_flag)+"', '"+nvl(params.amend_content)+"', "
								+ "			 '"+nvl(params.const_yy)+"', '"+nvl(params.ref_data_yn)+"', '"+nvl(params.ref_data_content)+"', '"+nvl(params.struct_chk_yn)+"' ) ";

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
	**	Description  : 보수보강이력 수정
	*********************************************************************************************************/
	self.update = function(params, okFunction) {
		wsdb.transaction(function(txn) {
			var sqlMain = "update SMLTB_AMND01 "
						+ "   set object_no			= '" + nvl(params.object_no) + "', "
						+ "       amend_flag		= '" + nvl(params.amend_flag) + "', "
						+ "       amend_content		= '" + nvl(params.amend_content) + "', "
						+ "       const_yy			= '" + nvl(params.const_yy) + "', "
						+ "       ref_data_yn		= '" + nvl(params.ref_data_yn) + "', "
						+ "       ref_data_content  = '" + nvl(params.ref_data_content) + "', "
						+ "       struct_chk_yn		= '" + nvl(params.struct_chk_yn) + "' "
						+ " where facil_no			= '" + params.facil_no + "' "
						+ "   and amend_seq			= '" + params.amend_seq + "' ";

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
	**	Description  : 보수보강이력 삭제
	*********************************************************************************************************/
	self.delete = function(params, okFunction) {
		wsdb.transaction(function(txn) {
			var sqlMain = "delete from SMLTB_AMND01 where facil_no = '" + params.facil_no + "'";
			if (params.amend_seq != undefined && params.amend_seq != '') { sqlMain += " and amend_seq = '"+params.amend_seq+"'" }

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
	**	Description  : 보수보강이력 1건 조회
	*********************************************************************************************************/
	self.select = function(params, okFunction, dataNotFound) {
		wsdb.transaction(function(txn) {
			var sqlMain = "select t1.facil_no, t1.amend_seq, t1.object_no, t2.building_nm, t1.amend_flag, "
						+ "		  t1.amend_content, t1.const_yy, t1.ref_data_yn, t1.ref_data_content, t1.struct_chk_yn "
						+ "  from SMLTB_AMND01 t1 "
						+ "		  left outer join SMLTB_ARCH01 t2 on t2.facil_no = t1.facil_no and t2.building_no = t1.object_no "
						+ " where t1.facil_no = '" + params.facil_no + "' "
						+ "   and t1.amend_seq = '" + params.amend_seq + "' ";

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

	/*********************************************************************************************************
	**	Function Id  : list
	**	Description  : 보수보강이력 목록
	*********************************************************************************************************/
	self.list001 = function(params, okFunction) { 
		wsdb.transaction(function(txn) {		
			var sqlMain = "select t1.facil_no, t1.amend_seq, t1.object_no, t2.building_nm, t1.amend_flag, "
						+ "		  t1.amend_content, t1.const_yy, t1.ref_data_yn, t1.ref_data_content, t1.struct_chk_yn, "
						+ "		  (select data1 from COMTB_CODE02 where code_group='amend_flag' and code1=t1.amend_flag) as amend_flag_nm "
						+ "  from SMLTB_AMND01 t1 "
						+ "		  left outer join SMLTB_ARCH01 t2 on t2.facil_no = t1.facil_no and t2.building_no = t1.object_no "
						+ " where t1.facil_no = '" + params.facil_no + "'";

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

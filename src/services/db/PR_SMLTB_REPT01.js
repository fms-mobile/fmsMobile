/*************************************************************************************************************
**	Script Id    : PR_SMLTB_REPT01
**	Script Name  : 안전점검보고서 관련 쿼리 모음
*************************************************************************************************************/
app.service('PR_SMLTB_REPT01', [function() { 
	var self = this;

	/*********************************************************************************************************
	**	Function Id  : insert
	**	Description  : 안전점검보고서 입력
	*********************************************************************************************************/
	self.insert = function(params, okFunction) {
		wsdb.transaction(function(txn) {
			txn.executeSql("select ifnull(max(rpt_seq),0)+1 as rpt_seq from SMLTB_REPT01 where facil_no = '"+params.facil_no+"' ", [],
				function(transaction, resultSet) {
					params.rpt_seq = resultSet.rows.item(0).rpt_seq;
					var sqlMain = "insert into SMLTB_REPT01 ( facil_no, rpt_seq, rpt_class, rpt_head, rpt_content, etc_remark, sort_order ) "
								+ " values ( '"+nvl(params.facil_no)+"', '"+nvl(params.rpt_seq)+"', '"+nvl(params.rpt_class)+"', '"+nvl(params.rpt_head)+"', '"+nvl(params.rpt_content)+"', '"+nvl(params.etc_remark)+"', '"+nvl(params.sort_order)+"' ) ";

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
	**	Description  : 안전점검보고서 수정
	*********************************************************************************************************/
	self.update = function(params, okFunction) { 
		wsdb.transaction(function(txn) {
			var sqlMain = "update SMLTB_REPT01 "
						+ "   set rpt_class   = '"+nvl(params.rpt_class)+"', "
						+ "       rpt_head    = '"+nvl(params.rpt_head)+"', "
						+ "       rpt_content = '"+nvl(params.rpt_content)+"', "
						+ "       etc_remark  = '"+nvl(params.etc_remark)+"', "
						+ "       sort_order  = '"+nvl(params.sort_order)+"' "
						+ " where facil_no    = '"+params.facil_no+"' "
						+ "   and rpt_seq     = '"+params.rpt_seq+"' ";

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
	**	Description  : 안전점검보고서 삭제
	*********************************************************************************************************/
	self.delete = function(params, okFunction) { 
		wsdb.transaction(function(txn) {
			var sqlMain = "delete from SMLTB_REPT01 where facil_no = '"+params.facil_no+"' ";
			if (params.rpt_seq != undefined && params.rpt_seq != '') { sqlMain += " and rpt_seq = '"+params.rpt_seq+"' " }
			if (params.rpt_class != undefined && params.rpt_class != '') { sqlMain += " and rpt_class in ("+params.rpt_class+") " }

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
	**	Description  : 안전점검보고서 1건 조회
	*********************************************************************************************************/
	self.select = function(params, okFunction, dataNotFound) {
		wsdb.transaction(function(txn) {
			var sqlMain = "select t1.* "
						+ "  from SMLTB_REPT01 t1 "
						+ " where t1.facil_no = '"+params.facil_no+"' ";
			if (params.rpt_seq != undefined && params.rpt_seq != '') { sqlMain += " and rpt_seq = '"+params.rpt_seq+"' " }

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
	**	Description  : 안전점검보고서 목록
	*********************************************************************************************************/
	self.list001 = function(params, okFunction) { 
		wsdb.transaction(function(txn) {
			var sqlMain = "select t1.* "
						+ "  from SMLTB_REPT01 t1 "
						+ " where t1.facil_no = '" + params.facil_no + "'"
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

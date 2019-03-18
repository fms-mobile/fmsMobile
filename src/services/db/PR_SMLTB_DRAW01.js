/*************************************************************************************************************
**	Script Id    : PR_SMLTB_DRAW01
**	Script Name  : 캔버스 그리기정보 관련 쿼리 모음
*************************************************************************************************************/
app.service('PR_SMLTB_DRAW01', [function() {  
	var self = this;

	/*********************************************************************************************************
	**	Function Id  : insert
	**	Description  : 캔버스 그리기정보 입력
	*********************************************************************************************************/
	self.insert = function(params, okFunction) {
		wsdb.transaction(function(txn) {
			txn.executeSql("select ifnull(max(draw_seq),0)+1 as draw_seq from SMLTB_DRAW01 where facil_no = '"+params.facil_no+"' ", [],
				function(transaction, resultSet) {
					params.draw_seq = resultSet.rows.item(0).draw_seq;
					var sqlMain = "insert into SMLTB_DRAW01 ( facil_no, draw_seq, file_no, layer_nm, shape ) "
								+ " values ( '"+nvl(params.facil_no)+"', '"+nvl(params.draw_seq)+"', '"+nvl(params.file_no)+"', '"+nvl(params.layer_nm)+"', '"+nvl(params.shape)+"' ) ";

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
	**	Description  : 캔버스 그리기정보 수정
	*********************************************************************************************************/
	self.update = function(params, okFunction) { 
		wsdb.transaction(function(txn) {
			var sqlMain = "update SMLTB_DRAW01 "
						+ "   set file_no   = '"+nvl(params.new_file_no)+"' "
						+ " where facil_no  = '"+params.facil_no+"' ";
						+ "   and file_no   = '"+params.file_no+"' ";

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
	**	Description  : 캔버스 그리기정보 삭제
	*********************************************************************************************************/
	self.delete = function(params, okFunction) { 
		wsdb.transaction(function(txn) {
			var sqlMain = "delete from SMLTB_DRAW01 where facil_no = '"+params.facil_no+"' ";
			if(params.draw_seq != undefined && params.draw_seq != '') { 
				sqlMain += " and draw_seq = " + params.draw_seq;
			}else if(params.file_no != undefined && params.file_no != '') { 
				sqlMain += " and file_no = " + params.file_no;
			}else if(params.layer_nm != undefined && params.layer_nm != '') { 
				sqlMain += " and layer_nm = '"+params.layer_nm+"' ";
			}

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
	**	Description  : 캔버스 그리기정보 1건 조회
	*********************************************************************************************************/
	self.select = function(params, okFunction, dataNotFound) {
		wsdb.transaction(function(txn) {
			var sqlMain = "select t1.* "
						+ "  from SMLTB_DRAW01 t1 "
						+ " where t1.facil_no = '"+params.facil_no+"' "
						+ "   and t1.draw_seq = '"+params.draw_seq+"' ";

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
	**	Description  : 캔버스 그리기정보 목록
	*********************************************************************************************************/
	self.list001 = function(params, okFunction) { 
		wsdb.transaction(function(txn) {
			var sqlMain = "select t1.facil_no, t1.draw_seq, t1.file_no, t1.layer_nm, t1.shape "
						+ "  from SMLTB_DRAW01 t1 "
						+ " where t1.facil_no = '"+params.facil_no+"' ";
						
			if(params.file_no != undefined && params.file_no != '') { 
				sqlMain += " and t1.file_no = " + params.file_no;
			}else if(params.layer_nm != undefined && params.layer_nm != '') { 
				sqlMain += " and t1.layer_nm = '"+params.layer_nm+"' ";
			}
			sqlMain += " order by t1.draw_seq ";

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
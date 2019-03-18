/*************************************************************************************************************
**	Script Id    : PR_LNKTB_SPEC01
**	Script Name  : 데이터 연동 관련 쿼리 모음
*************************************************************************************************************/
app.service('PR_LNKTB_SPEC01', [function() {  
	var self = this;

	/*********************************************************************************************************
	**	Function Id  : insert
	**	Description  : 데이터 연동구조 입력
	*********************************************************************************************************/
	self.insert = function(params, okFunction) {
		wsdb.transaction(function(txn) {
			var sqlMain = "insert into LNKTB_SPEC01 ( ref_table, elm_seq, elm_id, elm_nm, data_type, max_length, data_precision, "
						+ "							  valid_rule, code_group, code_value, required_yn, etc_remark ) "
						+ " values ( '"+nvl(params.ref_table)+"', '"+nvl(params.elm_seq)+"', '"+nvl(params.elm_id)+"', '"+nvl(params.elm_nm)+"', '"+nvl(params.data_type)+"', '"+nvl(params.max_length)+"', '"+nvl(params.data_precision)+"', "
						+ "			 '"+nvl(params.valid_rule)+"', '"+nvl(params.code_group)+"', '"+nvl(params.code_value)+"', '"+nvl(params.required_yn)+"', '"+nvl(params.etc_remark)+"' ) ";

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
	**	Description  : 데이터 연동구조 삭제
	*********************************************************************************************************/
	self.delete = function(params, okFunction) {
		wsdb.transaction(function(txn) {
			var sqlMain = "delete from LNKTB_SPEC01 where 1=1 ";
			if (params.ref_table != undefined && params.ref_table != '') { sqlMain += " and ref_table = '"+params.ref_table+"'" }

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
	**	Description  : 데이터 연동구조 목록
	*********************************************************************************************************/
	self.list001 = function(params, okFunction) { 
		wsdb.transaction(function(txn) {
			var sqlMain = " select t1.* from LNKTB_SPEC01 t1 where 1=1 ";
			
			if(params.ref_table != undefined && params.ref_table != '') { sqlMain += " and ref_table = '"+params.ref_table+"' "; }
			if(params.data_type == 'data') { 
				sqlMain += " and t1.ref_table in ('SMLTB_MAST01','SMLTB_ORGN01','SMLTB_ARCH01','SMLTB_ARCH11','SMLTB_CIVL01','SMLTB_AMND01', "
						+ "						  'SMLTB_DOCU01','SMLTB_DIGN01','SMLTB_DIGN11','SMLTB_REPT01','SMLTB_DRAW01','COMTB_FILE01', 'SMLTB_SIGN01')";
			}else if(params.data_type == 'code') { 
				sqlMain += " and t1.ref_table in ('COMTB_CODE02','SMLTB_CODE01','LNKTB_SPEC01')";
			}			
			sqlMain + " order by t1.ref_table, t1.elm_seq ";

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
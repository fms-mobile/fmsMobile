/*************************************************************************************************************
**	Script Id    : PR_COMTB_CODE02
**	Script Name  : 공통코드 관련 쿼리 모음
*************************************************************************************************************/
app.service('PR_COMTB_CODE02', [function() {
	var self = this;

	/*********************************************************************************************************
	**	Function Id  : insert
	**	Description  : 공통코드 입력
	*********************************************************************************************************/
	self.insert = function(params, okFunction) {
		wsdb.transaction(function(txn) {
			var sqlMain = "insert into COMTB_CODE02 ( code_group, code1, code2, code3, data1, data2, data3, data4, data5, "
						+ "							  data6, data7, sort_order, use_yn ) "
						+ " values ( '"+nvl(params.code_group)+"', '"+nvl(params.code1)+"', "
						+ "			 case when '"+nvl(params.code2)+"' = '' then null else '"+params.code2+"' end, "
						+ "			 case when '"+nvl(params.code3)+"' = '' then null else '"+params.code3+"' end, "
						+ " 		 '"+nvl(params.data1)+"', '"+nvl(params.data2)+"', '"+nvl(params.data3)+"', '"+nvl(params.data4)+"', '"+nvl(params.data5)+"', "
						+ "			 '"+nvl(params.data6)+"', '"+nvl(params.data7)+"', '"+nvl(params.sort_order)+"', '"+nvl(params.use_yn)+"' ) ";

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
	**	Description  : 공통코드 삭제
	*********************************************************************************************************/
	self.delete = function(params, okFunction) {
		wsdb.transaction(function(txn) {
			var sqlMain = "delete from COMTB_CODE02 where 1=1 ";
			if (params.code_group != undefined && params.code_group != '') { sqlMain += " and code_group = '"+params.code_group+"'" }

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
	**	Description  : 공통코드 목록
	*********************************************************************************************************/
	self.list001 = function(params, okFunction) {
		wsdb.transaction(function(txn) {
			var sqlMain = "select code_group, code1, code2, code3, data1, data2, data3, data4, data5, data6, data7, sort_order, use_yn "
						+ "  from COMTB_CODE02 "
						+ " where code_group = '"+params.code_group+"' ";

			if (params.code1 != undefined && params.code1 != '') { sqlMain += " and code1 like '"+params.code1+"%' "; }
			if (params.data5 != undefined && params.data5 != '') { sqlMain += " and data5 like '"+params.data5+"%' "; }
			if (params.use_yn != undefined && params.use_yn != '') { sqlMain += " and use_yn = '"+params.use_yn+"' "; }
			
			sqlMain += " order by case when use_yn='N' then 2 else 1 end, sort_order, code1, code2, code3 ";
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

	// 공통코드 선택
	self.listCode = function(params, okFunction) {
		wsdb.transaction(function(txn) {
			var sqlMain = "";
			var sqlWhere = " where code_group = '"+params.code_group+"' and ifnull(use_yn,'Y') = 'Y' ";
	
			if (params.data5 != undefined && params.data5 != '') {
				sqlMain = "select distinct code1 as code, data1 as data, sort_order from COMTB_CODE02 ";
				sqlWhere += " and data5 like '"+params.data5+"%' ";
			}else if (params.code2 != undefined && params.code2 != '') {
				sqlMain = "select distinct code3 as code, data3 as data, sort_order from COMTB_CODE02 ";
				sqlWhere += " and code1 = '"+params.code1+"' and code2 = '"+params.code2+"' ";
			}else if (params.code1 != undefined && params.code1 != '') {
				sqlMain = "select distinct code2 as code, data2 as data, sort_order from COMTB_CODE02 ";
				sqlWhere += " and code1 = '"+params.code1+"' and code2 is not null and code3 is null ";
			}else {
				sqlMain = "select distinct code1 as code, data1 as data, sort_order from COMTB_CODE02 ";
				sqlWhere += " and code2 is null ";
			}
	
			sqlMain = sqlMain + sqlWhere + "order by 3,1 ";
			//console.log(sqlMain);
			var rtn = txn.executeSql(sqlMain, [], 
				function(transaction, resultSet) {
					var res = [];
					for (var i=0; i < resultSet.rows.length; i++) {
						var rsBox = resultSet.rows.item(i);
						rsBox.code_data = concatStr(rsBox.code, rsBox.data);
						res.push(rsBox);
					}
					if (okFunction) {
						okFunction(res);
					}
				});
			});
	};

}]);

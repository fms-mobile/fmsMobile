/*************************************************************************************************************
**	Script Id    : PR_COMTB_USER01
**	Script Name  : 로그인정보 관련 쿼리 모음
*************************************************************************************************************/
app.service('PR_COMTB_USER01', [function() {
	var self = this;

	/*********************************************************************************************************
	**	Function Id  : update
	**	Description  : 로그인정보 저장
	*********************************************************************************************************/
	self.update = function(params, okFunction) {
		wsdb.transaction(function(txn) {
			var sqlMain = "update COMTB_USER01 "
						+ "   set user_id		= '" + nvl(params.user_id) + "', "
						+ "   	  pswd			= '" + nvl(params.pswd) + "', "
						+ "   	  user_nm		= '" + nvl(params.user_nm) + "', "
						+ "   	  dign_team		= '" + nvl(params.dign_team) + "', "
						+ "   	  facil_gbn		= '" + nvl(params.facil_gbn) + "', "
						+ "   	  id_check		= '" + nvl(params.id_check) + "', "
						+ "   	  pw_check		= '" + nvl(params.pw_check) + "', "
						+ "   	  sys_reg_date	= '" + nvl(params.sys_reg_date) + "' "
						+ " where 1=1 ";

			//console.log(sqlMain);
			txn.executeSql(sqlMain, [],
				function(transaction, resultSet) {
					okFunction(true);
			}, function (error) {
				console.log("error:" + error);
			});
		});
	};

	self.update_facil_gbn = function(params, okFunction) {
		wsdb.transaction(function(txn) {
			var sqlMain = "update COMTB_USER01 "
						+ "   set facil_gbn	= case when '"+nvl(params.facil_gbn)+"' = '' then facil_gbn else '"+params.facil_gbn+"' end "
						+ " where 1=1 ";

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
	**	Description  : 로그인정보 1건 조회
	*********************************************************************************************************/
	self.select = function(params, okFunction) {
		wsdb.transaction(function(txn) {
			var sqlMain = "select user_id, pswd, user_nm, dign_team, facil_gbn, id_check, pw_check, sys_reg_date "
						+ "  from COMTB_USER01 "
						+ " where 1=1 ";

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

}]);

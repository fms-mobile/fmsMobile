/*************************************************************************************************************
**	Script Id    : PR_SMLTB_SIGN01
**	Script Name  : 시설물관리 서명 관련 쿼리 모음
*************************************************************************************************************/
app.service('PR_SMLTB_SIGN01', [function() {  
	var self = this;

	/*********************************************************************************************************
	**	Function Id  : insert_update_sign_image
	**	Description  : 시설물관리 서명 입력
	*********************************************************************************************************/
	self.insert_update_sign_image = function(params, okFunction) { 
        console.log(params);
        self.select(params , 
            function(rtn) {
                wsdb.transaction(function(txn) {
                    var sqlMain = "update SMLTB_SIGN01 "
                                + "   set sign_image   = '" + nvl(params.sign_image) + "', "
                                + "       duty_nm      = '" + nvl(params.duty_nm) + "', "
                                + "       user_nm      = '" + nvl(params.user_nm) + "', "
                                + "       require_yn   = '" + nvl(params.require_yn) + "', "
                                + "       choice_yn    = '" + nvl(params.choice_yn) + "' "
                                + " where facil_no     = '" + params.facil_no + "' "
                                + "   and sign_gbn     = '" + params.sign_gbn + "' ";
                    if (params.sign_gbn == "SUB") {
                        sqlMain += "  and sign_seq  = '" + params.sign_seq + "' "; 
                    }
        
                    txn.executeSql(sqlMain, [],
                        function(transaction, resultSet) {
                            okFunction(true);
                    }, function (error) {
                        console.log("error:" + error);
                    });
                });
            } , 
            function(rtn) {
                var date = new Date().toISOString().split('T')[0].split('-');
                var signDate = date[0]+date[1]+date[2];
                wsdb.transaction(function(txn) {
                    var sqlMain = "insert into SMLTB_SIGN01 ( facil_no, sign_gbn, sign_seq, sign_ymd, duty_nm, user_nm, require_yn, choice_yn, sign_image ) "
                                + " values ( '"+params.facil_no+"', '"
                                        + nvl(params.sign_gbn)+"', "
                                        + "(select ifnull(max(sign_seq),0) + 1 from smltb_sign01 where facil_no ='" +params.facil_no+ "'),'"
                                        + signDate+"', '" 
                                        + nvl(params.duty_nm)+"','"
                                        + nvl(params.user_nm)+"','"
                                        + nvl(params.require_yn)+"','"
                                        + nvl(params.choice_yn)+"','"
                                        + nvl(params.sign_image)+"' ) ";
         
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
	**	Function Id  : insert_update_user
	**	Description  : 시설물관리 서명 사용자 등록
	*********************************************************************************************************/
    self.insert_update_user = function(params, okFunction) {
        self.select(params, 
            function(rtn) {
                wsdb.transaction(function(txn) {
                    var sqlMain = "insert into SMLTB_SIGN01 ( facil_no, sign_gbn, sign_seq, sign_ymd, duty_nm, user_nm, ) "
                                + " values ( '"+params.facil_no+"', '"
                                        + nvl(params.sign_gbn)+"', "
                                        + "(select ifnull(max(sign_seq),0) + 1 from smltb_sign01 where facil_no ='" +params.facil_no+ "'),'"
                                        + new Date().toISOString().split('T')[0]+"', '"
                                        + nvl(params.duty_nm)+"', '"
                                        + nvl(params.user_nm)+"', '"
                                        + nvl(params.sign_image)+"' ) ";
         
                    txn.executeSql(sqlMain, [],
                        function(transaction, resultSet) {
                            okFunction(true);
                    }, function (transaction, error) {
                        console.log("error:" + error);
                    });
                });
            } , 
            function(rtn) {
                wsdb.transaction(function(txn) {

                    var sqlMain = "update SMLTB_SIGN01 "
                                + "   set duty_nm      = '" + nvl(params.duty_nm) + "', "
                                + "       user_nm      = '" + nvl(params.user_nm) + "'  "
                                + " where facil_no     = '" + params.facil_no + "' "
                                + "   and sign_gbn     = '" + params.sign_gbn + "' ";
                    if (params.sign_gbn == "SUB") {
                        sqlMain += "   and sign_seq     = '" + params.sign_seq + "' "; 
                    }
        
                    //console.log(sqlMain);
                    txn.executeSql(sqlMain, [],
                        function(transaction, resultSet) {
                            okFunction(true);
                    }, function (error) {
                        console.log("error:" + error);
                    });
                });
            });
		
	};

	/*********************************************************************************************************
	**	Function Id  : update
	**	Description  : 시설물관리 서명 수정
	*********************************************************************************************************/
	// 시설개요 - 일반개요
	self.update = function(params, okFunction) {
		// 위 insert or update로 처리
	};
   
	/*********************************************************************************************************
	**	Function Id  : delete
	**	Description  : 시설물관리 서명 삭제
	*********************************************************************************************************/
	self.delete = function(params, okFunction) { 
		wsdb.transaction(function(txn) {
			var sqlMain = "delete from SMLTB_SIGN01 "
                        + " where facil_no     = '" + params.facil_no + "' "
            if (params.sign_gbn != null) {
                sqlMain += "   and sign_gbn     = '" + params.sign_gbn + "' ";
            }
                
            if (params.sign_gbn == "SUB") {
                sqlMain += "   and sign_seq     = '" + params.sign_seq + "' "; 
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
	**	Description  : 시설물관리 서명 1건 조회
	*********************************************************************************************************/
	self.select = function(params, okFunction, dataNotFound) {
		wsdb.transaction(function(txn) {
			var sqlMain = "select t1.facil_no, t1.sign_gbn, t1.sign_seq, t1.sign_ymd, t1.duty_nm, t1.user_nm, t1.require_yn, t1.choice_yn, t1.sign_image "
						+ "  from SMLTB_SIGN01 t1 "
                        + " where t1.facil_no     = '" + params.facil_no + "' "
                        + "   and t1.sign_gbn     = '" + params.sign_gbn + "' "
            if (params.sign_gbn == "SUB") {
                sqlMain += "   and t1.sign_seq     = '" + params.sign_seq + "' "; 
            }

			// console.log(sqlMain);
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
	**	Description  : 시설물관리 서명 목록
	*********************************************************************************************************/ 
	self.list001 = function(params, okFunction) { 
		wsdb.transaction(function(txn) {		
            var sqlMain = "select t1.facil_no, t1.sign_gbn, t1.sign_seq, t1.sign_ymd, t1.require_yn, t1.choice_yn, t1.duty_nm, t1.user_nm, t1.sign_image " 
                     +  "  from SMLTB_SIGN01 t1 "
                     + " where t1.facil_no     = '" + params.facil_no + "' ";
                     if (params.sign_gbn != null) {
                        sqlMain += "   and t1.sign_gbn     = '" + params.sign_gbn + "' "; 
                     }
					 sqlMain += " order by t1.sign_seq asc ";

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
				}, function(txn, error) {
					console.log(error);
				});
		});
	};
 
}]);

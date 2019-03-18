/*************************************************************************************************************
**	Script Id    : PR_COMTB_FILE01
**	Script Name  : 첨부파일 관련 쿼리 모음
*************************************************************************************************************/
app.service('PR_COMTB_FILE01', [function() {  
	var self = this;

	/*********************************************************************************************************
	**	Function Id  : insert
	**	Description  : 첨부파일 입력
	*********************************************************************************************************/
	self.insert = function(params, okFunction) {
		wsdb.transaction(function(txn) {
			txn.executeSql("select (select ifnull(max(file_no),0)+1 from COMTB_FILE01) as file_no, "
					     + "       (select ifnull(max(sort_order),0) + 1 from COMTB_FILE01 where ref_table = '"+params.ref_table+"' and ref_pk like '"+params.facil_no+"%') as sort_order ", [],
				function(transaction, resultSet) {
					params.file_no = resultSet.rows.item(0).file_no;
					params.sort_order = resultSet.rows.item(0).sort_order;
					var sqlMain = "insert into COMTB_FILE01 ( file_no, file_nm, file_path, file_nm_mod, file_path_mod, file_desc, file_type, file_size, "
								+ "							  file_kind, download_cnt, report_yn, sort_order, ref_table, ref_pk, sys_reg_date ) "
								+ " values ( '"+nvl(params.file_no)+"', '"+nvl(params.file_nm)+"', '"+nvl(params.file_path)+"', '"+nvl(params.file_nm_mod)+"', '"+nvl(params.file_path_mod)+"', '"+nvl(params.file_desc)+"', '"+nvl(params.file_type)+"', '"+nvl(params.file_size)+"', "
								+ "			 '"+nvl(params.file_kind,'P')+"', '"+nvl(params.download_cnt)+"', '"+nvl(params.report_yn,'Y')+"', '"+nvl(params.sort_order)+"', '"+nvl(params.ref_table)+"', '"+nvl(params.ref_pk)+"', '"+nvl(params.sys_reg_date)+"' ) ";

					// console.log(sqlMain);
					txn.executeSql(sqlMain, [],
						function(transaction, resultSet) {
							okFunction({ file_no : params.file_no,
								         sort_order : params.sort_order});		
					}, function (transaction, error) {
						console.log("error:" + error);
					});
			}, function (error) {
				console.log("error:" + error);
			});
		});
	};

	/*********************************************************************************************************
	**	Function Id  : update
	**	Description  : 첨부파일 수정
	*********************************************************************************************************/
	self.update = function(params, okFunction) { 
		wsdb.transaction(function(txn) {
			var sqlMain = "update COMTB_FILE01 "
						+ "   set file_nm   = '"+nvl(params.file_nm)+"', "
						+ "       file_path = '"+nvl(params.file_path)+"', "
						+ "       file_desc = '"+nvl(params.file_desc)+"', "
						+ "       file_kind = '"+nvl(params.file_kind,'P')+"', "
						+ "       file_type = '"+nvl(params.file_type)+"', "
						+ "       file_size = '"+nvl(params.file_size)+"'  "
						+ " where file_no   = '"+params.file_no+"' ";

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
	**	Function Id  : update_mod
	**	Description  : 첨부파일(수정파일) 수정
	*********************************************************************************************************/
	self.update_mod = function(params, okFunction) { 
		wsdb.transaction(function(txn) {
			var sqlMain = "update COMTB_FILE01 "
						+ "   set file_nm_mod   = '"+nvl(params.file_nm_mod)+"', "
						+ "       file_path_mod = '"+nvl(params.file_path_mod)+"' "
						+ " where file_no   = '"+params.file_no+"' ";

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
	**	Description  : 첨부파일 삭제
	*********************************************************************************************************/
	self.delete = function(params, okFunction) { 
		wsdb.transaction(function(txn) {
			var sqlMain = "delete from COMTB_FILE01 where 1=1 ";
			if (params.file_no != undefined && params.file_no != '') { 
				sqlMain += " and file_no = '"+params.file_no+"' "; 
			}else if (params.file_nm == "mast_sign") { 
				sqlMain += " and file_nm = '"+params.file_nm+"' ";
			}else if (params.ref_table.indexOf(",") > 0) { 
				sqlMain += " and ref_table in ("+params.ref_table+") "
						 + " and ref_pk like '"+params.ref_pk+"%' ";
			}else { 
				sqlMain += " and ref_table = '"+params.ref_table+"' "
						 + " and ref_pk like '"+params.ref_pk+"%' ";
			}

			console.log(sqlMain);
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
	**	Description  : 첨부파일 1건 조회
	*********************************************************************************************************/
	self.select = function(params, okFunction, dataNotFound) {
		wsdb.transaction(function(txn) {
			var sqlMain = "select t1.* from COMTB_FILE01 t1 where 1=1 ";
			if (params.file_no != undefined && params.file_no != '') { 
				sqlMain += " and file_no = '"+params.file_no+"' "; 
			}else { 
				sqlMain += " and ref_table = '"+params.ref_table+"' "
						 + " and ref_pk like '"+params.ref_pk+"' ";
			}

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
	**	Description  : 첨부파일 목록
	*********************************************************************************************************/
	self.list001 = function(params, okFunction) { 
		wsdb.transaction(function(txn) {
			var sqlMain = "select t1.* from COMTB_FILE01 t1 where 1=1 ";
			if (params.ref_table.indexOf(",") > 0) { 
				sqlMain += " and ref_table in ("+params.ref_table+") ";
			}else if (nvl(params.ref_table) != "") { 
				sqlMain += " and ref_table = '"+params.ref_table+"' "
			}

			if (params.ref_pk != undefined && params.ref_pk != '') { sqlMain += " and ref_pk like '"+params.ref_pk+"%' "; }
			if (params.file_kind != undefined && params.file_kind != '') { sqlMain += " and file_kind = '"+params.file_kind+"' "; }
			
			sqlMain += " order by t1.file_no ";

			// console.log(sqlMain);
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

	// 사진편집 목록
	self.list002A = function(params, okFunction) { 
		wsdb.transaction(function(txn) {
			var sqlMain = "select t1.file_no, t1.ref_pk, t1.file_path, t2.building_nm as file_desc "
						+ "  from COMTB_FILE01 t1 "
						+ "  	  inner join SMLTB_ARCH01 t2 on t2.facil_no = substr(t1.ref_pk,1,14) and t2.building_no = substr(t1.ref_pk,16,4) "
						+ " where t1.ref_table = 'SMLTB_ARCH01' "
						+ "   and t1.ref_pk like '"+params.ref_pk+"%' ";
						
			//console.log(sqlMain);
			//debugger;
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

	self.list002B = function(params, okFunction) { 
		wsdb.transaction(function(txn) {
			var sqlMain = "select t1.file_no, t1.ref_pk, t1.file_path, t2.* "
						+ "  from COMTB_FILE01 t1 "
						+ "  	  inner join SMLTB_DIGN11 t2 on t2.facil_no = substr(t1.ref_pk,1,14) and t2.record_no = substr(t1.ref_pk,16) "
						+ " where t1.ref_table = 'SMLTB_DIGN11' "
						+ "   and t1.ref_pk like '"+params.ref_pk+"%' ";

			//console.log(sqlMain);
			var rtn = txn.executeSql(sqlMain, [], 
				function(transaction, resultSet) {
				    var res = [];
					for (var i=0; i < resultSet.rows.length; i++) {
						var rsBox = resultSet.rows.item(i);
						rsBox.floor_nm = getFloorNm(rsBox.floor_no);
						rsBox.file_desc = getSpaceFullNm(rsBox.object_nm, rsBox.floor_nm, rsBox.room_nm, rsBox.room_detail) + " " 
										+ (rsBox.record_type == "2" ? "전경" : rsBox.defect_nm);
						res.push(rsBox);
					}
					if (okFunction) {
						okFunction(res);
					}
				});
		});
	};

}]);
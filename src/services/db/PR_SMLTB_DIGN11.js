/*************************************************************************************************************
**	Script Id    : PR_SMLTB_DIGN11
**	Script Name  : 현장조사 관련 쿼리 모음
*************************************************************************************************************/
app.service('PR_SMLTB_DIGN11', [function() { 
	var self = this;

	/*********************************************************************************************************
	**	Function Id  : insert
	**	Description  : 현장조사 입력
	*********************************************************************************************************/
	self.insert = function(params, okFunction) {
		wsdb.transaction(function(txn) {
			txn.executeSql("select ifnull(max(record_no),0)+1 as record_no from SMLTB_DIGN11 where facil_no = '"+params.facil_no+"' ", [],
				function(transaction, resultSet) {
					console.log("file_check : " + params.file_check);
					params.record_no = resultSet.rows.item(0).record_no;
					params.record_type = nvl(params.defect_cd) == "" ? "2" : "1";
					var sqlMain = "insert into SMLTB_DIGN11 ( facil_no, record_no, record_type, object_no, floor_no, room_no, room_nm, room_detail, "
								+ "							  buwee_cd, bujae_cd, defect_cd, cause_cd1, cause_cd2, maint_cd, amend_cd, dign_cd, eval_grade, "
								+ "							  buwee_nm, bujae_nm, defect_nm, defect_size, through_yn, leak_yn, block_yn, rep_yn, cause_nm1, "
								+ "							  cause_nm2, maint_nm, amend_nm, dign_nm, amend_rank, etc_remark ) "
								+ " values ( '"+params.facil_no+"', '"+params.record_no+"', '"+nvl(params.record_type)+"', '"+nvl(params.object_no)+"', '"+nvl(params.floor_no)+"', '"+nvl(params.room_no)+"', '"+nvl(params.room_nm)+"', '"+nvl(params.room_detail)+"', "
								+ "			 '"+nvl(params.buwee_cd)+"', '"+nvl(params.bujae_cd)+"', '"+nvl(params.defect_cd)+"', '"+nvl(params.cause_cd1)+"', '"+nvl(params.cause_cd2)+"', '"+nvl(params.maint_cd)+"', '"+nvl(params.amend_cd)+"', '"+nvl(params.dign_cd)+"', '"+nvl(params.eval_grade)+"', "
								+ "			 '"+nvl(params.buwee_nm)+"', '"+nvl(params.bujae_nm)+"', '"+nvl(params.defect_nm)+"', '"+nvl(params.defect_size)+"', '"+nvl(params.through_yn)+"', '"+nvl(params.leak_yn)+"', '"+nvl(params.block_yn)+"', '"+nvl(params.rep_yn)+"', '"+nvl(params.cause_nm1)+"', "
								+ "			 '"+nvl(params.cause_nm2)+"', '"+nvl(params.maint_nm)+"', '"+nvl(params.amend_nm)+"', '"+nvl(params.dign_nm)+"', '"+nvl(params.amend_rank)+"', '"+nvl(params.etc_remark)+"' ) ";
 
					//console.log(sqlMain);
					txn.executeSql(sqlMain, [],
						function(transaction, resultSet) {
							params.ref_pk = params.facil_no + "|" + params.record_no;
							var imageSQL1 = "select count(*) as cnt from COMTB_FILE01 where ref_pk like '"+params.facil_no+"|NEW' ";
							var imageSQL2 = "update COMTB_FILE01 set ref_pk = '" + params.ref_pk + "' where 1=1 ";
							var imageSQL3 = "update COMTB_FILE01 set ref_pk = '" + params.ref_pk + "' where 1=1 ";
							/*
							var imageSQL3 = "insert into COMTB_FILE01 (file_no, file_nm, file_path, file_nm_mod, file_path_mod, file_desc, file_type, file_size, "
				                          + "						   file_kind, download_cnt, report_yn, sort_order, ref_table, ref_pk, sys_reg_date ) "
				                          + " select (select ifnull(max(file_no),0)+1 from COMTB_FILE01), "
				                          + "        file_nm, file_path, file_nm_mod, file_path_mod, file_desc, file_type, file_size, file_kind, download_cnt, "
				                          + "        report_yn, sort_order, ref_table, '" + params.ref_pk + "', sys_reg_date"
				                          + "   from COMTB_FILE01 "
				                          + "  where 1=1 ";
							*/                        
							if(nvl(params.image_file_no1) != "") { 
								txn.executeSql(imageSQL1+" and file_no = '"+params.image_file_no1+"'", [], 
									function(transaction, resultSet) {
					    				sqlMain = (resultSet.rows.item(0).cnt > 0 ? imageSQL2 : imageSQL3) + " and file_no = '"+params.image_file_no1+"'";
								    	txn.executeSql(sqlMain);
					    			});
							}
							if(nvl(params.image_file_no2) != "") { 
								txn.executeSql(imageSQL1+" and file_no = '"+params.image_file_no2+"'", [], 
									function(transaction, resultSet) {
					    				sqlMain = (resultSet.rows.item(0).cnt > 0 ? imageSQL2 : imageSQL3) + " and file_no = '"+params.image_file_no2+"'";
								    	txn.executeSql(sqlMain);
					    			});
							}
							if(nvl(params.image_file_no3) != "") { 
								txn.executeSql(imageSQL1+" and file_no = '"+params.image_file_no3+"'", [], 
									function(transaction, resultSet) {
					    				sqlMain = (resultSet.rows.item(0).cnt > 0 ? imageSQL2 : imageSQL3) + " and file_no = '"+params.image_file_no3+"'";
								    	txn.executeSql(sqlMain);
					    			});
							}
							if(nvl(params.image_file_no4) != "") { 
								txn.executeSql(imageSQL1+" and file_no = '"+params.image_file_no4+"'", [], 
									function(transaction, resultSet) {
					    				sqlMain = (resultSet.rows.item(0).cnt > 0 ? imageSQL2 : imageSQL3) + " and file_no = '"+params.image_file_no4+"'";
								    	txn.executeSql(sqlMain);
					    			});
							}
							if(nvl(params.image_file_no5) != "") { 
								txn.executeSql(imageSQL1+" and file_no = '"+params.image_file_no5+"'", [], 
									function(transaction, resultSet) {
					    				sqlMain = (resultSet.rows.item(0).cnt > 0 ? imageSQL2 : imageSQL3) + " and file_no = '"+params.image_file_no5+"'";
								    	txn.executeSql(sqlMain);
					    			});
							}
							if(nvl(params.image_file_no6) != "") { 
								txn.executeSql(imageSQL1+" and file_no = '"+params.image_file_no6+"'", [], 
									function(transaction, resultSet) {
					    				sqlMain = (resultSet.rows.item(0).cnt > 0 ? imageSQL2 : imageSQL3) + " and file_no = '"+params.image_file_no6+"'";
								    	txn.executeSql(sqlMain);
					    			});
							}
							okFunction(true);
					}, function (transaction, error) {
						console.log("error:" + error);
					});
			});
		});
	};

	/*********************************************************************************************************
	**	Function Id  : update
	**	Description  : 현장조사 수정
	*********************************************************************************************************/
	self.update = function(params, okFunction) { 
		wsdb.transaction(function(txn) {
			params.record_type = nvl(params.defect_cd) == "" ? "2" : "1";
			var sqlMain = "update SMLTB_DIGN11 "
						+ "   set record_type = '"+nvl(params.record_type)+"', "
						+ "       object_no   = '"+nvl(params.object_no)+"', "
						+ "       floor_no    = '"+nvl(params.floor_no)+"', "
						+ "       room_no     = '"+nvl(params.room_no)+"', "
						+ "       room_nm     = '"+nvl(params.room_nm)+"', "
						+ "       room_detail = '"+nvl(params.room_detail)+"', "
						+ "       buwee_cd    = '"+nvl(params.buwee_cd)+"', "
						+ "       bujae_cd    = '"+nvl(params.bujae_cd)+"', "
						+ "       defect_cd   = '"+nvl(params.defect_cd)+"', "
						+ "       cause_cd1   = '"+nvl(params.cause_cd1)+"', "
						+ "       cause_cd2   = '"+nvl(params.cause_cd2)+"', "
						+ "       maint_cd    = '"+nvl(params.maint_cd)+"', "
						+ "       amend_cd    = '"+nvl(params.amend_cd)+"', "
						+ "       dign_cd     = '"+nvl(params.dign_cd)+"', "
						+ "       eval_grade  = '"+nvl(params.eval_grade)+"', "
						+ "       buwee_nm    = '"+nvl(params.buwee_nm)+"', "
						+ "       bujae_nm    = '"+nvl(params.bujae_nm)+"', "
						+ "       defect_nm   = '"+nvl(params.defect_nm)+"', "
						+ "       defect_size = '"+nvl(params.defect_size)+"', "
						+ "       through_yn  = '"+nvl(params.through_yn)+"', "
						+ "       leak_yn     = '"+nvl(params.leak_yn)+"', "
						+ "       block_yn    = '"+nvl(params.block_yn)+"', "
						+ "       rep_yn      = '"+nvl(params.rep_yn)+"', "
						+ "       cause_nm1   = '"+nvl(params.cause_nm1)+"', "
						+ "       cause_nm2   = '"+nvl(params.cause_nm2)+"', "
						+ "       maint_nm    = '"+nvl(params.maint_nm)+"', "
						+ "       amend_nm    = '"+nvl(params.amend_nm)+"', "
						+ "       dign_nm     = '"+nvl(params.dign_nm)+"', "
						+ "       amend_rank  = '"+nvl(params.amend_rank)+"', "
						+ "       etc_remark  = '"+nvl(params.etc_remark)+"' "
						+ " where facil_no    = '"+params.facil_no+"' "
						+ "   and record_no   = '"+params.record_no+"' "

			//console.log(sqlMain);
			txn.executeSql(sqlMain, [],
				function(transaction, resultSet) {
					var imageSQL = "update COMTB_FILE01 set ref_pk = '" + params.facil_no + "|" + params.record_no + "' where 1=1 ";
					if(nvl(params.image_file_no1) != "") { txn.executeSql(imageSQL + " and file_no = '"+params.image_file_no1+"'"); }
					if(nvl(params.image_file_no2) != "") { txn.executeSql(imageSQL + " and file_no = '"+params.image_file_no2+"'"); }
					if(nvl(params.image_file_no3) != "") { txn.executeSql(imageSQL + " and file_no = '"+params.image_file_no3+"'"); }
					if(nvl(params.image_file_no4) != "") { txn.executeSql(imageSQL + " and file_no = '"+params.image_file_no4+"'"); }
					if(nvl(params.image_file_no5) != "") { txn.executeSql(imageSQL + " and file_no = '"+params.image_file_no5+"'"); }
					if(nvl(params.image_file_no6) != "") { txn.executeSql(imageSQL + " and file_no = '"+params.image_file_no6+"'"); }

				    var linkFile = (nvl(params.image_file_no1) == '' ? '0' : params.image_file_no1) + ","
								 + (nvl(params.image_file_no2) == '' ? '0' : params.image_file_no2) + ","
								 + (nvl(params.image_file_no3) == '' ? '0' : params.image_file_no3) + ","
								 + (nvl(params.image_file_no4) == '' ? '0' : params.image_file_no4) + ","
								 + (nvl(params.image_file_no5) == '' ? '0' : params.image_file_no5) + ","
								 + (nvl(params.image_file_no6) == '' ? '0' : params.image_file_no6);

				    sqlMain = "update COMTB_FILE01 "
				    		+ "   set ref_pk = '" + params.facil_no + "|NEW' "
				    		+ " where ref_table = 'SMLTB_DIGN11' "
				    		+ "   and ref_pk = '" + params.facil_no + "|" + params.record_no + "' "
				    		+ "   and file_no not in (" + linkFile + ")";
					
					//console.log(sqlMain);
			    	txn.executeSql(sqlMain);
					okFunction(true);
			}, function (error) {
				console.log("error:" + error);
			});
		});
	};

	/*********************************************************************************************************
	**	Function Id  : delete
	**	Description  : 현장조사 삭제
	*********************************************************************************************************/
	self.delete = function(params, okFunction) { 
		wsdb.transaction(function(txn) {
			var sqlMain = "delete from SMLTB_DIGN11 where facil_no = '"+params.facil_no+"' ";
			if (params.record_no != undefined && params.record_no != '') { sqlMain += " and record_no = '"+params.record_no+"' " }

			//console.log(sqlMain);
			txn.executeSql(sqlMain, [],
				function(transaction, resultSet) {
				    sqlMain = "delete from COMTB_FILE01 "
				    		+ " where ref_table = 'SMLTB_DIGN11' "
				    		+ "   and ref_pk = '" + params.facil_no + "|" + params.record_no + "' ";
					
					//console.log(sqlMain);
			    	txn.executeSql(sqlMain);
					okFunction(true);
			}, function (error) {
				console.log("error:" + error);
			});
		});
	};

	/*********************************************************************************************************
	**	Function Id  : select 
	**	Description  : 현장조사 1건 조회
	*********************************************************************************************************/
	self.select = function(params, okFunction, dataNotFound) {
		wsdb.transaction(function(txn) {
			var sqlMain = "select t1.facil_no, t1.record_no, t1.record_type, t1.object_no, t1.floor_no, t1.room_no, t1.room_nm, t1.room_detail, "
						+ "       t1.buwee_cd, t1.bujae_cd, t1.defect_cd, t1.cause_cd1, t1.cause_cd2, t1.maint_cd, t1.amend_cd, t1.dign_cd, t1.eval_grade, "
						+ "       t1.buwee_nm, t1.bujae_nm, t1.defect_nm, t1.defect_size, t1.through_yn, t1.leak_yn, t1.block_yn, t1.rep_yn, t1.cause_nm1, "
						+ "		  t1.cause_nm2, t1.maint_nm, t1.amend_nm, t1.dign_nm, t1.amend_rank, t1.etc_remark, t2.input_mask, "
						+ "       (select group_concat(file_no) from COMTB_FILE01 where ref_table='SMLTB_DIGN11' and ref_pk = t1.facil_no||'|'||t1.record_no) as image_file_no, "
						+ "       (select group_concat(sort_order) from COMTB_FILE01 where ref_table='SMLTB_DIGN11' and ref_pk = t1.facil_no||'|'||t1.record_no) as image_no "
						+ "  from SMLTB_DIGN11 t1 "
						+ "		  left outer join SMLTB_CODE01 t2 on t2.facil_gbn = substr(t1.facil_no,1,2) and t2.check_cd = replace(t1.defect_cd,'x','') "
						+ " where t1.facil_no = '"+params.facil_no+"' "
						+ "   and t1.record_no = '"+params.record_no+"' ";

			//console.log(sqlMain);
			txn.executeSql(sqlMain, [], 
				function(transaction, resultSet) {
					if (resultSet.rows.length > 0) {
						var rsBox = resultSet.rows.item(0);
						rsBox.floor_nm = getFloorNm(rsBox.floor_no);
						rsBox.space_full_nm = getSpaceFullNm(rsBox.object_nm, rsBox.floor_nm, rsBox.room_nm, rsBox.room_detail);
						rsBox.defect_full_nm = getDefectFullNm(rsBox.defect_nm, rsBox.defect_size, rsBox.through_yn, rsBox.leak_yn, rsBox.block_yn, rsBox.eval_grade);
						rsBox.maint_full_nm = getMaintFullNm(rsBox.maint_nm, rsBox.amend_nm, rsBox.dign_nm);
						if(nvl(rsBox.image_no) != "") {
							var image_file = rsBox.image_file_no.split(',');
							rsBox.image_file_no1 = image_file.length > 0 ? image_file[0] : "";
							rsBox.image_file_no2 = image_file.length > 1 ? image_file[1] : "";
							rsBox.image_file_no3 = image_file.length > 2 ? image_file[2] : "";
							rsBox.image_file_no4 = image_file.length > 3 ? image_file[3] : "";
							rsBox.image_file_no5 = image_file.length > 4 ? image_file[4] : "";
							rsBox.image_file_no6 = image_file.length > 5 ? image_file[5] : "";
							var sort_order = rsBox.image_no.split(',');
							rsBox.image_no1 = sort_order.length > 0 ? sort_order[0] : "";
							rsBox.image_no2 = sort_order.length > 1 ? sort_order[1] : "";
							rsBox.image_no3 = sort_order.length > 2 ? sort_order[2] : "";
							rsBox.image_no4 = sort_order.length > 3 ? sort_order[3] : "";
							rsBox.image_no5 = sort_order.length > 4 ? sort_order[4] : "";
							rsBox.image_no6 = sort_order.length > 5 ? sort_order[5] : "";
						}
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
	**	Description  : 현장조사 목록
	*********************************************************************************************************/
	self.list001 = function(params, okFunction) { 
		wsdb.transaction(function(txn) {		
			var sqlMain = "select t1.facil_no, t1.record_no, t1.record_type, t1.object_no, t1.floor_no, t1.room_no, t1.room_nm, t1.room_detail, "
						+ "       t1.buwee_cd, t1.bujae_cd, t1.defect_cd, t1.cause_cd1, t1.cause_cd2, t1.maint_cd, t1.amend_cd, t1.dign_cd, t1.eval_grade, "
						+ "       t1.buwee_nm, t1.bujae_nm, t1.defect_nm, t1.defect_size, t1.through_yn, t1.leak_yn, t1.block_yn, t1.etc_remark "
						+ "  from SMLTB_DIGN11 t1 "
						+ " where t1.facil_no = '"+params.facil_no+"' "
						+ "order by t1.record_no ";
	
			//console.log(sqlMain);
			var rtn = txn.executeSql(sqlMain, [], 
				function(transaction, resultSet) {
				    var res = [];
					for (var i=0; i < resultSet.rows.length; i++) {
						var rsBox = resultSet.rows.item(i);
						rsBox.floor_nm = getFloorNm(rsBox.floor_no);
						rsBox.space_full_nm = getSpaceFullNm(rsBox.object_nm, rsBox.floor_nm, rsBox.room_nm, rsBox.room_detail);
						rsBox.defect_full_nm = getDefectFullNm(rsBox.defect_nm, rsBox.defect_size, rsBox.through_yn, rsBox.leak_yn, rsBox.block_yn, rsBox.eval_grade);
						res.push(rsBox);
					}
					if (okFunction) {
						okFunction(res);
					}
				});
		});
	};

	// 건축시설
	self.list002A = function(params, okFunction) { 
		wsdb.transaction(function(txn) {		
			var sqlMain = "select t1.record_no, t1.floor_no, t1.room_nm, t1.room_detail, t1.buwee_nm, t1.bujae_nm, "
						+ "       t1.defect_cd, t1.defect_nm, t1.defect_size, t1.eval_grade, t1.through_yn, t1.leak_yn, t1.block_yn, "
						+ "       (select group_concat(file_no) from COMTB_FILE01 where ref_table='SMLTB_DIGN11' and ref_pk = t1.facil_no||'|'||t1.record_no) as image_file_no, "
						+ "       (select group_concat(sort_order) from COMTB_FILE01 where ref_table='SMLTB_DIGN11' and ref_pk = t1.facil_no||'|'||t1.record_no) as image_no "
						+ "  from SMLTB_DIGN11 t1 "
						+ " where t1.facil_no = '" + params.facil_no + "' "
						+ "   and t1.object_no = '" + params.object_no + "' "
						+ "order by t1.record_no ";
	
			//console.log(sqlMain);
			var rtn = txn.executeSql(sqlMain, [], 
				function(transaction, resultSet) {
				    var res = [];
					for (var i=0; i < resultSet.rows.length; i++) {
					    var rsBox = resultSet.rows.item(i);
					    rsBox.floor_nm = getFloorNm(rsBox.floor_no);
						rsBox.space_full_nm = getSpaceFullNm(rsBox.object_nm, rsBox.floor_nm, rsBox.room_nm, rsBox.room_detail);
                        rsBox.defect_full_nm = getDefectFullNm(rsBox.defect_nm, rsBox.defect_size, rsBox.through_yn, rsBox.leak_yn, rsBox.block_yn, rsBox.eval_grade);
                        if(nvl(rsBox.image_no) != "") {
							var image_file = rsBox.image_file_no.split(',');
							rsBox.image_file_no1 = image_file.length > 0 ? image_file[0] : "";
							rsBox.image_file_no2 = image_file.length > 1 ? image_file[1] : "";
							rsBox.image_file_no3 = image_file.length > 2 ? image_file[2] : "";
							rsBox.image_file_no4 = image_file.length > 3 ? image_file[3] : "";
							rsBox.image_file_no5 = image_file.length > 4 ? image_file[4] : "";
							rsBox.image_file_no6 = image_file.length > 5 ? image_file[5] : "";
							var sort_order = rsBox.image_no.split(',');
							rsBox.image_no1 = sort_order.length > 0 ? sort_order[0] : "";
							rsBox.image_no2 = sort_order.length > 1 ? sort_order[1] : "";
							rsBox.image_no3 = sort_order.length > 2 ? sort_order[2] : "";
							rsBox.image_no4 = sort_order.length > 3 ? sort_order[3] : "";
							rsBox.image_no5 = sort_order.length > 4 ? sort_order[4] : "";
							rsBox.image_no6 = sort_order.length > 5 ? sort_order[5] : "";
						}
						res.push(rsBox);
					}
					if (okFunction) {
						okFunction(res);
					}
				});
		});
	};

	// 토목/옥외시설
	self.list002B = function(params, okFunction) { 
		wsdb.transaction(function(txn) {		
			var sqlMain = "select t1.record_no, t1.buwee_nm, t1.bujae_nm, t1.defect_cd, t1.defect_nm, t1.defect_size, "
						+ "		  t1.through_yn, t1.leak_yn, t1.block_yn, t1.block_yn, t1.cause_nm1, t1.cause_nm2, "
						+ "       (select group_concat(file_no) from COMTB_FILE01 where ref_table='SMLTB_DIGN11' and ref_pk = t1.facil_no||'|'||t1.record_no) as image_file_no, "
						+ "       (select group_concat(sort_order) from COMTB_FILE01 where ref_table='SMLTB_DIGN11' and ref_pk = t1.facil_no||'|'||t1.record_no) as image_no "
						+ "  from SMLTB_DIGN11 t1 "
						+ " where t1.facil_no = '" + params.facil_no + "' "
						+ "   and t1.object_no = '" + params.object_no + "' "
						+ "order by t1.record_no ";

			//console.log(sqlMain);
			var rtn = txn.executeSql(sqlMain, [], 
				function(transaction, resultSet) {
					var res = [];
					for (var i=0; i < resultSet.rows.length; i++) {
					    var rsBox = resultSet.rows.item(i);
                        rsBox.defect_full_nm = getDefectFullNm(rsBox.defect_nm, rsBox.defect_size, rsBox.through_yn, rsBox.leak_yn, rsBox.eval_grade);
                        if(nvl(rsBox.image_no) != "") {
							var image_file = rsBox.image_file_no.split(',');
							rsBox.image_file_no1 = image_file.length > 0 ? image_file[0] : "";
							rsBox.image_file_no2 = image_file.length > 1 ? image_file[1] : "";
							rsBox.image_file_no3 = image_file.length > 2 ? image_file[2] : "";
							rsBox.image_file_no4 = image_file.length > 3 ? image_file[3] : "";
							rsBox.image_file_no5 = image_file.length > 4 ? image_file[4] : "";
							rsBox.image_file_no6 = image_file.length > 5 ? image_file[5] : "";
							var sort_order = rsBox.image_no.split(',');
							rsBox.image_no1 = sort_order.length > 0 ? sort_order[0] : "";
							rsBox.image_no2 = sort_order.length > 1 ? sort_order[1] : "";
							rsBox.image_no3 = sort_order.length > 2 ? sort_order[2] : "";
							rsBox.image_no4 = sort_order.length > 3 ? sort_order[3] : "";
							rsBox.image_no5 = sort_order.length > 4 ? sort_order[4] : "";
							rsBox.image_no6 = sort_order.length > 5 ? sort_order[5] : "";
						}
						res.push(rsBox);
					}
					if (okFunction) {
						okFunction(res);
					}
				});
		});
	};

}]);

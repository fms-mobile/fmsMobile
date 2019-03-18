/*************************************************************************************************************
**	Script Id    : PR_SMLTB_MAST01
**	Script Name  : 시설물관리대장 관련 쿼리 모음
*************************************************************************************************************/
app.service('PR_SMLTB_MAST01', [function() {  
	var self = this;

	/*********************************************************************************************************
	**	Function Id  : insert
	**	Description  : 시설물관리대장 입력
	*********************************************************************************************************/
	self.insert = function(params, okFunction) {
		wsdb.transaction(function(txn) {
			var sqlMain = "insert into SMLTB_MAST01 ( facil_no, facil_nm, facil_gbn, facil_kind, mng_no, cpl_ymd, zip_no, "
						+ "							  addr_sido, addr_gugun, addr_dong, addr_detail, addr_open, facil_type, "
						+ "							  using_type, entry_limit, maint_type, struct_kind, facil_scale, saupja_no, "
						+ "							  permit_no, upper_no, upper_nm, remove_yn, remove_ymd, map_x, map_y ) "
						+ " values ( '"+params.facil_no+"', '"+nvl(params.facil_nm)+"', '"+nvl(params.facil_gbn)+"', '"+nvl(params.facil_kind)+"', '"+nvl(params.mng_no)+"', '"+nvl(params.cpl_ymd)+"', '"+nvl(params.zip_no)+"', "
						+ "			 '"+nvl(params.addr_sido)+"', '"+nvl(params.addr_gugun)+"', '"+nvl(params.addr_dong)+"', '"+nvl(params.addr_detail)+"', '"+nvl(params.addr_open,'N')+"', '"+nvl(params.facil_type)+"', "
						+ "			 '"+nvl(params.using_type)+"', '"+nvl(params.entry_limit)+"', '"+nvl(params.maint_type)+"', '"+nvl(params.struct_kind)+"', '"+nvl(params.facil_scale)+"', '"+nvl(params.saupja_no)+"', "
						+ "			 '"+nvl(params.permit_no)+"', '"+nvl(params.upper_no)+"', '"+nvl(params.upper_nm)+"', '"+nvl(params.remove_yn)+"', '"+nvl(params.remove_ymd)+"', '"+nvl(params.map_x)+"', '"+nvl(params.map_Y)+"' ) ";

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
	**	Description  : 시설물관리대장 수정
	*********************************************************************************************************/
	// 시설개요 - 일반개요
	self.update = function(params, okFunction) {
		wsdb.transaction(function(txn) {
			if(params.facil_no.substring(0,2) == "AS") {
				params.facil_scale = concatStr(nvl(params.dong_cnt), nvl(params.ground_area), nvl(params.bld_area), nvl(params.bld_tot_area), nvl(params.use_area));
			}else if(params.facil_no.substring(0,2) == "TM") {
				params.facil_scale = nvl(params.dong_cnt);
			}
			var sqlMain = "update SMLTB_MAST01 "
						+ "   set facil_nm     = '" + nvl(params.facil_nm) + "', "
						+ "       facil_kind   = '" + nvl(params.facil_kind) + "', "
						+ "       zip_no       = '" + nvl(params.zip_no) + "', "
						+ "       addr_sido    = '" + nvl(params.addr_sido) + "', "
						+ "       addr_gugun   = '" + nvl(params.addr_gugun) + "', "
						+ "       addr_dong    = '" + nvl(params.addr_dong) + "', "
						+ "       addr_detail  = '" + nvl(params.addr_detail) + "', "
						+ "       facil_type   = '" + nvl(params.facil_type) + "', "
						+ "       using_type   = '" + nvl(params.using_type) + "', "
						+ "       struct_kind  = '" + nvl(params.struct_kind) + "', "
						+ "       entry_limit  = '" + nvl(params.entry_limit) + "', "
						+ "       facil_scale  = '" + nvl(params.facil_scale) + "' "
						+ " where facil_no     = '" + params.facil_no + "' "; 

			//console.log(sqlMain);
			txn.executeSql(sqlMain, [],
				function(transaction, resultSet) {
					okFunction(true);
			}, function (error) {
				console.log("error:" + error);
			});
		});
	};
 
	// 시설개요 - 운영/관리
	self.update_maint = function(params, okFunction) {
		wsdb.transaction(function(txn) {
			var sqlMain = "update SMLTB_MAST01 "
						+ "   set saupja_no   = '" + nvl(params.saupja_no) + "', "
						+ "       permit_no   = '" + nvl(params.permit_no) + "', "
						+ "       maint_type  = '" + nvl(params.maint_type) + "' "
						+ " where facil_no    = '" + params.facil_no + "' "; 

			//console.log(sqlMain);
			txn.executeSql(sqlMain, [],
				function(transaction, resultSet) {
					okFunction(true);
			}, function (error) {
				console.log("error:" + error);
			});
		});
	};
 
	// 시설규모
	self.update_scale = function(params, okFunction) {
		if(params.facil_no.substring(0,2) == "AS") { 
			wsdb.transaction(function(txn) {
				var sqlMain = "select s2.facil_scale, "
							+ "		  sum(case when s1.rep_yn='Y' then ifnull(s1.ground_area,0) else 0 end) as ground_area, "
							+ "		  sum(ifnull(s1.bld_area,0)) as bld_area, "
							+ "		  sum(ifnull(s1.bld_tot_area,0)) as bld_tot_area, "
							+ "		  sum(ifnull(s1.use_area,0)) as use_area "
							+ "  from SMLTB_ARCH01 s1 "
							+ "		  inner join SMLTB_MAST01 s2 on s2.facil_no = s1.facil_no "
							+ " where s1.facil_no = '"+params.facil_no+"' ";
						
				txn.executeSql(sqlMain, [],
					function(transaction, resultSet) {
						var rsBox = resultSet.rows.item(0);
						params.facil_scale = concatStr(arrayCol(rsBox.facil_scale,0), rsBox.ground_area, rsBox.bld_area, rsBox.bld_tot_area, rsBox.use_area);
						sqlMain = "update SMLTB_MAST01 "
								+ "   set facil_scale = '" + nvl(params.facil_scale) + "' "
								+ " where facil_no    = '" + params.facil_no + "' "; 
	
						txn.executeSql(sqlMain, [],
							function(transaction, resultSet) {
								okFunction(true);
						}, function (transaction, error) {
							console.log("error:" + error);
						});
				});
			});
		}else {
			okFunction(true);
		}
	};
 
	/*********************************************************************************************************
	**	Function Id  : delete
	**	Description  : 시설물관리대장 삭제
	*********************************************************************************************************/
	self.delete = function(params, okFunction) { 
		wsdb.transaction(function(txn) {
			var sqlMain = "delete from SMLTB_MAST01 where facil_no = '"+params.facil_no+"' ";

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
	**	Description  : 시설물관리대장 1건 조회
	*********************************************************************************************************/
	self.select = function(params, okFunction, dataNotFound) {
		wsdb.transaction(function(txn) {
			var sqlMain = "select t1.facil_no, t1.facil_nm, t1.facil_gbn, t1.facil_kind, t1.mng_no, t1.cpl_ymd, t1.zip_no,  "
						+ "		  t1.addr_sido, t1.addr_gugun, t1.addr_dong, t1.addr_detail, t1.addr_open, t1.facil_type, "
						+ "		  t1.using_type, t1.entry_limit, t1.maint_type, t1.struct_kind, t1.facil_scale, t1.saupja_no, "
						+ "		  t1.permit_no, t1.upper_no, t1.upper_nm, t1.remove_yn, t1.remove_ymd, t1.map_x, t1.map_y "
						+ "  from SMLTB_MAST01 t1 "
						+ " where t1.facil_no = '" + params.facil_no + "' ";

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

	// 시설개요 - 일반개요
	self.select_master = function(params, okFunction, dataNotFound) {
		wsdb.transaction(function(txn) {
			var sqlMain = "select t1.facil_no, t1.facil_nm, t1.facil_gbn, t1.facil_kind, "
						+ "		  t1.zip_no, t1.addr_sido, t1.addr_gugun, t1.addr_dong, t1.addr_detail, "
						+ "		  t1.facil_type, t1.using_type, t1.entry_limit, t1.struct_kind, t1.facil_scale, "
						+ "		  t2.dign_ymd, t2.dign_dong_cnt, t2.dign_person, t2.with_person, "
						+ "		  substr(t2.dign_ymd,1,4) as dign_yy, substr(t2.dign_ymd,5,2) as dign_mm, substr(t2.dign_ymd,7,2) as dign_dd, "
						+ "		  (select data1 from COMTB_CODE02 where code_group='facil_gbn' and code1 = t1.facil_gbn) as facil_gbn_nm, "
						+ "		  (select data1 from COMTB_CODE02 where code_group='as.facil_kind' and code1 = substr(t1.facil_kind,1,1)) as facil_kind_nm1, "
						+ "		  (select data2 from COMTB_CODE02 where code_group='as.facil_kind' and code2 = t1.facil_kind) as facil_kind_nm2 "
						+ "  from SMLTB_MAST01 t1 "
						+ "  	  left outer join SMLTB_DIGN01 t2 on t2.facil_no = t1.facil_no "
						+ " where t1.facil_no = '" + params.facil_no + "' ";

			//console.log(sqlMain);
			txn.executeSql(sqlMain, [], 
				function(transaction, resultSet) {
					if (resultSet.rows.length > 0) {
						var rsBox = resultSet.rows.item(0);
				   		var facil_scale 	= rsBox.facil_scale.split('|');
						rsBox.dong_cnt		= parseInt(nvl(facil_scale[0]));
						rsBox.ground_area	= parseFloat(nvl(facil_scale[1])); if(isNaN(rsBox.ground_area) || rsBox.ground_area == "" ) { rsBox.ground_area = ""; }
						rsBox.bld_area		= parseFloat(nvl(facil_scale[2])); if(isNaN(rsBox.bld_area) || rsBox.bld_area == "") { rsBox.bld_area = ""; }
						rsBox.bld_tot_area	= parseFloat(nvl(facil_scale[3])); if(isNaN(rsBox.bld_tot_area) || rsBox.bld_tot_area == "") { rsBox.bld_tot_area = ""; }
						rsBox.use_area		= parseFloat(nvl(facil_scale[4])); if(isNaN(rsBox.use_area) || rsBox.use_area == "") { rsBox.use_area = ""; }
						okFunction(rsBox);
					} else {
						if ( dataNotFound != undefined) { dataNotFound(); }
					}
			}, function (error) {
				console.log("error:" + error);
			});
		});
	};

	// 시설개요 - 운영/관리
	self.select_maint = function(params, okFunction, dataNotFound) {
		wsdb.transaction(function(txn) {
			var sqlMain = "select t1.facil_no, t1.facil_nm, t1.maint_type, t1.saupja_no, t1.permit_no, "
						+ "		  t2.data3 as basis_law, t2.data4 as cen_gov_dept "
						+ "  from SMLTB_MAST01 t1 "
						+ "  	  left outer join COMTB_CODE02 t2 on t2.code_group = 'as.facil_kind' and t2.code2 = t1.facil_kind "
						+ " where t1.facil_no = '" + params.facil_no + "' ";

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

	// 전체메뉴
	self.select_map = function(params, okFunction, dataNotFound) {
		wsdb.transaction(function(txn) {
			var sqlMain = "select t1.facil_no, t1.facil_nm, t1.facil_gbn, t1.facil_kind, t2.dign_person, "
						+ "		  substr(t2.dign_ymd,1,4) as dign_yy, substr(t2.dign_ymd,5,2) as dign_mm, substr(t2.dign_ymd,7) as dign_dd, "
						+ "		  (select data1 from COMTB_CODE02 where code_group='as.facil_kind' and code1 = substr(t1.facil_kind,1,1)) as facil_kind_nm, "
						+ "		  (select min(building_no) from SMLTB_ARCH01 where facil_no = t1.facil_no) as building_no, "
						+ "		  (select min(civil_no) from SMLTB_CIVL01 where facil_no = t1.facil_no) as civil_no "
						+ "  from SMLTB_MAST01 t1 "
						+ "  	  left outer join SMLTB_DIGN01 t2 on t2.facil_no = t1.facil_no "
						+ " where t1.facil_no = '" + params.facil_no + "' ";

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
	**	Description  : 시설물관리대장 목록
	*********************************************************************************************************/
	// HOME - 점검목록 선택
	self.list001 = function(params, okFunction) { 
		wsdb.transaction(function(txn) {		
			var sqlMain = "select t1.facil_no, t1.facil_nm, t1.facil_gbn, t1.facil_kind, t2.dign_ymd, t2.pro_status, ifnull(t2.submit_yn,'N') as submit_yn, "
						+ "  	  ltrim(ifnull((select data2 from COMTB_CODE02 where code_group='team_cd' and code1=substr(ifnull(t2.dign_team,t2.plan_team),1,1)),'') || ' ' || (substr(ifnull(t2.dign_team,t2.plan_team),2)+0) || '조') as dign_team_nm, ";
			if(params.facil_gbn == 'AS') {
				sqlMain += "  (select data1 from COMTB_CODE02 where code_group='"+params.facil_gbn.toLowerCase()+".facil_kind' and code1=substr(t1.facil_kind,1,1)) as facil_kind_nm "
			}else if(params.facil_gbn == 'TM') {
				sqlMain += "  (select data1 from COMTB_CODE02 where code_group='"+params.facil_gbn.toLowerCase()+".facil_kind' and code1=t1.facil_kind) as facil_kind_nm "
			}else {
				sqlMain += "  null as facil_kind_nm "
			}
			
			sqlMain += "  from SMLTB_MAST01 t1 "
					+  "	   inner join SMLTB_DIGN01 t2 on t2.facil_no = t1.facil_no "
					+  " where t1.facil_gbn = '" + params.facil_gbn + "'"
					+  " order by t2.dign_ymd desc ";

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

	// 건축/토목시설 목록
	self.list002 = function(params, okFunction) { 
		wsdb.transaction(function(txn) {
			var sqlMain = "select t1.building_no as object_no, t1.building_nm as object_nm, "
						+ "  	  'A' || case when t1.rep_yn = 'Y' then '1' else '2' end || t1.building_no as sort_order "
						+ "  from SMLTB_ARCH01 t1 "
						+ " where t1.facil_no = '" + params.facil_no + "' "
						+ "union "
						+ "select t1.civil_no as object_no, ifnull(t3.data2, t2.data1) as object_nm, "
						+ "  	  'C' || t1.civil_kind || t1.civil_no as sort_key "
						+ "  from SMLTB_CIVL01 t1 "
						+ "  	  left outer join COMTB_CODE02 t2 on t2.code_group = 'civil_kind' and t2.code1 = substr(t1.civil_kind,1,2) and t2.code2 is null "
						+ "  	  left outer join COMTB_CODE02 t3 on t3.code_group = 'civil_kind' and t3.code2 = t1.civil_kind "
						+ " where t1.facil_no = '" + params.facil_no + "' "
						+ "order by 3 ";

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

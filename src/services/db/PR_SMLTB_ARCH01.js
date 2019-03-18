/*************************************************************************************************************
**	Script Id	: PR_SMLTB_ARCH01
**	Script Name  : 건축시설 관련 쿼리 모음
*************************************************************************************************************/
app.service('PR_SMLTB_ARCH01', [function() {  
	var self = this;
	
	/*********************************************************************************************************
	**	Function Id  : insert
	**	Description  : 건축시설 입력
	*********************************************************************************************************/
	self.insert = function(params, okFunction) { 
		wsdb.transaction(function(txn) {
			txn.executeSql("select 'A'||substr(ifnull(max(substr(building_no,2)),0)+1001,2) as building_no from SMLTB_ARCH01 where facil_no = '"+params.facil_no+"' ", [],
				function(transaction, resultSet) {
					if(params.building_no == undefined || params.building_no == '') {
						params.building_no = resultSet.rows.item(0).building_no;
					} 
					var sqlMain = "insert into SMLTB_ARCH01 ( facil_no, building_no, building_nm, ground_area, bld_area, bld_tot_area, use_area, "
								+ "							  bld_wdt, bld_hgt, bld_lth, cpl_ymd, permit_ymd, open_ymd, floor_ground, floor_ug, floor_top, "
								+ "							  struct_kind, struct_upper, struct_lower, fin_matter_out, fin_matter_in, fin_matter_roof, "
								+ "							  state_grade, rep_yn, use_floor) "
								+ " values ( '"+params.facil_no+"', '"+params.building_no+"', '"+params.building_nm+"', '"+nvl(params.ground_area)+"', '"+nvl(params.bld_area)+"', '"+nvl(params.bld_tot_area)+"', '"+nvl(params.use_area)+"', "
								+ "			 '"+nvl(params.bld_wdt)+"', '"+nvl(params.bld_hgt)+"', '"+nvl(params.bld_lth)+"', '"+nvl(params.cpl_ymd)+"', '"+nvl(params.permit_ymd)+"', '"+nvl(params.open_ymd)+"', '"+nvl(params.floor_ground)+"', '"+nvl(params.floor_ug)+"', '"+nvl(params.floor_top)+"', "
								+ "			 '"+nvl(params.struct_kind)+"', '"+nvl(params.struct_upper)+"', '"+nvl(params.struct_lower)+"', '"+nvl(params.fin_matter_out)+"', '"+nvl(params.fin_matter_in)+"', '" + nvl(params.fin_matter_roof)+"', "
								+ "			 '"+nvl(params.state_grade)+"', '"+nvl(params.rep_yn)+"', '"+nvl(params.use_floor)+"' ) ";

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
	**	Description  : 건축시설 수정
	*********************************************************************************************************/
	self.update = function(params, okFunction) { 
		wsdb.transaction(function(txn) {
			var sqlMain = "update SMLTB_ARCH01 "
						+ "   set ground_area		= '" + nvl(params.ground_area) + "', "
						+ "		  bld_area			= '" + nvl(params.bld_area) + "', "
						+ "		  bld_tot_area		= '" + nvl(params.bld_tot_area) + "', "
						+ "		  use_area			= '" + nvl(params.use_area) + "', "
						+ "		  bld_wdt			= '" + nvl(params.bld_wdt) + "', "
						+ "		  bld_hgt			= '" + nvl(params.bld_hgt) + "', "
						+ "		  bld_lth			= '" + nvl(params.bld_lth) + "', "
						+ "		  cpl_ymd			= '" + nvl(params.cpl_ymd) + "', " 
						+ "		  permit_ymd		= '" + nvl(params.permit_ymd) + "', "
						+ "		  open_ymd			= '" + nvl(params.open_ymd) + "', " 
						+ "		  floor_ground		= '" + nvl(params.floor_ground) + "', " 
						+ "		  floor_ug			= '" + nvl(params.floor_ug) + "', " 
						+ "		  floor_top			= '" + nvl(params.floor_top) + "', " 
						+ "		  struct_kind		= '" + nvl(params.struct_kind) + "', " 
						+ "		  struct_upper		= '" + nvl(params.struct_upper) + "', " 
						+ "		  struct_lower		= '" + nvl(params.struct_lower) + "', " 
						+ "		  fin_matter_out	= '" + nvl(params.fin_matter_out) + "', " 
						+ "		  fin_matter_in		= '" + nvl(params.fin_matter_in) + "', " 
						+ "		  fin_matter_roof	= '" + nvl(params.fin_matter_roof) + "', " 
						+ "		  state_grade		= '" + nvl(params.state_grade) + "' " 
						+ " where facil_no			= '" + params.facil_no + "' "
						+ "   and building_no		= '" + params.building_no + "' ";

			//console.log(sqlMain);
			txn.executeSql(sqlMain, [],
				function(transaction, resultSet) {
					okFunction(true);
			}, function (error) {
				console.log("error:" + error);
			});
		});
	};
	
	self.update_building_nm = function(params, okFunction) {
		wsdb.transaction(function(txn) {
			var sqlMain = "update SMLTB_ARCH01 "
						+ "   set building_nm = '" + nvl(params.building_nm) + "' "
						+ " where facil_no	  = '" + params.facil_no + "' "
						+ "   and building_no = '" + params.building_no + "' ";

			//console.log(sqlMain);
			txn.executeSql(sqlMain, [],
				function(transaction, resultSet) {
					okFunction(true);
			}, function (error) {
				console.log("error:" + error);
			});
		});
	};
	
	self.update_use_floor = function(params, okFunction) {
		wsdb.transaction(function(txn) {
			var sqlMain = "update SMLTB_ARCH01 "
						+ "   set use_floor	  = '" + nvl(params.use_floor) + "' "
						+ " where facil_no	  = '" + params.facil_no + "' "
						+ "   and building_no = '" + params.building_no + "' ";

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
	**	Description  : 건축시설 삭제
	*********************************************************************************************************/
	self.delete = function(params, okFunction) { 
		wsdb.transaction(function(txn) {
			var sqlWhere = " where facil_no = '" + params.facil_no + "'";
			if (params.building_no != undefined && params.building_no != '') { sqlWhere += " and building_no = '" + params.building_no + "'"; }
			txn.executeSql("delete from SMLTB_ARCH11 " + sqlWhere, [],
				function(transaction, resultSet) {
					txn.executeSql("delete from SMLTB_ARCH01 " + sqlWhere, [],
						function(transaction, resultSet) {
							okFunction(true);
					}, function (transaction, error) {
						console.log("error:" + error);
					});
			});
		});
	};

	/*********************************************************************************************************
	**	Function Id  : select
	**	Description  : 건축시설 1건 조회
	*********************************************************************************************************/
	self.select = function(params, okFunction, dataNotFound) {
		wsdb.transaction(function(txn) {
			var sqlMain = "select t1.facil_no, t1.building_no, t1.building_nm, t1.ground_area, t1.bld_area, t1.bld_tot_area, t1.use_area, "
						+ "		  t1.bld_wdt, t1.bld_hgt, t1.bld_lth, t1.cpl_ymd, t1.open_ymd, t1.permit_ymd, t1.floor_ground, t1.floor_ug, "
						+ "		  t1.floor_top, t1.struct_kind, t1.struct_upper, t1.struct_lower, t1.fin_matter_out, t1.fin_matter_in, "
						+ "		  t1.fin_matter_roof, t1.state_grade, t1.rep_yn, t1.use_floor, t2.facil_kind, "
						+ "		  substr(t1.cpl_ymd,1,4) as cpl_yy, substr(t1.cpl_ymd,5,2) as cpl_mm, substr(t1.cpl_ymd,7,2) as cpl_dd, "
						+ "		  substr(t1.open_ymd,1,4) as open_yy, substr(t1.open_ymd,5,2) as open_mm, substr(t1.open_ymd,7,2) as open_dd, "
						+ "		  substr(t1.permit_ymd,1,4) as permit_yy, substr(t1.permit_ymd,5,2) as permit_mm, substr(t1.permit_ymd,7,2) as permit_dd, "
						+ "		  (select data1 from COMTB_CODE02 where code_group='fin_matter_out' and code1 = substr(t1.fin_matter_out,1,2)) as fin_matter_out_main, "
						+ "		  (select data1 from COMTB_CODE02 where code_group='fin_matter_in' and code1 = substr(t1.fin_matter_in,1,2)) as fin_matter_in_main, "
						+ "		  (select data1 from COMTB_CODE02 where code_group='fin_matter_roof' and code1 = substr(t1.fin_matter_roof,1,2)) as fin_matter_roof_main ";

			if(params.facil_no.substring(0,2) == "AS") {
				sqlMain += "    , (select data1 from COMTB_CODE02 where code_group='as.struct_kind' and code1 = substr(t1.struct_kind,1,2)) as struct_kind_main ";
			}else if(params.facil_no.substring(0,2) == "TM") {
				sqlMain += "    , (select data1 from COMTB_CODE02 where code_group='tm.struct_kind' and code1 = substr(t1.struct_kind,1,2)) as struct_kind_main "
						+  "	, (select data1 from COMTB_CODE02 where code_group='tm.struct_upper' and code1 = substr(t1.struct_upper,1,2)) as struct_upper_main "
						+  "	, (select data1 from COMTB_CODE02 where code_group='tm.struct_lower' and code1 = substr(t1.struct_lower,1,2)) as struct_lower_main ";
			}
			
			sqlMain += "  	   , p1.file_no as position_map, p2.file_no as front_picture "
					+  "  from SMLTB_ARCH01 t1 "
					+  " 	   inner join SMLTB_MAST01 t2 on t2.facil_no = t1.facil_no "
					+  " 	   left outer join COMTB_FILE01 p1 on p1.ref_table = 'SMLTB_ARCH01' and p1.ref_pk = t1.facil_no||'|'||t1.building_no||'|position' "
					+  " 	   left outer join COMTB_FILE01 p2 on p2.ref_table = 'SMLTB_ARCH01' and p2.ref_pk = t1.facil_no||'|'||t1.building_no||'|front' "
					+  " where t1.facil_no	= '" + params.facil_no + "' "
						
			if(nvl(params.building_no) == '') {
				sqlMain += "  and t1.rep_yn = 'Y' "; 
			}else {
				sqlMain += "  and t1.building_no = '" + params.building_no + "' ";
			}

			//console.log(sqlMain);
			txn.executeSql(sqlMain, [], 
				function(transaction, resultSet) {
					if (resultSet.rows.length > 0) {
						var rsBox = resultSet.rows.item(0);
						rsBox.object_no = rsBox.building_no;
						rsBox.object_nm = rsBox.building_nm;
						
						rsBox.struct_kind_nm = nvl(rsBox.struct_kind_main) != "" ? "[대표="+rsBox.struct_kind_main+"]" : "";
						rsBox.struct_upper_nm = nvl(rsBox.struct_upper_main) != "" ? "[대표="+rsBox.struct_upper_main+"]" : "";
						rsBox.struct_lower_nm = nvl(rsBox.struct_lower_main) != "" ? "[대표="+rsBox.struct_lower_main+"]" : "";
						rsBox.fin_matter_out_nm = nvl(rsBox.fin_matter_out_main) != "" ? "[대표="+rsBox.fin_matter_out_main+"]" : "";
						rsBox.fin_matter_in_nm = nvl(rsBox.fin_matter_in_main) != "" ? "[대표="+rsBox.fin_matter_in_main+"]" : "";
						rsBox.fin_matter_roof_nm = nvl(rsBox.fin_matter_roof_main) != "" ? "[대표="+rsBox.fin_matter_roof_main+"]" : "";

						rsBox.struct_kind_etc = arrayCol(rsBox.struct_kind, 1);
						rsBox.struct_upper_etc = arrayCol(rsBox.struct_upper, 1);
						rsBox.struct_lower_etc = arrayCol(rsBox.struct_lower, 1);
						rsBox.fin_matter_out_etc = arrayCol(rsBox.fin_matter_out, 1);
						rsBox.fin_matter_in_etc = arrayCol(rsBox.fin_matter_in, 1);
						rsBox.fin_matter_roof_etc = arrayCol(rsBox.fin_matter_roof, 1);

						if(nvl(rsBox.struct_kind_etc) != "") { rsBox.struct_kind_nm += ", " + rsBox.struct_kind_etc; }
						if(nvl(rsBox.struct_upper_etc) != "") { rsBox.struct_upper_nm += ", " + rsBox.struct_upper_etc; }
						if(nvl(rsBox.struct_lower_etc) != "") { rsBox.struct_lower_nm += ", " + rsBox.struct_lower_etc; }
						if(nvl(rsBox.fin_matter_out_etc) != "") { rsBox.fin_matter_out_nm += ", " + rsBox.fin_matter_out_etc; }
						if(nvl(rsBox.fin_matter_in_etc) != "") { rsBox.fin_matter_in_nm += ", " + rsBox.fin_matter_in_etc; }
						if(nvl(rsBox.fin_matter_roof_etc) != "") { rsBox.fin_matter_roof_nm += ", " + rsBox.fin_matter_roof_etc; }
						okFunction(rsBox);
					} else {
						if ( dataNotFound != undefined) { dataNotFound(); }
					}
			}, function (error) {
				console.log("error:" + error);
			});
		});
	};
	
	// 대표건물
	self.select_rep_building = function(params, okFunction, dataNotFound) {
		wsdb.transaction(function(txn) {
			txn.executeSql("select building_no from SMLTB_ARCH01 where facil_no = '"+params.facil_no+"' and rep_yn='Y'", [], 
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
	**	Description  : 건축시설 목록
	*********************************************************************************************************/
	self.list001 = function(params, okFunction) { 
		wsdb.transaction(function(txn) {
			var sqlMain = "select t1.facil_no, t1.building_no, t1.building_nm, t1.ground_area, t1.bld_area, t1.bld_tot_area, t1.use_area, "
						+ "		  t1.bld_wdt, t1.bld_hgt, t1.bld_lth, t1.cpl_ymd, t1.permit_ymd, t1.open_ymd, t1.floor_ground, t1.floor_ug, "
						+ "		  t1.floor_top, t1.struct_kind, t1.struct_upper, t1.struct_lower, t1.fin_matter_out, t1.fin_matter_in, "
						+ "		  t1.fin_matter_roof, t1.state_grade, t1.rep_yn, t1.use_floor "
						+ "  from SMLTB_ARCH01 t1 "
						+ " where t1.facil_no = '" + params.facil_no + "' "
						+ "order by case when t1.rep_yn = 'Y' then 1 else 2 end, t1.building_no ";
	
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

	self.listCode = function(params, okFunction) { 
		wsdb.transaction(function(txn) {
			var sqlMain = "select t1.building_no as code, t1.building_nm as data "
						+ "  from SMLTB_ARCH01 t1 "
						+ " where t1.facil_no = '" + params.facil_no + "' "
						+ "order by case when t1.rep_yn = 'Y' then 1 else 2 end, t1.building_no ";
	
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
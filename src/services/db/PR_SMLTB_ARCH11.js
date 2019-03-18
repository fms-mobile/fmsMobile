/*************************************************************************************************************
**	Script Id    : PR_SMLTB_ARCH11
**	Script Name  : 건축시설_실별 관련 쿼리 모음
*************************************************************************************************************/
app.service('PR_SMLTB_ARCH11', [function() {  
	var self = this;

	/*********************************************************************************************************
	**	Function Id  : insert
	**	Description  : 건축시설_실별 입력
	*********************************************************************************************************/
	self.insert = function(params, okFunction) {
		wsdb.transaction(function(txn) {
			txn.executeSql("select '"+params.floor_no+"'||substr(ifnull(max(substr(room_no,5)),0)+10001,2) as room_no "
						 + "  from SMLTB_ARCH11 "
						 + " where facil_no = '"+params.facil_no+"' "
						 + "   and building_no = '"+params.building_no+"' ", [],
						 
				function(transaction, resultSet) {
					if(params.room_no == undefined || params.room_no == '') {
						params.room_no = resultSet.rows.item(0).room_no;
					}
					var sqlMain = "insert into SMLTB_ARCH11 ( facil_no, building_no, room_no, floor_no, room_nm, etc_remark ) "
								+ " values ( '"+params.facil_no+"', '"+params.building_no+"', '"+params.room_no+"', '"+params.floor_no+"', '"+nvl(params.room_nm)+"', '"+nvl(params.etc_remark)+"' ) ";

					//console.log(sqlMain);
					txn.executeSql(sqlMain, [],
						function(transaction, resultSet) {
							okFunction(params.room_no);
					}, function (transaction, error) {
						console.log("error:" + error);
					});
			});
		});
	};

	/*********************************************************************************************************
	**	Function Id  : update
	**	Description  : 건축시설_실별 수정
	*********************************************************************************************************/
	self.update = function(params, okFunction) {
		wsdb.transaction(function(txn) {
			var sqlMain = "update SMLTB_ARCH11 "
						+ "   set room_nm      = '" + params.room_nm + "' "
						+ " where facil_no     = '" + params.facil_no + "' "
						+ "	  and building_no  = '" + params.building_no + "' "
						+ "	  and room_no	   = '" + params.room_no + "' ";

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
	**	Description  : 건축시설_실별 삭제
	*********************************************************************************************************/
	self.delete = function(params, okFunction) {
		wsdb.transaction(function(txn) {
			var sqlMain = "delete from SMLTB_ARCH11 where facil_no = '"+params.facil_no+"'";
			if (params.building_no != undefined && params.building_no != '') { sqlMain += " and building_no = '"+params.building_no+"'" }
			if (params.room_no != undefined && params.room_no != '') { sqlMain += " and room_no = '"+params.room_no+"'" }

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
	**	Description  : 층별 실 목록
	*********************************************************************************************************/
	self.list001 = function(params, okFunction) { 
		wsdb.transaction(function(txn) {		
			var sqlMain = " select t1.facil_no, t1.building_no, t1.room_no, t1.floor_no, t1.room_nm, t1.etc_remark "
						+ "   from SMLTB_ARCH11 t1 "
						+ "  where t1.facil_no = '" + params.facil_no + "'"
						+ " order by 2,3 ";

			//console.log(sqlMain);
			var rtn = txn.executeSql(sqlMain, [], 
				function(transaction, resultSet) {
					var res = [];
					for(var i=0; i < resultSet.rows.length; i++) {
						res.push(resultSet.rows.item(i));
					}
					if (okFunction) {
						okFunction(res);
					}
				});
		});
	};

	// 사용자가 입력한 층 목록
	self.list002A = function(params, okFunction) { 
		wsdb.transaction(function(txn) {		
			var sqlMain = " select t1.floor_no "
						+ "   from SMLTB_ARCH11 t1 "
						+ "  where t1.facil_no = '" + params.facil_no + "'"
						+ " order by substr(t1.floor_no,1,1), substr(t1.floor_no,2)*case when substr(t1.floor_no,1,1)='B' then -1 else 1 end ";

			//console.log(sqlMain);
			var rtn = txn.executeSql(sqlMain, [], 
				function(transaction, resultSet) {
					var res = [];
					for(var i=0; i < resultSet.rows.length; i++) {
						var rsBox = resultSet.rows.item(i);
						rsBox.floor_nm = getFloorNm(rsBox.floor_no);
						res.push(rsBox);
					}
					if (okFunction) {
						okFunction(res);
					}
				});
		});
	};

	// 해당 동 전체 층 목록
	self.list002B = function(params, okFunction) { 
		wsdb.transaction(function(txn) {
			var sqlMain = "select ifnull(t1.floor_ground,0) as floor_ground, ifnull(t1.floor_ug,0) as floor_ug, ifnull(t1.floor_top,0) as floor_top, t1.use_floor "
						+ "  from SMLTB_ARCH01 t1 "
						+ " where t1.facil_no = '"+params.facil_no+"'"
						+ "   and t1.building_no = '"+params.building_no+"'";
			
			//console.log(sqlMain);
			txn.executeSql(sqlMain, [],
				function(transaction, resultSet) {
					if(resultSet.rows.length > 0) {
						params.floor_ground = resultSet.rows.item(0).floor_ground;
						params.floor_ug = resultSet.rows.item(0).floor_ug;
						params.floor_top = resultSet.rows.item(0).floor_top;
						params.use_floor = resultSet.rows.item(0).use_floor;
						params.floor_ground = params.floor_ground == "" ? "0" : params.floor_ground;
						params.floor_ug = params.floor_ug == "" ? "0" : params.floor_ug;
						params.floor_top = params.floor_top == "" ? "0" : params.floor_top;
						
						var sqlMain = " select t1.floor_no "
									+ "   from (select 'B'||substr(s1.no1+1000, 2) as floor_no from dummy_t s1 where s1.no1 <= "+params.floor_ug+" union "
									+ "  	    select 'G'||substr(s1.no1+1000, 2) as floor_no from dummy_t s1 where s1.no1 <= "+params.floor_ground+" union "
									+ "  	    select 'R000' as floor_no where "+params.floor_ground+" > 0 union "
									+ "  	    select 'S000' as floor_no where "+params.floor_ground+" > 0 union "
									+ "  	    select 'T'||substr(s1.no1+1000, 2) as floor_no from dummy_t s1 where s1.no1 <= "+params.floor_top+") t1 "
									+ "  where 1=1 "
									+ " order by substr(t1.floor_no,1,1), substr(t1.floor_no,2)*case when substr(t1.floor_no,1,1)='B' then -1 else 1 end ";
	
						//console.log(sqlMain);
						var rtn = txn.executeSql(sqlMain, [], 
							function(transaction, resultSet) {
								var res = [];
								for(var i=0; i < resultSet.rows.length; i++) {
									var rsBox = resultSet.rows.item(i);
									rsBox.floor_nm = getFloorNm(rsBox.floor_no);
									rsBox.use_yn = nvl(params.use_floor,'x').indexOf(rsBox.floor_no) >= 0 ? "Y" : "N";
									res.push(rsBox);
								}
								if (okFunction) {
									okFunction(res);
								}
							});
					}
			});
		});
	};

	// 해당 층 실 목록
	self.list003A = function(params, okFunction) { 
		wsdb.transaction(function(txn) {		
			var sqlMain = " select t1.room_no, t1.room_nm, t1.etc_remark "
						+ "   from SMLTB_ARCH11 t1 "
						+ "  where t1.facil_no = '" + params.facil_no + "'"
						+ "    and t1.building_no = '" + params.building_no + "'"
						+ "    and t1.floor_no = '" + params.floor_no + "'"
						+ " order by t1.room_no ";

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

	// 해당 동 전체 실 목록
	self.list003B = function(params, okFunction) { 
		wsdb.transaction(function(txn) {		
			var sqlMain = " select t1.floor_no, "
						+ " 	   group_concat(t1.room_no||'|'||t1.room_nm,'Ð') as room_arr "
						+ "   from SMLTB_ARCH11 t1 "
						+ "  where t1.facil_no = '" + params.facil_no + "'"
						+ "    and t1.building_no = '" + params.building_no + "'"
						+ " group by t1.floor_no "
						+ " order by substr(t1.floor_no,1,1), substr(t1.floor_no,2)*case when substr(t1.floor_no,1,1)='B' then -1 else 1 end ";

			//console.log(sqlMain);
			var rtn = txn.executeSql(sqlMain, [], 
				function(transaction, resultSet) {
					var res = [];
					for (var i=0; i < resultSet.rows.length; i++) {
						var rsBox = resultSet.rows.item(i);
						if(rsBox.room_arr == "") {
							res.push(rsBox);
						}else {
							var room = rsBox.room_arr.split('Ð');
							for(var k=0; k < room.length; k+=5) {
								var newBox = {floor_no : rsBox.floor_no};
								newBox.room_no1 = nvl(arrayCol(room[k], 0));
								newBox.room_nm1 = nvl(arrayCol(room[k], 1));
								newBox.room_no2 = nvl(arrayCol(room[k+1], 0));
								newBox.room_nm2 = nvl(arrayCol(room[k+1], 1));
								newBox.room_no3 = nvl(arrayCol(room[k+2], 0));
								newBox.room_nm3 = nvl(arrayCol(room[k+2], 1));
								newBox.room_no4 = nvl(arrayCol(room[k+3], 0));
								newBox.room_nm4 = nvl(arrayCol(room[k+3], 1));
								newBox.room_no5 = nvl(arrayCol(room[k+4], 0));
								newBox.room_nm5 = nvl(arrayCol(room[k+4], 1));
								res.push(newBox);
							}
						}
					}
					if (okFunction) {
						okFunction(res);
					}
				});
		});
	};

}]);

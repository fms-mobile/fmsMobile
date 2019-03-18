/*************************************************************************************************************
**	Script Id    : PR_SMLTB_ORGN01
**	Script Name  : 유지관리조직 관련 쿼리 모음
*************************************************************************************************************/
app.service('PR_SMLTB_ORGN01', [function() {  
	var self = this;

	/*********************************************************************************************************
	**	Function Id  : insert
	**	Description  : 유지관리조직 입력
	*********************************************************************************************************/
	self.insert = function(params, okFunction) {
		wsdb.transaction(function(txn) {
			if(nvl(params.tel_no1) != "") { params.tel_no = nvl(params.tel_no1) + '-' + nvl(params.tel_no2) + '-' + nvl(params.tel_no3); }
			if(nvl(params.fax_no1) != "") { params.fax_no = nvl(params.fax_no1) + '-' + nvl(params.fax_no2) + '-' + nvl(params.fax_no3); }
			if(nvl(params.hp_no1) != "") { params.hp_no  = nvl(params.hp_no1)  + '-' + nvl(params.hp_no2)  + '-' + nvl(params.hp_no3); }
			if(nvl(params.email_id1) != "") { params.email_id  = nvl(params.email_id1)  + '@' + nvl(params.email_id2); }

			var sqlMain = "insert into SMLTB_ORGN01 ( facil_no, maint_org_cd, maint_org_nm, public_flag, tel_no, fax_no, hp_no, "
						+ "							  email_id, charge_person, charge_dept, ref_cd, gov_cd, user_id, favor_degree, favor_remark ) "
						+ " values ( '"+params.facil_no+"', '"+params.maint_org_cd+"', '"+nvl(params.maint_org_nm)+"', '"+nvl(params.public_flag)+"', '"+nvl(params.tel_no)+"', '"+nvl(params.fax_no)+"', '"+nvl(params.hp_no)+"', "
						+ "			 '"+nvl(params.email_id)+"', '"+nvl(params.charge_person)+"', '"+nvl(params.charge_dept)+"', '"+nvl(params.ref_cd)+"', '"+nvl(params.gov_cd)+"', '"+nvl(params.user_id)+"', '"+nvl(params.favor_degree)+"', '"+nvl(params.favor_remark)+"' ) ";

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
	**	Description  : 유지관리조직 수정
	*********************************************************************************************************/
	self.update = function(params, okFunction) {
		wsdb.transaction(function(txn) {
			if(nvl(params.tel_no1) != "") { params.tel_no = nvl(params.tel_no1) + '-' + nvl(params.tel_no2) + '-' + nvl(params.tel_no3); }
			if(nvl(params.fax_no1) != "") { params.fax_no = nvl(params.fax_no1) + '-' + nvl(params.fax_no2) + '-' + nvl(params.fax_no3); }
			if(nvl(params.hp_no1) != "") { params.hp_no  = nvl(params.hp_no1)  + '-' + nvl(params.hp_no2)  + '-' + nvl(params.hp_no3); }
			if(nvl(params.email_id1) != "") { params.email_id  = nvl(params.email_id1)  + '@' + nvl(params.email_id2); }
			
			var sqlMain = "update SMLTB_ORGN01 "
						+ "   set maint_org_nm  = '"+nvl(params.maint_org_nm)+"', "
						+ "       public_flag   = '"+nvl(params.public_flag)+"', "
						+ "       tel_no        = '"+nvl(params.tel_no)+"', "
						+ "       fax_no        = '"+nvl(params.fax_no)+"', "
						+ "       hp_no         = '"+nvl(params.hp_no)+"', "
						+ "       email_id      = '"+nvl(params.email_id)+"', "
						+ "       charge_person = '"+nvl(params.charge_person)+"', "
						+ "       charge_dept   = '"+nvl(params.charge_dept)+"', "
						+ "       ref_cd        = '"+nvl(params.ref_cd)+"' "
						+ " where facil_no      = '"+params.facil_no+"' "
						+ "   and maint_org_cd  = '"+params.maint_org_cd+"' ";

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
	**	Description  : 유지관리조직 삭제
	*********************************************************************************************************/
	self.delete = function(params, okFunction) { 
		wsdb.transaction(function(txn) {
			var sqlMain = "delete from SMLTB_ORGN01 where facil_no = '"+params.facil_no+"' ";
			if (params.maint_org_cd != undefined && params.maint_org_cd != '') { sqlWhere += " and maint_org_cd = '" + params.maint_org_cd + "'"; }
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
	**	Description  : 유지관리조직 1건 조회
	*********************************************************************************************************/
	// 시설개요 - 일반개요
	self.select = function(params, okFunction, dataNotFound) {
		wsdb.transaction(function(txn) {
			var sqlMain = "select t1.facil_no, t1.maint_org_cd, t1.maint_org_nm, t1.public_flag, t1.tel_no, t1.fax_no, t1.hp_no, "
						+ "		  t1.email_id, t1.charge_person, t1.charge_dept, t1.ref_cd, t1.gov_cd, t1.user_id, t1.favor_degree, t1.favor_remark "
						+ "  from SMLTB_ORGN01 t1 "
						+ " where t1.facil_no = '" + params.facil_no + "'"
						+ "   and t1.maint_org_cd = '" + params.maint_org_cd + "'";

			//console.log(sqlMain);
			txn.executeSql(sqlMain, [], 
				function(transaction, resultSet) {
					if (resultSet.rows.length > 0) {
						var rsBox = resultSet.rows.item(0);
						
						var tel_no = (rsBox.tel_no+"--").split('-');
						var fax_no = (rsBox.fax_no+"--").split('-');
						var hp_no  = (rsBox.hp_no +"--").split('-');
						var email_id  = (rsBox.email_id +"@").split('@');

						rsBox.tel_no1 = tel_no[0];
						rsBox.tel_no2 = tel_no[1];
						rsBox.tel_no3 = tel_no[2];
						rsBox.fax_no1 = fax_no[0];
						rsBox.fax_no2 = fax_no[1];
						rsBox.fax_no3 = fax_no[2];
						rsBox.hp_no1  = hp_no[0];
						rsBox.hp_no2  = hp_no[1];
						rsBox.hp_no3  = hp_no[2];
						rsBox.email_id1 = email_id[0];
						rsBox.email_id2 = email_id[1];
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
	**	Description  : 유지관리조직 목록
	*********************************************************************************************************/
	self.list001 = function(params, okFunction) { 
		wsdb.transaction(function(txn) {
			var sqlMain = "select distinct t1.facil_no, t1.maint_org_cd, t1.maint_org_nm, t1.public_flag, t1.tel_no, t1.fax_no, t1.hp_no, "
						+ "		  t1.email_id, t1.charge_person, t1.charge_dept, t1.ref_cd, t1.gov_cd, t1.user_id, t1.favor_degree, t1.favor_remark "
						+ "  from SMLTB_ORGN01 t1 "
						+ " where t1.facil_no = '" + params.facil_no + "'"
						+ "order by 2 ";
	
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

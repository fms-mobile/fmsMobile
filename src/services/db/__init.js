var wsdb = null;

angular.module('db', [])
	.run(function () {
		var dbSize = 10 * 1024 * 1024; // 10MB
		
		wsdb = openDatabase("sfms", "", "SFMS DB", dbSize, function() {
		console.log('db successfully opened or created');
	},function(error) {
		console.log(error);
	});
	
    wsdb.transaction(function(txn) {
    	// 새로 배포할 DB정보
    	//txn.executeSql("delete from lnktb_spec01",[], function() {} , function() {});
        
		// txn.executeSql("drop table smltb_sign01");
		// txn.executeSql("drop table smltb_code01");
		// txn.executeSql("drop table COMTB_FILE01"); 
		//  txn.executeSql("drop table LNKTB_SPEC01"); 
        
        txn.executeSql("create table if not exists smltb_sign01"
                    + "  (facil_no      text, "
                    + "   sign_gbn      text, "
                    + "   sign_seq      integer,"
					+ "   sign_ymd      text, "
					+ "   require_yn    text, "
					+ "   choice_yn     text, "
                    + "   duty_nm       text, "
                    + "   user_nm       text, "
                    + "   sign_image    text) ")

		// 시설물관리대장
		txn.executeSql("create table if not exists smltb_mast01 "
					 + " (facil_no      text, "
					 + "  facil_nm      text, "
					 + "  facil_gbn     text, "
					 + "  facil_kind    text, "
					 + "  mng_no        text, "
					 + "  cpl_ymd       text, "
					 + "  zip_no        text, "
					 + "  addr_sido     text, "
					 + "  addr_gugun    text, "
					 + "  addr_dong     text, "
					 + "  addr_detail   text, "
					 + "  addr_open     char(1), "
					 + "  facil_type    text, "
					 + "  using_type    text, "
					 + "  entry_limit   integer, "
					 + "  maint_type    text, "
					 + "  struct_kind   text, "
					 + "  facil_scale   text, "
					 + "  saupja_no     text, "
					 + "  permit_no     text, "
					 + "  upper_no      text, "
					 + "  upper_nm      text, "
					 + "  remove_yn     char(1), "
					 + "  remove_ymd    text, "
					 + "  map_x         text, "
					 + "  map_y         text) ");

		// 건축물제원
		txn.executeSql("create table if not exists smltb_arch01 "
					 + " (facil_no         text, "
					 + "  building_no      text, "
					 + "  building_nm      text, "
					 + "  ground_area      real, "
					 + "  bld_area         real, "
					 + "  bld_tot_area     real, "
					 + "  use_area         real, "
					 + "  bld_wdt          text, "
					 + "  bld_hgt          text, "
					 + "  bld_lth          text, "
					 + "  cpl_ymd          text, "
					 + "  permit_ymd       text, "
					 + "  open_ymd         text, "
					 + "  floor_ground     integer, "
					 + "  floor_ug         integer, "
					 + "  floor_top        integer, "
					 + "  struct_kind      text, "
					 + "  struct_upper     text, "
					 + "  struct_lower     text, "
					 + "  fin_matter_out   text, "
					 + "  fin_matter_in    text, "
					 + "  fin_matter_roof  text, "
					 + "  state_grade      char(1), "
					 + "  rep_yn           char(1), "
					 + "  use_floor        text) ");

		// 건축물室정보
		txn.executeSql("create table if not exists smltb_arch11 "
					 + " (facil_no      text, "
					 + "  building_no   text, "
					 + "  room_no       text, "
					 + "  floor_no      text, "
					 + "  room_nm       text, "
					 + "  etc_remark    text) ");

		// 토목시설제원
		txn.executeSql("create table if not exists smltb_civl01 "
					 + " (facil_no      text, "
					 + "  civil_no      text, "
					 + "  civil_kind    text, "
					 + "  col01         text, "
					 + "  col02         text, "
					 + "  col03         text, "
					 + "  col04         text, "
					 + "  col05         text, "
					 + "  civil_loc     text) ");

		// 보수보강이력
		txn.executeSql("create table if not exists smltb_amnd01 "
					 + " (facil_no          text, "
					 + "  amend_seq         integer, "
					 + "  object_no         text, "
					 + "  amend_flag        text, "
					 + "  amend_content     text, "
					 + "  const_yy          text, "
					 + "  ref_data_yn       char(1), "
					 + "  ref_data_content  text, "
					 + "  struct_chk_yn     char(1)) ");

		// 설계도서
		txn.executeSql("create table if not exists smltb_docu01 "
					 + " (facil_no       text, "
					 + "  object_no      text, "
					 + "  doc_status01   char(1), "
					 + "  doc_status02   char(1), "
					 + "  doc_status11   char(1), "
					 + "  doc_status12   char(1), "
					 + "  doc_status21   text, "
					 + "  doc_status22   text, "
					 + "  doc_status23   text, "
					 + "  doc_status24   text, "
					 + "  eq_dsn_tar_yn  char(1), "
					 + "  eq_dsn_status  text, "
					 + "  eq_dsn_law     text, "
					 + "  eq_dsn_remark  text) ");

		// 유지관리조직
		txn.executeSql("create table if not exists smltb_orgn01 "
					 + " (facil_no       text, "
					 + "  maint_org_cd   text, "
					 + "  maint_org_nm   text, "
					 + "  public_flag    text, "
					 + "  tel_no         text, "
					 + "  fax_no         text, "
					 + "  hp_no          text, "
					 + "  email_id       text, "
					 + "  charge_person  text, "
					 + "  charge_dept    text, "
					 + "  ref_cd         text, "
					 + "  gov_cd         text, "
					 + "  user_id        text, "
					 + "  favor_degree   char(1), "
					 + "  favor_remark   text) ");

		// 안전점검 마스터
		txn.executeSql("create table if not exists smltb_dign01 "
					 + " (facil_no        text, "
					 + "  upper_no        text, "
					 + "  plan_ymd        text, "
					 + "  plan_team       text, "
					 + "  dign_ymd        text, "
					 + "  dign_dong_cnt   integer, "
					 + "  dign_team       text, "
					 + "  dign_person     text, "
					 + "  with_person     text, "
					 + "  unable_reason   text, "
					 + "  add_dign_ymd    text, "
					 + "  report_ymd      text, "
					 + "  pre_report_chk  text, "
					 + "  state_grade_ar  char(1), "
					 + "  state_grade_cv  char(1), "
					 + "  emerg_yn        char(1), "
					 + "  emerg_ymd       text, "
					 + "  pro_status      char(1), "
					 + "  submit_yn       char(1)) ");

		// 현장조사
		txn.executeSql("create table if not exists smltb_dign11 "
					 + " (facil_no      text, "
					 + "  record_no     integer, "
					 + "  record_type   char(1), "
					 + "  object_no     text, "
					 + "  floor_no      text, "
					 + "  room_no       text, "
					 + "  room_nm       text, "
					 + "  room_detail   text, "
					 + "  buwee_cd      text, "
					 + "  bujae_cd      text, "
					 + "  defect_cd     text, "
					 + "  cause_cd1     text, "
					 + "  cause_cd2     text, "
					 + "  maint_cd      text, "
					 + "  amend_cd      text, "
					 + "  dign_cd       text, "
					 + "  eval_grade    text, "
					 + "  buwee_nm      text, "
					 + "  bujae_nm      text, "
					 + "  defect_nm     text, "
					 + "  defect_size   text, "
					 + "  through_yn    char(1), "
					 + "  leak_yn       char(1), "
					 + "  block_yn      char(1), "
					 + "  rep_yn        char(1), "
					 + "  cause_nm1     text, "
					 + "  cause_nm2     text, "
					 + "  maint_nm      text, "
					 + "  amend_nm      text, "
					 + "  dign_nm       text, "
					 + "  amend_rank    char(1), "
					 + "  etc_remark    text) ");

		// 안전점검보고서
		txn.executeSql("create table if not exists smltb_rept01 "
					 + " (facil_no        text, "
					 + "  rpt_seq         integer, "
					 + "  rpt_class       text, "
					 + "  rpt_head        text, "
					 + "  rpt_content     text, "
					 + "  etc_remark      text, "
					 + "  sort_order      integer) ");

		// 캔버스 그리기정보
		txn.executeSql("create table if not exists smltb_draw01 "
					 + " (facil_no        text, "
					 + "  draw_seq        integer, "
					 + "  file_no         integer, "
					 + "  layer_nm        text, "
					 + "  shape       	  text) ");

		// 첨부파일
		txn.executeSql("create table if not exists comtb_file01 "
					 + " (file_no        integer, "
					 + "  file_nm        text, "
					 + "  file_path      text, "
					 + "  file_nm_mod    text, "
					 + "  file_path_mod  text, "
					 + "  file_desc      text, "
					 + "  file_type      text, "
					 + "  file_size      integer, "
					 + "  file_kind      char(1), "
					 + "  download_cnt   integer, "
					 + "  report_yn      char(1), "
					 + "  sort_order     integer, "
					 + "  ref_table      text, "
					 + "  ref_pk         text, "
					 + "  sys_reg_date   date) ");

		// 공통코드
		txn.executeSql("create table if not exists comtb_code02 "
					 + " (code_group    text, "
					 + "  code1         text, "
					 + "  code2         text, "
					 + "  code3         text, "
					 + "  data1         text, "
					 + "  data2         text, "
					 + "  data3         text, "
					 + "  data4         text, "
					 + "  data5         text, "
					 + "  data6         text, "
					 + "  data7         text, "
					 + "  sort_order    integer, "
					 + "  use_yn        char(1)) ");

		// 조사항목코드
		txn.executeSql("create table if not exists smltb_code01 "
					 + " (facil_gbn     text, "
					 + "  check_cd      text, "
					 + "  check_nm      text, "
					 + "  object_gbn    text, "
					 + "  code_lvl      integer, "
					 + "  upper_cd      text, "
					 + "  inner_cd      text, "
					 + "  input_mask    text, "
					 + "  disp_yn       char(1), "
					 + "  method_file   text, "
					 + "  use_yn        char(1)) ");

		// 연계데이터 구조
		txn.executeSql("create table if not exists lnktb_spec01 "
					 + " (ref_table       text, "
					 + "  elm_seq         integer, "
					 + "  elm_id          text, "
					 + "  elm_nm          text, "
					 + "  data_type       char(1), "
					 + "  max_length      integer, "
					 + "  data_precision  integer, "
					 + "  valid_rule      text, "
					 + "  code_group      text, "
					 + "  code_value      text, "
					 + "  required_yn     char(1), "
					 + "  etc_remark      text) ");
		
		// 로그인정보
		txn.executeSql("create table if not exists comtb_user01 "
					 + " (user_id      	  text, "
					 + "  pswd         	  text, "
					 + "  user_nm      	  text, "
					 + "  dign_team    	  text, "
					 + "  facil_gbn       text, "
					 + "  id_check        text, "
					 + "  pw_check        text, "
					 + "  sys_reg_date    text ) ");

		// DUMMY
		txn.executeSql("create table if not exists dummy_t "
					 + " (no1       	  integer, "
					 + "  no2          	  char(2)) ");

		txn.executeSql("select count(*) as cnt from comtb_code02", [], 
			function(transaction, resultSet) {
	        	if (resultSet.rows.item(0).cnt == 0) {
	                comtbCode02Loading(txn);
				}
			});

		txn.executeSql("select count(*) as cnt from smltb_code01", [], 
			function(transaction, resultSet) {
	        	if (resultSet.rows.item(0).cnt == 0) {
	                smltbCode01Loading(txn);
				}
			});

		

		txn.executeSql("select count(*) as cnt from lnktb_spec01", [], 
			function(transaction, resultSet) {
                console.log("lnktbSpec01Loading");
	        	if (resultSet.rows.item(0).cnt == 0) {
	                lnktbSpec01Loading(txn);
				} else {
                    console.log("lnktbSpec01Update");
					txn.executeSql("select count(*) as cnt from lnktb_spec01 where ref_table='COMTB_FILE01' and elm_id = 'FILE_NM_MOD' ", [],
					function(transaction, resultSet) {
						console.log("lnktbSpec01Loading");
						if (resultSet.rows.item(0).cnt == 0) {
							console.log("Su");
							txn.executeSql("delete from LNKTB_SPEC01"); 
							lnktbSpec01Loading(txn);
						}
					});
                }
			});

		txn.executeSql("select count(*) as cnt from comtb_user01", [], 
			function(transaction, resultSet) {
	        	if (resultSet.rows.item(0).cnt == 0) {
	                txn.executeSql("insert into COMTB_USER01 values (null, null, null, null, null, 'N', 'N', null)");
				}
			});

		txn.executeSql("select count(*) as cnt from dummy_t", [], 
			function(transaction, resultSet) {
	        	if (resultSet.rows.item(0).cnt < 31) {
					txn.executeSql("delete from dummy_t");
					for(var i=1; i <=31; i++) { txn.executeSql("insert into dummy_t values ("+i+", '"+i+"')"); }
				}
			});
    });
});
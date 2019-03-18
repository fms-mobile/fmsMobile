import {Pipe, PipeTransform} from '@angular/core';

@Pipe( { name : 'mcust'})
export class CustFilter implements PipeTransform {
    transform(text : string, transGbn:string, opt:string, opt2:string) : string {
        var res : string = "";
        if (text == undefined) {
            return "";
        }
        if (transGbn == "DEF_DATE_FMT") {
            // {{sgn.send_date | mcust: "DEF_DATE_FMT"}}
            text = text.replace(/-/g,'');
            if (opt == undefined || opt == "") {
                opt = "/";
            }
			if(text.length >= 8) {
				if(length == 6) {
					res = text.substring(2,4) + opt + text.substring(4,6) + opt + text.substring(6,8);
				}else {
					res = text.substring(0,4) + opt + text.substring(4,6) + opt + text.substring(6,8);
				}
			}else {
				res = text;
			}
        } else if (transGbn == "DEF_DATETIME_FMT") {
            text = text.replace(/-/g,'').replace(/ /g,'').replace(/:/g,'');
            if (opt == undefined || opt == "") {
                opt = "/";
            }
			if(text.length >= 8) {
				res = text.substring(0,4) + opt + text.substring(4,6) + opt + text.substring(6,8) + " " + text.substring(8,10) + ":" + text.substring(10,12);
			}else {
				res = text;
			}
        } else if (transGbn == "DEF_TIME_FMT_APM") {
            text = text.replace(/-/g,'').replace(/ /g,'').replace(/:/g,'');
			if(text.length >= 4) {
                if (parseInt(text.substring(0,2)) <= 12) {
                    res += " 오전 " + text.substring(0,2);
                } else {
                    res += " 오후 ";
                    var hourx = String(parseInt(text.substring(0,2)) - 12);
                    res += (hourx.length == 1 ? "0" + hourx : hourx);
                }
                res += ":" + text.substring(2,4);
			}else {
				res = text;
			}
        } else if (transGbn == "DEF_TIME_FMT") {
            text = text.replace(/-/g,'').replace(/ /g,'').replace(/:/g,'');
			if(text.length >= 4) {                
                res = text.substring(0,2) + ":" + text.substring(2,4);
			}else {
				res = text; 
			}
        } else if (transGbn == "MAIL_SHORT_DATETIME") {
            text = text.replace(/-/g,'').replace(/ /g,'').replace(/:/g,'');
            if (opt == undefined || opt == "") {
                opt = "/";
            }
			if(text.length >= 8) {
                var todayYmd = new Date().toISOString().slice(0,10).replace(/-/g,"");
                if (todayYmd != text.substring(0,8)) {
                    if (todayYmd.substring(0,4) == text.substring(0,4)) {
                        res = text.substring(4,6) + opt + text.substring(6,8);
                    } else {
                        res = text.substring(0,4) + opt + text.substring(4,6) + opt + text.substring(6,8);
                    }
                } else {
                    if (parseInt(text.substring(8,10)) <= 12) {
                        res = " 오전 " + text.substring(8,10);
                    } else {
                        res = " 오후 ";
                        hourx = String(parseInt(text.substring(8,10)) - 12);
                        res += (hourx.length == 1 ? "0" + hourx : hourx);
                    }
                    res += ":" + text.substring(10,12);
                }
			}else {
				res = text;
			}
        } else if (transGbn == "DEF_DATETIME_FMT_APM") {
            text = text.replace(/-/g,'').replace(/ /g,'').replace(/:/g,'');
            if (opt == undefined || opt == "") {
                opt = "/";
            }
			if(text.length >= 8) {
                res = text.substring(0,4) + opt + text.substring(4,6) + opt + text.substring(6,8);
                if (parseInt(text.substring(8,10)) <= 12) {
                    res += " 오전 " + text.substring(8,10);
                } else {
                    res += " 오후 ";
                    hourx = String(parseInt(text.substring(8,10)) - 12);
                    res += (hourx.length == 1 ? "0" + hourx : hourx);
                }
                res += ":" + text.substring(10,12);
			}else {
				res = text;
			}
        } else if (transGbn == "DEF_DATETIME_FMT_SHORT") {
            text = text.replace(/-/g,'').replace(/ /g,'').replace(/:/g,'');
            if (opt == undefined || opt == "") {
                opt = "/";
            }
			if(text.length >= 8) {
				res = text.substring(4,6) + opt + text.substring(6,8) + " " + text.substring(8,10) + ":" + text.substring(10,12);
			}else {
				res = text;
			}
        } else if (transGbn == "DEF_DATE_KOR_FMT") {
            text = text.replace(/-/g,'');
			res = text.substring(0,4) + "년 " + text.substring(4,6) + "월 " + text.substring(6,8) + "일";
        } else if (transGbn == "FIX_LENGTH") {
            // {{sgn.sss | mcust: "FIX_LENGTH" : "10" : "..."}}
			if(text.length <= Number(opt) || text.length - opt2.length <= length) {
				return text;
			}else {
				return String(text).substring(0, length-opt2.length) + opt2;
			}
        } else if (transGbn == "MAIL_TEXT") {
            res = text.replace(/&nbsp;/g, ' ');
        } else if (transGbn == "MULTILINE_TEXT") {
            res = text.replace(/\n/g, '<br/>');
        } else if (transGbn == "SPECIAL_CHAR") {
            res = text.replace(/&#34;/g, '"').replace(/&#039;/g, '\'').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
        } else if (transGbn == "HTML_TO_TEXT") {
            res = text.replace(/&#039;/g, "'").replace(/&#34;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
        } else if (transGbn == "THOUSAND_COMMA") {
            res = String(text).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        } else if (transGbn == "ARRAY_COL") {
            // {{sgn.sss | mcust: "ARRAY_COL" : "1" : "|"}}
            if(opt == undefined) { 
                res = text;
            } else {
                if(opt2 == undefined) { opt2 = "|"; }
                res = text.split(opt2)[opt];
            }
        } else if (transGbn == "ISNULL_VALUE") {
            res =  (text == "" || text == undefined ? opt : text);
        } else if (transGbn == "SIMPLE_MAIL_NM") {
            var mailArr = text.split(",");
            for(var i=0; i < mailArr.length; i++) {
                var mailInfo = mailArr[i].split("&lt;");
                if (res != "") { res += ", "; }
                if (mailInfo.length == 1) {
                    if (mailInfo[0].indexOf("@") > 0) {
                        res += mailInfo[0].split("@")[0];
                    } else {
                        res += mailInfo[0];
                    }
                } else {
                    res += mailInfo[0];
                }
            }
        } else if (transGbn == "NOTNULL_VALUE") {
            res = (text == "" || text == undefined ? "" : opt);
        } else if (transGbn == "EMAIL_HTML") {
            var spos = text.toLocaleLowerCase().indexOf("<body>");
            var epos = text.toLocaleLowerCase().lastIndexOf("</body>");
            if (spos >=0 && epos >=0) {
                res = text.substring(spos + 6, epos);
            } else {
                res = text;
            }
        } else if (transGbn == "BYTE_FORMAT") {
            text = text.replace(/,/g,'');
            if(text == "" || Number(text) == NaN) {
				return "";
			}else {
				var v = parseInt(text);
				if(v > 1024*1024) {
					res = (Math.round((v/1024*1024)*100) / 100.0) + "M";
				}else if(v > 1024) {
					res = (Math.round((v/1024.0)*100) / 100.0) + "K";
				}else {
					res = v + "B";
				} 
			}
        }
        return res;
    }
}
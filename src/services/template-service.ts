import { IService } from './IService';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from './app-settings';
import { ToastService } from './toast-service';
import { LoadingService } from './loading-service';

@Injectable()
export class TemplateService implements IService {

    constructor(public af: AngularFireDatabase, private loadingService: LoadingService, private toastCtrl: ToastService) { }

    getId = (): string => 'template';

    getTitle = (): string => 'FMS-Template';

    getAllThemes = (): Array<any> => {
        return [
            { "title": "메인", "theme": "layout1" },
            { "title": "정기안전점검 - 목록", "theme": "layout2" },
            { "title": "정기안전점검 - 등록", "theme": "layout3" },
            { "title": "참여기술자 정보 등록", "theme": "layout4" },
            { "title": "정기점검표", "theme": "layout5" }
        ];
    };

    getDataForTheme = (menuItem: any): any => {
        return this[
            'getDataFor' +
            menuItem.theme.charAt(0).toUpperCase() +
            menuItem.theme.slice(1)
        ]();
    };

    getDataForLayout1 = (): any => {
        return {
            "headerImage": "assets/images/background/main_visual.png",
            "title": "FMS 메뉴",
            "iconLike": "icon-thumb-up",
            "iconFavorite": "icon-heart",
            "iconShare": "icon-share-variant",
            "items": [
                {
                    "id": 1,
                    "title": "FMS 소개",
                    "url": "/int01001.do",
                    "icon": "icon-cloud-download",
                },
                {
                    "id": 1,
                    "title": "시설물안전등급 정보공개",
                    "url": "/pub01001.do",
                    "icon": "icon-cloud-download",
                },
                {
                    "id": 3,
                    "title": "점검진단도래시기 사전예고",
                    "description": "Shawna Norman",
                    "image": "assets/images/avatar/2.jpg",
                    "imageAlt": "avatar",
                    "icon": "icon-cloud-download",
                    "duration": "3:42"
                },
                {
                    "id": 4,
                    "title": "안전진단전문기관 현황",
                    "description": "Gail Harrington",
                    "image": "assets/images/avatar/3.jpg",
                    "imageAlt": "avatar",
                    "icon": "icon-cloud-download",
                    "duration": "3:42"
                },
                {
                    "id": 5,
                    "title": "시설물유지관리 업체현황",
                    "description": "Tricia Yang",
                    "image": "assets/images/avatar/4.jpg",
                    "imageAlt": "avatar",
                    "icon": "icon-cloud-download",
                    "duration": "3:42"
                },
                {
                    "id": 6,
                    "title": "3종시설물 지정/해제",
                    "description": "Ines Campbell",
                    "image": "assets/images/avatar/5.jpg",
                    "imageAlt": "avatar",
                    "icon": "icon-cloud-download",
                    "duration": "3:42"
                },
                {
                    "id": 7,
                    "title": "시설물 분류",
                    "description": "Lindsey Mcgowan",
                    "image": "assets/images/avatar/6.jpg",
                    "imageAlt": "avatar",
                    "icon": "icon-cloud-download",
                    "duration": "3:42"
                },
                {
                    "id": 8,
                    "title": "내진설계 대상여부확인",
                    "description": "Lucy Bender",
                    "image": "assets/images/avatar/7.jpg",
                    "imageAlt": "avatar",
                    "icon": "icon-cloud-download",
                    "duration": "3:42"
                },
            ]
        };
    };

    // Set Data For Search Bars - SIMPLE
    getDataForLayout2 = (): any => {
        return {
            "toolBarTitle": "Simple",
            "headerImage": "assets/images/background/9.jpg",
            "items": [
                {
                    "title": "정기안전점검 리스트 01",
                    "description": "상반기",
                    "date": "2018.12.11 ~ 2019.01.20",
                    "name": "홍길동"
                },
                {
                    "title": "정기안전점검 리스트 02",
                    "description": "상반기",
                    "date": "2018.12.11 ~ 2019.01.20",
                    "name": "홍길동"
                },
                {
                    "title": "정기안전점검 리스트 03",
                    "description": "상반기",
                    "date": "2018.12.11 ~ 2019.01.20",
                    "name": "홍길동"
                },
                {
                    "title": "정기안전점검 리스트 04",
                    "description": "상반기",
                    "date": "2018.12.11 ~ 2019.01.20",
                    "name": "홍길동"
                },
                {
                    "title": "정기안전점검 리스트 05",
                    "description": "상반기",
                    "date": "2018.12.11 ~ 2019.01.20",
                    "name": "홍길동"
                },
                {
                    "title": "정기안전점검 리스트 06",
                    "description": "상반기",
                    "date": "2018.12.11 ~ 2019.01.20",
                    "name": "홍길동"
                },
                {
                    "title": "정기안전점검 리스트 07",
                    "description": "상반기",
                    "date": "2018.12.11 ~ 2019.01.20",
                    "name": "홍길동"
                },
                {
                    "title": "정기안전점검 리스트 08",
                    "description": "상반기",
                    "date": "2018.12.11 ~ 2019.01.20",
                    "name": "홍길동"
                },
                {
                    "title": "정기안전점검 리스트 09",
                    "description": "상반기",
                    "date": "2018.12.11 ~ 2019.01.20",
                    "name": "홍길동"
                },
                {
                    "title": "정기안전점검 리스트 10",
                    "description": "상반기",
                    "date": "2018.12.11 ~ 2019.01.20",
                    "name": "홍길동"
                },
                {
                    "title": "정기안전점검 리스트 11",
                    "description": "상반기",
                    "date": "2018.12.11 ~ 2019.01.20",
                    "name": "홍길동"
                },
                {
                    "title": "정기안전점검 리스트 12",
                    "description": "상반기",
                    "date": "2018.12.11 ~ 2019.01.20",
                    "name": "홍길동"
                }
            ]
        };
    };

    // Set Data For Parallax - BASIC
    getDataForLayout3 = (): any => {
        return {
            "startDate": "점검진단기간 시작일 입력",
            "endDate": "점검진단기간 종료일 입력",
            "userName": "작성자 이름 입력",
            "selectedLayout1": {
                "title": "기간구분",
                "header": "With Action sheet",
                "selectedItem": 1,
                "items": [
                    {
                        "id": 1,
                        "title": "상반기"
                    },
                    {
                        "id": 2,
                        "title": "하반기"
                    },
                    {
                        "id": 3,
                        "title": "해빙기"
                    },
                    {
                        "id": 4,
                        "title": "우기"
                    },
                    {
                        "id": 5,
                        "title": "동절기"
                    }
                ]
            },
            "radioLayout1": {
                "title" : "기간구분",
                "selectedItem": 4,
                "items": [
                    {
                        "id": 1,
                        "title": "상반기"
                    },
                    {
                        "id": 2,
                        "title": "하반기"
                    },
                    {
                        "id": 3,
                        "title": "해빙기"
                    },
                    {
                        "id": 4,
                        "title": "우기"
                    },
                    {
                        "id": 5,
                        "title": "동절기"
                    }
                ]
            },
            "facilItems": [
                {
                    "id": 1,
                    "title": "군산 옥산지내 절토사면",
                    "image": "assets/images/avatar/fms_img_01.png",
                    "description": "2,340",
                    "shortDescription": "양호",
                    "longDescription": "불필요"
                },
                {
                    "id": 2,
                    "title": "군산 옥산지내 절토사면",
                    "image": "assets/images/avatar/fms_img_02.png",
                    "description": "2,340",
                    "shortDescription": "양호",
                    "longDescription": "불필요"
                },
                {
                    "id": 3,
                    "title": "군산 옥산지내 절토사면",
                    "image": "assets/images/avatar/fms_img_03.png",
                    "description": "2,340",
                    "shortDescription": "양호",
                    "longDescription": "불필요"
                },
                {
                    "id": 4,
                    "title": "군산 옥산지내 절토사면",
                    "image": "assets/images/avatar/fms_img_04.png",
                    "description": "2,340",
                    "shortDescription": "양호",
                    "longDescription": "불필요"
                },
                {
                    "id": 5,
                    "title": "군산 옥산지내 절토사면",
                    "image": "assets/images/avatar/fms_img_05.png",
                    "description": "2,340",
                    "shortDescription": "양호",
                    "longDescription": "불필요"
                },
                {
                    "id": 6,
                    "title": "군산 옥산지내 절토사면",
                    "image": "assets/images/avatar/fms_img_06.png",
                    "description": "2,340",
                    "shortDescription": "양호",
                    "longDescription": "불필요"
                },
                {
                    "id": 7,
                    "title": "군산 옥산지내 절토사면",
                    "image": "assets/images/avatar/fms_img_07.png",
                    "description": "2,340",
                    "shortDescription": "양호",
                    "longDescription": "불필요"
                },
                {
                    "id": 8,
                    "title": "군산 옥산지내 절토사면",
                    "image": "assets/images/avatar/fms_img_no.png",
                    "description": "2,340",
                    "shortDescription": "양호",
                    "longDescription": "불필요"
                }
            ],
            "userItems": [
                {
                    "id": 1,
                    "title": "홍길동",
                    "image": "assets/images/avatar/fms_avatar_01.png",
                    "description": "2,340",
                    "shortDescription": "100",
                    "longDescription": "특급기술자"
                },
                {
                    "id": 2,
                    "title": "홍길동",
                    "image": "assets/images/avatar/fms_avatar_01.png",
                    "description": "2,340",
                    "shortDescription": "100",
                    "longDescription": "특급기술자"
                },
            ]
        };
    };

    // Set Data For Parallax - LOCATION DETAILS
    getDataForLayout4 = (): any => {
        return {
            "userDate": "생년월일 입력",
            "startDate": "참여 시작일 입력",
            "endDate": "참여 종료일 입력",
            "partDate": "참여일수 입력",
            "partRate": "참여율 입력",
            "userName": "성명 입력",
            "radioLayout1": {
                "title" : "기술등급",
                "selectedItem": 4,
                "items": [
                    {
                        "id": 1,
                        "title": "특급기술자"
                    },
                    {
                        "id": 2,
                        "title": "고급기술자"
                    },
                    {
                        "id": 3,
                        "title": "중급기술자"
                    },
                    {
                        "id": 4,
                        "title": "초급기술자"
                    },
                    {
                        "id": 5,
                        "title": "기타"
                    }
                ]
            },
        };
    };

    // Set Data For Parallax - LOCATION DETAILS
    getDataForLayout5 = (): any => {
        return {
            "userDate": "생년월일 입력",
            "startDate": "참여 시작일 입력",
            "endDate": "참여 종료일 입력",
            "partDate": "참여일수 입력",
            "partRate": "참여율 입력",
            "userName": "성33명 입력",
            "description": "의견입력",
            "radioLayout1": {
                "title" : "점검결과",
                "selectedItem": 1,
                "items": [
                    {
                        "id": 1,
                        "title": "양호"
                    },
                    {
                        "id": 2,
                        "title": "보통"
                    },
                    {
                        "id": 3,
                        "title": "불량"
                    },
                ]
            },
            "checkLayout1": {
                "title" : "보수여부",
                "items": [
                    {
                        "id": 1,
                        "title": "보수필요",
                        "icon": "",
                        "favorite": false,
                        "image": ""
                    },
                ]
            },
        };
    };

    getEventsForTheme = (menuItem: any): any => {
        var that = this;
        return {
            'onLike': function (item: any) {
                  that.toastCtrl.presentToast("Like");
            },
            'onFavorite': function (item: any) {
                item.favorite = !item.favorite;
                that.toastCtrl.presentToast("Favorite");
            },
            'onShare': function (item: any) {
                  that.toastCtrl.presentToast("Share");
            },
            'onFab': function (item: any) {
                  that.toastCtrl.presentToast("Fab");
            },
            'onRates': function (index: number) {
                  that.toastCtrl.presentToast("Rates " + (index + 1));
            },
            'onItemClick': function (item: any) {
                  that.toastCtrl.presentToast(item.title);
            },
            'onTextChange': function (text: any) {
                that.toastCtrl.presentToast(text);
            },
        };
    };

    prepareParams = (item: any) => {
        let result = {
            title: item.title,
            data: {},
            theme: item.theme,
            events: this.getEventsForTheme(item)
        };
        result[this.getShowItemId(item)] = true;
        return result;
    };

    getShowItemId = (item: any): string => {
        return this.getId() + item.theme.charAt(0).toUpperCase() + "" + item.theme.slice(1);
    };

    load(item: any): Observable<any> {
        var that = this;
        that.loadingService.show();
        if (AppSettings.IS_FIREBASE_ENABLED) {
            return new Observable(observer => {
                this.af
                    .object('template/' + item.theme)
                    .valueChanges()
                    .subscribe(snapshot => {
                        that.loadingService.hide();
                        observer.next(snapshot);
                        observer.complete();
                    }, err => {
                        that.loadingService.hide();
                        observer.error([]);
                        observer.complete();
                    });
            });
        } else {
            return new Observable(observer => {
                that.loadingService.hide();
                observer.next(this.getDataForTheme(item));
                observer.complete();
            });
        }
    };
}

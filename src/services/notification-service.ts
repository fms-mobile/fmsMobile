import { Injectable } from "@angular/core";
import { GlobalVars } from "./GlobalVars";
import { TransmissionService } from "./transmisson-service";
import { AuthGuardService } from "./AuthGuardService";

@Injectable()
export class NotificationService {
    url : string;

    constructor(private globalVars :GlobalVars, private transmissionService : TransmissionService, private authGuardService: AuthGuardService
        ){
    }

    notCheckNotificationCount(bindFunction : Function){
        const notiCountUrl = 'api/noti01_count.do';
        
        if(this.authGuardService.canActivate()) {
            this.transmissionService.getApiData(notiCountUrl).subscribe((res: any) => {
                bindFunction(res.count);
            });
        }
    }
}

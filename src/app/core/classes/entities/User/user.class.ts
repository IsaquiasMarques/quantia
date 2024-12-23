import { IUser } from "@core/models/entities/user.model";
import { IPlan } from "@core/models/entities/plan.model";
import { ISetting } from "@core/models/entities/settings.model";

export class User{

    private user: IUser;
    private userPlan: IPlan | null;
    private userSettings: ISetting | null;
    
    constructor( user: IUser, plan: IPlan | null, settings: ISetting | null) {
        this.user = user;
        this.userPlan = plan;
        this.userSettings = settings;
    }

    get getUser(): IUser{
        return this.user;
    }

    get id(): string{
        return this.user.id;
    }

    get firstName(): string | undefined{
        if(!this.user.fullname) return undefined;
        return this.user.fullname.split(' ').shift();
    }

    get email(): string{
        return this.user.email;
    }

    get avatar(): string | undefined{
        return this.user.avatar;
    }

    get lastName(): string | undefined{
        if(!this.user.fullname) return undefined;
        return this.user.fullname.split(' ').pop();
    }

    get friendlyExpiresAt(): string | undefined{
        if(!this.user.expiresAt) return undefined;
        return '';
    }

    get getAuthType(): 'normal' | 'recovery'{
        return this.user.authType;
    }

    get plan(): IPlan | null{
        return this.userPlan;
    }

    set updateUserPlan(plan: IPlan | null){
        this.userPlan = plan;
    }

    get settings(): ISetting | null{
        return this.userSettings;
    }

    set updateUserSettings(settings: ISetting | null){
        this.userSettings = settings;
    }

}
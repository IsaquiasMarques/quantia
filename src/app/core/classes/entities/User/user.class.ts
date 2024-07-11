import { IUser } from "@core/models/entities/user.model";
import { PlanRepository } from "../../Repositories/plan.repository";

export class User{

    private user: IUser;
    
    constructor( user: IUser ) {
        this.user = user;
    }

    get getUser(): IUser{
        return this.user;
    }

    get id(): string{
        return this.user.id;
    }

    get firstName(): string | undefined{
        if(!this.user.fullname) return undefined;
        return [...this.user.fullname].shift();
    }

    get email(): string{
        return this.user.email;
    }

    get avatar(): string | undefined{
        return this.user.avatar;
    }

    get lastName(): string | undefined{
        if(!this.user.fullname) return undefined;
        return [...this.user.fullname].pop();
    }

    get friendlyExpiresAt(): string | undefined{
        if(!this.user.expiresAt) return undefined;
        return '';
    }

    get getAuthType(): 'normal' | 'recovery'{
        return this.user.authType;
    }

}
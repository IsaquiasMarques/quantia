import { PlanRepository } from "../Repositories/plan.repository";

export class User{

    id: string;
    fullname?: string | undefined;
    avatar?: string | undefined;
    email: string | undefined;
    token: string;
    expiresIn: number;
    expiresAt: number | undefined;
    authType: 'normal' | 'recovery';
    
    constructor(
        id: string,
        fullname: string | undefined,
        avatar: string | undefined,
        email: string | undefined,
        token: string,
        expiresIn: number,
        expiresAt: number | undefined,
        authType: 'normal' | 'recovery',
    ) {
        this.id = id;
        this.fullname = fullname;
        this.avatar = avatar;
        this.email = email;
        this.token = token;
        this.expiresIn = expiresIn;
        this.expiresAt = expiresAt;
        this.authType = authType;
    }

    get firstName(): string | undefined{
        if(!this.fullname) return undefined;
        return [...this.fullname].shift();
    }

    get lastName(): string | undefined{
        if(!this.fullname) return undefined;
        return [...this.fullname].pop();
    }

    get friendlyExpiresAt(): string | undefined{
        if(!this.expiresAt) return undefined;
        return '';
    }

    get getAuthType(): 'normal' | 'recovery'{
        return this.authType;
    }

}
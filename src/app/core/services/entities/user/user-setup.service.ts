import { User } from "@core/classes/entities/User/user.class";
import { BehaviorSubject, Observable } from "rxjs";

export class UserSetup{
    private userSubject: BehaviorSubject<User | null>;
    private user$: Observable<User | null>;

    constructor() {
        this.userSubject = new BehaviorSubject<User | null>(null);
        this.user$ = this.userSubject.asObservable();
    }

    setUser(user: User){
        this.userSubject.next(user);
    }
    
    getUser(): User | null{
        return this.userSubject.getValue()
    }

    getUserAsObservable(): Observable<User | null>{
        return this.user$;
    }

    clearUser(){
        this.userSubject.next(null);
    }
}
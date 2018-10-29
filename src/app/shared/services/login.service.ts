import { Injectable, EventEmitter, Output } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../../core/models/user.model";
import { TopBarService } from "./topBar.service";

// manages Login requests and status
@Injectable()
export class LoginService {
    private authenticated: boolean = false;
    public redirectUrl: string;
    public isBusy: boolean = false;
    private _loggedInUser: User;

    public constructor(private router: Router, private topBar: TopBarService) {
    }

    public login(user: User): void {
        //don't call clear
        localStorage.removeItem("currentUser");
        this._loggedInUser = user;
        this.topBar.setTopBarVisibleIcon(true);
        localStorage.setItem("currentUser", JSON.stringify(user));
        this.authenticated = true;
        if (this.redirectUrl) {
            this.router.navigate([this.redirectUrl]);
        } else {
            this.router.navigate(["/weather/dashboard"]);
        }
    }

    public get loggedInUser(): User {
        return this._loggedInUser;
    }

    public cookieLogin(): void {
        let user: User = JSON.parse(localStorage.getItem("currentUser"));
        if (user === undefined || user === null || this.authenticated) {
            return;
        }

        this.login(user as User);
    }

    public isAuthenticated(): boolean {
        return this.authenticated;
    }

    public logout(): void {
        this.topBar.setTopBarVisibleIcon(false);
        this.authenticated = false;
        localStorage.clear();
        this._loggedInUser = null;
        this.redirectUrl = null;
        this.isBusy = false;
        this.router.navigate(["/login"]);

    }

    public updateUserWeatherApiServerCallNumber(): void {
        let user: User = JSON.parse(localStorage.getItem("currentUser"));
        if (!user) {
            return;
        }
        user.serverCalls = user.serverCalls + 1;
        this._loggedInUser = user;
        localStorage.setItem("currentUser", JSON.stringify(user));
    }
    
    public updateUserInLocalStorage(user:User):void{
        localStorage.setItem("currentUser", JSON.stringify(user));
    }
}
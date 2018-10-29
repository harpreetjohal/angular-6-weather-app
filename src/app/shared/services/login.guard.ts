import { Injectable } from "@angular/core";
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from "@angular/router";
import { LoginService } from "./login.service";

// you may only navigate if you are logged in
@Injectable()
export class LoginGuard implements CanActivate {
    public constructor(private loginService: LoginService, private router: Router) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        if (this.loginService.isAuthenticated()) {
            return true;
        }

        this.loginService.redirectUrl = state.url;

        this.router.navigate(["/login"]);
        return false;
    }
}
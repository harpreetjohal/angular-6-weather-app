import { Component } from "@angular/core";
import { Localization } from "../localization/localization";
import { Router } from "@angular/router";
import { LoginService } from "../services/login.service";
import { TopBarService } from "../services/topBar.service";

@Component({
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"],
    selector: "app-header"
})
export class HeaderComponent {
    private language: string = Localization.language;
    private showHomeIcon: boolean;
    public constructor(private router: Router, 
        private loginService: LoginService, 
        private topBarService: TopBarService) {
        topBarService.setTopBarVisible$.subscribe(value => this.showHomeIcon = value);
        this.initializeLanguage();
    }
    private initializeLanguage(): void {
        let language = JSON.parse(localStorage.getItem("language"));
        if (language !== undefined && language !== null) {
            Localization.language = language;
        }
    }

    public changeLanguage(): void {
        if (Localization.language === "de") {
            Localization.language = "en";
        } else {
            Localization.language = "de";
        }
        this.language = Localization.language;
        let currentUrl = this.router.url;
        localStorage.setItem("language", JSON.stringify(this.language));

        //reload current page
        this.router.navigate(["/loading"])
            .then(r => this.router.navigate([currentUrl]));
    }
    public logout(): void {
        this.topBarService.setTopBarVisibleIcon(false);
        this.loginService.logout();
    }
}
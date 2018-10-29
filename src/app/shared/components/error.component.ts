import { Component } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Localization } from "../localization/localization";

@Component({
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.scss']
})
export class ErrorComponent {

    public constructor(private title: Title) {
        title.setTitle(Localization.getString("errorPageTitle"));
    }
}
import { Component } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Localization } from "../localization/localization";

@Component({
    templateUrl: "./notFound.component.html",
    styleUrls: ["./notFound.component.scss"],
    selector: "not-found"
})
export class NotFoundComponent {
    public constructor(private title: Title) {
        title.setTitle(Localization.getString("notFound"));
    }
}
import { Component } from "@angular/core";
import { Title } from "@angular/platform-browser";

@Component({
    templateUrl: "./loading.component.html",
    styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {

    public constructor( private title: Title) {
        title.setTitle("Loading");
    }
}
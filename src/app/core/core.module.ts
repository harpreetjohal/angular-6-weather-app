import { NgModule } from "@angular/core";
import { CoreComponent } from "./core.component";
import { UserProfileComponent } from "./components/userProfile.component";
import { coreRouting } from "./core.routes";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { CalendarModule } from "primeng/primeng";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [
        coreRouting,
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        CalendarModule,
        CommonModule
    ],
    declarations: [
        CoreComponent,
        UserProfileComponent
        
    ],
    providers: [
    ]
})
export class CoreModule { }
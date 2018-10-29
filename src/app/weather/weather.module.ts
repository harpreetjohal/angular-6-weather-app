import { NgModule } from "@angular/core";
import { WeatherComponent } from "./weather.component";
import { ForecastComponent } from "./components/forecast.component";
import { weatherRouting } from "./weather.routes";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { DashboardComponent } from "./components/dashboard.component";
import { CommonModule } from "@angular/common";
import { WeatherItemComponent } from "./components/weatherItem.component";
import {ChartModule} from 'primeng/chart';

@NgModule({
    imports: [
        CommonModule,
        weatherRouting,
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        ChartModule
    ],
    exports: [WeatherItemComponent],
    declarations: [
        WeatherComponent,
        ForecastComponent,
        DashboardComponent,
        WeatherItemComponent
    ],
    providers: [
    ]
})
export class WeatherModule { }
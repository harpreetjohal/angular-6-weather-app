import { RouterModule, Routes } from "@angular/router";
import { ForecastComponent } from "./components/forecast.component";
import {WeatherComponent}  from"./weather.component";
import { LoginGuard } from "../shared/services/login.guard";
import { DashboardComponent } from "./components/dashboard.component";

export const weatherRoutes: Routes = [
    {
        path: "",
        component: WeatherComponent,
        children: [
            {
                path: "dashboard",
                component: DashboardComponent,
                canActivate: [LoginGuard]
            },
            {
                path: "forecast",
                component: ForecastComponent,
                canActivate: [LoginGuard]
            }
            
        ]
    }
];

export const weatherRouting: any = RouterModule.forChild(weatherRoutes);

import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./shared/components/login.component";
import { CoreModule } from "./core/core.module";
import { WeatherModule } from "./weather/weather.module";
import { LoadingComponent } from "./shared/components/loading.component";
import { LoginGuard } from "./shared/services/login.guard";
import { ErrorComponent } from "./shared/components/error.component";
import { NotFoundComponent } from "./shared/components/notFound.component";

const routes: Routes = [
    {
        path: "",
        redirectTo: "/login",
        pathMatch: "full"
    }, 
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "loading",
        component: LoadingComponent
    },
    {
        path: "core",
        loadChildren: () => CoreModule,
        canActivate: [LoginGuard]
    },
    {
        path: "weather",
        loadChildren: () => WeatherModule,
        canActivate: [LoginGuard]
    },
    {
        path: "error",
        component: ErrorComponent
    },
    {
        path: "**", // 404
        redirectTo: "/404",
    },
    {
        path: "404",
        component: NotFoundComponent
    }
];

export const appRouting: any = RouterModule.forRoot(routes);

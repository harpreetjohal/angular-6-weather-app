import { NgModule, ModuleWithProviders } from "@angular/core";
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { LoginComponent } from "./components/login.component";
import { HeaderComponent } from "./components/header.component";
import { FooterComponent } from "./components/footer.component";
import { WeatherService } from "../weather/services/weather.service";
import { LoadingComponent } from "./components/loading.component";
import { LocalizationPipe } from "./localization/localization.pipe";
import { LoginService } from "./services/login.service";
import { ValidationService } from "./validation/validation.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginGuard } from "./services/login.guard";
import { TopBarService } from "./services/topBar.service";
import { WeatherMapperService } from "../weather/services/weatherMapper.service";
import { CalendarModule } from "primeng/primeng";
import {ChartModule} from 'primeng/chart';
import { NotFoundComponent } from "./components/notFound.component";
import { ErrorComponent } from "./components/error.component";
import { HttpService } from "./services/http.service";
import { CacheService } from "./services/cache.service";

@NgModule({
    imports: [
        RouterModule,
        HttpClientModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CalendarModule,
        ChartModule
    ],
    // dynamic components resolved by type
    entryComponents: [],
    exports: [
        LocalizationPipe,
        HeaderComponent,
        FooterComponent,
        LoadingComponent
    ],
    declarations: [
        HeaderComponent,
        LoginComponent,
        FooterComponent,
        LoadingComponent,
        LocalizationPipe,
        NotFoundComponent,
        ErrorComponent
    ]
})
export class SharedModule {

    // providers will be singleton and when we use this module in other modules
    // they will not have information regarding providers
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [WeatherService,
                LoginService,
                ValidationService,
                LoginGuard,
                TopBarService,
                WeatherMapperService,
                HttpService,
                CacheService
            ]
        };
    }
}
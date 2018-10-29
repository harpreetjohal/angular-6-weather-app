import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, of } from "rxjs";
import { Position } from '../models/position.model';
import { TemperatureFormat } from "../models/temperatureFormat.enum";
import { LoginService } from "src/app/shared/services/login.service";
import { HttpService } from "src/app/shared/services/http.service";
import { environment } from "src/environments/environment";
import { CacheService } from "src/app/shared/services/cache.service";
import { shareReplay, map } from 'rxjs/operators';
import { promise } from "protractor";
import { resolve } from "q";
import { WeatherMapperService } from "./weatherMapper.service";
import { Weather } from "../models/weather.model";

@Injectable()
export class WeatherService {
    public isBusy: boolean;
    private baseUrl: string;
    private units: string = "imperial";

    public constructor(private http: HttpService,
        private loginService: LoginService,
        private weatherMapperService: WeatherMapperService) {
        this.baseUrl = environment.weatherApiBaseEndPoint;
    }

    public getCurrentWeatherInformationByCityName(cityName: string, units: TemperatureFormat): Promise<Weather> {
        this.isBusy = true;
        this.getTemperatureUnitFormat(units);
        let apiUrl = `${this.baseUrl}weather?q=${cityName}&appid=${this.appId}&units=${this.units}`;

        return this.http.get(apiUrl)  .then((response: any) => {
            this.isBusy = false;
            return this.weatherMapperService.toWeatherModel(response, units);
        }).catch((reason: any) => {
            this.isBusy = false;
            return null;
        });
    }

    private get appId(): string {
        return this.loginService.loggedInUser.apiKey;
    }
    private getTemperatureUnitFormat(units: TemperatureFormat) {
        if (units === TemperatureFormat.imperial) {
            this.units = "imperial";
        }
        else {
            this.units = "metric";
        }
    }

    public getCurrentWeatherInformationByPosition(position: Position, units: TemperatureFormat): Promise<Weather> {
        this.isBusy = true;
        this.getTemperatureUnitFormat(units);
        return this.http.get(`${this.baseUrl}weather?lat=${position.latitude}&lon=${position.longitude}&appid=${this.appId}&units=${this.units}`)
            .then((response: any) => {
                this.isBusy = false;
                return this.weatherMapperService.toWeatherModel(response, units);
            }).catch((reason: any) => {
                this.isBusy = false;
                return null;
            });
    }

    public verifyOpenWeatherApiKey(key: string): Promise<boolean> {
        this.isBusy = true;
        return this.http.get(`${this.baseUrl}/weather?q=London&appid=${key}`).then((response: any) => {
            this.isBusy = false;
            if (response.code && response.code === "401") {
                return false;
            }

            return true;
        }).catch((err: any) => {
            this.isBusy = false;
            return false;
        });
    }

    public getWeatherForecastByCityName(city: string, units: TemperatureFormat): Promise<Weather[]> {
        this.isBusy= true;
        this.getTemperatureUnitFormat(units);
        return this.http.get(`${this.baseUrl}forecast?q=${city}&appid=${this.appId}&units=${this.units}`, false)
            .then((response: any) => {
                this.isBusy = false;
                return this.weatherMapperService.toForecastWeatherItems(response, units);
            }).catch((reason: any) => {
                this.isBusy = false;
                return null;
            });
    }
}
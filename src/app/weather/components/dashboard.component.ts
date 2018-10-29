import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/weather/services/weather.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Weather } from 'src/app/weather/models/weather.model';
import { Position } from 'src/app/weather/models/position.model';
import { TemperatureFormat } from 'src/app/weather/models/temperatureFormat.enum';
import { WeatherMapperService } from '../services/weatherMapper.service';
import { ValidationService } from 'src/app/shared/validation/validation.service';
import { Title } from '@angular/platform-browser';
import { Localization } from 'src/app/shared/localization/localization';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-weather-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private cityName: string;
  private currentWeather: Weather;
  private currentPosition: Position;
  private temperatureUnits: TemperatureFormat = TemperatureFormat.imperial;
  private dashboardForm: FormGroup;

  public constructor(private weatherService: WeatherService,
    private title: Title,
    private snotifyService: SnotifyService,
    private validation: ValidationService) {

    title.setTitle(Localization.getString("dashboard"));
    this.currentWeather = new Weather();
    this.currentPosition = new Position();
  }

  public ngOnInit(): void {
    this.dashboardForm = new FormGroup({
      "cityName": new FormControl("", Validators.required)
    });

    if (this.getSelectedLocationFromStorage) {
      this.cityName = this.getSelectedLocationFromStorage;
      this.getWeatherInformation();
    } else {
      this.findAndGetWeatherBaseOnGeoLocation();
    }
  }

  private findAndGetWeatherBaseOnGeoLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.currentPosition.latitude = position.coords.latitude.toFixed(2);
        this.currentPosition.longitude = position.coords.longitude.toFixed(2);
        this.weatherService.getCurrentWeatherInformationByPosition(this.currentPosition, this.temperatureUnits).then(
          (result: any) => {
            this.currentWeather = result;
            this.cityName = this.currentWeather.city;
            this.setSelectedLocationInStorage();
          }).catch((err: any) => { this.snotifyService.error(err.error.message, 'Error'); });
      });
    }
    else {
      this.snotifyService.error("The browser does not support geolocation", 'Error');
    }
  }

  private getCurrentWeather(): void {
    this.dashboardForm.controls["cityName"].markAsDirty();
    this.setSelectedLocationInStorage();

    if (this.dashboardForm.valid) {
      this.getWeatherInformation();
    }
  }

  private getWeatherInformation() {
    this.weatherService.getCurrentWeatherInformationByCityName(this.cityName, this.temperatureUnits).then((result: Weather) => {
      this.currentWeather = result;
    }).catch((error: any) => {
      this.snotifyService.error(error.error.message, 'Error');
    });
  }

  private changeTemperatureUnits(unit: number): void {
    this.temperatureUnits = unit === 1 ? TemperatureFormat.imperial : TemperatureFormat.metric;
    this.getCurrentWeather();
  }

  private setSelectedLocationInStorage(): void {
    if (this.cityName && this.cityName != "") {
      localStorage.setItem("selectedCity", this.cityName);
    }
  }

  private get getSelectedLocationFromStorage(): string {
    return localStorage.getItem("selectedCity");;
  }
}

import { Component, Input } from "@angular/core";
import { Weather } from "../models/weather.model";

@Component({
    selector: 'weather-item',
    templateUrl: './weatherItem.component.html',
    styleUrls: ['./weatherItem.component.scss']
  })
  export class WeatherItemComponent {

    @Input() public weather: Weather;
    public constructor() {
        this.weather = new Weather();
    }
  }
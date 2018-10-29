import { Injectable } from "@angular/core";
import { Weather } from "../models/weather.model";
import { TemperatureFormat } from "../models/temperatureFormat.enum";
import { Forecast } from "../models/forecast.model";

@Injectable()
export class WeatherMapperService {

    public toWeatherModel(data: any, unit: TemperatureFormat): Weather {
        let weather = new Weather();

        if (!data) {
            return weather;
        }

        weather.temperature = data.main.temp;
        weather.humidity = data.main.humidity;
        weather.weatherIcon = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        weather.windSpeed = data.wind.speed;
        weather.description = data.weather[0].description;
        weather.windDirection = data.wind.deg;
        weather.city = data.name;
        weather.country = data.sys.country;
        weather.unit= unit;
        return weather;
    }

    public toForecastWeatherItems(data: any, unit: TemperatureFormat): Weather[] {

        let weatherItems: Weather[] = [];
        data.list.forEach(element => {
            let weather = new Weather();
            let date = new Date(element.dt_txt);
            weather.date = date.toDateString() + ' '+ element.dt_txt.split(' ')[1] ;
            weather.temperature = element.main.temp;
            weather.humidity = element.main.humidity;
            weather.weatherIcon = `http://openweathermap.org/img/w/${element.weather[0].icon}.png`;
            weather.windSpeed = element.wind.speed;
            weather.description = element.weather[0].description;
            weather.windDirection = element.wind.deg;
            weather.city = data.city.name;
            weather.country = data.city.country;
            weather.unit= unit;
            weatherItems.push(weather);
        });

        return weatherItems;

    }

    public toForecastModel(data: any, unit: TemperatureFormat): Forecast {

        let forecast : Forecast= new Forecast();
        forecast.date =data.dt_txt;
        
        data.list.forEach(element => {
            let weather = new Weather();
            weather.temperature = element.main.temp;
            weather.humidity = element.main.humidity;
            weather.weatherIcon = `http://openweathermap.org/img/w/${element.weather[0].icon}.png`;
            weather.windSpeed = element.wind.speed;
            weather.description = element.weather[0].description;
            weather.windDirection = element.wind.deg;
            weather.city = data.city.name;
            weather.country = data.city.country;
            weather.unit= unit;
            forecast.weatherItems.push(weather);
        });

        return forecast;

    }
}
import { TemperatureFormat } from "./temperatureFormat.enum";

export class Weather {
    public city: string;
    public country: string;
    public humidity: number;
    public weatherIcon: string;
    public windSpeed: number;
    public temperature: number;
    public minTemperature: number;
    public maxTemperature: number;
    public description: string;
    public windDirection: number;
    public unit: TemperatureFormat;
    public date: string;
    public constructor(weather?: Weather) {
        if (!weather) {
            return;
        }

        this.city = weather.city;
        this.country = weather.country;
        this.humidity = weather.humidity;
        this.temperature = weather.temperature;
        this.weatherIcon = weather.weatherIcon;
        this.windSpeed = weather.windSpeed;
        this.minTemperature = weather.minTemperature;
        this.maxTemperature = weather.maxTemperature;
        this.description = weather.description;
        this.windDirection = weather.windDirection;
        this.unit = weather.unit;
        this.date = weather.date;
    }
    
    public get windDirectionTextualDescription(): string {
        if (this.windDirection > 337.5) { return 'Northerly'; }
        if (this.windDirection > 292.5) { return 'North Westerly'; }
        if (this.windDirection > 247.5) { return 'Westerly'; }
        if (this.windDirection > 202.5) { return 'South Westerly'; }
        if (this.windDirection > 157.5) { return 'Southerly'; }
        if (this.windDirection > 122.5) { return 'South Easterly'; }
        if (this.windDirection > 67.5) { return 'Easterly'; }
        if (this.windDirection > 22.5) { return 'North Easterly'; }
        return 'Northerly';
    }
}
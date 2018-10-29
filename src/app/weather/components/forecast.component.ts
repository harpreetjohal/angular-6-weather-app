import { Component } from "@angular/core";
import { Weather } from "../models/weather.model";
import { WeatherService } from "../services/weather.service";
import { TemperatureFormat } from "../models/temperatureFormat.enum";
import { fadeInAnimation } from "src/app/shared/animations/fadeIn.animation";
import { WeatherMapperService } from "../services/weatherMapper.service";
import { zoomInAnimation } from 'src/app/shared/animations/zoomIn.animation';

@Component({
    templateUrl: "./forecast.component.html",
    styleUrls: ["./forecast.component.scss"],
    selector: "weather-forecast",
    animations: [
        fadeInAnimation,
        zoomInAnimation
    ],
    host: {
        '[@zoomInAnimation]': '',
        '[@fadeInAnimation]': ''
    }
})
export class ForecastComponent {
    private weatherItems: Weather[] = [];
    private temperatureUnits: TemperatureFormat = TemperatureFormat.metric;
    private chartView: boolean = false;
    private chartData: any;

    public constructor(private weatherService: WeatherService, private weatherMapperService: WeatherMapperService) {
        this.weatherItems = [];
    }

    public ngOnInit(): void {

        this.weatherService.getWeatherForecastByCityName(localStorage.getItem("selectedCity"), this.temperatureUnits)
            .then((result: Weather[]) => {
                this.weatherItems = [];

                if(result){
                    result.forEach((w: Weather) => { this.weatherItems.push(new Weather(w)); });
                    this.prepareChartData();
                }
            });
    }

    private changeView(): void {
        this.chartView = this.chartView === true ? false : true;
    }

    private prepareChartData(): void {
        let temps: number[] = [];
        let labels: string[] = [];
        let winds: number[] = [];
        let humidity: number[] = [];
        this.weatherItems.forEach(w => {
            temps.push(w.temperature);
            labels.push(w.date);
            winds.push(w.windSpeed);
            humidity.push(w.humidity);
        });

        this.chartData = {
            labels: labels,
            responsive: true,
            datasets: [
                {
                    label: 'Temperature',
                    data: temps,
                    fill: true,
                    borderColor: '#007bff'
                },
                {
                    label: 'Wind',
                    data: winds,
                    fill: true,
                    borderColor: '#d26c22'
                }
                // {
                //     label: 'Humidity',
                //     data: humidity,
                //     fill: true,
                //     borderColor: '#343a40'
                // }
            ]
        }
    }
}
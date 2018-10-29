import { TemperatureFormat } from "./temperatureFormat.enum";
import { Weather } from "./weather.model";

export class Forecast {
    public date: string;
    public weatherItems: Weather[];
    public constructor(model?: Forecast) {
        if (!model) {
            return;
        }

        this.date = model.date;
        this.weatherItems = [];
        if (model.weatherItems) {
            model.weatherItems.forEach(w => this.weatherItems.push(new Weather(w)));
        }
    }
}

export enum TemperatureFormat {
    //Temperature in Kelvin is used by default, no need to use units parameter in API call
    default,
     //For temperature in Fahrenheit use units=imperial
    imperial,
    //For temperature in Celsius use units=metric
    metric 
}
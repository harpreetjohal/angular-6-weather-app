import { LocalizationEntry } from "./localizationEntry.model";

export class LocalizationEN {

    static values: LocalizationEntry[] = [
        new LocalizationEntry("dashboard", "Dashboard"),
        new LocalizationEntry("login", "Login"),
        new LocalizationEntry("search", "Search"),
        new LocalizationEntry("signOut", "Sign Out"),
        new LocalizationEntry("validation_required", "is required"),
        new LocalizationEntry("userName", "UserName"),
        new LocalizationEntry("apiKey", " OpenWeatherApi ID"),
        new LocalizationEntry("welcome", "Welcome"),
        new LocalizationEntry("validation_apiKey_invalid", "Invalid app id."),
        new LocalizationEntry("userProfile", "User Profile"),
        new LocalizationEntry("dashBoardHeaderText", "Current weather in "),
        new LocalizationEntry("forecastHeaderText", "Weather forecast in "),
        new LocalizationEntry("cityName", "City name"),
        new LocalizationEntry("search", "Search"),
        new LocalizationEntry("temperatur", "Temperature"),
        new LocalizationEntry("weatherIcon", "Weather icon"),
        new LocalizationEntry("humidity", "Humidity"),
        new LocalizationEntry("windSpeed", "Wind speed"),
        new LocalizationEntry("windDirection", "Wind direction")
    ];
}
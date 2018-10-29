import { LocalizationEntry } from "./localizationEntry.model";
import { LocalizationDE } from "./localization.de";
import { LocalizationEN } from "./localization.en";

export class Localization {

    static language: string = "de";

    static getString(key: string): string {
        let values: LocalizationEntry[] = [];
        switch (this.language) {
            case "de": values = LocalizationDE.values; break;
            case "en": values = LocalizationEN.values; break;
        }

        let value: LocalizationEntry = values.find((e: LocalizationEntry) => e.key.toLowerCase() === key.toLowerCase());
        if (value === null || value === undefined) {
            return key;
        }
        return value.value;
    }

   
    static getNumber(value: number, decimals?: number): string {
        let x: number = Math.pow(10, decimals);
        switch (this.language) {
            case "de": // return (decimals ? (Math.round(value * x) / x) : value).toLocaleString(undefined, { maximumFractionDigits: decimals ? decimals : 10 }).replace(/\,/g, '#').replace('.', ',').replace(/\#/g, '.');
                return (decimals ? (Math.round(value * x) / x) : value).toLocaleString(undefined, { maximumFractionDigits: decimals ? decimals : 10, minimumFractionDigits: decimals ? decimals : 0 });
            case "en": return (decimals ? (Math.round(value * x) / x) : value).toLocaleString(undefined, { maximumFractionDigits: decimals ? decimals : 10, minimumFractionDigits: decimals ? decimals : 0 });
        }
    }
}

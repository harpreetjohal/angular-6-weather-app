import { Pipe, PipeTransform } from "@angular/core";
import { Localization } from "./localization";

@Pipe({ name: "loc" })
export class LocalizationPipe implements PipeTransform {
    transform(value: any, format?: any): string {
        if (value === null || value === undefined) {
            return "";
        }

         if (!isNaN(Number(value))) {
            let decimals: number;
            if (!isNaN(Number(format))) {
                decimals = format;
            }
            return Localization.getNumber(Number(value), decimals);
        }
        
        return Localization.getString(value);
    }
}
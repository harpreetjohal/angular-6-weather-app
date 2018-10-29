import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Localization } from "../localization/localization";
import { ServerValidationError } from "./serverValidationError.model";
import { ValidatorError } from "../models/validationError.model";

// handles validation messages
@Injectable()
export class ValidationService {

    public getMessages(form: FormGroup, controlName: string): string[] {
        let result: string[] = [];
        if (form.controls[controlName] && form.controls[controlName].errors) {
            for (let error in (form.controls[controlName].errors)) {
                if ((form.controls[controlName].errors as any).key && (form.controls[controlName].errors as any).key instanceof ValidatorError) {
                    let numberError: ValidatorError = (form.controls[controlName].errors as any).key as ValidatorError;
                    result.push(Localization.getString(numberError.message).replace("#value#", numberError.value.toString()));
                } else if (form.controls[controlName].errors.hasOwnProperty(error)) {
                    result.push(Localization.getString(controlName) + " " + Localization.getString("validation_" + error));
                }
            }
        }
        return result;
    }

    public setErrors(form: FormGroup, serverErrors: ServerValidationError[]): void {
        for (let error of serverErrors) {
            form.controls[error.control].markAsDirty();
            form.controls[error.control].setErrors({});
            for (let errorKey of error.errorKeys) {
                form.controls[error.control].errors[errorKey] = true;
            }
        }
    }

    public errorVisible(form: FormGroup, control: string): boolean {
        if (form.controls[control].dirty && form.controls[control].errors) {
            return true;
        }
        return false;
    }

}
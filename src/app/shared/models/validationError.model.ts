
export class ValidatorError {
    public message: string;
    public value: any;

    public constructor(message: string, value: any) {
        this.message = message;
        this.value = value;
    }
}
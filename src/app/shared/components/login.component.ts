import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Localization } from '../localization/localization';
import { LoginService } from '../services/login.service';
import { ValidationService } from '../validation/validation.service';
import { WeatherService } from 'src/app/weather/services/weather.service';
import { SnotifyService } from 'ng-snotify';

@Component({
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
    private user: User = new User();
    private loginForm: FormGroup;

    public constructor(
        private loginService: LoginService,
        private title: Title,
        private snotifyService: SnotifyService,
        private weatherService: WeatherService,
        private validation: ValidationService) {
        title.setTitle(Localization.getString("login"));
    }

    public ngOnInit(): void {
        this.loginForm = new FormGroup({
            "userName": new FormControl("", Validators.required),
            "apiKey": new FormControl("", Validators.required)
        });

        this.loginService.cookieLogin();
    }

    private login(): void {
        for (let controlName in this.loginForm.controls) {
            this.loginForm.controls[controlName].markAsDirty();
        }

        if (!this.loginForm.valid) {
            return;
        }

        this.weatherService.verifyOpenWeatherApiKey(this.user.apiKey).then((result: boolean) => {
            if (!result) {
                this.loginForm.controls["apiKey"].setErrors({})
                this.loginForm.controls["apiKey"].errors["apiKey_invalid"] = true;
            } else {
                this.loginService.login(this.user);
            }

        }).catch((error: any) => {
            this.loginForm.controls["apiKey"].setErrors({})
            this.loginForm.controls["apiKey"].errors["apiKey_invalid"] = true;
        });
    }

}

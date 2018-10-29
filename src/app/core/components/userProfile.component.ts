import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/services/login.service';
import { User } from '../models/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CacheService } from 'src/app/shared/services/cache.service';
import { SnotifyService } from 'ng-snotify';
import { WeatherService } from 'src/app/weather/services/weather.service';
import { ValidationService } from 'src/app/shared/validation/validation.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './userProfile.component.html',
  styleUrls: ['./userProfile.component.scss']
})
export class UserProfileComponent implements OnInit {

  private user: User;
  private userForm: FormGroup;
  public constructor(private loginService: LoginService,
    private snotifyService: SnotifyService,
    private validation: ValidationService,
    private weatherService: WeatherService,
    private cacheService: CacheService) {

  }

  public ngOnInit(): void {
    this.user = new User(this.loginService.loggedInUser);
    this.userForm = new FormGroup({
      "userName": new FormControl("", Validators.required),
      "apiKey": new FormControl("", Validators.required),
      "cacheExpiryDateTime": new FormControl("")
    });
  }

  private clearUserApiCache(): void {
    this.cacheService.clearAll();
    this.snotifyService.success("Cache has been cleared successfully.");
  }

  private saveUserSettings(): void {
    for (let controlName in this.userForm.controls) {
      this.userForm.controls[controlName].markAsDirty();
    }

    if (!this.userForm.valid) {
      return;
    }
    this.weatherService.verifyOpenWeatherApiKey(this.user.apiKey).then((result: boolean) => {
      if (!result) {
        this.userForm.controls["apiKey"].setErrors({})
        this.userForm.controls["apiKey"].errors["apiKey_invalid"] = true;
      } else {
        this.loginService.updateUserInLocalStorage(this.user);
        this.snotifyService.success("User information has been successfully update.");
      }

    }).catch((error: any) => {
      this.userForm.controls["apiKey"].setErrors({})
      this.userForm.controls["apiKey"].errors["apiKey_invalid"] = true;
    });

  }
}

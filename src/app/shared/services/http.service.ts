import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, of } from "rxjs";
import { CacheService } from "./cache.service";
import { LoginService } from "./login.service";

@Injectable()
export class HttpService {

    constructor(protected httpClient: HttpClient,
        private loginService: LoginService,
        private cacheService: CacheService) {
    }

    public get(path: string, cache: boolean = true): Promise<any> {
        if (this.cacheService.get(path)) {
            return Promise.resolve<any>(this.cacheService.get(path));
        } else {

            this.loginService.updateUserWeatherApiServerCallNumber();

            return this.httpClient.get(path).toPromise().then((response: any) => {
                if (cache) {
                    this.cacheService.set(path, response);
                }

                return response;
            });
        }
    }

    public delete(path: string): Observable<any> {
        return this.httpClient.delete(path);
    }

    public put(path: string, object: Object): Observable<any> {
        return this.httpClient.put(path, object);
    }

    public post(path: string, object: Object): Observable<any> {
        return this.httpClient.post(path, object);
    }
}
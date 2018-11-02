import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";

@Injectable()
export class CacheService {

    public constructor(private loginService: LoginService) {

    }
    private cache: Map<string, CacheContent> = new Map<string, CacheContent>();
    readonly DEFAULT_MAX_AGE: number = 300000;

    public get(key: string): any {
        key = key.toLowerCase();
        if (this.hasValidCachedValue(key)) {
            return this.cache.get(key).value;
        }
    }
    set(key: string, value: any, maxAge: number = this.DEFAULT_MAX_AGE): void {
        key = key.toLowerCase();
        //keep only top 5
        this.keepTopResults();
        if (this.loginService.loggedInUser && this.loginService.loggedInUser.cacheExpiryDateTime) {
            let expirationDateTimeSettings = new Date(this.loginService.loggedInUser.cacheExpiryDateTime);
            this.cache.set(key, { value: value, expiry:expirationDateTimeSettings.setMilliseconds(0)});
        } else{

            this.cache.set(key, { value: value, expiry: Date.now() + maxAge });
        }

    }

    private keepTopResults(): void {
        if (this.cache.size >= 5) {
            this.cache.delete(this.cache[0].key);
        }
    }

    /**
   * Checks if the key exists and   has not expired.
   */
    private hasValidCachedValue(key: string): boolean {
        if (this.cache.has(key)) {
            if (this.cache.get(key).expiry < Date.now()) {
                this.cache.delete(key);
                return false;
            }
            return true;
        } else {
            return false;
        }
    }

    public clearAll(): any {
        this.cache.clear();
    }
}

interface CacheContent {
    expiry: number;
    value: any;
}

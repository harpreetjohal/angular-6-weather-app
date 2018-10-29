import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

//Communication Service so components of sub-modules can change the blue bar on top
@Injectable()
export class TopBarService {

    private app = new Subject<boolean>();

    setTopBarVisible$ = this.app.asObservable();

    setTopBarVisibleIcon(value: boolean) {
        this.app.next(value);
    }
}
import {OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';

export abstract class BaseComponent implements OnDestroy {
    protected ngUnsubscribe: Subject<boolean> = new Subject<boolean>();

    ngOnDestroy(): void {
        this.ngUnsubscribe.next(true);
        this.ngUnsubscribe.complete();
    }

}

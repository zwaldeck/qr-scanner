import {BaseComponent} from '../../base.component';
import {Router, RoutesRecognized} from '@angular/router';
import {OnInit} from '@angular/core';
import {filter, pairwise} from 'rxjs/operators';

export class AbstractHistoryAwareComponent extends BaseComponent implements OnInit {

    protected prevUrl: string;

    constructor(protected router: Router) {
        super();
    }

    ngOnInit(): void {
        this.router.events
            .pipe(
                filter((e: any) => e instanceof RoutesRecognized),
                pairwise()
            ).subscribe((e: any) => {
            if (e.length === 0) {
                this.prevUrl = '/tabs/scanner';
            } else {
                this.prevUrl = e[0].urlAfterRedirects;
            }
        });
    }

    goBack() {
        this.router.navigateByUrl(this.prevUrl);
    }
}

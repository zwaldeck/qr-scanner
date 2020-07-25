import {Component} from '@angular/core';
import {AbstractHistoryAwareComponent} from '../shared/components/abstract-history-aware-component';
import {Router} from '@angular/router';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
})
export class AboutComponent extends AbstractHistoryAwareComponent {

    constructor(router: Router) {
        super(router);
    }


}

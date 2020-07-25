import {Directive, HostListener} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[click-stop-propagation]'
})
export class ClickStopPropagationDirective {

  @HostListener('click', ['$event'])
  public onClick(event: any): void
  {
    event.stopPropagation();
  }

}

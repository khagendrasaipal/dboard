import { Component } from '@angular/core';

import { navItems } from './_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent {

  public navItems = navItems;

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor() {}

  toggle(e: any){
    var element: HTMLElement = e.target.parentElement.parentElement.parentElement;
    var elementt: HTMLElement = e.target.parentElement.parentElement;
    var ele: HTMLElement = e.target.parentElement.parentElement.parentElement.parentElement;
    // console.log(element);
    element.classList.add('show');
    elementt.classList.add('show');
    ele.classList.add('show');
  }
}

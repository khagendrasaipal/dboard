import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from '../../../login/login.service';
import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)
  orgs:any;
  mainorgid:any;
  // @Input() mainorgid:any;
  
  

  constructor(private classToggler: ClassToggleService,private loginService: LoginService, private router: Router) {
    super();
    this.mainorgid=this.getorginfo();
  }
  logout() {
    this.loginService.removeUserData();
    this.router.navigate(['/login']);
}
ngOnInit(): void {
  this.getorginfo();
  // this.orgs=this.loginService.getuserinfo();
  // console.log(this.orgs);
  
}
getorginfo(){
this.loginService.getuserinfo().subscribe({
  next: (result:any) => {
    console.log(result);
       this.orgs = result.data[0].orgname; 
       this.mainorgid = result.data[0].orgid; 
   },
   error : err => {
     console.log("error");
   }
   
 }
 );
}
}


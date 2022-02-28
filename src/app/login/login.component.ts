import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  formLayout: any;

  constructor(private ls: LoginService, private router:Router, private toastr: ToastrService, private fb: FormBuilder) {
    
    this.formLayout = {
      username: ['', Validators.required],
      password: ['', Validators.required],
      // utype: ['0', Validators.required]
    };
    
    this.loginForm = fb.group(this.formLayout);
  }

  ngOnInit(): void {

  }

  submitForm(){
    // alert("hello");
    if(this.loginForm.valid){
      this.ls.login(this.loginForm.value).subscribe({
      next: (result:any) => {
        // alert("hi");
        this.ls.storeUserData(result.data);
        this.router.navigate(['/dashboard']);
         
       },
       error : err => {
         alert("Invalid Username or Password");
        //  this.toastr.error(err.error, 'Error');
        this.toastr.error('Invalid Username or Password', 'Login Error!', {
          timeOut: 5000,
        }); 
       }
       
     }
     );
    }




    // if(this.loginForm.valid){
    //   this.ls.login(this.loginForm.value).subscribe((data: { data: any; })=>{
    //     this.ls.storeUserData(data.data);
    //     this.router.navigate(['/dashboard']);
    //   },(err: any)=>{
    //     console.log(err);

    //     // this.loginForm = this.fb.group(this.formLayout);

    //     this.toastr.error('Invalid Username or Password', 'Login Error!', {
    //       timeOut: 5000,
    //     }); 
    //   });
    // }  
  }
}

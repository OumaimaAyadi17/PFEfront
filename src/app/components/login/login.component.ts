import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
 
  constructor(private formBuilder: FormBuilder,private route:Router, private apidata:LoginService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],


  });
  }
  onSubmit() {
    this.submitted = true;
console.log(this.loginForm.value)
    
    this.apidata.login(this.loginForm.value).subscribe((res:any)=>{
     
      console.log('reponse',res)
      if(res.user.valide==true){
     
        localStorage.setItem('userconnect',JSON.stringify(res.user))
        localStorage.setItem('token',res.access_token)
        localStorage.setItem("state","0")
       window.location.href="http://localhost:4200/home"
      

      } else{
        console.log("non valide")
        Swal.fire({
          icon:'error',
          title:'Failure ',
          text:'your account is not valid',
          footer:' Contact Administration'
        })
      }

      
    }, err=>{
      Swal.fire({
        icon:'error',
        title:'Failure ',
        text:'You can not sign in',
        footer:'Try again or contact administration'
      })
      
      console.log(err)
     
  
 }
 
  
    )
    
  }



}

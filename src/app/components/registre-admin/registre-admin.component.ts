import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registre-admin',
  templateUrl: './registre-admin.component.html',
  styleUrls: ['./registre-admin.component.css']
})
export class RegistreAdminComponent implements OnInit {
  RegisterForm: FormGroup;
  fileToUpload: Array<File>=[];
  submitted = false;
  constructor(private formBuilder: FormBuilder,private route:Router, private api:AdminService) { }

  ngOnInit(): void {
    this.RegisterForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
  
  

  });
  }

  handleFileInput(files:any){
    this.fileToUpload=<Array<File>>files.target.files;
    console.log(this.fileToUpload);
    
      }

      onSubmit() {
        this.submitted = true;
        let formdata=new FormData();
        formdata.append("username",this.RegisterForm.value.username);
        formdata.append("password",this.RegisterForm.value.password);
        formdata.append("firstName",this.RegisterForm.value.firstName);
        formdata.append("lastName",this.RegisterForm.value.lastName);
        formdata.append("file",this.fileToUpload[0]);
      
      
    this.api.registerAdmin(formdata).subscribe((res:any)=>{
      console.log('reponse',res)
      Swal.fire(
        'user added !',
        'success'
      )
      this.route.navigateByUrl('')
    }
    )}



}

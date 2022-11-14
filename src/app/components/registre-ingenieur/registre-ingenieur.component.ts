import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IngenieurService } from 'src/app/services/ingenieur.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registre-ingenieur',
  templateUrl: './registre-ingenieur.component.html',
  styleUrls: ['./registre-ingenieur.component.css']
})
export class RegistreIngenieurComponent implements OnInit {
  RegisterForm: FormGroup;
  fileToUpload: Array<File>=[];
  submitted = false;
  constructor(private formBuilder: FormBuilder,private route:Router, private api:IngenieurService) { }

  ngOnInit(): void {
    this.RegisterForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(8)
        ]
      ],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
  

  });
  }
  get f(){
    return this.RegisterForm.controls;
  }
  handleFileInput(files:any){
    this.fileToUpload=<Array<File>>files.target.files;
    console.log(this.fileToUpload);
    
      }
  onSubmit() {
    this.submitted = true;
    if (this.RegisterForm.invalid) {
      return;
    }
    let formdata=new FormData();
    formdata.append("username",this.RegisterForm.value.username);
    formdata.append("password",this.RegisterForm.value.password);
    formdata.append("firstName",this.RegisterForm.value.firstName);
    formdata.append("lastName",this.RegisterForm.value.lastName);
    formdata.append("email",this.RegisterForm.value.email);
    formdata.append("telephone",this.RegisterForm.value.telephone);
    formdata.append("file",this.fileToUpload[0]);
  
  
this.api.registerIngenieur(formdata).subscribe((res:any)=>{
  console.log('reponse',res)
  // Swal.fire(
  //   'success account created !',
  //   'wait an email from admin to validate your account'
  // )
  Swal.fire({
    title: '<strong>Your<u> account is created</u></strong>',
    icon: 'info',
    html:
      'An email will be sent to you from<b> administration</b>, ' +
      '<a>when your account will be validated </a> ',
    showCloseButton: true,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText:
      '<i class="fa fa-thumbs-up"></i> Ok!',
    confirmButtonAriaLabel: 'Thumbs up, great!'
    
  })
  this.route.navigateByUrl('')
}
)}
}

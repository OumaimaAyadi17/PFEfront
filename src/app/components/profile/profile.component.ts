import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompetenceService } from 'src/app/services/competence.service';
import { IngenieurService } from 'src/app/services/ingenieur.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userconnect=JSON.parse(localStorage.getItem("userconnect")!);
  AddForm: FormGroup;
  updateProfileForm: FormGroup;
  updatePasswordForm: FormGroup;
  competence:any
  ingenieur: any;
  fileToUpload: Array<File>=[];
  constructor(private formBuilder: FormBuilder,private route:Router, private api:CompetenceService,private apiIng:IngenieurService) { }

  ngOnInit(): void {
    this.getIng()
    this.getCompetence()
    this.AddForm = this.formBuilder.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
    
  });

  this.updateProfileForm = this.formBuilder.group({
    id: ['', Validators.required],
    email: ['', Validators.required],
    telephone: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    image: ['', Validators.required],
  
    });
    this.updatePasswordForm = this.formBuilder.group({
      newpassword: ['', Validators.required],
    });
  }


  getCompetence(){
    this.api.getallcompetences().subscribe((res:any)=>{
    this.competence=res.filter((el:any)=>el.ingenieur.id==this.userconnect.id)
      console.log("competences",this.competence)
    })
  }

  createCompetence(){
    this.api.createCompetence(this.AddForm.value,this.userconnect.id).subscribe(res=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title:  'Your Skill has been added.',
        showConfirmButton: false,
        timer: 1500
      })
     this.getCompetence()
     })
  }


  updateProfile(){
  this.apiIng.updateingenieur(this.userconnect.id,this.updateProfileForm.value).subscribe((res:any)=>{
  console.log(res)
  this.ingenieur=res
  localStorage.setItem("userconnect",JSON.stringify(res))
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title:  'Your profile has been updated.',
    showConfirmButton: false,
    timer: 1500
  })
  window.location.href="http://localhost:4200/home/profileIng"
    })
  }

getIng(){
  this.apiIng.getingenieur(this.userconnect.id).subscribe((res:any)=>{
    this.ingenieur=res
      console.log("ingenieur ",this.ingenieur)
      this.updateProfileForm.patchValue({
        email: this.ingenieur.email,
        telephone:this.ingenieur.telephone,
        firstName:this.ingenieur.firstName,
        lastName:this.ingenieur.lastName
      })
    })
}

  handleFileInput(files:any){
  this.fileToUpload=<Array<File>>files.target.files;
  console.log(this.fileToUpload);
  }

  modifierImage(){
    let formdata=new FormData();
    formdata.append("file",this.fileToUpload[0]);
    this.apiIng.modifierImage(formdata,this.userconnect.id).subscribe((res:any)=>{
      this.ingenieur=res
      localStorage.setItem("userconnect",JSON.stringify(res))
      window.location.href="http://localhost:4200/home/profileIng"
        console.log("ingenieur ",this.ingenieur)
      }) 
  }


  modifierpassword(){
    this.apiIng.modifierPassword(this.updatePasswordForm.value.newpassword,this.userconnect.id).subscribe((res:any)=>{
      console.log(res)
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title:  'Your password has been updated.',
        showConfirmButton: false,
        timer: 1500
      })
    })
    this.updatePasswordForm.reset()
  }

  changeToIndispo(){
    this.apiIng.changeToIndispo(this.userconnect.id).subscribe((res:any)=>{
      console.log(res)
      this.ingenieur=res
      localStorage.setItem("userconnect",JSON.stringify(res))
      this.getIng()
      
    })
  }

  changeTodispo(){
    this.apiIng.changeToDispo(this.userconnect.id).subscribe((res:any)=>{
      console.log(res)
      this.ingenieur=res
      localStorage.setItem("userconnect",JSON.stringify(res))
      this.getIng()
    })
  }


}

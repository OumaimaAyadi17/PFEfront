import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FicheService } from 'src/app/services/fiche.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-intervention',
  templateUrl: './add-intervention.component.html',
  styleUrls: ['./add-intervention.component.css']
})
export class AddInterventionComponent implements OnInit {
 
  ficheForm:FormGroup;
  idtache= this.activeRoute.snapshot.params['id'];

  constructor(private route:Router,private api:FicheService,private activeRoute: ActivatedRoute,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.ficheForm = this.formBuilder.group({
      debut : ['', Validators.required],
      fin: ['', Validators.required],
      description: ['', Validators.required],


  });
  }

  //Create fiche 
  addfiche(){
    console.log("formulaire fiche",this.ficheForm.value)
    this.api.createfiche(this.ficheForm.value,this.idtache).subscribe(res=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your file has been added.',
        showConfirmButton: false,
        timer: 1500
      })
     })
     window.location.href="http://localhost:4200/home/tasks"
   }



}

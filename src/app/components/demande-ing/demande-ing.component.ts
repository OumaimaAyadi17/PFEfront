import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IngenieurService } from 'src/app/services/ingenieur.service';
import { TacheService } from 'src/app/services/tache.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-demande-ing',
  templateUrl: './demande-ing.component.html',
  styleUrls: ['./demande-ing.component.css']
})
export class DemandeIngComponent implements OnInit {
  Encours: any;
  AffectationForm: FormGroup;
  listingenieurs:any
  idtache:any
  totaltaskesEncours:any
  constructor(private api:TacheService,private formBuilder: FormBuilder,private route:Router,private apiIng:IngenieurService) { }

  ngOnInit(): void {
    this.getallingenieurs()
    this.getTaskesEncours()
    this.AffectationForm = this.formBuilder.group({
      id: ['', Validators.required],
      ING_ID: ['', Validators.required]
    });
  }

  getTaskesEncours(){
    this.api.getalltasks().subscribe((res:any)=>{
      this.Encours=res.filter((el:any)=> el.confirmationAdmin!==null &&( el.confirmationAdmin=="En cours" || el.confirmationAdmin=="Non confirmé" )
      )
      this.totaltaskesEncours=this.Encours.length
      console.log("list of en cours tasks",this.Encours)
    })
  }

  accepterdemandeTacheIng(id:any){
    this.api.AccepterdemandeTacheIng(id).subscribe((res:any) =>{
      console.log("La demande d'ajout tache pour l'ing est acceptée",res);
      this.getTaskesEncours()
     })
  }
  
    refuserdemandeTacheIng(id:any){
      this.api.RefuserdemandeTacheIng(id).subscribe((res:any) =>{
        console.log("La demande d'ajout tache pour l'ing est refusée",res);
        this.getTaskesEncours()
       })
    }

    getallingenieurs(){
      this.apiIng.getallingenieurs().subscribe((res:any)=>{
        this.listingenieurs=res
        console.log("liste des ingenieurs",res)
      })
    }

    AffecterIng(){
      this.api.affecterIngForDemande(this.idtache,this.AffectationForm.value.ING_ID).subscribe(res=>{
        console.log(res,"ing affected")
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Engineer has been affected ',
          showConfirmButton: false,
          timer: 1500
        })
        this.getTaskesEncours()
       }) 
    }

    open(id:any){
      this.idtache=id
    }


}

import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DemandeClotureService } from 'src/app/services/demande-cloture.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-demande-cloture',
  templateUrl: './demande-cloture.component.html',
  styleUrls: ['./demande-cloture.component.css']
})
export class DemandeClotureComponent implements OnInit {
  listDemandeCloure: any;
  totalcloture:any
  userconnect=JSON.parse(localStorage.getItem("userconnect")!);
  listDemandeCloureClient: any;
  totalclotureByClient: any;
  constructor(private api: DemandeClotureService,private formBuilder: FormBuilder,private route:Router) { }

  ngOnInit(): void {
    this.getallDemandesCloture()
    this.getallDemandesClotureByClient()
  }
 isAdmin(){
    return this.userconnect.role=="Admin"?true: false;
  }
  isIngnieur(){
    return this.userconnect.role=="Ingenieur"?true: false;
  }
  isClient(){
    return this.userconnect.role=="Client"?true: false;
  }
  
  getallDemandesClotureByClient(){
    this.api.getallDemandesCloture().subscribe((res:any)=>{
      this.listDemandeCloureClient= res.filter((el:any)=>el.tache.client1.id==this.userconnect.id && el.tache.ok==false)
      this.totalclotureByClient=this.listDemandeCloureClient.length;
      console.log("liste des Demandes Cloure ByClient",this.listDemandeCloureClient)
    })
  }
  getallDemandesCloture(){
    this.api.getallDemandesCloture().subscribe((res:any)=>{
      this.listDemandeCloure=res.filter((el:any)=>el.tache.ok==false)
      this.totalcloture=this.listDemandeCloure.length;
      console.log("liste des Demandes Cloure",this.listDemandeCloure)
    })
  }

  accepterDemandeCloture(Iddemande:any,idtache:any){
    this.api.accepterDemande(Iddemande,idtache).subscribe((res:any)=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'The task has been closed.',
        showConfirmButton: false,
        timer: 1500
      })
      this.getallDemandesCloture()
      this.getallDemandesClotureByClient()
      console.log("Demande de Cloture est acceptée",res)
    })
  }


}

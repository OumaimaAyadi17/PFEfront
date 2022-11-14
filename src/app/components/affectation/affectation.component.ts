import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { IngenieurService } from 'src/app/services/ingenieur.service';
import { TacheService } from 'src/app/services/tache.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-affectation',
  templateUrl: './affectation.component.html',
  styleUrls: ['./affectation.component.css']
})
export class AffectationComponent implements OnInit {
  idtache:any;
  listtasks: any;
  demandesList: any;
  listClients: any;
  listingenieurs: any;
  AffectationForm: FormGroup;
  totaldemandes: any;

  constructor(private api: TacheService,private apiIng: IngenieurService,private formBuilder: FormBuilder,private route:Router) { }

  ngOnInit(): void {

    this.getallingenieurs()
    this.getDemandesClient()

    this.AffectationForm = this.formBuilder.group({
      id: ['', Validators.required],
      ING_ID: ['', Validators.required]
    });

  }


  getalltasks(){
    this.api.getalltasks().subscribe((res:any)=>{
      this.listtasks=res
      console.log("liste des tasks",res)
    })
  }

  getDemandesClient(){
    this.api.getalltasks().subscribe((res:any)=>{
      this.demandesList=res.filter((el:any)=>el.ing==null)
      this.totaldemandes=this.demandesList.length;
      console.log("liste des demandes clients",res)
    })
  }


  getallingenieurs(){
    this.apiIng.getallingenieurs().subscribe((res:any)=>{
      this.listingenieurs=res
      console.log("liste des ingenieurs",res)
    })
  }


  AffecterIng(){
    console.log("id de tache",this.idtache)
    this.api.affecterIng(this.idtache,this.AffectationForm.value.ING_ID).subscribe(res=>{
      console.log(res,"ing affected")
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Engineer has been assigned ',
        showConfirmButton: false,
        timer: 1500
      })
      this.getDemandesClient()
     })
     this.AffectationForm.reset()
  }

// Recup id task
  open(idtache:any){ 
    this.idtache=idtache
    console.log("id de tache",this.idtache)
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReclamationService } from 'src/app/services/reclamation.service';
import { TacheService } from 'src/app/services/tache.service';
import { FicheService } from 'src/app/services/fiche.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReponseReclamationService } from 'src/app/services/reponse-reclamation.service';
import { NotificationService } from 'src/app/services/notification.service';
import { AlerteService } from 'src/app/services/alerte.service';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent implements OnInit {
  userconnect=JSON.parse(localStorage.getItem("userconnect")!)
  id= this.activeRoute.snapshot.params['id'];
  tache:any;
  listfiches: any;
  listReclamations: any;
  creationDate: number;
  date=new Date().toISOString().split('T')[0].toString()
  ReclamationForm: FormGroup;
  ReponseForm:FormGroup;
  Reponse: any;
  idReclamation:any;
  constructor(private activeRoute: ActivatedRoute,private api: TacheService,private alerteService: AlerteService,private NotificationService: NotificationService,private ficheService: FicheService,private apiReponse: ReponseReclamationService,
    private apiReclamation: ReclamationService,private formBuilder: FormBuilder,private route:Router) { }


  ngOnInit(): void {
    this.getAllReclamations()
    this.getTache()
    this.getallfichesByTache(this.id)
    // this.getallReponseReclamations()

    this.ReclamationForm = this.formBuilder.group({
      id: ['', Validators.required],
      description: ['', Validators.required],
      creationDate:['', Validators.required],
    });
    this.ReponseForm = this.formBuilder.group({
      idReclamation: ['', Validators.required],
      description: ['', Validators.required],
      creationDate:['', Validators.required],
    });
  }
 // Get oneTask
  getTache(){
    this.api.getOneTache(this.id).subscribe((res:any)=>{
      this.tache=res
    console.log("detail tache", this.tache)
    })
  }
// Get list files by id task
  getallfichesByTache(id:any) {
    this.ficheService.getallfiches().subscribe((res:any)=>{
      this.listfiches=res.filter((el:any)=>el.tache.id==id )
      console.log("liste des fiches", this.listfiches)
    })
  }

// Get list reclamation by id task
  getAllReclamations(){
    this.apiReclamation.getallReclamations().subscribe((res:any)=>{
      this.listReclamations=res.filter((el:any)=>el.tacheClient.id==this.id)
      console.log("liste des reclamations", this.listReclamations)
    })
  }

  //Get reponse selon id reclamation
  getReponseReclamations(idReclamation:any){
    this.apiReponse.getallReponseReclamations().subscribe((res:any)=>{
      this.Reponse=res.filter((el:any)=>el.reclamation.id==idReclamation)
      console.log("liste des reponses reclamations", this.Reponse)
    })
  }

// add reclamation et notifier admin
  AddReclamation(){
    this.ReclamationForm.patchValue({
      creationDate:this.date
    })
       this.apiReclamation.addReclamation(this.ReclamationForm.value,this.id).subscribe((res:any)=>{ 
        this.getAllReclamations()
        this.NotificationService.addNotification(res.id).subscribe(res1=>{
        console.log(res1)
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your Reclamation has been added.',
            showConfirmButton: false,
            timer: 1500
          })
        })
     })
     this.ReclamationForm.reset()
  }

  // récupérer id reclamation et patchValue in ReponseForm
  open(reclamation:any){
   console.log(reclamation.id)
   this.ReponseForm.patchValue({
    idReclamation:reclamation.id
   })
  }

// Add reponse reclamation
  AddReponseReclamation(){
    this.ReponseForm.patchValue({
      creationDate:this.date,
     })
     this.apiReponse.addReponseReclamation(this.ReponseForm.value,this.ReponseForm.value.idReclamation).subscribe((res:any)=>{
     this.getReponseReclamations(this.idReclamation)
     this.alerteService.addAlerte(res.id).subscribe((res1:any)=>{
      console.log("votre alerte est",res1)
     })
     Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your answer has been added.',
      showConfirmButton: false,
      timer: 1500
     })
   })
  this.ReponseForm.reset()   
  }

  // onReset(): void {
  //   this.submitted = false;
  //   this.form.reset();
  // }
 
  isAdmin(){
    return this.userconnect.role=="Admin"?true: false;
  }
  isIngnieur(){
    return this.userconnect.role=="Ingenieur"?true: false;
  }
  isClient(){
    return this.userconnect.role=="Client"?true: false;
  }

}

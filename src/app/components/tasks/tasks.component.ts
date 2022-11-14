import { animate } from '@angular/animations';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { fakeAsync } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { DemandeClotureService } from 'src/app/services/demande-cloture.service';
import { FicheService } from 'src/app/services/fiche.service';
import { TacheService } from 'src/app/services/tache.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  listfiches:any;
  ok = false;
  verifEtat= false;
  totalInprogress:any;
 
  date=new Date().toISOString().split('T')[0].toString()
  totaltodo:any;
  totalreview:any;
  totaldone:any;
  tacheForm: FormGroup;
  updateTacheForm: FormGroup; 
  userconnect=JSON.parse(localStorage.getItem("userconnect")!);
  todo: any ;
  inprogress: any ;
  done: any;
  review: any;
  listClients:any;
  creationDate: number;
  attente: any;
  totalattente: any;
  constructor(private apiCloture: DemandeClotureService,private api: TacheService,private clientService: ClientService,private ficheService:FicheService,private formBuilder: FormBuilder,private route:Router) { }

  ngOnInit(): void {
    this.getTaskesEnAttente()
    this.getallclients()
    this.getTaskesInprogress()
    this.getTaskesdone()
    this.getTaskesTodo()
    this.getTaskesReview()
    
   
    

this.tacheForm = this.formBuilder.group({
  CLIENT_ID: ['', Validators.required],
  description: ['', Validators.required],
  nom: ['', Validators.required],
  priority: ['', Validators.required],
  start:['', Validators.required],
 end:['', Validators.required],
  
  creationDate:['', Validators.required],


});

this.updateTacheForm = this.formBuilder.group({
  id: ['', Validators.required],
  CLIENT_ID: ['', Validators.required],
  description: ['', Validators.required],
  nom: ['', Validators.required],
  priority: ['', Validators.required],
  start:['', Validators.required],
  end:['', Validators.required],
  
});
    
}

  getTaskesTodo(){
    this.api.getalltasks().subscribe((res:any)=>{
      this.todo=res.filter((el:any)=>el.ing!==null && el.status=="todo" && el.ing.id==this.userconnect.id )
      console.log("list of todo tasks",this.todo)
      this.totaltodo=this.todo.length;
    console.log("nombre de task todo", this.totaltodo)
    })
  
  }
  getTaskesEnAttente(){
    this.api.getalltasks().subscribe((res:any)=>{
      this.attente=res.filter((el:any)=>el.ing!==null && el.ing.id==this.userconnect.id && el.confirmationAdmin=="En cours" )
      console.log("list of todo tasks",this.attente)
      this.totalattente=this.attente.length;
    console.log("nombre de task En attente", this.totalattente)
    })
   
  }
  getTaskesReview(){
    this.api.getalltasks().subscribe((res:any)=>{
      this.review=res.filter((el:any)=>el.status=="review" && el.ing.id==this.userconnect.id)
      console.log("list of review tasks",this.review)
      this.totalreview=this.review.length;
    console.log("nombre de task review", this.totalreview)
    })
  
  }

getTaskesdone(){
  this.api.getalltasks().subscribe((res:any)=>{
    this.done=res.filter((el:any)=>el.status=="done" && el.ing.id==this.userconnect.id)
    console.log("list of done tasks",this.done)
    this.totaldone=this.done.length;
    console.log("nombre de task done", this.totaldone)
  })

}
getTaskesInprogress(){
  this.api.getalltasks().subscribe((res:any)=>{
    this.inprogress=res.filter((el:any)=>el.status=="inprogress" && el.ing.id==this.userconnect.id)
    console.log("list of inprogress tasks",this.inprogress)
    this.totalInprogress=this.inprogress.length;
    console.log("nombre de task inprogress", this.totalInprogress)
  })

}

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
     
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    console.log("test1",event.previousIndex)
    console.log( "test2",event.currentIndex)
    console.log( "test3",event.container.data)
    this.getTaskesTodo()
    this.getTaskesInprogress()
    this.getTaskesReview()
    this.getTaskesdone()
   
  }

  validerEtatInprogress(id:any){
    console.log(id);
    this.api.ValidateEtatInProgress(id).subscribe((res:any) =>{
      console.log(res); 
      this.verifEtat=true;
    } )
   
    
  }

  validerEtatReview(id:any){
    this.api.ValidateEtatReview(id).subscribe((res:any) =>{
      console.log(res);
    }  )
  }


  validerEtatDone(id:any){
    this.api.ValidateEtatDone(id).subscribe((res:any) =>{
      console.log(res);
     } )
  }

  getallclients(){
    this.clientService.getallclients().subscribe((res:any)=>{
      this.listClients=res
      console.log("liste des clients",this.listClients)
    })
  }

 addTache(){
   this.tacheForm.patchValue({
 creationDate:this.date
   })
  this.api.addTache(this.userconnect.id,this.tacheForm.value.CLIENT_ID,this.tacheForm.value).subscribe(res=>{

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your task has been added.',
      showConfirmButton: false,
      timer: 1500
    })
   this.getTaskesEnAttente()
   })
   this.tacheForm.reset()
 }

 delete(id:any){
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) 
    {
      this.api.deleteTache(id).subscribe((res:any)=>{
        this.getTaskesEnAttente()
        this.getTaskesInprogress()
        this.getTaskesReview()
        this.getTaskesTodo()
        this.getTaskesdone()

      console.log(res)

      
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    })
    }
  })
}

updateTache(){
  this.api.updateTache(this.updateTacheForm.value.id,this.userconnect.id,this.updateTacheForm.value.CLIENT_ID,this.updateTacheForm.value).subscribe(res=>{
    console.log(res,"update task")
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your task has been updated.',
      showConfirmButton: false,
      timer: 1500
    })
   
    this.getTaskesInprogress()
    this.getTaskesReview()
    this.getTaskesTodo()
    this.getTaskesdone()
this.getTaskesEnAttente()
   })
   
}

open(t:any){
  this.updateTacheForm.patchValue({
   nom: t.nom,
   description: t.description,
   id: t.id,
   CLIENT_ID: t.client1.id,
   start: t.start,
   end:t.end,
   priority: t.priority

  }

  )

}

getallfichesIng(id:any) {
  this.ficheService.getallfiches().subscribe((res:any)=>{
    this.listfiches=res.filter((el:any)=>el.tache.id == id)
    
    console.log("liste des fiche ayant tache id  ",res)
    console.log(this.listfiches)
    if (this.listfiches.length==0){
      this.ok = true
    }
    console.log(this.ok)
  })
}



addDemandeCaloture(id:any){
 
 this.apiCloture.createDemandeCloture(id).subscribe(res=>{
console.log(res)
   Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Your Request has been added.',
    showConfirmButton: false,
    timer: 1500
  })
 
  })
window.location.href="http://localhost:4200/home/tasks"
}

valider(tache:any){
return tache.status=="todo"?true:false
this.getTaskesTodo()
window.location.href="http://localhost:4200/home/tasks"
}

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TacheService } from 'src/app/services/tache.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-demande-task-client',
  templateUrl: './demande-task-client.component.html',
  styleUrls: ['./demande-task-client.component.css']
})
export class DemandeTaskClientComponent implements OnInit {
  done: any;
  date1:any;
  date2:any;
  date=new Date().toISOString().split('T')[0].toString()
  review: any;
  todo: any;
  inprogress: any;
  demandeForm: FormGroup; 
  userconnect=JSON.parse(localStorage.getItem("userconnect")!);
  attente: any;
  totalattente: any;
  totaltodo: any;
  totaldone: any;
  totalinprogress: any;
  
  constructor(private api: TacheService,private formBuilder: FormBuilder,private route:Router) { }

  ngOnInit(): void {
    this.getTaskesEnattente()
    this.getTaskesTodo()
    this.getTaskesdone()
    this.getTaskesInprogress()
    this.demandeForm = this.formBuilder.group({
      description: ['', Validators.required],
      nom: ['', Validators.required],
      priority: ['', Validators.required],
      start:['', Validators.required],
      end:['', Validators.required],
      creationDate:['', Validators.required],
    });
  }
  
  // add demande  
  addDemande(){
    this.demandeForm.patchValue({
      creationDate:this.date
        })
    this.api.addDemande(this.demandeForm.value,this.userconnect.id).subscribe(res=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your request has been added ',
        showConfirmButton: false,
        timer: 1500
      })
     this.getTaskesEnattente()
     })
     this.demandeForm.reset()
   }
   // Liste des tache en attente d'affectation ing par admin 
  getTaskesEnattente(){
  this.api.getalltasks().subscribe((res:any)=>{
    this.attente=res.filter((el:any)=> el.ing==null && el.client1.id==this.userconnect.id)
    console.log("list of en attente tasks",this.attente)
    this.totalattente=this.attente.length;
  })
  }
// Liste des tache Todo  par ing apres affectationd'ing 
   getTaskesTodo(){
    this.api.getalltasks().subscribe((res:any)=>{
      this.todo=res.filter((el:any)=> el.status== "todo" && el.client1.id==this.userconnect.id  &&  el.ing!=null)
      console.log("list of todo tasks",this.todo)
      this.totaltodo=this.todo.length;
  })
  }
  // Liste des tache cloture   
  getTaskesdone(){
  this.api.getalltasks().subscribe((res:any)=>{
    this.done=res.filter((el:any)=>el.status=="done" && el.client1.id==this.userconnect.id)
    console.log("list of done tasks",this.done)
    this.totaldone=this.done.length;
  })
  }
  // Liste des tache inprogress   
getTaskesInprogress(){
  this.api.getalltasks().subscribe((res:any)=>{
    this.inprogress=res.filter((el:any)=>el.status=="inprogress" && el.client1.id==this.userconnect.id)
    console.log("list of inprogress tasks",this.inprogress)
    this.totalinprogress=this.inprogress.length;
  })

}

// sendMail(){
//   console.log("start")
//   console.log("todo list",this.todo)
//   for (let i=0;i<this.todo.length;i++){
//     this.api.sendmail(this.todo[i].id).subscribe((res:any)=>{
//       console.log("mail send",res)
//     })
//   }
 
// }
}

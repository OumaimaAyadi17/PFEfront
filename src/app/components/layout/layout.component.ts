import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { FicheService } from 'src/app/services/fiche.service';
import { IngenieurService } from 'src/app/services/ingenieur.service';
import { TacheService } from 'src/app/services/tache.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  totaltodo: any;
 todo:any;
 totaldone:any;
 done:any;
 inprogress:any;
 totalinprogress:any;
  listing: any;
  userconnect=JSON.parse(localStorage.getItem("userconnect")!)
  listclients: any;
  listfiches: any;
  p: number = 1;
  listingenieurs:any
  listTaskbyClient: any;
  listTaskbyIng: any;
  totaling: any;
  totalclient: any;
  totalfiches: any;
  tasks: any;
  totaltaks: any;

 
  constructor(private api: TacheService,private apiIng:IngenieurService,private apiClient:ClientService,private apifiche:FicheService) { }

  ngOnInit(): void {
    this.getallfiches()
    this.getAllIng()
    this.getTaskesInprogress()
    this.getTaskesTodo()
    this.getTaskesdone()
    this.getallclients()
    this.getallfiches()
    this.getallingenieurs()
    
  }
  
  getTaskesTodo(){
    this.api.getalltasks().subscribe((res:any)=>{
      this.todo=res.filter((el:any)=>el.status=="todo" && el.ing!=null && el.confirmationAdmin=="confirmé")
      console.log("list of todo tasks",this.todo)
      this.totaltodo=this.todo.length;
    console.log("nombre de task todo", this.totaltodo)
    })
  
  }
  getTaskesTodobyIng(e:any){
    this.api.getalltasks().subscribe((res:any)=>{
      this.todo=res.filter((el:any)=>el.status=="todo" && el.ing!=null && el.ing.id==e.target.value)
      console.log("list of todo tasks",this.todo)
      this.totaltodo=this.todo.length;
    console.log("nombre de task todo", this.totaltodo)
    })
  
  }
  getTaskesInprogress(){
    this.api.getalltasks().subscribe((res:any)=>{
      this.inprogress=res.filter((el:any)=>el.status=="inprogress"  )
      console.log("list of inprogress tasks",this.inprogress)
      this.totalinprogress=this.inprogress.length;
    console.log("nombre de task inprogress", this.totalinprogress)
    })
  
  }
  getTaskesInprogresbyIng(e:any){
    console.log("fff",e.target.value )
    this.api.getalltasks().subscribe((res:any)=>{
      this.inprogress=res.filter((el:any)=>el.status=="inprogress"  && el.ing.id==e.target.value )
      console.log("list of inprogress tasks",this.inprogress)
      this.totalinprogress=this.inprogress.length;
    console.log("nombre de task inprogress", this.totalinprogress)
    })
  
  }

  getTaskesdone(){
    this.api.getalltasks().subscribe((res:any)=>{
      this.done=res.filter((el:any)=>el.status=="done" )
      console.log("list of done tasks",this.done)
      this.totaldone=this.done.length;
    console.log("nombre de task done", this.totaldone)
    })
  
  }
  
  getTaskesdonebyIng(e:any){
    this.api.getalltasks().subscribe((res:any)=>{
      this.done=res.filter((el:any)=>el.status=="done"  && el.ing.id==e.target.value )
      console.log("list of done tasks",this.done)
      this.totaldone=this.done.length;
    console.log("nombre de task done", this.totaldone)
    })
  
  }
  
  getAllIng(){
    this.apiIng.getallingenieurs().subscribe((res:any)=>{
      this.listing=res
      this.totaling=this.listing.length;
    console.log("liste ing", this.listing)
    })
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
  
  getallclients(){
    this.apiClient.getallclients().subscribe((res:any)=>{
      this.listclients=res
      this.totalclient=this.listclients.length;
      console.log("liste des clients",this.listclients)
    })
  }
  

  getallfiches() {
    this.apifiche.getallfiches().subscribe((res:any)=>{
      this.listfiches=res
      this.totalfiches=this.listfiches.length;
      console.log("liste des fiches",this.listfiches)
    })
  }
//list of engineer
  getallingenieurs(){
    this.apiIng.getallingenieurs().subscribe((res:any)=>{
      this.listingenieurs=res
      console.log("liste des ingenieurs",res)
    })
  }

// filter tab by client
  getTaskesByclient(e:any){
    console.log("target",e.target.value)
    this.apifiche.getallfiches().subscribe((res:any)=>{
      this.listfiches=res.filter((el:any)=>el.tache.client1.id==e.target.value)
      console.log("liste des task selon client",this.listTaskbyClient)
    })
  }
// filter tab by engineer 
  getTaskesByingenieur(e:any){
    console.log("target",e.target.value)
    this.apifiche.getallfiches().subscribe((res:any)=>{
      this.listfiches=res.filter((el:any)=>el.tache.ing.id==e.target.value)
      console.log("liste des task selon ing ",this.listTaskbyIng)
    })
  }
}

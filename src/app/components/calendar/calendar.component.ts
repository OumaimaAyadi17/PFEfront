import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular';
import { ClientService } from 'src/app/services/client.service';
import { IngenieurService } from 'src/app/services/ingenieur.service';
import { TacheService } from 'src/app/services/tache.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  date=new Date().toISOString().split('T')[0].toString()
  listClients:any;
  creationDate: number;
  tacheForm: FormGroup;
  Events: any[] = []; // list task by engineer
  listingenieurs: any;
  liste:any=[] //list of all tasks
  listetache:any
  ing:any
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'timeGridWeek',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    
  };
  
  constructor(private httpClient: HttpClient,private api:IngenieurService,private apitache: TacheService,private formBuilder: FormBuilder,private route:Router,private clientService: ClientService) { }
  
  getallclients(){
    this.clientService.getallclients().subscribe((res:any)=>{
      this.listClients=res
      console.log("liste des clients",this.listClients)
    })
  }
  getallingenieurs(){
    this.api.getallingenieurs().subscribe((res:any)=>{
      this.listingenieurs=res
      console.log("liste des ingenieurs",res)
    })
  }
  // getEventByIng(u:any){
  //   console.log(u.target.value)
  //   return this.httpClient
  //   .get('http://localhost:8082/users/taches/all')
  //   .subscribe((res: any) => {
  //    this.liste= res.filter((el:any)=> el.ing.id==u.target.value && el.status=="todo" )
  //    console.log("liste est ",this.liste)
  //   //  res= res.filter((el:any)=> el.ing.id==u.target.value)
  //     for(let i =0; i<this.liste.length;i++){
  //       this.Events.push(this.liste[i]);
  //       console.log("events ing",this.Events);
  //     }   
  //   });
  // }
  
// Methode ne marche pas
  getalltasks(u:any){
    console.log(u.target.value)
    this.apitache.getalltasks().subscribe((res:any)=>{
      this.listetache=res.filter((el:any)=> el.ing.id==u.target.value && el.status=="todo" )
      console.log("liste des tasks",this.listetache)
      for(let i =0; i<this.listetache.length;i++){
        this.Events.push(this.listetache[i]);
        console.log("eee",this.Events)    
      }
    })
  }
  // getEventByIng(u:any){
  //   console.log(u.target.value)
  //   setTimeout(() => {
  //   return this.httpClient
  //   .get('http://localhost:8082/users/taches/all')
  //   .subscribe((res: any) => {
  //    this.liste= res.filter((el:any)=> el.ing.id==u.target.value && el.status=="todo" )
  //    console.log("liste est ",this.liste)
  //   //  res= res.filter((el:any)=> el.ing.id==u.target.value)

  //   for(let i =0; i<this.liste.length;i++){
  //           this.Events.push(this.liste[i]);
  //           console.log("events ing filtree",this.Events);
          
      
  //   }
  //   });
  // }, 2200);
  // setTimeout(() => {
  //   this.calendarOptions = {
  //     initialView: 'dayGridMonth',
  //     dateClick: this.onDateClick.bind(this),
  //     events: this.Events,
  //   };
  // }, 2500);
  // }

  onDateClick(res: any) {
    alert('Clicked on date : ' + res.dateStr);
  }

  // Lisk task by engineer
  getallEvents(){
    setTimeout(() => {
      return this.httpClient
        .get('http://localhost:8082/users/taches/all')
        .subscribe((res: any) => {
         res= res.filter((el:any)=> el.status=="todo" && el.ing!=null && el.ing.username===this.ing)
          for(let i =0; i<res.length;i++){
            this.Events.push(res[i]);
          }
        //  this.Events=this.listetache
          console.log("events",this.Events);
          // console.log("events",this.Events[0].ing.id);
        });     
    }, 2200);
    setTimeout(() => {
      this.calendarOptions = {
        initialView: 'dayGridMonth',
       dateClick: this.onDateClick.bind(this),
        events: this.Events,
      };
    }, 2500);  
  }

  ngOnInit(): void {
    this.getallEvents1()
    this.getallclients()
    this.getallingenieurs()
    this.tacheForm = this.formBuilder.group({
      CLIENT_ID: ['', Validators.required],
      ING_ID: ['', Validators.required],
      description: ['', Validators.required],
      nom: ['', Validators.required],
      priority: ['', Validators.required],
      start:['', Validators.required],
      end:['', Validators.required],
      creationDate:['', Validators.required],
    });
  }

  // List of all tasks of all engineers
  getallEvents1(){
    console.log("iii",this.ing)
    setTimeout(() => {
      return this.httpClient
        .get('http://localhost:8082/users/taches/all')
        .subscribe((res: any) => {
         res= res.filter((el:any)=> el.status=="todo")
          for(let i =0; i<res.length;i++){
            this.liste.push(res[i]);
          }
          console.log("ll",this.liste)
        });
      }, 2200);
      setTimeout(() => {
        this.calendarOptions = {
          initialView: 'dayGridMonth',
         dateClick: this.onDateClick.bind(this),
          events: this.liste,
        };
      }, 2500); 
  }   

  //add task by admin
  addTache(){
    this.tacheForm.patchValue({
    creationDate:this.date
    })
   this.apitache.addTacheByAdmin(this.tacheForm.value.ING_ID,this.tacheForm.value.CLIENT_ID,this.tacheForm.value).subscribe(res=>{
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Task has been added.',
      showConfirmButton: false,
      timer: 1500
    })
    this.getallEvents1()
    window.location.reload()
    })
  }


}



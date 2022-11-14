import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.css']
})
export class ListClientsComponent implements OnInit {
  listclients:any
  term_search:any=""
  userconnect=JSON.parse(localStorage.getItem("userconnect")!)
  p: number = 1;

  constructor(private api: ClientService) { }

  ngOnInit(): void {
    this.getallclients()
  }
  
  //List of all clients
  getallclients(){
    this.api.getallclients().subscribe((res:any)=>{
      this.listclients=res
      console.log("liste des clients",this.listclients)
    })
  }

  //Delete Client
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
      this.api.deleteclient(id).subscribe((res:any)=>{
        this.getallclients()
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

  // Validate Account client
  validerClient(c:any){
  this.api.validerClient(c.id).subscribe((res:any)=>{
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'validated account',
      showConfirmButton: false,
      timer: 1500
    })
    this.getallclients()
    this.api.sendEmail(c.email).subscribe((res:any)=>{
      console.log("email sent",res)
    })
    console.log("validee",res)
  })
  }

  // Desactivate Account client
  desactiverClient(id:any){
  this.api.desactiverClient(id).subscribe((res:any)=>{
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Account Disabled',
      showConfirmButton: false,
      timer: 1500
    })
    this.getallclients()
    console.log("desactivee",res)
  })
  }

  //Filter Account client by valid account or invalid
  getValidecompteclients(e:any){
    this.api.getallclients().subscribe((res:any)=>{
      this.listclients=res.filter((el:any)=>el.enabled==e.target.value)
      console.log("liste des clients selon compte  valide ou non",this.listclients)
    })
  }

// Activate Account client
  activerClient(id:any){
  this.api.activerClient(id).subscribe((res:any)=>{
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Activated account',
      showConfirmButton: false,
      timer: 1500
    })
    this.getallclients()
    console.log("activee",res)
  })
  }

// List of Validate Account client
  getValide(){
    this.api.getallclients().subscribe((res:any)=>{
      this.listclients=res.filter((el:any)=> el.valide==1 && el.enabled==1)
      console.log("liste des ingenieurs Valide",this.listclients)
    })
  }

  // List of bloqued Account client
  getBloq(){
    this.api.getallclients().subscribe((res:any)=>{
      this.listclients=res.filter((el:any)=> el.valide==1 && el.enabled==0)
      console.log("liste des ingenieurs bloq",this.listclients)
    })
  }

// List of not Validat Account client
  getEnAttente(){
      this.api.getallclients().subscribe((res:any)=>{
        this.listclients=res.filter((el:any)=> el.valide==0 && el.enabled==1)
        console.log("liste des ingenieurs en attente",this.listclients)
      })
  }

 // Check account 'Admin'
  isAdmin(){
    return this.userconnect.role=="Admin"?true: false;
  }


}

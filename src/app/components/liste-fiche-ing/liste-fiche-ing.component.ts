import { Component, OnInit } from '@angular/core';
import { FicheService } from 'src/app/services/fiche.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-liste-fiche-ing',
  templateUrl: './liste-fiche-ing.component.html',
  styleUrls: ['./liste-fiche-ing.component.css']
})
export class ListeFicheIngComponent implements OnInit {
  listfiches: any;
  userconnect=JSON.parse(localStorage.getItem("userconnect")!);
  p: number = 1;
  constructor(private api:FicheService) { }

  ngOnInit(): void {
    this.getallfichesIng()
  }

  getallfichesIng() {
    this.api.getallfiches().subscribe((res:any)=>{
      this.listfiches=res.filter((el:any)=>el.tache.ing.id==this.userconnect.id)
      console.log("liste des fiches par ing connectee ",res)
    })
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
        this.api.deletefiche(id).subscribe((res:any)=>{
  console.log(res)
  this.getallfichesIng()
        
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      })
      }
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
}

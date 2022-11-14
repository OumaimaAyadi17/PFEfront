import { Component, OnInit } from '@angular/core';
import { FicheService } from 'src/app/services/fiche.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fiche-intervention-ing',
  templateUrl: './fiche-intervention-ing.component.html',
  styleUrls: ['./fiche-intervention-ing.component.css']
})
export class FicheInterventionIngComponent implements OnInit {
  listfiches: any;
  userconnect=JSON.parse(localStorage.getItem("userconnect")!);
  constructor(private api:FicheService) { }

  ngOnInit(): void {
    this.getallfichesIng()
  }
  
  getallfichesIng() {
    this.api.getallfiches().subscribe((res:any)=>{
      this.listfiches=res.filter((el:any)=>el.tache.ing.id==this.userconnect.id)
      console.log("liste des fiches de l'ingenieur connectee ",res)
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
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      })
      }
    })
  }
}

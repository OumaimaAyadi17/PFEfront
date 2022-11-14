import { Component, OnInit } from '@angular/core';
import { FicheService } from 'src/app/services/fiche.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fiche',
  templateUrl: './fiche.component.html',
  styleUrls: ['./fiche.component.css']
})
export class FicheComponent implements OnInit {
  listfiches:any

  constructor(private api:FicheService) { }

  ngOnInit(): void {
    this.getallfiches()
  }

  getallfiches() {
    this.api.getallfiches().subscribe((res:any)=>{
      this.listfiches=res
      console.log("liste des fiches",res)
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



import { Component, OnInit } from '@angular/core';
import { of, tap } from 'rxjs';
import { IngenieurService } from 'src/app/services/ingenieur.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-ingenieurs',
  templateUrl: './list-ingenieurs.component.html',
  styleUrls: ['./list-ingenieurs.component.css']
})
export class ListIngenieursComponent implements OnInit {
  listingenieurs:any
  listingenieursvalide:any
  term_search:any=""
  userconnect=JSON.parse(localStorage.getItem("userconnect")!)
  p: number = 1;
 
  constructor(private api: IngenieurService) { }

  ngOnInit(): void {
    this.getallingenieurs()
  }

  // list of all Engineer 
  getallingenieurs(){
    this.api.getallingenieurs().subscribe((res:any)=>{
      this.listingenieurs=res
      console.log("liste des ingenieurs",res)
    })
  }

  // list of all Engineer who have validated account
  getValide(){
    this.api.getallingenieurs().subscribe((res:any)=>{
      this.listingenieurs=res.filter((el:any)=> el.valide==1 && el.enabled==1)
      console.log("liste des ingenieurs selon compte status",this.listingenieurs)
    })
  }

  // list of all Engineer who have bloqued account
  getBloq(){
      this.api.getallingenieurs().subscribe((res:any)=>{
        this.listingenieurs=res.filter((el:any)=> el.valide==1 && el.enabled==0)
        console.log("liste des ingenieurs selon compte status",this.listingenieurs)
  })}

 // list of all Engineer who haven't validated account
  getEnAttente(){
   this.api.getallingenieurs().subscribe((res:any)=>{
          this.listingenieurs=res.filter((el:any)=> el.valide==0 && el.enabled==1)
          console.log("liste des ingenieurs selon compte status",this.listingenieurs)
    })
  }

  // getcomptesvalideingenieurs(e:any){
  //   this.api.getallingenieurs().subscribe((res:any)=>{
  //     this.listingenieurs=res.filter((el:any)=>el.valide==1 && el.enabled==1)
  //     console.log("liste des ingenieurs valides selon compte status",this.listingenieurs)
  //   })}
  // getcomptesvalideingenieurs(){
  //   let listingenieursvalide:any;
  //   for (var i = 0; i < this.listingenieurs.length; i++) {
  //       if (this.listingenieurs[i].valide==1 && this.listingenieurs[i].enabled==1) {
  //         this.listingenieursvalide+=this.listingenieurs[i];
  //       }

  //   }
  //   console.log("liste valide ",this.listingenieursvalide);
  //   return this.listingenieursvalide;
    
  //     }

  // Filter list Engineer by availablity
  getStatusingenieurs(e:any){
    this.api.getallingenieurs().subscribe((res:any)=>{
      this.listingenieurs=res.filter((el:any)=>el.disponibilite==e.target.value)
      console.log("liste des ingenieurs selon status de dispo",this.listingenieurs)
    })
  }

  //Delete Enginner 
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
        this.api.deleteingenieur(id).subscribe((res:any)=>{
          this.getallingenieurs()
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
  // Validate Account Engineer
  validerIngenieur(c:any){
    this.api.validerIngenieur(c.id).subscribe((res:any)=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'validated account',
        showConfirmButton: false,
        timer: 1500
      })
      this.getallingenieurs()
      this.api.sendEmail(c.email).subscribe((res:any)=>{
        console.log("email sent",res)
      })
      console.log("validé",res)
    })
  }

  // Desactivate Account Engineer
  desactiverIngenieur(id:any){
    this.api.desactiverIngenieur(id).subscribe((res:any)=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Account Disabled',
        showConfirmButton: false,
        timer: 1500
      })
      this.getallingenieurs()
      console.log("desactivé",res)
    })

  }
  
  //Activate Account Enginer
  activerIngenieur(id:any){
    this.api.activerIngenieur(id).subscribe((res:any)=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Activated account',
        showConfirmButton: false,
        timer: 1500
      })
      this.getallingenieurs()
      console.log("activé",res)
    })
  }

  isAdmin(){
    return this.userconnect.role=="Admin"?true: false;
  }

 
}

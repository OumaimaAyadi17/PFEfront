import { Component, OnInit } from '@angular/core';
import { ReclamationService } from 'src/app/services/reclamation.service';

@Component({
  selector: 'app-list-reclamation',
  templateUrl: './list-reclamation.component.html',
  styleUrls: ['./list-reclamation.component.css']
})
export class ListReclamationComponent implements OnInit {
  listReclamation: any;

  constructor(private api: ReclamationService) { }

  ngOnInit(): void {
    this.getallreclamations()
  }
  getallreclamations(){
    this.api.getallReclamations().subscribe((res:any)=>{
      this.listReclamation=res
      console.log("liste des reclamation",res)
    })
  }
}

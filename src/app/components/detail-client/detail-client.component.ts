import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
@Component({
  selector: 'app-detail-client',
  templateUrl: './detail-client.component.html',
  styleUrls: ['./detail-client.component.css']
})
export class DetailClientComponent implements OnInit {
  id= this.activeRoute.snapshot.params['id'];
  client: any
  constructor(private activeRoute: ActivatedRoute,private api: ClientService) { }

  ngOnInit(): void {
    this.getOneClient()
  }
  getOneClient(){
    this.api.getclient(this.id).subscribe((res:any)=>{
    this.client=res
      console.log("client",this.client)
    })
  }
}

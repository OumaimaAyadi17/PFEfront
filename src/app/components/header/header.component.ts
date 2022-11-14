import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlerteService } from 'src/app/services/alerte.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userconnect=JSON.parse(localStorage.getItem("userconnect")!)
  listNotifications:any
  listAlertes:any
  constructor(private route:Router,private NotificationService: NotificationService,private AlerteService: AlerteService) { }

  ngOnInit(): void {
    this.getAllNotification()
    this.getAllAlertes()
  }

logout(){
  localStorage.clear()
  this.route.navigateByUrl('')
}
isAdmin(){
  return this.userconnect.role=="Admin"?true: false;
}
isIngenieur(){
  return this.userconnect.role=="Ingenieur"?true: false;
}
isClient(){
  return this.userconnect.role=="Client"?true: false;
}


getAllNotification(){
  this.NotificationService.getallNotifications().subscribe((res:any)=>{
    this.listNotifications=res
    console.log("liste des notifications",res)
  })
}
getAllAlertes(){
  this.AlerteService.getallAlertes().subscribe((res:any)=>{
    this.listAlertes= res.filter((el:any)=> el.reponsereclamation.reclamation.tacheClient.client1.id==this.userconnect.id)
    console.log("liste des alertes", this.listAlertes)
  })

}


}

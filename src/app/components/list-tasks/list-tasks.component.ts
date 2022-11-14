
import { Component, OnInit } from '@angular/core';
import { TacheService } from 'src/app/services/tache.service';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.css']
})
export class ListTasksComponent implements OnInit {
  listtasks:any
  p: number = 1;
 
  constructor(private api: TacheService) { }

  ngOnInit(): void {
    this.getalltasks()
  }
  
// list of ALL tasks
  getalltasks(){
    this.api.getalltasks().subscribe((res:any)=>{
      this.listtasks=res.filter((el:any)=>el.ing!=null )
      console.log("liste des tasks",res)
    })
  }
  
// list of closed tasks
  getTaskesFinished(){
    this.api.getalltasks().subscribe((res:any)=>{
      this.listtasks=res.filter((el:any)=>el.status=="done"  )
      console.log("list of finished tasks", this.listtasks)
    })
  }

  // list of todo tasks
  getTaskesTodo(){
    this.api.getalltasks().subscribe((res:any)=>{
      this.listtasks=res.filter((el:any)=>el.status=="todo" && el.ing!=null )
      console.log("list of todo tasks", this.listtasks)  
    })
  }

// list of inprogress tasks
  getTaskesInprogress(){
    this.api.getalltasks().subscribe((res:any)=>{
      this.listtasks=res.filter((el:any)=>el.status=="inprogress" )
      console.log("list of inprogress tasks",this.listtasks)   
    })
  }




}

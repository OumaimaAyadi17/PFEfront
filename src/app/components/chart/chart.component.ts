import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { IngenieurService } from 'src/app/services/ingenieur.service';
import { TacheService } from 'src/app/services/tache.service';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  chart: any;
  totaltodo: any;
 todo:any;
 totaldone:any;
 done:any;
 inprogress:any;
 totalinprogress:any;
  listing: any;
  x:any
  constructor(private api: TacheService,private apiIng:IngenieurService) { }

  ngOnInit(): void {
    this.api.getalltasks().subscribe((res:any)=>{
      this.done=res.filter((el:any)=>el.status=="done" )
      console.log("list of done tasks",this.done)
      this.totaldone=this.done.length; 
    console.log("nombre de task done", this.totaldone)

    this.api.getalltasks().subscribe((res:any)=>{
      this.todo=res.filter((el:any)=>el.status=="todo" && el.ing!=null && el.confirmationAdmin=="confirmé")
      console.log("list of todo taskss",this.todo)
      this.totaltodo=this.todo.length;
    console.log("nombre de task todo", this.totaltodo)

    this.api.getalltasks().subscribe((res:any)=>{
      this.inprogress=res.filter((el:any)=>el.status=="inprogress" )
      console.log("list of inprogress tasks",this.inprogress)
      this.totalinprogress=this.inprogress.length;
    console.log("nombre de task inprogress", this.totalinprogress)
  
    this.chart = new Chart('canvas', {
      type: 'doughnut',

      data: {
        labels: ['Closed', 'Todo', 'Inprogress'],
        datasets: [
          {
            label: 'My First Dataset',
            data: [this.totaldone,this.totaltodo,this.totalinprogress],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
            ],
            hoverOffset: 4,
          },
        ],
      },
      // options: {
      //   borderRadius: 10,
      // },
     
    });
  })
})
})
  }
 
  
  
  
  
}

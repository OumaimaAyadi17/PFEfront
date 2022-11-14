import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FicheService } from 'src/app/services/fiche.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-detailfiche',
  templateUrl: './detailfiche.component.html',
  styleUrls: ['./detailfiche.component.css']
})
export class DetailficheComponent implements OnInit {
  id= this.activeRoute.snapshot.params['id'];
  fiche:any
  constructor(private activeRoute: ActivatedRoute,private api: FicheService) { }
  userconnect=JSON.parse(localStorage.getItem("userconnect")!)

  ngOnInit(): void {
    this.getOneFiche()
  }


  getOneFiche(){
    this.api.getfiche(this.id).subscribe((res:any)=>{
    this.fiche=res
      console.log("fiche",this.fiche)
    })
  }


  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('detail Fiche.pdf');
    });
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

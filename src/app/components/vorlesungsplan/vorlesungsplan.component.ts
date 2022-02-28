import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ActionEventArgs, dataBinding, DayService,EventRenderedArgs, MonthService, View, WeekService, WorkWeekService} from '@syncfusion/ej2-angular-schedule'
import { Subscription } from 'rxjs';
import { Imaterial } from 'src/app/models/imaterial';
import { Vorlesungsplan } from 'src/app/models/vorlesungsplan';
import { MaterialsService } from 'src/app/services/materials.service';
import { VorlesungsplaeneService } from 'src/app/services/vorlesungsplaene.service';


@Component({
  selector: 'app-vorlesungsplan',
  templateUrl: './vorlesungsplan.component.html',
  styleUrls: ['./vorlesungsplan.component.css'],
  providers: [DayService, WeekService, WorkWeekService, MonthService]
})
export class VorlesungsplanComponent implements OnInit {
  public selectedDate: Date = new Date();
  public currentView: View = 'WorkWeek';
  public showWeekend: Boolean = false;
  public materialien :Imaterial[] =[];
  public material: Imaterial;
  public vorlesungen: Vorlesungsplan[] = [];
  public bild1:string = 'assets/images/hilfe1.jpg';
  public bild2:string = 'assets/images/hilfe2.jpg';

  constructor(private materialService: MaterialsService , private route:Router, private vorlesungService: VorlesungsplaeneService) { }

  ngOnInit(): void {
    this.vorlesungen = this.vorlesungService.getVorlesungsplan();
    this.materialien = this.materialService.getMaterialien();
  }


  onAction(args: ActionEventArgs){
    if(args.addedRecords != undefined || args.addedRecords != null){
     if( args.addedRecords.length > 0){
       args.addedRecords.forEach(vl =>{
         //erstelle ein neues Modul
         let material:Imaterial ={
           subject: vl['Subject'],
           toggle: false,
           files: []
         }
         //erstelle einen Vorlesungsplan in dem Template
         let vorlesung: Vorlesungsplan ={
          Subject: vl['Subject'],
          Id: vl['Id']
         }
         //füge einen neuen Vorlesungsplan in dem Template hinzu
         this.vorlesungService.addVorlesungsplan(vorlesung);
         this.material = material;
        });

        //finde das object, wenn schon existiert
        const mat = this.materialien.find((m) => {
          m.subject=== this.material.subject
        });

        //Fall existiert Fehlermuldung, ansonstens füge hinzu und aktualisieren
        if(mat){
          console.log("subject is already exist");
        }else{
            this.materialService.addMaterial(this.material);
            this.vorlesungen = this.vorlesungService.getVorlesungsplan();
          }

     }
     let alteSubject = '';
     let mat =null;
     //Wenn ein Element verändert wird
     if(args.changedRecords.length > 0){
       //Neues Element
      let vorlesung: Vorlesungsplan ={
        Subject: args.data['Subject'],
        Id: args.data['Id']
       }
       //das zuveränderte Element finden
       this.vorlesungen.forEach(vl =>{
         if(vl.Id === vorlesung.Id){
            alteSubject = vl.Subject;
          }
        });

        //Elememt Update
        this.vorlesungService.updateVorlesungsplan(vorlesung);
        this.vorlesungen = this.vorlesungService.getVorlesungsplan();

        mat = this.materialien.find(m => m.subject == alteSubject);

        if(mat){
        mat.subject = args.data['Subject'];
        this.materialService.addMaterial(mat);
      }
    }
    }
  }

  gotoHome():void{
    this.route.navigate(['/home']);
  }

}

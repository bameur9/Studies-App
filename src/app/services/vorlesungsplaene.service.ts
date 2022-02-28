import { Injectable } from '@angular/core';
import { Vorlesungsplans } from '../mock-data/mock-data';
import { Vorlesungsplan } from '../models/vorlesungsplan';

@Injectable({
  providedIn: 'root'
})
export class VorlesungsplaeneService {

  constructor() { }

  public deletedVorlesungsplan:Vorlesungsplan[] = [];

  getVorlesungsplan():Vorlesungsplan[]{
    return Vorlesungsplans;
  }

  getVorlesungsplanBySubject(s :string){
    return Vorlesungsplans.find(v => v.Subject == s )!;
  }

  getVorlesungsplanById(id: number){
    return Vorlesungsplans.find(v => v.Id == id)!;
  }

  addVorlesungsplan(vl: Vorlesungsplan):Vorlesungsplan{
    Vorlesungsplans.push(vl);
    return vl;
  }

  deleteVorlesungsplan(vl: Vorlesungsplan):void{
    var i = Vorlesungsplans.indexOf(vl);
    Vorlesungsplans.splice(i, 1);
  }

  deleteVorlesungsplaWithSubject(s:string):Vorlesungsplan{
    var i = Vorlesungsplans.indexOf(this.getVorlesungsplanBySubject(s));
    Vorlesungsplans.splice(i, 1);
    this.deletedVorlesungsplan.push(this.getVorlesungsplanBySubject(s));
    return this.getVorlesungsplanBySubject(s);
  }

  getDeleteVorlesungsplans(){
    return this.deletedVorlesungsplan;
  }

  updateVorlesungsplan(vl: Vorlesungsplan):void{
    var i = Vorlesungsplans.indexOf(this.getVorlesungsplanById(vl.Id));
    Vorlesungsplans[i] = vl;
  }

}

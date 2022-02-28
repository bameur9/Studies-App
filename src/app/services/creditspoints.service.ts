import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Creditspoints } from '../mock-data/mock-data';
import { Icreditpoint } from '../models/icreditpoint';

@Injectable({
  providedIn: 'root'
})
export class CreditspointsService {

  constructor() { }

  //private readonly baseUrl:string ='api/creditpoints.json';

  getCreditpoints():Icreditpoint[] {
    return Creditspoints;
  }

  getCreditpointsBySubject(cp:Icreditpoint):Icreditpoint {
    var cp = Creditspoints.find(m => m.subject.toLowerCase() === cp.subject.toLowerCase());
    return cp;
  }

  getCreditpointsById(id:number):Icreditpoint{
    var cp = Creditspoints.find(m => m.id === id);
    return cp;
  }

  addCeditPoint(module: Icreditpoint):void{
    if(this.getCreditpointsById(module.id)){
      var i =Creditspoints.indexOf(module);
      Creditspoints[i] = module;
    }else{
      module.id = Creditspoints.length +1;
      Creditspoints.push(module);
    }
  }

  deleteCreditpoints(module:Icreditpoint):void{
    let i = Creditspoints.indexOf(module);
    Creditspoints.splice(i ,1);
  }
}

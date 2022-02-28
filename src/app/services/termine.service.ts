import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TermineService {
  public OrdnerTodos: string[] =[];

  constructor() { }


  getOrdner(){
    return this.OrdnerTodos;
  }

  addOrdner(datum:any){
    this.OrdnerTodos.unshift(datum);
  }

  closeOrdner(i){
    this.OrdnerTodos.splice(i,1);
  }

}

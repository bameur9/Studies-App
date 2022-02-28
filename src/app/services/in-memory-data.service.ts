import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Icreditpoint } from '../models/icreditpoint';
import { Imaterial } from '../models/imaterial';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{

  createDb(){
    const Materialien: Imaterial[]=[{
      "id":1,
      "subject": "Mathematik 1",
      "toggle":false,
      "files":[]
    }];
    const Creditspoints:  Icreditpoint[]=[{
      "id": 1,
      "subject": "Gestaltung 1",
      "note": 1.3,
      "cp": 6
  },
  {
      "id": 2,
      "subject": "Grd-Inf",
      "note": 5,
      "cp": 6
  },
  {
      "id": 3,
      "subject": "Prog 1",
      "note": 1.7,
      "cp": 6
  }
];
    return {Materialien,Creditspoints };
  }


  genId(mat:  Imaterial[]): number {
    return mat.length > 0 ? Math.max(...mat.map(m => m.id)) + 1 : 1;
  }

  constructor() { }


}

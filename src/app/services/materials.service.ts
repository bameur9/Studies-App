import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { Materialien } from '../mock-data/mock-data';
import { Imaterial } from '../models/imaterial';

@Injectable({
  providedIn: 'root'
})
export class MaterialsService {

  constructor(private http: HttpClient) { }

  getMaterialien(): Imaterial[]{
    return Materialien;
  }

  deleteMaterial(mat : Imaterial):void{
    let i = Materialien.indexOf(mat);
    Materialien.splice(i, 1);
  }

  deleteFile(i1 : number,i2:number):void{
    this.getMaterialien()[i1].files.splice(i2,1);
  }

  addFile(i:number, file:string):void{
    this.getMaterialien()[i].files?.push(file);
  }

  getMaterialById(id:number):Imaterial{
    var material = Materialien.find(m => m.id == id)
    return material;
  }

  getMaterialBySubject(subject: string):Imaterial{
    var material = Materialien.find(m => m.subject.toLowerCase() === subject.toLowerCase());
    return material;
  }

  addMaterial(mat:Imaterial):void{
    if(this.getMaterialBySubject(mat.subject)){
      var i = Materialien.indexOf(mat);
      Materialien[i] = mat;
    }else{
      mat.id = Materialien.length+1;
      Materialien.push(mat);
    }
  }
}

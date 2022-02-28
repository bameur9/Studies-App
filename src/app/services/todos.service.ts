import { Injectable } from '@angular/core';
import { TodoListe} from '../mock-data/mock-data';
import { ItodoList } from '../models/iTodoList';
import { Todo } from '../models/todo';


@Injectable({
  providedIn: 'root'
})
export class TodosService {

  private length:number;
  constructor() { }

  getTodos():ItodoList[]{
    return TodoListe;
  }
  getTodoById(id:number):ItodoList{
    return TodoListe.find(t => t.id === id);
  }

  getTodoByName(name:string):ItodoList{
    return TodoListe.find(t => t.name.toLowerCase() === name.toLowerCase());
  }

  changeStatus(todo:string, i:number ):void{
      this.getTodoByName(todo).liste[i].status=!this.getTodoByName(todo).liste[i].status;
  }

  getLaengeList(todo:string, i:number):number{
    return this.getTodoByName(todo).liste.length;
  }

  addTodo(todo: ItodoList): void{
    if(this.getTodoByName(todo.name)){
      //edit
      let i = TodoListe.indexOf(todo);
      TodoListe[i] = todo;
    }else {
        //Add
      todo.id = TodoListe.length+1;
      TodoListe.unshift(todo);
    }
  }

  removeTodo(index :number):void{
    TodoListe.splice(index, 1);
  }

}

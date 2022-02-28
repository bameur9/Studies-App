import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
import { ItodoList } from 'src/app/models/iTodoList';
import { TodosService } from 'src/app/services/todos.service';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.css']
})
export class ShowListComponent implements OnInit {
  public listen: ItodoList;
  public name: string ="";
  public id: number;
  public todoListTemplate: string;
  public todoListSelect: string;
  public todoFormList!: FormGroup;
  public color:string ='red';
  public check:boolean = false;
  public priorutaet =['...','niedrigste', 'mittel','hoch'];
  public value:any;
  public sortList: ItodoList;

  constructor(private route : ActivatedRoute,
              private todoService: TodosService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initUserForm();
    this.id = this.route.snapshot.params['id'];
    this.name = this.route.snapshot.params['name'];
    this.listen=this.todoService.getTodoByName(this.name);
    console.log(this.listen);
  }



  initUserForm():void {
    this.todoFormList =this.formBuilder.group({
      title: this.formBuilder.control("", [Validators.required, Validators.minLength(3)]),
      stufe: this.formBuilder.control("", [Validators.required]),
      date:  Date.now()
    });
   }

   status(i:number){
    this.todoService.changeStatus(this.name, i);
   }

  addNewList(){
    const todoList= this.todoFormList.value;
    console.log(todoList);

    if(this.todoService.getTodoByName(this.name).liste == null || this.todoService.getTodoByName(this.name).liste == undefined){
      this.todoService.getTodoByName(this.name).liste =[];
    }
    this.todoService.getTodoByName(this.name).liste.push(todoList);
  }

}

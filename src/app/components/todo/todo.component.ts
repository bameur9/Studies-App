import { Component,ElementRef,OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ItodoList } from 'src/app/models/iTodoList';
import { TodosService } from 'src/app/services/todos.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';





@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  public todos: ItodoList[] =[];
  public itemLength =0;
  public subject:any;
  closeResult: string;

  constructor(private route : Router,
              private todoService: TodosService,
              private modalService: NgbModal ) { }


  ngOnInit(): void {
    this.todos = this.todoService.getTodos();
    this.todos.forEach(t =>{
      if(t.liste !== null && t.liste !== undefined){
        t.liste.forEach(l =>{
          if(!l.status){
            this.itemLength++;
          }
        })
      }
    })
  }

  goToList(id:number, name:string):void{
    this.route.navigate(["home/todo/", id,name ]);
  }


   gotoHome():void{
    this.route.navigate(['/home']);
  }


  Search(){
    if(this.subject ==""){
      this.ngOnInit();
    }else {
      this.todos = this.todos.filter(res =>{
        return res.name.toLocaleLowerCase().match(this.subject.toLocaleLowerCase());
      });
    }
  }

  removeToDo(index:number):void{
    this.todoService.removeTodo(index);
  }

  public openForRemove(content,index:number) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title'  }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') {
        this.removeToDo(index);
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}

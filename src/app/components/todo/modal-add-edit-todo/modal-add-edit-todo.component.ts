import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbDateStruct, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ItodoList } from 'src/app/models/iTodoList';
import { TodosService } from 'src/app/services/todos.service';

@Component({
  selector: 'app-modal-add-edit-todo',
  templateUrl: './modal-add-edit-todo.component.html',
  styleUrls: ['./modal-add-edit-todo.component.css']
})
export class ModalAddEditTodoComponent implements OnInit {
  public todoForm!: FormGroup;
  modalReference: NgbModalRef;
  public  closeResult: string;
  todoList: ItodoList;

  todoTemplate:string;


  constructor( private modalService: NgbModal,private formBuilder: FormBuilder,
    private todoService: TodosService) { }

  ngOnInit(): void {
    this.initUserForm();
  }

  initUserForm():void {
    this.todoForm =this.formBuilder.group({
      name: this.formBuilder.control("", [Validators.required, Validators.minLength(3)]),
    });
   }

   public onSubmit(){
    const todo= this.todoForm.value;

    this.todoService.addTodo(todo);
    this.todoForm.reset();
   this.modalReference.close();

   }

  public openVerticallyCentered(content) {
    this.modalReference = this.modalService.open(content, { centered: true });
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
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

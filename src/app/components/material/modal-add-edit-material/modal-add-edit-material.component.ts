import {Component,EventEmitter,Input,OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgwWowService } from 'ngx-wow';
import { Imaterial } from 'src/app/models/imaterial';



@Component({
  selector: 'app-modal-add-edit-material',
  templateUrl: './modal-add-edit-material.component.html',
  styleUrls: ['./modal-add-edit-material.component.css']
})
export class ModalAddEditMaterialComponent implements OnInit{
  public materialForm!: FormGroup;
  public textAction :string ="hinzufügen";
  public  closeResult: string;
  @Output() materialItem = new EventEmitter<Imaterial>();
  @Input() material:Imaterial;
  public materialTemplate:string;

  public matExist: boolean = false;
  modalReference: NgbModalRef;


  constructor(private formBuilder: FormBuilder,
              private modalService: NgbModal, private wowService: NgwWowService) { }


  ngOnInit(): void {
    this.initUserForm();
    this.wowService.init();

    if(this.material){
      this.matExist =true;
      this.textAction ="bearbeiten";
      this.materialTemplate = this.material.subject;
    }else {
      this.matExist = false;
    }
  }

  initUserForm():void {
   this.materialForm =this.formBuilder.group({
     subject: this.formBuilder.control("", [Validators.required, Validators.minLength(3)])
   });
  }
/*
  setValue(){
      this.materialForm.setValue({subject: this.material.subject});
  }
*/

  public onSubmit():void{
   let dataUser = this.materialForm.value;

   if(this.material){
    this.material.subject = this.materialTemplate;
   }else{
    this.materialItem.emit(dataUser);
    this.materialForm.reset();
   }

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


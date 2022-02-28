import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgwWowService } from 'ngx-wow';
import { Icreditpoint } from 'src/app/models/icreditpoint';
import { CreditspointsService } from 'src/app/services/creditspoints.service';


@Component({
  selector: 'app-modal-add-edit-cp',
  templateUrl: './modal-add-edit-cp.component.html',
  styleUrls: ['./modal-add-edit-cp.component.css']
})
export class ModalAddEditCpComponent implements OnInit {
  @Input() creditpoint: Icreditpoint;

  public dataExist:boolean= false;
  public creditpointForm!: FormGroup;
  numRegex = /^-?\d*[.,]?\d{0,2}$/;
  modalReference: NgbModalRef;
  public  closeResult: string;
  public subjectTemplate:string;
  public noteTemplate:number;
  public textAction:string ="hinzufügen";

  constructor(private formBuilder: FormBuilder,
              private modalService: NgbModal,
              private cpService: CreditspointsService,
              private wowService: NgwWowService) {}

  ngOnInit(): void {
    this.wowService.init();
    this.initUserForm();
    if(this.creditpoint){
      this.dataExist= true;
      this.textAction ="bearbeiten"
      this.subjectTemplate = this.creditpoint.subject;
      this.noteTemplate = this.creditpoint.note;
    }else {
      this.dataExist= false;
    }
  }

  initUserForm():void {
    this.creditpointForm =this.formBuilder.group({
      subject: this.formBuilder.control("", [Validators.required, Validators.minLength(3)]),
      note: this.formBuilder.control("", [Validators.required,
      Validators.pattern(this.numRegex)])
    });
   }

   onSubmit(){
    const dataUser= this.creditpointForm.value;
    const bestanden = 6;
    const nichtBestanden = 0;

    if(this.creditpoint){
     this.creditpoint.subject = this.subjectTemplate;
     this.creditpoint.note = this.noteTemplate;
     this.setData(this.creditpoint, bestanden, nichtBestanden);
    }else{
    this.setData(dataUser, bestanden, nichtBestanden);
     this.cpService.addCeditPoint(dataUser);
     this.creditpointForm.reset();
    }

    this.modalReference.close();
   }

   public setData(newCp: Icreditpoint, bestanden:number, nichtBestanden:number){
    if(newCp.note >= 5){
      newCp.cp = nichtBestanden;
    }else{
      newCp.cp =bestanden;
    }
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

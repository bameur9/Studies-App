import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Icreditpoint } from 'src/app/models/icreditpoint';
import { CreditspointsService } from 'src/app/services/creditspoints.service';



@Component({
  selector: 'app-creditspoint',
  templateUrl: './creditspoint.component.html',
  styleUrls: ['./creditspoint.component.css']
})
export class CreditspointComponent implements OnInit {

  creditpoints: Icreditpoint[] = [];
  subject:any;
  p:number =1;
  closeResult: string;


  constructor(private route: Router,
              private cpService: CreditspointsService,
              private modalService: NgbModal
              ) { }


  ngOnInit(): void {
    this.creditpoints= this.cpService.getCreditpoints();
  }

  deleteRow(m: Icreditpoint):void{
    this.cpService.deleteCreditpoints(m);
  }

  public openForRemove(content,m : Icreditpoint) {

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') {
        console.log(m);
        this.deleteRow(m);
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

  gotoHome():void{
    this.route.navigate(['/home']);
  }

  Search(){
    if(this.subject ==""){
      this.ngOnInit();
    }else {
      this.creditpoints = this.creditpoints.filter(res =>{
        return res.subject.toLocaleLowerCase().match(this.subject.toLocaleLowerCase());
      });
    }
  }

}

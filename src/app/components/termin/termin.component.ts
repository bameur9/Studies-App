import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { TermineService } from 'src/app/services/termine.service';

@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {

  readonly DELIMITER = '-';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day : parseInt(date[0], 10),
        month : parseInt(date[1], 10),
        year : parseInt(date[2], 10)
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
  }
}


@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {

  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day : parseInt(date[0], 10),
        month : parseInt(date[1], 10),
        year : parseInt(date[2], 10)
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
  }
}

@Component({
  selector: 'app-termin',
  templateUrl: './termin.component.html',
  styleUrls: ['./termin.component.css'],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class TerminComponent implements OnInit {
  public active;
  public model2: NgbDateStruct;
  public firstItem ='top';
  public ordner= [];

  constructor(private route : Router,
    private ngbCalendar: NgbCalendar, private dateAdapter: NgbDateAdapter<string>,
    private terminService: TermineService) { }

  ngOnInit(): void {
    this.ordner = this.terminService.getOrdner();
  }

  addDate(model2:any){
    this.terminService.addOrdner(model2);
    this.model2 =undefined;
  }

  gotoHome():void{
    this.route.navigate(['/home']);
  }

  get today() {
    return this.dateAdapter.toModel(this.ngbCalendar.getToday())!;
  }



}

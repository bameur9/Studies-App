import { Component,  OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgwWowService} from 'ngx-wow';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private route:Router,
              private wowService: NgwWowService) {

              }


  ngOnInit(): void {

  }


  goToVorlesung():void{
    this.route.navigate(['home/vorlesungsplan']);
  }

  goToTodo():void{
    this.route.navigate(['home/todo']);
  }

  goTodMaterial():void{
    this.route.navigate(['home/material']);
  }

  goToTermin():void{
    this.route.navigate(['home/termin']);
  }

  goToCp():void{
    this.route.navigate(['home/creditpoint']);
  }

  goToProjekt():void{
    this.route.navigate(['home/projekt']);
  }



}

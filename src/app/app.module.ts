import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import{ HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { VorlesungsplanComponent } from './components/vorlesungsplan/vorlesungsplan.component';
import { TodoComponent } from './components/todo/todo.component';
import { ProjekteManagerComponent } from './components/projekte-manager/projekte-manager.component';
import { CreditspointComponent } from './components/creditspoint/creditspoint.component';
import { TerminComponent } from './components/termin/termin.component';
import { MaterialComponent } from './components/material/material.component';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { NgbAlertModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalAddEditMaterialComponent } from './components/material/modal-add-edit-material/modal-add-edit-material.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import{Ng2OrderModule} from 'ng2-order-pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { ModalAddEditCpComponent } from './components/creditspoint/modal-add-edit-cp/modal-add-edit-cp.component';
import { ModalAddEditTodoComponent } from './components/todo/modal-add-edit-todo/modal-add-edit-todo.component';
import { ShowListComponent } from './components/todo/show-list/show-list.component';
import { NgwWowModule } from 'ngx-wow';
import { LongPress } from './../long-press';





//import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { InMemoryDataService } from './services/in-memory-data.service';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VorlesungsplanComponent,
    MaterialComponent,
    TodoComponent,
    ProjekteManagerComponent,
    CreditspointComponent,
    TerminComponent,
    ModalAddEditMaterialComponent,
    ModalAddEditCpComponent,
    ModalAddEditTodoComponent,
    ShowListComponent,
    LongPress

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ScheduleModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    HttpClientModule,
    FormsModule,
    FormsModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    NgwWowModule
   // HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }

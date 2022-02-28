import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditspointComponent } from './components/creditspoint/creditspoint.component';
import { HomeComponent } from './components/home/home.component';
import { MaterialComponent } from './components/material/material.component';
import { ModalAddEditMaterialComponent } from './components/material/modal-add-edit-material/modal-add-edit-material.component';
import { ProjekteManagerComponent } from './components/projekte-manager/projekte-manager.component';
import { TerminComponent } from './components/termin/termin.component';
import { ShowListComponent } from './components/todo/show-list/show-list.component';
import { TodoComponent } from './components/todo/todo.component';
import { VorlesungsplanComponent } from './components/vorlesungsplan/vorlesungsplan.component';

const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'home/creditpoint', component:CreditspointComponent},
  {path:'home/vorlesungsplan', component:VorlesungsplanComponent},
  {path:'home/projekt', component:ProjekteManagerComponent},
  {path:'home/termin', component:TerminComponent},
  {path:'home/material', component:MaterialComponent},
  {path:'home/todo', component:TodoComponent},
  {path:'home/todo/:id/:name', component:ShowListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

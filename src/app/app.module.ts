import { ProfilService } from './service/profil.service';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { ComponentsModule } from './Component/component.module';
import { CustomOption } from './service/CustomOption';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { UserService } from './shared_service/user.service';
import {RouterModule, Routes} from '@angular/router';
import { RegisterService } from './service/register.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastModule} from 'ng2-toastr/ng2-toastr';

import { InstitutionComponent } from './institution/institution.component';
import { EvenementComponent } from './evenement/evenement.component';
import { User } from '../app/classes/user';
import { EvenementService } from '../app/shared_service/evenement.service';
import { ListesInstitutionsComponent } from './listes-institutions/listes-institutions.component';
import { ListeEvenementsComponent } from './liste-evenements/liste-evenements.component';
import { DeleteInstitutionComponent } from './delete-institution/delete-institution.component';
import { DeleteEventComponent } from './delete-event/delete-event.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PassforgetComponent } from './passforget/passforget.component';
import {HttpClientModule} from '@angular/common/http';

import { TokenService } from './service/token.service';
import { SendemailComponent } from './sendemail/sendemail.component';


import { AppComponent } from './app.component';
import { ToastOptions } from 'ng2-toastr/src/toast-options';
import { RedirectService } from './service/redirect.service';
import { StatistiqueComponent } from './Component/statistique/statistique.component';

export const appRoutes:Routes=[
  {path: 'dashboard', component:DashboardComponent,
    children: [
      {  path: '', component: StatistiqueComponent },
      {  path: 'statistique', component: StatistiqueComponent },
      {  path: 'institution', component: InstitutionComponent },
      {  path:'listeInstitution', component:ListesInstitutionsComponent },
      {  path:'deleteInstitution/:id', component:DeleteInstitutionComponent },
      {  path:'evenement', component:EvenementComponent },
      {  path:'listeEvent', component:ListeEvenementsComponent },
      {  path:'deleteEvent/:id', component:DeleteEventComponent },
    ]
  },
  {path: 'dashboard',component:DashboardComponent},
  {path:'', redirectTo:'/login', pathMatch:'full'},
  {path:'login', component:LoginComponent },
  {path:'login/:message', component:LoginComponent },
  {path:'register', component:RegisterComponent },
  {path:'updatePassword', component:PassforgetComponent },
  {path:'updatePassword/:email/:password', component:PassforgetComponent },
  {path:'sendemail', component:SendemailComponent },
  {path:'sendemail/:code', component:SendemailComponent },
  {path:'**', redirectTo:'/login', pathMatch:'full' }

]


@NgModule({
  declarations: [
    AppComponent,
    InstitutionComponent,
    EvenementComponent,
    ListesInstitutionsComponent,
    ListeEvenementsComponent,
    DeleteInstitutionComponent,
    DeleteEventComponent,
    LoginComponent,
    RegisterComponent,
    PassforgetComponent,
    SendemailComponent,
    StatistiqueComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ComponentsModule,
    ToastModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    UserService, 
    EvenementService, 
    RegisterService, 
    TokenService, 
    ToastOptions,{provide: ToastOptions, useClass: CustomOption}, 
    RedirectService,
    ProfilService
  ],
  bootstrap: [AppComponent],
  exports: [ RouterModule ],

})
export class AppModule { }

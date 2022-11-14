import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddInterventionComponent } from './components/add-intervention/add-intervention.component';
import { AffectationComponent } from './components/affectation/affectation.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ChartComponent } from './components/chart/chart.component';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';
import { DemandeClotureComponent } from './components/demande-cloture/demande-cloture.component';
import { DemandeIngComponent } from './components/demande-ing/demande-ing.component';
import { DemandeTaskClientComponent } from './components/demande-task-client/demande-task-client.component';
import { DetailClientComponent } from './components/detail-client/detail-client.component';
import { DetailIngenieurComponent } from './components/detail-ingenieur/detail-ingenieur.component';
import { DetailficheComponent } from './components/detailfiche/detailfiche.component';
import { FicheInterventionIngComponent } from './components/fiche-intervention-ing/fiche-intervention-ing.component';
import { FicheComponent } from './components/fiche/fiche.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ListClientsComponent } from './components/list-clients/list-clients.component';
import { ListIngenieursComponent } from './components/list-ingenieurs/list-ingenieurs.component';
import { ListReclamationComponent } from './components/list-reclamation/list-reclamation.component';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';
import { ListeFicheIngComponent } from './components/liste-fiche-ing/liste-fiche-ing.component';
import { ListficheComponent } from './components/listfiche/listfiche.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProfileClientComponent } from './components/profile-client/profile-client.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ReclamationComponent } from './components/reclamation/reclamation.component';
import { RegistreAdminComponent } from './components/registre-admin/registre-admin.component';
import { RegistreClientComponent } from './components/registre-client/registre-client.component';
import { RegistreIngenieurComponent } from './components/registre-ingenieur/registre-ingenieur.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'notFound',component:NotFoundComponent},
  {path:'registreAdmin',component:RegistreAdminComponent},
   {path:'registreClient',component:RegistreClientComponent},
  {path:'registreIngenieur',component:RegistreIngenieurComponent},
  {path:'forgetPassword',component:ForgetPasswordComponent},
  {path:'confirmEmail',component:ConfirmEmailComponent},
  {path:'resetPassword/:resetLink',component:ResetPasswordComponent},
  {path:'chart',component:ChartComponent},
  {path:"home",canActivate:[AuthGuard],component: HomeComponent ,children:[
    {path:'',component:LayoutComponent},
    {path:'profileIng',component:ProfileComponent},
    {path:'profileClient',component:ProfileClientComponent},
    {path:'listclient',component:ListClientsComponent},
    {path:'listingenieurs',component:ListIngenieursComponent},
    {path:'listtasks',component:ListTasksComponent},
    {path:'tasks',component:TasksComponent},
    {path:'detailClient/:id',component:DetailClientComponent},
    {path:'detailIngenieur/:id',component:DetailIngenieurComponent},
    {path:'layout',component:LayoutComponent},
    {path:'demandeClient',component:DemandeTaskClientComponent},
    {path:'fiche',component:FicheComponent},
    {path:'listefiche',component:ListficheComponent},
    {path:'ficheIng',component:FicheInterventionIngComponent},
    {path:'listeficheIng',component:ListeFicheIngComponent},
    {path:'addIntervention/:id',component:AddInterventionComponent},
    {path:'demandesClient',component:DemandeTaskClientComponent},
    {path:'affectation',component:AffectationComponent},
    {path:'affectation',component:AffectationComponent},
    {path:'detailFiche/:id',component:DetailficheComponent},
    {path:'calender',component:CalendarComponent},
    {path:'demandeCloture',component:DemandeClotureComponent},
    {path:'reclamation/:id',component:ReclamationComponent},
    {path:'demandeIng',component:DemandeIngComponent},
    {path:'listReclamation',component:ListReclamationComponent},
    
    

 ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

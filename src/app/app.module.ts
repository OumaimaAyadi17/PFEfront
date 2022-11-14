import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import {DragDropModule} from '@angular/cdk/drag-drop';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailClientComponent } from './components/detail-client/detail-client.component';
import { DetailIngenieurComponent } from './components/detail-ingenieur/detail-ingenieur.component';
import { ListClientsComponent } from './components/list-clients/list-clients.component';
import { ListIngenieursComponent } from './components/list-ingenieurs/list-ingenieurs.component';
import { RegistreClientComponent } from './components/registre-client/registre-client.component';
import { RegistreIngenieurComponent } from './components/registre-ingenieur/registre-ingenieur.component';
import { RegistreAdminComponent } from './components/registre-admin/registre-admin.component';
import { LoginComponent } from './components/login/login.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FicheComponent } from './components/fiche/fiche.component';
import { ListficheComponent } from './components/listfiche/listfiche.component';
import { ProfileClientComponent } from './components/profile-client/profile-client.component';
import { RecherchePipe } from './pipes/recherche.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { DemandeTaskClientComponent } from './components/demande-task-client/demande-task-client.component';
import { FicheInterventionIngComponent } from './components/fiche-intervention-ing/fiche-intervention-ing.component';
import { ListeFicheIngComponent } from './components/liste-fiche-ing/liste-fiche-ing.component';
import { AddInterventionComponent } from './components/add-intervention/add-intervention.component';
import { AffectationComponent } from './components/affectation/affectation.component';
import { DetailficheComponent } from './components/detailfiche/detailfiche.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { DemandeClotureComponent } from './components/demande-cloture/demande-cloture.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';

import { ReclamationComponent } from './components/reclamation/reclamation.component';
import { ReponseReclamationComponent } from './components/reponse-reclamation/reponse-reclamation.component';
import { ChartComponent } from './components/chart/chart.component';
import { ChartIngComponent } from './components/chart-ing/chart-ing.component';
import { DemandeIngComponent } from './components/demande-ing/demande-ing.component';
import { ListReclamationComponent } from './components/list-reclamation/list-reclamation.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ChartClientComponent } from './components/chart-client/chart-client.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';
FullCalendarModule.registerPlugins([interactionPlugin, dayGridPlugin,timeGrigPlugin]);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    HomeComponent,
    LayoutComponent,
    DetailClientComponent,
    DetailIngenieurComponent,
    ListClientsComponent,
    ListIngenieursComponent,
    RegistreClientComponent,
    RegistreIngenieurComponent,
    RegistreAdminComponent,
    LoginComponent,
    TasksComponent,
    ListTasksComponent,
    ProfileComponent,
    FicheComponent,
    ListficheComponent,
    ProfileClientComponent,
    RecherchePipe,
    DemandeTaskClientComponent,
    FicheInterventionIngComponent,
    ListeFicheIngComponent,
    AddInterventionComponent,
    AffectationComponent,
    DetailficheComponent,
    CalendarComponent,
    DemandeClotureComponent,
    ReclamationComponent,
    ReponseReclamationComponent,
    ChartComponent,
    ChartIngComponent,
    DemandeIngComponent,
    ListReclamationComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    ChartClientComponent,
    NotFoundComponent,
    ConfirmEmailComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    DragDropModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    FullCalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

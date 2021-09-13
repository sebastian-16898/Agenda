import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CreateUsuarioComponent } from '../app/Usuario/create-usuario/create-usuario.component'
import { ListUsuarioComponent } from '../app/Usuario/list-usuario/list-usuario.component'
import { UpdateUsuarioComponent } from '../app/Usuario/update-usuario/update-usuario.component'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceService } from './Service/service.service';
import { HttpClientModule } from '@angular/common/http';
import { DropdownModule } from 'primeng/dropdown';
import { DragDropModule } from 'primeng/dragdrop';
import { DialogModule } from 'primeng/dialog';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MultiSelectModule } from 'primeng/multiselect';
import { AccordionModule } from 'primeng/accordion';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { InputMaskModule } from 'primeng/inputmask';
import { ToolbarModule } from 'primeng/toolbar';
import { KeyFilterModule } from 'primeng/keyfilter';
import { BlockUIModule } from 'primeng/blockui';
import { FocusTrapModule } from 'primeng/focustrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MenubarModule } from 'primeng/menubar';
import { MegaMenuModule } from 'primeng/megamenu';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CitasListComponent } from './Citas/citas-list/citas-list.component';
import { CitasCreateComponent } from './Citas/citas-create/citas-create.component';
import { MeListComponent } from './medisol/me-list/me-list.component';
import { MeCreateComponent } from './medisol/me-create/me-create.component';
import { ImprimirComponent } from './comprante/imprimir/imprimir.component';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { CitasUpdateComponent } from './Citas/citas-update/citas-update.component';
import { ListComponent } from './ReservaHoras/list/list.component';
import { CreateComponent } from './ReservaHoras/create/create.component';
import { GenerarRepoComponent } from './Reportes/generar-repo/generar-repo.component';
import { ChartModule } from 'primeng/chart';
import { UpdateComponent } from './ReservaHoras/update/update.component';
import { SeListComponent } from './Secretaria/se-list/se-list.component';
import { SeCreateComponent } from './Secretaria/se-create/se-create.component';
import { ExamenCreateComponent } from './Examen/examen-create/examen-create.component';
import { ExamenUpdateComponent } from './Examen/examen-update/examen-update.component';
import { ExamenListComponent } from './Examen/examen-list/examen-list.component'
import { ProgressBarModule } from 'primeng/progressbar';
import { GenerarRepoExamenComponent } from './Reportes/generar-repo-examen/generar-repo-examen.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { SlideMenuModule } from 'primeng/slidemenu';
import { TrCreateComponent } from './Trabajo/tr-create/tr-create.component';
import { TrListComponent } from './Trabajo/tr-list/tr-list.component';
import { TrUpdateComponent } from './Trabajo/tr-update/tr-update.component';
@NgModule({
  declarations: [
    AppComponent,
    CreateUsuarioComponent,
    ListUsuarioComponent,
    UpdateUsuarioComponent,
    CitasListComponent,
    CitasCreateComponent,
    MeListComponent,
    MeCreateComponent,
    ImprimirComponent,
    CitasUpdateComponent,
    ListComponent,
    CreateComponent,
    GenerarRepoComponent,
    UpdateComponent,
    SeListComponent,
    SeCreateComponent,
    ExamenCreateComponent,
    ExamenUpdateComponent,
    ExamenListComponent,
    GenerarRepoExamenComponent,
    TrCreateComponent,
    TrListComponent,
    TrUpdateComponent

  ],
  imports: [
    BrowserModule,
    SlideMenuModule,
    ProgressBarModule,
    PDFExportModule,
    ChartModule,
    InputSwitchModule,
    TriStateCheckboxModule,
    MenubarModule, MegaMenuModule,
    AppRoutingModule,
    DropdownModule,
    HttpClientModule,
    ButtonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    BlockUIModule,
    FormsModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    InputMaskModule,
    ToolbarModule,
    KeyFilterModule,
    SplitButtonModule,
    AccordionModule,
    BrowserAnimationsModule,
    ToastModule,
    CalendarModule,
    MultiSelectModule,
    DropdownModule,
    DialogModule,
    FileUploadModule,
    DragDropModule,
    InputTextModule,
    OverlayPanelModule,
    DividerModule,
    FocusTrapModule,
    TooltipModule,
    SweetAlert2Module.forRoot(),
    SweetAlert2Module,
    SweetAlert2Module.forChild({ /* options */ }),

  ],
  providers: [ServiceService, DatePipe, { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CitasCreateComponent } from './Citas/citas-create/citas-create.component';
import { CitasListComponent } from './Citas/citas-list/citas-list.component';
import { CitasUpdateComponent } from './Citas/citas-update/citas-update.component';
import { ImprimirComponent } from './comprante/imprimir/imprimir.component';
import { ExamenListComponent } from './Examen/examen-list/examen-list.component';
import { MeCreateComponent } from './medisol/me-create/me-create.component';
import { MeListComponent } from './medisol/me-list/me-list.component';
import { CreateUsuarioComponent } from './Usuario/create-usuario/create-usuario.component';
import { ListUsuarioComponent } from './Usuario/list-usuario/list-usuario.component';
import { UpdateUsuarioComponent } from './Usuario/update-usuario/update-usuario.component';
import { ListComponent } from './ReservaHoras/list/list.component'
import { CreateComponent } from './ReservaHoras/create/create.component';
import { GenerarRepoComponent } from './Reportes/generar-repo/generar-repo.component'
import { UpdateComponent } from './ReservaHoras/update/update.component';
import { SeListComponent } from './Secretaria/se-list/se-list.component'
import { SeCreateComponent } from './Secretaria/se-create/se-create.component';
import { ExamenCreateComponent } from './Examen/examen-create/examen-create.component';
import { ExamenUpdateComponent } from './Examen/examen-update/examen-update.component';
import { GenerarRepoExamenComponent } from './Reportes/generar-repo-examen/generar-repo-examen.component';
import { TrListComponent } from './Trabajo/tr-list/tr-list.component'
import { TrCreateComponent } from './Trabajo/tr-create/tr-create.component';
import { TrUpdateComponent } from './Trabajo/tr-update/tr-update.component';
const routes: Routes = [

  {
    path: 'list/EXAMEN',
    component: ExamenListComponent
  },
  {
    path: 'examen/add',
    component: ExamenCreateComponent
  },
  {
    path: 'examen/update',
    component: ExamenUpdateComponent
  },
  {
    path: 'list/ADMINISTRADOR',
    component: ListUsuarioComponent
  },

  {
    path: 'update/perso',
    component: UpdateUsuarioComponent
  },
  {
    path: 'add/registry',
    component: CreateUsuarioComponent
  },
  {
    path: 'usuario/citas/create',
    component: CitasCreateComponent
  },
  {
    path: 'list/USUARIO',
    component: CitasListComponent
  },
  {
    path: 'admin/medisol/list',
    component: MeListComponent
  },
  {
    path: 'admin/medisol/add',
    component: MeCreateComponent
  },
  {
    path: 'imprimr',
    component: ImprimirComponent
  },
  {
    path: 'usuario/citas/update',
    component: CitasUpdateComponent
  },
  {
    path: 'usuario/reserva/horas',
    component: ListComponent
  },
  {
    path: 'usuario/reserva/horas/create',
    component: CreateComponent
  },
  {
    path: 'usuario/reporte/estudio',
    component: GenerarRepoComponent
  },
  {
    path: 'usuario/reporte/examen',
    component: GenerarRepoExamenComponent
  },
  {
    path: 'usuario/reserva/horas/update',
    component: UpdateComponent
  },
  {
    path: 'list/ADMISION',
    component: SeListComponent
  },
  {
    path: 'ADMISION/citas/create',
    component: SeCreateComponent
  },
  {
    path: 'administrador/trabajo/list',
    component: TrListComponent
  },
  {
    path: 'administrador/trabajo/create',
    component: TrCreateComponent
  },
  {
    path:'administrador/trabajo/update',
    component:TrUpdateComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

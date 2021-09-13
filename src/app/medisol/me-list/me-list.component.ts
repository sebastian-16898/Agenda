import { Component, OnInit } from '@angular/core';
import { medisol } from 'src/app/Modelo/medisol';
import { persona } from 'src/app/Modelo/persona';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-me-list',
  templateUrl: './me-list.component.html',
  styleUrls: ['./me-list.component.css']
})
export class MeListComponent implements OnInit {

  constructor(private service: ServiceService) { }
  medi: medisol[];
  displayM: boolean = false;
  me: medisol = new medisol();
  public isError = false;
  public msgError = '';
  personas: persona[];
  selectpersona: persona;
  logeo: boolean = true;

  ngOnInit(): void {
    this.service.getAllMedisol().subscribe(data => {
      this.medi = data;
    })

    this.service.getPersonaUsuario().subscribe(data => {
      this.personas = data;
    })
  }

  updateMedi(medi: medisol) {
    this.selectpersona = medi.p_cedula;
    this.me = medi;
    this.displayM = true;
    this.logeo = false;
  }

  onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }

  onRowSelect(event) {
    this.logeo = false;
    this.me.p_cedula = this.selectpersona;
  }

  cancelar() {
    this.logeo = true;
    this.selectpersona = null;
    this.me.direccion = null;
    this.me.nombre_medisol = null;
  }

  guardar() {
    if (this.me.nombre_medisol == null || this.me.direccion == null) {
      this.msgError = "Llene todos los campos";
      this.onIsError();
    } else {
      this.service.updateMedisol(this.me).subscribe(data => {
        this.displayM = false;
      })
    }
  }

}

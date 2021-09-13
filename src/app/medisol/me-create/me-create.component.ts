import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { medisol } from 'src/app/Modelo/medisol';
import { persona } from 'src/app/Modelo/persona';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-me-create',
  templateUrl: './me-create.component.html',
  styleUrls: ['./me-create.component.css']
})
export class MeCreateComponent implements OnInit {

  constructor(private service: ServiceService, private router: Router) { }

  medi: medisol = new medisol();
  public isError = false;
  public msgError = '';
  personas: persona[];
  selectpersona: persona;
  logeo: boolean = true;

  ngOnInit(): void {
    this.service.getPersonaUsuario().subscribe(data => {
      this.personas = data;
    })
  }

  onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }

  onRowSelect(event) {
    this.logeo = false;
    this.medi.p_cedula = this.selectpersona;
  }

  cancelar() {
    this.logeo = true;
    this.selectpersona = null;
    this.medi.direccion = null;
    this.medi.nombre_medisol = null;
  }

  guardar() {
    if (this.medi.nombre_medisol == null || this.medi.direccion == null) {
      this.msgError = "Llene todos los campos";
      this.onIsError();
    } else {
      this.service.createMedisol(this.medi).subscribe(data => {
        this.router.navigate(['admin/medisol/list']);
      })
    }
  }
}

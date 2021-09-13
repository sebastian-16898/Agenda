import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { citas } from 'src/app/Modelo/citas';
import { especialidades } from 'src/app/Modelo/especialidades';
import { estucita } from 'src/app/Modelo/examencita';
import { horas } from 'src/app/Modelo/horas';
import { medisol } from 'src/app/Modelo/medisol';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-imprimir',
  templateUrl: './imprimir.component.html',
  styleUrls: ['./imprimir.component.css'],
  styles: [`
    kendo-pdf-export {
      font-family: "DejaVu Sans", "Arial", sans-serif;
      font-size: 12px;
      avoidLinks: true
    }
  `]
})

export class ImprimirComponent implements OnInit {

  constructor(private service: ServiceService, private router: Router) { }
  cita: citas = new citas;
  date: Date;
  medi: medisol = new medisol();
  estu: estucita[];
  public repeatHeaders = true;
  ex: String = "";
  cedula: String;
  nombre: String;
  consultorio: String;
  direccion: String;

  pacedula: string;
  nombrepa: String;
  horasS: String;
  nombredoctor: String;
  ceduladoctor: String;
  especialidad: String;
  ngOnInit(): void {
    this.cita = new citas();
    let id_cita = localStorage.getItem("id_cita");
    this.service.getCita(id_cita).subscribe(data => {
      this.cita = data;
      this.nombre = this.cita.id_usuario.p_cedula.p_primer_apellido + " " +
        this.cita.id_usuario.p_cedula.p_primer_nombre;
      this.cedula = this.cita.id_usuario.p_cedula.p_cedula;
      this.pacedula = String(this.cita.id_paciente.pa_cedula);
      this.nombrepa = this.cita.id_paciente.pa_apellidos + " " + this.cita.id_paciente.pa_nombres;
      this.horasS = this.cita.id_hora_inicio.hora_inicio + "-" + this.cita.id_hora_fin.hora_inicio;
      this.ceduladoctor = this.cita.id_doctor.p_cedula;
      this.nombredoctor = this.cita.id_doctor.p_primer_apellido + " " +
        this.cita.id_doctor.p_primer_nombre;
      this.especialidad = this.cita.especialidad.especialidad;

      this.service.getMedisol(data.id_usuario.p_cedula.p_cedula).subscribe(data2 => {
        this.medi = data2;
        this.consultorio = this.medi.nombre_medisol;
        this.direccion = this.medi.direccion;
      })
      this.service.listAllECid_cita(this.cita.id_cita).subscribe(data => {
        this.estu = data;
        for (let index = 0; index < this.estu.length; index++) {
          var e = this.estu[index].id_examen.codigo_estudio + " " + this.estu[index].id_examen.id_estudio.es_descripcion + ": " + this.estu[index].id_examen.ex_descripcion;
          this.ex = this.ex + " // " + e;
        }
      })
    })




  }
  cancelar() {
    this.router.navigate(['list/USUARIO']);
  }

}

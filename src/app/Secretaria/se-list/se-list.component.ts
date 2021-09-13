import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { citas } from 'src/app/Modelo/citas';
import { estucita } from 'src/app/Modelo/examencita';
import { medisol } from 'src/app/Modelo/medisol';
import { ServiceService } from 'src/app/Service/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-se-list',
  templateUrl: './se-list.component.html',
  styleUrls: ['./se-list.component.css']
})
export class SeListComponent implements OnInit {

  constructor(private service: ServiceService, private router: Router) { }

  @ViewChild('dt') table: Table;
  @ViewChild('dt2') table2: Table;
  cita: citas[];
  date: Date;
  esta: String;
  CurrentDate: Date = new Date();
  medi: medisol = new medisol();
  public repeatHeaders = true;
  logeo: boolean = true;
  cedula: String;
  ngOnInit() {

  }
  llenarcita() {
    if (this.cedula.length > 0 && this.cedula != null) {
      this.service.getPacienteCita(this.cedula).subscribe(data => {

        if (data.length == 0) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'La cedula ingresada no esta registrado o la cedula es incorrecto'
          })
        } else {
          this.cita = data;
        }
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Digite los 10 digistos de la cedula del paciente'
      })
    }
  }

  atendido(estu: citas) {
    if (!estu.estado) {
      Swal.fire({
        title: 'Esta sera atendida y no se podra cambiar',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `SI`,
        denyButtonText: `NO`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.service.updateCitaAtencion(estu).subscribe(data => {
            if (data == null) {
              this.cita = new Array();
              this.llenarcita();
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Esta Cita ya caduco!',
                footer: 'PUEDE CREAR OTRA CITA PARA EL PACIENTE ' + estu.id_paciente.pa_cedula
              })
            } else {
              this.cita = new Array();
              this.llenarcita();
              Swal.fire('Atentido', '', 'success')
            }
          })

        } else if (result.isDenied) {
          this.cita = new Array();
          this.llenarcita();
          Swal.fire('Los cambios no se guardaron', '', 'info')
        } else if (result.isDismissed) {
          this.cita = new Array();
          this.llenarcita();
          Swal.fire('Los cambios no se guardaron', '', 'info')
        }
      })
    } else {
      this.cita = new Array();
      this.llenarcita();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Esta Cita ya fue atentida!',
        footer: 'PUEDE CREAR OTRA CITA PARA EL PACIENTE ' + estu.id_paciente.pa_cedula
      })
    }
  }


  estu: estucita[];
  nombremedisol: String;
  nombres: String;
  estucitas(es: citas) {
    this.estu = new Array();
    this.medi = null;
    this.nombres = "";
    this.nombremedisol = "";
    this.service.listAllECid_cita(es.id_cita).subscribe(data => {
      this.estu = data;
      this.logeo = es.estado;
      let cedula = es.id_usuario.p_cedula.p_cedula;
      this.service.getMedisol(cedula).subscribe(data => {
        this.medi = data;
        this.nombremedisol = this.medi.nombre_medisol;
        this.nombres = this.medi.p_cedula.p_primer_nombre + " " + this.medi.p_cedula.p_primer_apellido
      })
    })
  }



  imprimir(cita: citas) {
    localStorage.setItem("id_cita", cita.id_cita.toString());
    this.router.navigate(['imprimr']);
  }



}

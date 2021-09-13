import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { citas } from 'src/app/Modelo/citas';
import { especialidades } from 'src/app/Modelo/especialidades';
import { estucita } from 'src/app/Modelo/examencita';
import { estudios } from 'src/app/Modelo/estudios';
import { horas } from 'src/app/Modelo/horas';
import { paciente } from 'src/app/Modelo/paciente';
import { persona } from 'src/app/Modelo/persona';
import { ServiceService } from 'src/app/Service/service.service';
import Swal from 'sweetalert2';
import { examenes } from 'src/app/Modelo/examenes';
import { usuario } from 'src/app/Modelo/usuario';




@Component({
  selector: 'app-citas-create',
  templateUrl: './citas-create.component.html',
  styleUrls: ['./citas-create.component.css']
})


export class CitasCreateComponent implements OnInit {

  constructor(private datePipe: DatePipe, private service: ServiceService, private router: Router) { }
  cita: citas = new citas();
  public isError = false;
  public msgError = '';
  hora: horas[];
  selecthora: horas[];
  logeo: boolean = true;
  perso: paciente = new paciente();
  cedula: String;
  panel: boolean = false;
  paciente: paciente = new paciente();
  dates: Date;
  exa: examenes[];
  selectEx: examenes[];
  initialDate: any;
  formattedDate: Date;
  useri: String;
  estuci: estucita = new estucita();
  espe: especialidades[];
  selectEspe: especialidades;
  person: persona[];
  SelecPerso: persona;
  estudio: estudios[];
  selectEstudio: estudios;
  veriEstudio: boolean = false;
  veriDoctor: boolean = false;
  user: usuario;
  veriPaci: Boolean = false;
  logeo2:boolean=true;
  ngOnInit(): void {

    let user = localStorage.getItem("user");
    this.useri = user;
    this.service.getuser(this.useri).subscribe(data => {
      this.user = data;
    });

    this.service.Listespecialidades().subscribe(data => {
      this.espe = data;
    });

    this.service.listAllEstudis().subscribe(data => {
      this.estudio = data;
    })
  }

  cancelar() {
    this.panel = false;
  }

  llenarExamenes() {
    if (this.selectEstudio != null) {
      this.veriEstudio = true;
      this.exa = new Array();
      this.service.getExamenEstudio(this.selectEstudio.id_estudio).subscribe(data => {
        this.exa = data;
      })
    } else {
      this.veriEstudio = false;
      this.exa = new Array();
    }
  }

  llenarMedico() {
    if (this.selectEspe != null) {
      this.veriDoctor = true;
      this.person = new Array();
      this.service.getMedisol(this.user.p_cedula.p_cedula).subscribe(data => {
        this.service.getDoctor2(this.selectEspe.id_espe, data.id_medisol).subscribe(data => {
          data.forEach(element => {
            this.person.push(element.p_cedula);
          });
        })
      })
    } else {
      this.person = new Array();
      this.veriDoctor = false;
    }
  }

  verificarPaciente() {
    if (this.cedula == null) {
      this.msgError = "Ingrese la cedula";
      this.onIsError();
      this.veriPaci = false;
    } else {
      this.service.getPacienteCedula(this.cedula).subscribe(data => {
        if (data != null) {
          this.perso = data;
          this.veriPaci = true;
        } else {
          Swal.fire({
            title: 'Esta: ' + this.cedula + ' no esta registrado o la cedula esta incorrecta',
            text: "¿Quieres registrar a este paciente?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, registrar!'
          }).then((result) => {
            if (result.isConfirmed) {
              this.panel = true;
              this.paciente.pa_cedula = this.cedula;
              this.selecthora = new Array();
              this.dates = null;
              this.paciente = new paciente();
            } else {
              if (result.isDismissed) {
                this.cedula = null;
                this.veriPaci = false;
              }
            }
          })
        }

      })
    }
  }

  guardarPaciente() {

    try {
      this.onIsError();
      if (this.paciente.pa_apellidos == null
        || this.paciente.pa_nombres == null
        || this.paciente.pa_telefono == null
        || this.paciente.pa_telefono.length != 10) {
        this.msgError = "Llene todos Los Camposs";
        this.onIsError();
      } else {
        this.paciente.pa_cedula = this.cedula;
        this.service.createPaciente(this.paciente).subscribe(data => {
          this.panel = false;
          this.cedula = this.paciente.pa_cedula;
          this.veriPaci = true;
          this.verificarPaciente();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'GUARDADO',
            showConfirmButton: false,
            timer: 1500
          })

        })
      }
    } catch (error) {
      this.msgError = error;
      this.onIsError();
    }

  }

  onRowSelect() {
    this.initialDate = this.datePipe.transform(this.dates, 'yyyy-MM-dd');
    this.formattedDate = this.initialDate;
    this.selecthora = new Array();
    if (this.selectEstudio != null) {
      this.service.getHorasDisp(this.formattedDate, this.selectEstudio.id_estudio).subscribe(data => {
        if (data != null) {
          this.hora = data;
        } else {
          this.dates = null;
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'La fecha selecciona es anterior o estan todos los horarios ocupados!'
          })
        }
      })
    } else {
      this.selecthora = new Array();
      alert("seleccione el estudio");
    }
  }

  borrar() {
    this.cedula = null;
    this.selectEx = new Array();
    this.dates = null;
    this.hora = new Array();
    this.selecthora = new Array();
    this.perso = new paciente();
    this.formattedDate = null;
    this.SelecPerso = new persona();
  }

  ordenar: horas[];
  guardarCita() {
    if (this.perso == null || this.selecthora.length == 0 || this.selectEspe == null || this.SelecPerso == null
      || this.formattedDate == null || this.dates == null || this.selectEx == null || this.veriEstudio == false
      || this.veriDoctor == false || this.veriPaci == false) {
      this.msgError = "Llene todos los campos";
      this.onIsError();
    } else {
      if (this.selecthora.length > 0 || this.selectEx.length > 0) {
        this.ordenar = this.selecthora.sort((a, b) => Number(a.hora_inicio) - Number(b.hora_inicio));
        this.service.getuser(this.useri).subscribe(data => {
          this.cita.id_usuario = data;
          this.cita.id_paciente = this.perso;
          this.cita.id_hora_fin = this.ordenar[0];
          this.cita.id_hora_inicio = this.ordenar[this.selecthora.length - 1];
          this.cita.especialidad = this.selectEspe;
          this.cita.id_doctor = this.SelecPerso;
          this.cita.fecha_cita = this.datePipe.transform(this.dates, 'yyyy-MM-dd');
          this.service.createCita(this.cita).subscribe(data => {
            this.service.verificar(data).subscribe(dataCita => {
              for (let index = 0; index < this.selectEx.length; index++) {
                this.estuci.id_cita = dataCita;
                this.estuci.id_examen = this.selectEx[index];
                this.estuci.fecha_cita = this.datePipe.transform(this.dates, 'yyyy-MM-dd');
                this.service.createEstCita(this.estuci).subscribe(data => {
                })
              }
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })

              Toast.fire({
                icon: 'success',
                title: 'Guardando...'
              })
              this.router.navigate(['list/USUARIO']);
            })

          })
        })
      } else {
        this.service.getuser(this.useri).subscribe(data => {
          this.cita.id_usuario = data;
          //this.cita.id_examen = this.selectexamenes;
          this.cita.id_paciente = this.perso;
          this.cita.id_hora_fin = this.selecthora[0];
          this.cita.id_hora_inicio = this.selecthora[0];
          this.cita.id_doctor = this.SelecPerso;
          this.cita.fecha_cita = this.datePipe.transform(this.dates, 'yyyy-MM-dd');
          this.cita.especialidad = this.selectEspe;
          this.service.createCita(this.cita).subscribe(data => {
            this.estuci.id_cita = data;
            this.estuci.id_examen = this.selectEx[0];
            this.estuci.fecha_cita = this.datePipe.transform(this.dates, 'yyyy-MM-dd');
            this.service.createEstCita(this.estuci).subscribe(data => {
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })

              Toast.fire({
                icon: 'success',
                title: 'Guardando...'
              })
              this.router.navigate(['list/USUARIO']);
            })

          })
        })
      }
    }
  }

  onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }
}


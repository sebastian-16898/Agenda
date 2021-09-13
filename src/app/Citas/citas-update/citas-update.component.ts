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
  selector: 'app-citas-update',
  templateUrl: './citas-update.component.html',
  styleUrls: ['./citas-update.component.css']
})


export class CitasUpdateComponent implements OnInit {

  constructor(private datePipe: DatePipe, private service: ServiceService, private router: Router) { }
  cita: citas = new citas();
  public isError = false;
  public msgError = '';
  hora: horas[];
  logeo2:boolean=true;
  selecthora: horas[];
  logeo: boolean = true;
  perso: paciente = new paciente();
  cedula: String;
  panel: boolean = false;
  paciente: paciente = new paciente();
  dates: Date;
  exa: examenes[];
  selectEx: examenes[];
  selectEx2: examenes[]
  initialDate: any;
  formattedDate: Date;
  useri: String;
  estuci: estucita = new estucita();
  espe: especialidades[];
  selectEspe: especialidades;
  person: persona[];
  SelecPerso: persona;
  selectEstudio: estudios;
  veriEstudio: boolean = true;
  veriDoctor: boolean = true;
  user: usuario;
  estudio: estudios[];

  ngOnInit(): void {
    
    this.service.Listespecialidades().subscribe(data => {
      this.espe = data;
    });


    this.service.listAllEstudis().subscribe(data => {
      this.estudio = data;
    });


    let id_cita = localStorage.getItem("id_cita");

    this.service.getCita(id_cita).subscribe(data => {
      if (data != null) {
        let user = localStorage.getItem("user");
        this.useri = user;
        this.service.getuser(this.useri).subscribe(dataU => {
          this.user = dataU;
          this.service.getMedisol(this.user.p_cedula.p_cedula).subscribe(dataM => {
            this.service.getDoctor2(this.selectEspe.id_espe, dataM.id_medisol).subscribe(data => {
              this.person = new Array();
              data.forEach(element => {
                this.person.push(element.p_cedula);
              });
            })
          });
        });
        
      
        this.SelecPerso = data.id_doctor;
        this.perso = data.id_paciente;
        this.cedula = data.id_paciente.pa_cedula;
        this.cita = data;
        this.SelecPerso = data.id_doctor;
        this.selectEspe = data.especialidad;
        this.service.listAllECid_cita(data.id_cita).subscribe(estucitas => {
          this.selectEx = new Array();

          for (let index = 0; index < estucitas.length; index++) {
            
            this.selectEstudio = estucitas[index].id_examen.id_estudio;

          }
          this.service.getExamenEstudio(this.selectEstudio.id_estudio).subscribe(data => {
            this.exa = data;
          })
          for (let index = 0; index < estucitas.length; index++) {
            this.selectEx.push(estucitas[index].id_examen);
          }
          

          this.selectEx2 = this.selectEx;
          this.initialDate = data.fecha_cita;
          this.formattedDate = this.initialDate;

          this.service.getHorasDisp(this.formattedDate, this.selectEstudio.id_estudio).subscribe(hd => {
            this.service.updateHoras(data).subscribe(datas => {
              this.service.getHoras().subscribe(hoD => {
                let temp = new Date(this.formattedDate)
                let ant = 1 * 86400 //dias en segundos
                let finalDate = new Date(temp.setSeconds(ant));
                this.dates = new Date(finalDate);
                this.hora = new Array();
                this.hora = hoD;
                this.selecthora = new Array();

                for (let index = Number(data.id_hora_inicio.id_hora) - 1; index < Number(data.id_hora_fin.id_hora); index++) {
                  this.selecthora.push(this.hora[index]);
                };
              
              })

            })
          })
        })
      }
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
    } else {
      this.service.getPacienteCedula(this.cedula).subscribe(data => {
        if (data != null) {
          this.perso = data;
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
    this.service.getHorasDisp(this.formattedDate, "").subscribe(data => {
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
  }

  borrar() {
    this.cedula = null;
    this.selectEx = new Array();
    this.dates = null;
    this.hora = new Array();
    this.selecthora = new Array();
    this.perso = new paciente();
    this.formattedDate = null;
    this.SelecPerso == null
  }

  ordenar: horas[];
  guardarCita() {
    if (this.perso == null || this.selecthora.length == 0 || this.selectEspe == null || this.SelecPerso == null
      || this.formattedDate == null || this.dates == null || this.selectEx == null) {
      this.msgError = "Llene todos los campos";
      this.onIsError();
    } else {
      if (this.selecthora.length > 0 || this.selectEx.length > 0) {
        this.ordenar = this.selecthora.sort();
        var total = this.ordenar.length;
        this.cita.id_paciente = this.perso;
        this.cita.id_hora_fin = this.ordenar[Number(total - 1)];
        this.cita.id_hora_inicio = this.ordenar[0];
        this.cita.especialidad = this.selectEspe;
        this.cita.id_doctor = this.SelecPerso;
        this.cita.fecha_cita = this.datePipe.transform(this.dates, 'yyyy-MM-dd');
        this.service.deleteEstuCita2(this.cita.id_cita).subscribe(data => {
          this.service.updateCita(this.cita).subscribe(data => {
            this.service.verificar(data).subscribe(dataCita => {

              for (let index = 0; index < this.selectEx.length; index++) {
                this.estuci.id_cita = dataCita;
                this.estuci.fecha_cita = this.datePipe.transform(this.dates, 'yyyy-MM-dd');
                this.estuci.id_examen = this.selectEx[index];
                this.service.updateEstuCita(this.estuci).subscribe(data => {
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
                title: 'Actualizando...'
              })
              this.router.navigate(['list/USUARIO']);
            })
          });


        })

      } else {

        this.cita.id_paciente = this.perso;
        this.cita.id_hora_fin = this.selecthora[0];
        this.cita.id_hora_inicio = this.selecthora[0];
        this.cita.fecha_cita = this.datePipe.transform(this.dates, 'yyyy-MM-dd');
        this.cita.especialidad = this.selectEspe;
        this.cita.id_doctor = this.SelecPerso;
        this.service.deleteEstuCita2(this.cita.id_cita).subscribe(data => {
          this.service.updateCita(this.cita).subscribe(data => {
            this.estuci.id_cita = data;
            //this.estuci.id_estudio = this.selectEstudio[0];
            this.estuci.fecha_cita = this.datePipe.transform(this.dates, 'yyyy-MM-dd');
            this.service.deleteEstuCita2(data.id_cita).subscribe(data => {
              this.service.updateEstuCita(this.estuci).subscribe(data => {
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
                  title: 'Actualizando...'
                })
                this.router.navigate(['list/USUARIO']);
              })
            });
          });
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

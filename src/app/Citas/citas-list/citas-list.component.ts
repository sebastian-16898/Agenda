import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { citas } from 'src/app/Modelo/citas';
import { estucita } from 'src/app/Modelo/examencita';
import { medisol } from 'src/app/Modelo/medisol';
import { ServiceService } from 'src/app/Service/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-citas-list',
  templateUrl: './citas-list.component.html',
  styleUrls: ['./citas-list.component.css'],
  styles: [`:host ::ng-deep {
    .p-paginator {
        .p-paginator-current {
            margin-left: auto;
        }
    }
    
    .p-progressbar {
        height: .5rem;
        background-color: #D8DADC;
    
        .p-progressbar-value {
            background-color: #607D8B;
        }
    }
    
    .table-header {
        display: flex;
        justify-content: space-between;
    }
    
    .p-calendar .p-datepicker {
        min-width: 25rem;
    
        td {
            font-weight: 400;
        }
    }
    
    .p-datatable.p-datatable-customers {
        .p-datatable-header {
            padding: 1rem;
            text-align: left;
            font-size: 1.5rem;
        }
    
        .p-paginator {
            padding: 1rem;
        }
    
        .p-datatable-thead > tr > th {
            text-align: left;
        }
    
        .p-datatable-tbody > tr > td {
            cursor: auto;
        }
    
        .p-dropdown-label:not(.p-placeholder) {
            text-transform: uppercase;
        }
    }

    .p-w-100 {
        width: 100%;
    }
    
    /* Responsive */
    .p-datatable-customers .p-datatable-tbody > tr > td .p-column-title {
        display: none;
    }
}

@media screen and (max-width: 960px) {
    :host ::ng-deep {
        .p-datatable {
            &.p-datatable-customers {
                .p-datatable-thead > tr > th,
                .p-datatable-tfoot > tr > td {
                    display: none !important;
                }
    
                .p-datatable-tbody > tr {
                    border-bottom: 1px solid var(--layer-2);
    
                    > td {
                        text-align: left;
                        width: 100%;
                        display: flex;
                        align-items: center;
                        border: 0 none;
    
                        .p-column-title {
                            min-width: 30%;
                            display: inline-block;
                            font-weight: bold;
                        }
        
                        p-progressbar {
                            width: 100%;
                        }

                        &:last-child {
                            border-bottom: 1px solid var(--surface-d);
                        }
                    }
                }
            }
        }
    }

}


`]
})
export class CitasListComponent implements OnInit {

  constructor(private service: ServiceService, private router: Router) { }

  @ViewChild('dt') table: Table;
  @ViewChild('dt2') table2: Table;
  cita: citas[];
  date: Date;
  esta: String;
  CurrentDate: Date = new Date();
  medi: medisol;
  public repeatHeaders = true;
  logeo: boolean = true;
  ngOnInit() {
    this.llenarcita();
  }

  llenarcita() {
    this.service.getAllCitas().subscribe(data => {
      this.cita = data;
    })
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


  deleteCita(ci: citas) {
    if (ci.estado == true) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Esta ya no se puede eliminar: "Cita Atendida"'
      })
    } else {
      Swal.fire({
        title: '¿Seguro que desea eliminar? "NO SE PODRAN REVERTIR LOS CAMBIOS"',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `Eliminar`,
        denyButtonText: `No Eliminar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.service.deleteCita(ci).subscribe(data => {
            if (data != null) {
              this.cita = new Array();
              this.llenarcita();
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Esta ya no se puede eliminar: "FECHA CADUCO"'
              })
            }

          })
          Swal.fire('Borrado!', '', 'success')
        } else if (result.isDenied) {
          Swal.fire('Cancelado', '', 'info')
        }
      })

    }
  }

  deleteEsCi(estu: estucita) {
    Swal.fire({
      title: '¿Deseas Eliminar este estudio?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Eliminar`,
      denyButtonText: `No Eliminar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.service.deleteEstuCita(estu).subscribe(data => {
          if (data == null) {
            Swal.fire({
              title: '¿Deseas Eliminat toda la cita?',
              showDenyButton: true,
              showCancelButton: true,
              confirmButtonText: `Eliminar`,
              denyButtonText: `No Eliminar`,
            }).then((result) => {
              if (result.isConfirmed) {
                this.deleteCita(estu.id_cita);
              } else if (result.isDenied) {
                Swal.fire('Cancelado', '', 'info')
              }
            })
          } else {
            Swal.fire('Eliminado', '', 'success')
          }
        })

      } else if (result.isDenied) {
        Swal.fire('Cancelado', '', 'info')
      }
    })

  }

  cols: any[];
  exportColumns: any[];
  colCita: citas[];
  nestu: estucita[];
  // exportPdf(cita: citas) {
  //   var estudio: String;
  ///   var jsPDF = require('jspdf');
  //   require('jspdf-autotable');
  //   const doc = new jsPDF.default(0, 0);
  //   this.service.listAllECid_cita(cita.id_cita).subscribe(data => {
  //     this.nestu = data;
  //     for (let index = 0; index < this.nestu.length; index++) {
  //       var e = this.nestu[index].id_estudio.codigo_estudio + ": " + this.nestu[index].id_estudio.es_descripcion;
  //       estudio = estudio + " // " + e;
  //    }
  //  })

  //  doc.setFontSize(10);
  //  doc.text(10, 46, '*****************************');
  //  doc.text(10, 50, 'Recibo de Cita Fechada');
  //  doc.text(10, 55, 'Cita No.: ' + cita.id_cita);
  //   doc.text(10, 60, 'Cedula: ' + cita.id_paciente.pa_cedula);
  //  doc.text(10, 65, 'Paciente: ' + cita.id_paciente.pa_apellidos + " " + cita.id_paciente.pa_nombres);
  //  doc.text(10, 70, 'Telefono: ' + cita.id_paciente.pa_telefono);
  //  doc.text(10, 75, 'Fecha/Hora: ' + cita.fecha_cita + " " + cita.id_hora_inicio.hora_inicio + "-" + cita.id_hora_fin.hora_inicio);
  //  doc.text(10, 85, 'Examenes a realizar: ' + estudio);
  //   doc.text(10, 95, 'Firma Paciente:_______________________________');
  //   doc.text(10, 100, 'Recibí conforme');
  //  doc.text(10, 104, '*****************************');
  //var logo = new Image();
  //logo.src = 'https://scontent.fcue3-1.fna.fbcdn.net/v/t1.0-9/122186891_2836518559949733_824989412639405082_n.jpg?_nc_cat=110&ccb=3&_nc_sid=09cbfe&_nc_ohc=wSdBCIzTD0gAX-1D__d&_nc_ht=scontent.fcue3-1.fna&oh=2ad5ac4cdb66d3d34eef5ccc871b2435&oe=6055ED10';
  //doc.addImage(logo, 'JPEG', 10, 10, 50, 30);

  //  doc.save('comprobante_Cita.pdf')
  // } // this.router.navigate(['imprimr']);

  imprimir(cita: citas) {
    localStorage.setItem("id_cita", cita.id_cita.toString());
    this.router.navigate(['imprimr']);
  }

  actulizar(cita: citas) {
    localStorage.setItem("id_cita", cita.id_cita.toString());
    this.router.navigate(['usuario/citas/update']);
  }
}

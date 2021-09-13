import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { examenes } from 'src/app/Modelo/examenes';
import { ServiceService } from 'src/app/Service/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-examen-list',
  templateUrl: './examen-list.component.html',
  styleUrls: ['./examen-list.component.css']
})
export class ExamenListComponent implements OnInit {

  constructor(private service: ServiceService, private router:Router) { }
  @ViewChild('dt') table: Table;

  exa: examenes[];
  loading: boolean = true;


  ngOnInit(): void {
    this.llenarTabal();
  }

  llenarTabal() {
    this.loading = false;
    this.service.getAllExamenes().subscribe(data => {
      this.exa = data;

    })
  }

  enableEstudio(estu: examenes) {
    var menssage = "";
    var veri: boolean;
    if (!estu.estado) {
      menssage = "INNABILITAR"
      veri = false;
    } else {
      menssage = "HABILITAR"
      veri = true;
    }
    Swal.fire({
      title: 'Esta seguro que desea ' + menssage + ' a este ESTUDIO: ' + estu.ex_descripcion,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `SI`,
      denyButtonText: `NO`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.enableExamen(estu).subscribe(data => {
          this.llenarTabal();
        })
        Swal.fire(menssage, '', 'success')
      } else if (result.isDenied) {
        this.exa = new Array();
        this.llenarTabal();
        Swal.fire('Los cambios no se guardaron', '', 'info')
      } else if (result.isDismissed) {
        this.exa = new Array();
        this.llenarTabal();
        Swal.fire('Los cambios no se guardaron', '', 'info')
      }
    })
  }

  public isError = false;
  public msgError = '';
  onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }

  update(e:examenes){
    localStorage.setItem("id_examen", e.id_examen.toString());
    this.router.navigate(['examen/update']);
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { estudios } from 'src/app/Modelo/estudios';
import { examenes } from 'src/app/Modelo/examenes';
import { ServiceService } from 'src/app/Service/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-examen-update',
  templateUrl: './examen-update.component.html',
  styleUrls: ['./examen-update.component.css']
})
export class ExamenUpdateComponent implements OnInit {

  constructor(private service: ServiceService, private router: Router) { }
  exa: examenes = new examenes;
  public isError = false;
  public msgError = '';
  estudio: estudios[];
  selecEstudio: estudios;
  agregar: boolean = false;
  update: boolean = false;
  Nestudi: estudios = new estudios;
  logeo: boolean = true;
  codigo: String;
  des: String;

  ngOnInit(): void {
    this.logeo = false;
    this.selecEstudio = new estudios();
    let id_examen = localStorage.getItem("id_examen");
    this.service.id_examenGet(id_examen).subscribe(data => {
      this.exa = data;
      this.codigo = this.exa.codigo_estudio;
      this.des = this.exa.ex_descripcion;
      this.selecEstudio = this.exa.id_estudio;
    })
    this.llenarTabal();
  }

  llenarTabal() {
    this.estudio = new Array();
    this.service.listAllEstudis().subscribe(data => {
      this.estudio = data;
    })
  }

  onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }

  guardarEstu() {
    if (this.Nestudi.es_descripcion == null) {
      this.msgError = "Llene todos los campos";
      this.onIsError();
    } else {
      this.service.createEstudio(this.Nestudi).subscribe(data => {
        this.Nestudi = new estudios();
        this.llenarTabal();
        this.agregar = false;
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
          title: 'Guardado...'
        })
      })

    }
  }

  updateEstu() {
    if (this.selecEstudio != null) {
      this.update = true;
      this.Nestudi = this.selecEstudio;
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Seleccione el estudio que desea actualziar'
      })
    }
  }

  guardarUpdate() {
    if (this.Nestudi != null) {
      this.service.updateEstudio(this.Nestudi).subscribe(data => {
        this.llenarTabal();
        this.borrar();
        this.update = false;
      })
    } else {
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
        title: 'Actualizado...'
      })
    }
  }

  onRowSelect() {
    if (this.selecEstudio != null) {
      this.logeo = false;
    }
  }

  borrar() {
    this.logeo = true;
    this.des = "";
    this.codigo = "";
    this.selecEstudio = null;
    this.exa = new examenes();
  }

  guardar() {
    if (this.des == null || this.codigo == null) {
      this.msgError = "Llene todos sus campos";
      this.onIsError();
    } else {
      this.exa.ex_descripcion = this.des;
      this.exa.codigo_estudio = this.codigo;
      this.exa.id_estudio = this.selecEstudio;
      this.service.updateExamen(this.exa).subscribe(data => {
        this.router.navigate(['list/EXAMEN']);
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'success',
          title: 'Guardado...'
        })
      })
    }
  }

}

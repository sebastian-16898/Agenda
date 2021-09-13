import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { especialidades } from 'src/app/Modelo/especialidades';
import { medisol } from 'src/app/Modelo/medisol';
import { persona } from 'src/app/Modelo/persona';
import { trabajo } from 'src/app/Modelo/trabajo';
import { ServiceService } from 'src/app/Service/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tr-update',
  templateUrl: './tr-update.component.html',
  styleUrls: ['./tr-update.component.css']
})
export class TrUpdateComponent implements OnInit {



  constructor(private service: ServiceService, private router: Router) { }
  public isError = false;
  public msgError = '';
  logeo: boolean = true;

  veriEspe: boolean = true;
  veriMedi: boolean = true;

  personas: persona[];
  selectpersona: persona;
  espe: especialidades[];
  selectespecialidad: especialidades;
  medi: medisol[];
  selectmedi: medisol;

  tr: trabajo = new trabajo();

  ngOnInit(): void {
    let id_trabajo = localStorage.getItem("id_trabajo");

    this.service.getOneTrabajo(id_trabajo).subscribe(dataT => {
      this.tr = dataT;
      this.service.getDoctor().subscribe(dataP => {
        this.personas = dataP;
      })

      this.service.getAllMedisol().subscribe(dataM => {
        this.medi = dataM;
      })

      this.service.Listespecialidades().subscribe(dataE => {
        this.espe = dataE;
      })

      this.selectmedi = this.tr.id_medisol;
      this.selectpersona = this.tr.p_cedula;
      this.selectespecialidad = this.tr.id_espe;
    })

  }

  veriEspecialdiad() {
    if (this.selectespecialidad != null) {
      this.veriEspe = true;
    } else {
      this.veriEspe = false;
    }
  }

  veriMedisol() {
    if (this.selectespecialidad != null) {
      this.veriMedi = true;
    } else {
      this.veriMedi = false;
    }
  }

  guardar() {
    if (this.veriEspe == false || this.veriMedi == false || this.selectpersona == null) {
      alert("llene todo")
    } else {
      this.tr.p_cedula = this.selectpersona;
      this.tr.id_espe = this.selectespecialidad;
      this.tr.id_medisol = this.selectmedi;
      this.service.updateTrabajo(this.tr).subscribe(data => {
        this.router.navigate(['administrador/trabajo/list']);
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
      })

    }
  }


  onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }

  borrar() {
    this.selectmedi = null;
    this.selectpersona = null;
    this.selectespecialidad = null;
    this.veriEspe = false;
    this.veriMedi = false;
  }


}

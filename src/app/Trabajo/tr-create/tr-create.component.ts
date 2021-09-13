import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { especialidades } from 'src/app/Modelo/especialidades';
import { medisol } from 'src/app/Modelo/medisol';
import { persona } from 'src/app/Modelo/persona';
import { trabajo } from 'src/app/Modelo/trabajo';
import { ServiceService } from 'src/app/Service/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tr-create',
  templateUrl: './tr-create.component.html',
  styleUrls: ['./tr-create.component.css']
})
export class TrCreateComponent implements OnInit {

  constructor(private service: ServiceService, private router: Router) { }
  public isError = false;
  public msgError = '';
  logeo: boolean = true;

  veriEspe: boolean = false;
  veriMedi: boolean = false;

  personas: persona[];
  selectpersona: persona;
  espe: especialidades[];
  selectespecialidad: especialidades;
  medi: medisol[];
  selectmedi: medisol;

  tr: trabajo = new trabajo();

  ngOnInit(): void {
    this.service.getDoctor().subscribe(data => {
      this.personas = data;
    })

    this.service.getAllMedisol().subscribe(data => {
      this.medi = data;
    })

    this.service.Listespecialidades().subscribe(data => {
      this.espe = data;
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
      this.service.addTrabajo(this.tr).subscribe(data => {
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
          title: 'Guardando...'
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

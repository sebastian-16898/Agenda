import { Component, OnInit } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';
import { ServiceService } from 'src/app/Service/service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { persona } from 'src/app/Modelo/persona';
import { perfiles } from 'src/app/Modelo/perfiles';

@Component({
  selector: 'app-update-usuario',
  templateUrl: './update-usuario.component.html',
  styleUrls: ['./update-usuario.component.css']
})
export class UpdateUsuarioComponent implements OnInit {

  constructor(private service: ServiceService, private router: Router) { }

  conversionDecryptOutput: string;
  encryptText: string;
  decPassword: string;
  usuarios: persona = new persona();

  plainText: string;
  encPassword: string;
  conversionEncryptOutput: string;

  des: String;
  items: MegaMenuItem[];
  perfil: perfiles[];
  selectPerfil: perfiles;
  ngOnInit(): void {

    let cedula = localStorage.getItem("id_usuario");
    this.service.getPersonaCedula(cedula).subscribe(data => {
      this.usuarios = data;
      this.selectPerfil = this.usuarios.id_perfil;
    });
    this.llenasPerfil();
  }

  llenasPerfil() {
    this.service.listPerfil().subscribe(Data => {
      this.perfil = Data;
    })
  }
  guardar() {
    try {
      this.usuarios.id_perfil=this.selectPerfil;
      if(this.usuarios.p_segundo_nombre==null){
        this.usuarios.p_segundo_nombre="N-A";
      }

      if(this.usuarios.p_segundo_apellido==null){
        this.usuarios.p_segundo_apellido="N-A";
      }
      this.service.updatePersona(this.usuarios).subscribe(data => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'ACTUALIZADO',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['list/ADMINISTRADOR']);

      });


    } catch (error) {
      alert("No Guardado");
    }
  }
  cancelar() {
    this.router.navigate(['list/ADMINISTRADOR']);
  }

  

  nuevo() {
    this.router.navigate(['superusuario/add/registry']);
  }

  onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }

  public isError = false;
  public msgError = '';

  panelActualizar: boolean = false;
  updateperfilPantalla() {
    if (this.selectPerfil != null) {
      this.panelActualizar = true;
      this.per = this.selectPerfil;
    } else {
      alert("Seleccione El Perfil")
    }
  }

  per: perfiles = new perfiles();
  suaveUpdatePefil() {
    this.service.createPerfil(this.per).subscribe(data => {
      this.perfil = new Array();
      this.panelActualizar = false;
      this.llenasPerfil();
      alert("Actualizado")
    })
  }


  panelActualizar2: boolean = false;
  blockDocument() {
    this.panelActualizar = false;
    this.panelActualizar2 = false;
    this.per = new perfiles();
  }
  createPanelPanel() {
    this.panelActualizar2 = true;
    this.per = new perfiles();
  }

  createPerfil() {
    if (this.per != null) {
      this.service.createPerfil(this.per).subscribe(data => {
        alert("guardado")
        this.blockDocument();
      })
    } else {
      alert("Llene todos los campos");
    }

  }
  
  id: Number;
  deletePerfil() {
    this.id = this.selectPerfil.id_perfil;
    if (this.selectPerfil != null) {
      Swal.fire({
        title: 'SEGURO QUE QUIERES BORRAR ESTE PERFIL: ' + this.selectPerfil.des_perfil,
        text: "NO PODREAS DESACER ESTA ACCION!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'SI, BORRAR ESTE PERFIL!'
      }).then((result) => {
        if (result.isConfirmed) {

          this.service.deletePerfil(this.id).subscribe(data => {
            this.perfil = new Array();
            this.llenasPerfil();
          })
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
    }
  }
}

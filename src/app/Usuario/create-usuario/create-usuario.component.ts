import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/Service/service.service';
import { MegaMenuItem } from 'primeng/api/public_api';
import Swal from 'sweetalert2';
import { persona } from 'src/app/Modelo/persona';
import { perfiles } from 'src/app/Modelo/perfiles';

@Component({
  selector: 'app-create-usuario',
  templateUrl: './create-usuario.component.html',
  styleUrls: ['./create-usuario.component.css']
})
export class CreateUsuarioComponent implements OnInit {

  constructor(private router: Router, private service: ServiceService) { }
  perfil: perfiles[];
  selectPerfil: perfiles;
  items: MegaMenuItem[];
  usuarios: persona = new persona();
  plainText: string;
  encPassword: string;
  conversionEncryptOutput: string;

  des: String;

  public isError = false;
  public msgError = '';
  ngOnInit(): void {
    this.llenasPerfil();
  }

  cancelar() {
    this.router.navigate(['list/ADMINISTRADOR']);
  }

  guardar() {

    try {
      this.onIsError();
      ///
      if (this.usuarios.p_primer_apellido == null
        || this.usuarios.p_cedula == null
        || this.usuarios.p_correo == null
        || this.usuarios.p_primer_nombre == null
        || this.selectPerfil == null
        || this.usuarios.p_cedula.length != 10) {
        this.msgError = "Llene todos Los Camposs";
        this.onIsError();
      } else {
        if (this.usuarios.p_segundo_nombre == null) {
          this.usuarios.p_segundo_nombre = "N-A";
        }

        if (this.usuarios.p_segundo_apellido == null) {
          this.usuarios.p_segundo_apellido = "N-A";
        }
        this.service.getPersonaCedula(this.usuarios.p_cedula).subscribe(dataPersona => {
          if (dataPersona == null) {
            this.usuarios.id_perfil = this.selectPerfil;
            this.service.createPersona(this.usuarios).subscribe(data => {

              if (data.id_perfil.des_perfil == "USUARIO" || data.id_perfil.des_perfil == "ADMISION") {
                Swal.fire({
                  title: 'Este usuario ' + data.p_cedula + " debe ponerle acargo de un medisol",
                  showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                  },
                  hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                  }
                })
                this.router.navigate(['admin/medisol/add']);
              } else {
                if(data.id_perfil.des_perfil=="DOCTOR"){
                  Swal.fire({
                    title: 'Este usuario ' + data.p_cedula + " debe ponerle acargo de un medisol",
                    showClass: {
                      popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                      popup: 'animate__animated animate__fadeOutUp'
                    }
                  })
                  this.router.navigate(['administrador/trabajo/create']);
                }
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'GUARDADO',
                  showConfirmButton: false,
                  timer: 1500
                })
                this.router.navigate(['list/ADMINISTRADOR']);
              }


            });
          } else {
            alert("Esta Persona ya esta registrado")
          }
        })
      }
    } catch (error) {
      this.onIsError();
    }

  }

  onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }

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

  llenasPerfil() {
    this.service.listPerfil().subscribe(Data => {
      this.perfil = Data;
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
          title: 'Guardado'
        })
        this.blockDocument();
        this.perfil = new Array();
        this.llenasPerfil();
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

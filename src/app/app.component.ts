import { Component, OnInit } from '@angular/core';
import { ServiceService } from './Service/service.service';
import { MegaMenuItem, PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';
import { persona } from './Modelo/persona';
import { usuario } from './Modelo/usuario';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'agenda';
  panel: boolean = true;
  display: boolean = false;
  displayR: boolean = false;
  logeo: boolean = true;
  items: MegaMenuItem[];
  constructor(private service: ServiceService, private router: Router, private primengConfig: PrimeNGConfig) { this.router.navigate(['']); }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  cerrarSesion() {
    this.panel = true;
    this.items = new Array();
    this.clave = null;
    this.u = null;
    this.router.navigate(['']);
  }

  registrar() {
    this.perso = new persona();
    this.cedula = "";
    this.logeo = true;
    this.usu = new usuario();
    this.displayR = true;
  }

  cedula: String;
  perso: persona = new persona();
  usu: usuario = new usuario();
  verificar() {
    this.service.getVeriUsuario(this.cedula).subscribe(data => {
      if (data == null) {
        this.service.getPersonaCedula(this.cedula).subscribe(data => {
          if (data != null) {
            if (data.estado == true) {
              if (data.id_perfil.des_perfil != "DOCTOR") {
                this.perso = data;
                this.logeo = false;
              } else {
                this.cedula = "";
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Solo personal autorizado puede registrarse!',
                  footer: 'Comuniquese con el ADMINISTRADOR para mas informacion'
                })
              }
            } else {
              this.cedula = "";
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Este Usuario esta bloqueado!',
                footer: 'Comuniquese con el ADMINISTRADOR'
              })
            }
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'El numero de cedula no existe o esta incorrecto!',
              footer: 'Comuniquese con el ADMINISTRADOR'
            })
            this.perso = new persona();
          }
        })
      } else {
        this.msgError2 = "Usuario ya registrado";
        this.onIsError2();
      }
    })

  }

  //Crear Usuario
  textoEncriptado: string;
  encPass: string;
  enctexto: string;
  Upersona: persona = new persona();
  createUsu() {

    this.usu.p_cedula = this.perso;
    this.service.getuser(this.encPass).subscribe(data => {
      if (!data) {
        this.textoEncriptado = CryptoJS.AES.encrypt(this.enctexto.trim(), this.encPass.trim()).toString();
        this.usu.clave = this.textoEncriptado;
        this.usu.useri = this.encPass;
        this.service.createUsuario(this.usu).subscribe(data => {
          if (data) {
            this.Upersona = this.usu.p_cedula;
            this.Upersona.activo = true;
            this.service.enabled(this.Upersona, "enableAccion/").subscribe(data => {
              alert("Guardado")
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
                title: 'Guardando'
              })
              this.cancelar();
            });
          }

        })
      } else {
        this.msgError2 = "Este Nombre de usuario ya registrado";
        this.onIsError2();
      }
    })

  }

  cancelar() {
    this.perso = new persona();
    this.cedula = "";
    this.logeo = true;
    this.usu = new usuario();
    this.displayR = false;
  }

  clave: String;
  u: String;
  textoDesencriptado: string;
  destexto: string;
  desPass: string;
  cont: number = 4;
  veri: String = "";
  subirCont() {
    var prueba = 1;
    this.cont = this.cont - prueba;
  }

  disablePerso: persona;
  ingresar() {
    if (this.u != null || this.clave != null) {
      this.service.getuser(this.u).subscribe(data2 => {
        if (this.veri != this.u) {
          this.cont = 4;
        }
        if (data2 != null) {

          if (data2.p_cedula.activo) {

            if (this.cont == 0 && this.veri == data2.useri) {
              this.service.getPersonaCedula(data2.p_cedula.p_cedula).subscribe(data => {
                this.disablePerso = data;
                this.disablePerso.activo = false;
                this.service.updatePersona(data).subscribe(data3 => {
                  Swal.fire('Los Intentos Permitidos Fueron Excedidos y su usuario sera bloqueado COMUNIQUESE CON EL ADMINISTRADOR')
                })
              })
              this.cont = 4;
            } else {
              this.subirCont();
              this.veri = data2.useri;
            }
            this.desPass = this.u.toString();
            this.destexto = data2.clave.toString();
            this.textoDesencriptado = CryptoJS.AES.decrypt(this.destexto.trim(), this.desPass.trim()).toString(CryptoJS.enc.Utf8);
            if (this.clave == this.textoDesencriptado) {
              //this.service.Login(data2).subscribe(login => { })
              this.panel = false;
              this.Selecitems(data2.p_cedula.id_perfil.des_perfil);
              this.cont = 4;
              localStorage.setItem("user", data2.useri.toString());
              this.router.navigate(['list/' + data2.p_cedula.id_perfil.des_perfil]);
            } else {
              this.msgError = "nombre de usuario y contraseña incorrectos ";
              this.onIsError();
              this.desPass = null;
              this.destexto = null;
              this.textoDesencriptado = null;
            }
          } else {
            Swal.fire(
              'USUARIO BLOQUEADO',
              'COMUNIQUESE CON EL ADMINISTRADOR PARA SOLUCIONAR',
              'error'
            )
          }
        } else {
          this.msgError = "Datos Incorrectos";
          this.onIsError();
        }
      })
    } else {
      this.msgError = "Llene Todos Los Campos";
      this.onIsError();
    }
  }

  //En caso de errores

  public isError = false;
  public msgError = '';
  onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }

  public isError2 = false;
  public msgError2 = '';
  onIsError2(): void {
    this.isError2 = true;
    setTimeout(() => {
      this.isError2 = false;
    }, 4000);
  }

  Selecitems(ite: String) {
    if (ite == "ADMINISTRADOR") {
      this.items = [
        {
          label: 'AGREGAR', icon: 'pi pi-fw pi-users',
          items: [
            [
              {
                items: [
                  {
                    icon: 'pi pi-fw pi-users', label: 'Usuario', routerLink: 'add/registry'
                  },
                  {
                    icon: 'pi pi-book', label: 'Examen', routerLink: 'examen/add'
                  },
                  {
                    icon: 'fa fa-hospital-o', label: 'Medisol', routerLink: 'admin/medisol/add'
                  },
                  {
                    icon: 'fa fa-briefcase', label: 'Trabajo', routerLink: 'administrador/trabajo/create'
                  }
                ]
              }
            ]
          ]
        },
        {
          label: 'LISTAR', icon: 'fa fa-list-ol',
          items: [
            [
              {
                items: [
                  {
                    icon: 'pi pi-fw pi-users', label: 'Usuario', routerLink: 'list/ADMINISTRADOR'
                  },
                  {
                    icon: 'pi pi-book', label: 'Examen', routerLink: 'list/EXAMEN'
                  },
                  {
                    icon: 'fa fa-hospital-o', label: 'Medisol', routerLink: 'admin/medisol/list'
                  },
                  {
                    icon: 'fa fa-briefcase', label: 'Trabajo', routerLink: 'administrador/trabajo/list'
                  }
                ]

              }
            ]
          ]
        },
        {
          label: 'RESERVA DE HORAS', icon: 'fa fa-hourglass-half',
          items: [
            [
              {
                items: [

                  { label: 'RESERVAR', icon: 'fa fa-calendar-plus-o', routerLink: 'usuario/reserva/horas/create' },
                  { label: 'LISTAR DE HORAS', icon: 'fa fa-calendar', routerLink: 'usuario/reserva/horas' }
                ]
              }
            ]]
        },
        {
          label: 'REPORTES', icon: 'fa fa-pie-chart',
          items: [[{
            items: [
              { label: 'ESTUDIOS', icon: 'pi pi-book', routerLink: 'usuario/reporte/estudio' },
              { label: 'EXAMENES', icon: 'pi pi-file-excel', routerLink: 'usuario/reporte/examen' }
            ]
          }]]

        },
        {
          label: '', icon: 'pi pi-fw pi-power-off',
          command: () => {
            this.cerrarSesion();
          }
        }
      ]
    } else {
      if (ite == "USUARIO") {
        this.items = [
          { label: 'LISTAR CITAS', icon: 'fa fa-list-ol', routerLink: 'list/USUARIO' },
          { label: 'AGREGAR CITA', icon: 'fa fa-address-card', routerLink: 'usuario/citas/create' },
          { label: '', icon: 'pi pi-fw pi-power-off', command: () => { this.cerrarSesion(); } }
        ];
      } else {
        if (ite == "ADMISION") {
          this.items = [
            { label: 'LISTAR CITAS', icon: 'fa fa-list-ol', routerLink: 'list/ADMISION' },
            { label: 'AGREGAR CITA', icon: 'fa fa-address-card', routerLink: 'ADMISION/citas/create' },
            { label: '', icon: 'pi pi-fw pi-power-off', command: () => { this.cerrarSesion(); } }
          ];
        }
      }
    }
  }
}

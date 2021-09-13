import { Component, OnInit, ViewChild } from '@angular/core';
import { MegaMenuItem, MessageService } from 'primeng/api';
import { ServiceService } from 'src/app/Service/service.service';
import { Router } from '@angular/router';
import { Table } from 'primeng/table/table';
import * as CryptoJS from 'crypto-js';
import Swal from 'sweetalert2';
import { persona } from 'src/app/Modelo/persona';

@Component({
  selector: 'app-list-usuario',
  templateUrl: './list-usuario.component.html',
  styleUrls: ['./list-usuario.component.css'],
  providers: [MessageService]
})
export class ListUsuarioComponent implements OnInit {

  statuses: any[];

  loading: boolean = true;

  @ViewChild('dt') table: Table;

  constructor(private service: ServiceService, private router: Router, private messageService: MessageService) { }
  usuario: persona[];
  selectedCustomers: persona[];
  //
  conversionDecryptOutput: string;
  encryptText: string;
  decPassword: string;

  l = false;
  items: MegaMenuItem[];
  panel: Boolean = false;
  ngOnInit(): void {
    this.usuario = new Array();
    this.llenarTable();
  }

  llenarTable() {
    this.service.getAllPerson().subscribe(data => {
      this.usuario = data;
      this.loading = false;
    })
  }



  User: String;
  Passw: String;
  info(usu: persona) {
    try {

      this.Passw = "";
      this.User = "";

      this.service.getVeriUsuario(usu.p_cedula).subscribe(data => {
        if (data != null) {
          this.panel = true;
          this.encryptText = data.useri.toString();
          this.decPassword = data.clave.toString();
          this.conversionDecryptOutput = CryptoJS.AES.decrypt(this.decPassword.trim(), this.encryptText.trim()).toString(CryptoJS.enc.Utf8);
          this.Passw = this.conversionDecryptOutput;
          this.User = data.useri;
        } else {
          alert("Este usuario No Esta Registrado Aun")
        }
      })
    } catch (error) {

    }
  }

  u2: persona = new persona();

  id2 = "";
  actualizar(usu: persona) {
    localStorage.setItem("id_usuario", usu.p_cedula.toString());
    this.router.navigate(['update/perso']);

  }


  enablePerso: persona;
  enableUser(enableUsu: persona) {
    var menssage = "";
    this.service.getPersonaCedula(enableUsu.p_cedula).subscribe(data => {
      this.enablePerso = data;
      this.enablePerso.activo = !data.activo;
      if (!data.activo) {
        menssage = "INNABILITAR"
      } else {
        menssage = "HABILITAR"
      }
      Swal.fire({
        title: 'Esta seguro que desea ' + menssage + ' a este usuario: ' + enableUsu.p_cedula,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `SI`,
        denyButtonText: `NO`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.service.enabled(data, "enableAccion/").subscribe(data3 => {
            this.usuario = new Array();
            this.llenarTable();
          })
          Swal.fire(menssage, '', 'success')
        } else if (result.isDenied) {
          this.usuario = new Array();
          this.llenarTable();
          Swal.fire('Los cambios no se guardan', '', 'info')
        } else if (result.isDismissed) {
          this.usuario = new Array();
          this.llenarTable();
          Swal.fire('Los cambios no se guardan', '', 'info')
        }
      })

    })
  }

  estado(enableUsu: persona) {
    var menssage = "";
    this.service.getPersonaCedula(enableUsu.p_cedula).subscribe(data => {
      this.enablePerso = data;
      this.enablePerso.estado = !data.estado;
      if (!data.estado) {
        menssage = "INNABILITAR"
      } else {
        menssage = "HABILITAR"
      }
      Swal.fire({
        title: 'Esta seguro que desea ' + menssage + ' a este usuario: ' + enableUsu.p_cedula,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `SI`,
        denyButtonText: `NO`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.service.enabled(data, "enableEstado/").subscribe(data3 => {
            this.usuario = new Array();
            this.llenarTable();
          })
          Swal.fire(menssage, '', 'success')
        } else if (result.isDenied) {
          this.usuario = new Array();
          this.llenarTable();
          Swal.fire('Los cambios no se guardan', '', 'info')
        } else if (result.isDismissed) {
          this.usuario = new Array();
          this.llenarTable();
          Swal.fire('Los cambios no se guardan', '', 'info')
        }
      })

    })
  }

}

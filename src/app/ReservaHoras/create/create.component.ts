import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { horas } from 'src/app/Modelo/horas';
import { reserva } from 'src/app/Modelo/reserva';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private service: ServiceService, private datePipe: DatePipe, private router: Router) { }
  public isError = false;
  public msgError = '';
  dates_inicio: Date;
  dates_fin: Date;
  text2: string;
  hora: horas[];
  selecthora: horas[];
  data1: boolean = false;
  data2: boolean = false;
  fecha1: String;
  fecha2: String;
  reservas: reserva = new reserva();
  useri: String;
  ngOnInit(): void {
    this.selecthora = new Array()
    let user = localStorage.getItem("user");
    this.useri = user;
  }
  onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }

  initialDate: any;
  onRowSelect() {
    this.fecha1 = this.initialDate = this.datePipe.transform(this.dates_inicio, 'yyyy-MM-dd');
    if (this.data2 == false) {
      this.service.getVeriFecha(this.initialDate).subscribe(data => {
        if (data == true) {
          let temp = new Date(this.dates_inicio);
          let ant = 1 * 86400 //dias en segundos
          let finalDate = new Date(temp.setSeconds(ant));
          this.dates_fin = new Date(finalDate);
          this.data1 = true;
        } else {
          alert("La Primera Fecha debe ser menor");
          this.dates_inicio = null;
        }
      })

    } else {

      this.service.getLibres(this.fecha1 + "&" + this.fecha2).subscribe(dat => {
        if (dat == null) {
          alert("La Primera Fecha debe ser menor");
          this.fecha1 = Date();
        } else {
          this.hora = dat;
          this.data1 = true;
        }
      })
    }
  }

  onRowSelect2() {
    this.fecha2 = this.initialDate = this.datePipe.transform(this.dates_fin, 'yyyy-MM-dd');
    if (this.data1 == false) {
      this.data2 = true;
    } else {

      this.service.getLibres(this.fecha1 + "&" + this.fecha2).subscribe(dat => {
        if (dat == null) {
          alert("La Primera Fecha debe ser menor");
          let temp = new Date(this.dates_inicio);
          let ant = 1 * 86400 //dias en segundos
          let finalDate = new Date(temp.setSeconds(ant));
          this.dates_fin = new Date(finalDate);
        } else {
          this.hora = dat;
          this.data2 = true;
        }
      })
    }
  }

  borrar() {
    this.dates_inicio = null;
    this.dates_fin = null;
    this.hora = new Array();
    this.selecthora = new Array();
    this.data1 = false;
    this.data2 = false;
    this.text2 = "";
  }
  ordenar: horas[];
  guardar() {
    var count = this.selecthora.length;
    if (count < 0 || this.data1 == false || this.data2 == false || this.text2 == null) {
      this.msgError = "Llene Todos Los Campos";
      this.onIsError();
    } else {
      this.service.getuser(this.useri).subscribe(data => {
        this.reservas.id_usuario = data;
        this.reservas.fecha_fin = this.fecha2;
        this.reservas.fecha_inicio = this.fecha1;
        this.reservas.descip_reserva = this.text2.toUpperCase();
        if (count > 1) {
          this.ordenar = this.selecthora.sort((a, b) => Number(a.hora_inicio) - Number(b.hora_inicio));
          this.reservas.hora_inicio = this.ordenar[0];
          this.reservas.hora_fin = this.ordenar[this.selecthora.length - 1];
        } else {
          this.reservas.hora_inicio = this.selecthora[0];
          this.reservas.hora_fin = this.selecthora[0];
        }

        this.service.saveReserva(this.reservas).subscribe(data => {
          alert("Guardado");
          this.router.navigate(['usuario/reserva/horas']);
        })

      })
    }
  }
}

import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { horas } from 'src/app/Modelo/horas';
import { reserva } from 'src/app/Modelo/reserva';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

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
  formattedDate: Date;
  ngOnInit(): void {
    this.selecthora = new Array()
    let user = localStorage.getItem("user");
    this.data1 = true;
    this.data2 = true;
    this.useri = user;
    let id_reserva = localStorage.getItem("id_reserva");
    this.service.getReser(id_reserva).subscribe(data => {
      //Horas
      this.service.getHoras().subscribe(hoD => {
        this.selecthora = new Array();
        this.hora = new Array();
        this.hora = hoD;
        for (let index = Number(data.hora_inicio.id_hora) - 1; index < Number(data.hora_fin.id_hora); index++) {
          this.selecthora.push(this.hora[index]);
        }
        this.reservas = data;

        this.text2 = this.reservas.descip_reserva.toString();
        //Inicio
        this.initialDate = data.fecha_inicio;
        this.formattedDate = this.initialDate;
        let temp = new Date(this.formattedDate);
        let ant = 1 * 86400 //dias en segundos
        let finalDate = new Date(temp.setSeconds(ant));
        this.dates_inicio = new Date(finalDate);
        this.fecha1=data.fecha_inicio;
        //Fin
        this.initialDate = data.fecha_fin;
        this.formattedDate = this.initialDate;
        let temp2 = new Date(this.formattedDate);
        let ant2 = 1 * 86400 //dias en segundos
        let finalDate2 = new Date(temp2.setSeconds(ant2));
        this.dates_fin = new Date(finalDate2);
        this.fecha2=data.fecha_fin;
      })
    })
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
      let temp = new Date(this.dates_inicio);
      let ant = 1 * 86400 //dias en segundos
      let finalDate = new Date(temp.setSeconds(ant));
      this.dates_fin = new Date(finalDate);
      this.data1 = true;
    } else {

      this.service.getLibres(this.fecha1 + "&" + this.fecha2).subscribe(dat => {
        if (dat == null) {
          alert("La Primera Fecha debe ser menor");
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

        this.service.updateReser(this.reservas).subscribe(data => {
          alert("Actualizado");
          this.router.navigate(['usuario/reserva/horas']);
        })

      })
    }
  }

}

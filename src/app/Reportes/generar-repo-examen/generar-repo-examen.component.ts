import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { estudios } from 'src/app/Modelo/estudios';
import { examenes } from 'src/app/Modelo/examenes';
import { resertotal } from 'src/app/Modelo/resertotal';
import { ServiceService } from 'src/app/Service/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-generar-repo-examen',
  templateUrl: './generar-repo-examen.component.html',
  styleUrls: ['./generar-repo-examen.component.css']
})
export class GenerarRepoExamenComponent implements OnInit {

  data: any;
  reser: resertotal[];
  constructor(private service: ServiceService, private datePipe: DatePipe) { }
  fecha1: Date;
  fecha2: Date;
  fe1: boolean = false;
  fe2: boolean = false;
  datos: String = "";
  miarray: String[] = new Array();
  number: Number[] = new Array();
  CurrentDate: Date = new Date();
  fecha: Date;
  logeo: boolean = true;
  useri: String;
  nombre: String;
  cedula: String;
  //Estudios
  estudio: estudios[];
  selectEstudio: estudios[];
  //progressBar
  repre: String = "";
  value: number = 0;
  //Examenes
  examen: examenes[];
  selectExamen: examenes[];


  ngOnInit(): void {
    let user = localStorage.getItem("user");
    this.useri = user;
    this.selectEstudio = new Array();
    this.service.getuser(this.useri).subscribe(data => {
      this.nombre = data.p_cedula.p_primer_apellido + " " + data.p_cedula.p_primer_nombre
      this.cedula = data.p_cedula.p_cedula;
    })
    this.estudio = new Array();
    this.service.listAllEstudis().subscribe(data => {
      this.estudio = data;
    })

    this.service.deleteAllEstudio().subscribe(data => { })


  }

  buscar() {
    this.value = 0;
    if (this.fe2 == false || this.fe1 == false || this.selectExamen.length == 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Llene todos los campos!'
      })
    } else {
      this.miarray = new Array();
      this.number = new Array();

      this.service.deleteAllEstudio().subscribe(data => {

        for (let index = 0; index < this.selectExamen.length; index++) {
          this.service.getRepoExa(
            this.datePipe.transform(this.fecha1, 'yyyy-MM-dd'),
            this.datePipe.transform(this.fecha2, 'yyyy-MM-dd'),
            this.selectExamen[index]).subscribe(data => {
              if (data == null) {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'La fecha Inicial debe ser menor a la Fecha Final!'
                })

              }
            })

        }
      })
      setInterval(() => {
        this.value = this.value + Math.floor(Math.random() * 200) + 1;
        if (this.value >= 100) {
          this.value = 100;
        }
      }, 1000);
      setTimeout(() => {
        this.llenar();
      }, 1500);

    }
  }

  llenar() {
    let color: String[] = ["#CD5C5C",
      "#FF6384",
      "#4BC0C0",
      "#FFCE56",
      "#E7E9ED",
      "#36A2EB",
      "#800080",
      "#FF00FF",
      "#000080",
      "#F08080",
      "#FA8072",
      "#E9967A",
      "#FFA07A",]
    this.datos = "";
    this.repre = "";
    this.reser = new Array();
    this.service.getAllReserTotoal().subscribe(datareser => {

      this.reser = datareser;
      for (let index = 0; index < this.reser.length; index++) {
        this.miarray.push(String(this.reser[index].descripcion));
        this.number.push(this.reser[index].cantidad);
      }
      this.logeo = false;
      this.conclusion();
      this.data = {
        datasets: [{
          data: this.number,
          backgroundColor: color,
          label: 'Reportes De Estudios Realizados'
        }],
        labels: this.miarray
      }
    })
  }

  conclusion() {
    let count: Number = 0;
    for (let index = 0; index < this.number.length; index++) {
      count = Number(this.number[index]) + Number(count);
    }

    let auxi: number = 0;
    for (let index = 0; index < this.number.length; index++) {
      auxi = Number(auxi) + Number(this.number[index]);
    }
    let porcentaje: number = 0;
    for (let index = 0; index < this.miarray.length; index++) {
      porcentaje = (Number(this.number[index]) / Number(auxi)) * 100;
      this.repre = this.repre + " El examen " + "\n" + this.miarray[index] + ", se han realizado "
        + this.number[index] + " veces, que representa el " + porcentaje.toFixed(2) + "%;";

    }
    this.datos = "En total de los " + this.miarray.length + " Examenes encontrados, se han ocupado en "
      + count + " veces en las diferentes citas, desde la fecha "
      + this.datePipe.transform(this.fecha1, 'yyyy-MM-dd') + " hasta la fecha "
      + this.datePipe.transform(this.fecha2, 'yyyy-MM-dd');



  }

  onRowSelect() {
    this.fe1 = true;
    let temp = new Date(this.fecha1)
    let ant = 1 * 86400 //dias en segundos
    let finalDate = new Date(temp.setSeconds(ant));
    this.fecha2 = new Date(finalDate);
    this.fe2 = true;
  }

  onRowSelect2() {
    this.fe2 = true;
  }

  ex: examenes[];
  llenarExamenes() {
    if (this.selectEstudio.length > 0) {
      this.examen = new Array();
      this.ex = new Array();
      this.selectExamen = new Array();
      this.value = 0;
      this.repre = "";
      this.datos = "";
      this.logeo=true;
      this.data = null;
      for (let index = 0; index < this.selectEstudio.length; index++) {
        this.service.getExamenes(this.selectEstudio[index].id_estudio).subscribe(dataE => {
          this.ex = dataE;
          this.ex.forEach(element => {
            this.examen.push(element);
          });
        });
      }

    }
  }

}

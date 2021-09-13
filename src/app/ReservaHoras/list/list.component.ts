import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { reserva } from 'src/app/Modelo/reserva';
import { ServiceService } from 'src/app/Service/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  styles: [`
  :host ::ng-deep .p-dialog .product-image {
      width: 150px;
      margin: 0 auto 2rem auto;
      display: block;
  }
`],
})
export class ListComponent implements OnInit {

  constructor(private service: ServiceService, private router: Router) { }
  reservas: reserva[];
  panelAdd: boolean = false;
  dates_inicio: Date;
  dates_fin: Date;
  logeo: boolean = false;
  date: Date = new Date();
  ngOnInit(): void {
    this.llenar();
  }

  llenar() {
    this.service.listReserva().subscribe(data => {
      this.reservas = data;
    })
  }


  deleteReser(re: reserva) {
    Swal.fire({
      title: 'Desea eliminar esta reserva?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Eliminar`,
      denyButtonText: `No Eliminar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.service.deleteReser(re.id_reserva).subscribe(data => {
          this.reservas = new Array();
          this.llenar();
        })
        Swal.fire('Eliminado!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('No Eliminado', '', 'info')
      }
    })

  }

  updateReser(re: reserva) {
    localStorage.setItem("id_reserva", re.id_reserva.toString());
    this.router.navigate(['usuario/reserva/horas/update']);
  }
}

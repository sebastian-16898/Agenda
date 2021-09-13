import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { persona } from 'src/app/Modelo/persona';
import { trabajo } from 'src/app/Modelo/trabajo';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-tr-list',
  templateUrl: './tr-list.component.html',
  styleUrls: ['./tr-list.component.css']
})
export class TrListComponent implements OnInit {

  constructor(private service: ServiceService, private router: Router) { }
  @ViewChild('dt') table: Table;
  tr: trabajo[];
  loading: boolean = true;

  ngOnInit(): void {
    this.service.getlistTrabajo().subscribe(data => {
      this.tr = data;
      this.loading = false;
    })
  }

  updateTrabjo(t: trabajo) {
    localStorage.setItem("id_trabajo", t.id_trabajo.toString());
    this.router.navigate(['administrador/trabajo/update']);
  }


}

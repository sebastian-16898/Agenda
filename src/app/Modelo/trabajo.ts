import { especialidades } from "./especialidades";
import { medisol } from "./medisol";
import { persona } from "./persona";

export class trabajo {

    id_trabajo: Number;

    id_espe: especialidades;

    p_cedula: persona;

    id_medisol: medisol;

    fecha_createDate;
    
    fecha_update: Date

}
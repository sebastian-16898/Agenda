import { especialidades } from "./especialidades";
import { horas } from "./horas";
import { paciente } from "./paciente";
import { persona } from "./persona";
import { usuario } from "./usuario";

export class citas {

    id_cita: Number;

    id_usuario: usuario;

    id_paciente: paciente;

    id_doctor:persona;

    id_hora_inicio: horas;

    id_hora_fin: horas;

    fecha_cita: String;

    fecha_create: Date;

    fecha_update: Date;

    estado: boolean;

    especialidad:especialidades;
}
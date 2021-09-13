import { horas } from "./horas";
import { usuario } from "./usuario";

export class reserva {
    id_reserva: Number;

    id_usuario: usuario;

    hora_inicio: horas;

    hora_fin: horas;

    fecha_inicio: String;

    fecha_fin: String;

    descip_reserva: String;

    fecha_create: Date;

    fecha_update: Date;
}
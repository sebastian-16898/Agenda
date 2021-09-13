import { perfiles } from "./perfiles";

export class persona {
    p_cedula: String;

    p_primer_nombre: String;

    p_segundo_nombre: String;

    p_primer_apellido: String;

    p_segundo_apellido: String;

    p_correo: String;

    p_numtelefono: String;

    id_perfil: perfiles;
    
    estado:boolean;

    activo:boolean;

    fecha_create: Date;

    fecha_update: Date;

}
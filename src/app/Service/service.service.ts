import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { perfiles } from '../Modelo/perfiles';
import { persona } from '../Modelo/persona';
import { usuario } from '../Modelo/usuario';
import { horas } from '../Modelo/horas';
import { estudios } from '../Modelo/estudios';
import { citas } from '../Modelo/citas';
import { Calendar } from 'primeng/calendar';
import { paciente } from '../Modelo/paciente';
import { estucita } from '../Modelo/examencita';
import { medisol } from '../Modelo/medisol';
import { especialidades } from '../Modelo/especialidades';
import { reserva } from '../Modelo/reserva';
import { resertotal } from '../Modelo/resertotal';
import { examenes } from '../Modelo/examenes';
import { trabajo } from '../Modelo/trabajo';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {


  constructor(private http: HttpClient) { }

  url = "http://localhost:8080/";

  //Perfil *
  createPerfil(per: perfiles) {
    return this.http.post<perfiles>(this.url + "perfil", per);
  }

  listPerfil() {
    return this.http.get<perfiles[]>(this.url + "listPerfil")
  }

  updatePerfil(perfil: perfiles) {
    return this.http.post<perfiles>(this.url + "updatePerfil" + perfil.id_perfil, perfil);
  }

  deletePerfil(perfil: Number) {
    return this.http.delete<perfiles>(this.url + "deletePerfil/" + perfil);
  }

  getPersonaUsuario() {
    return this.http.get<persona[]>(this.url + "listPersonasUsuarios");
  }


  //Persona *

  getAllPerson() {
    return this.http.get<persona[]>(this.url + "listPersonas");
  }

  getPersonaCedula(cedula: String) {
    return this.http.get<persona>(this.url + "findPer/" + cedula);
  }

  createPersona(personas: persona) {
    return this.http.post<persona>(this.url + "addPerso", personas);
  }

  updatePersona(persona: persona) {
    return this.http.put<persona>(this.url + "updatePersona/" + persona.p_cedula, persona);
  }

  enabled(persona: persona, accion: String) {
    return this.http.put<persona>(this.url + accion + persona.p_cedula, persona);
  }

  getDoctor() {
    return this.http.get<persona[]>(this.url + "findDoctor")
  }

  
  //Usuario* {

  createUsuario(usu: usuario) {
    return this.http.post<usuario>(this.url + "addUsuario", usu);
  }

  getVeriUsuario(cedula: String) {
    return this.http.get<usuario>(this.url + "findUsuario/" + cedula);
  }

  getuser(user: String) {
    return this.http.get<usuario>(this.url + "verificarUser/" + user);
  }

  getAllUser() {
    return this.http.get<usuario[]>(this.url + "listUsuario");
  }


  //Acciones
  Login(usu: usuario) {
    return this.http.post<usuario>(this.url + "inicio", usu);
  }

  //Horas *

  getHoras() {
    return this.http.get<horas[]>(this.url + "listHoras");
  }

  getHorasDisp(date: Date,id_estudio:String) {
    return this.http.get<horas[]>(this.url + "findhorasLibre/" + date+"/"+id_estudio);
  }

  getIdHora(id_hora: Number) {
    return this.http.get<horas>(this.url + "horainicio/" + id_hora);
  }
  updateHoras(cita: citas) {
    return this.http.put<horas>(this.url + "updateHora/" + cita.id_cita, cita)
  }

  //Estudios * 

  listAllEstudis() {
    return this.http.get<estudios[]>(this.url + "listAllEstudios");
  }

  getAllEstudios() {
    return this.http.get<estudios[]>(this.url + "listAllEstudiosDispo");
  }

  createEstudio(estudio: estudios) {
    return this.http.post<estudios>(this.url + "addEstudio", estudio);
  }

  updateEstudio(estudio: estudios) {
    return this.http.put<estudios>(this.url + "updateEstudio/" + estudio.id_estudio, estudio)
  }

  getEstudioId(id_estudi: String) {
    return this.http.get<estudios>(this.url + "findEstudioid_estudio/" + id_estudi);
  }

  getCodigoEstudio(codigo: String) {
    return this.http.get<estudios>(this.url + "findEstudiocodigo_estudio/" + codigo);
  }

  //Pacientes

  createPaciente(pacientes: paciente) {
    return this.http.post<paciente>(this.url + "addPaciente", pacientes)
  }

  getPacienteCedula(cedula: String) {
    return this.http.get<paciente>(this.url + "findPacientes/" + cedula);
  }

  //Citas

  getAllCitas() {
    return this.http.get<citas[]>(this.url + "listCitas");
  }

  createCita(cita: citas) {
    return this.http.post<citas>(this.url + "addCitas", cita);
  }

  updateCitaAtencion(cita: citas) {
    return this.http.put<citas>(this.url + "updateAtencion/" + cita.id_cita, cita);
  }

  verificar(cita: citas) {
    return this.http.get<citas>(this.url + "verifi/" + cita.id_cita);
  }

  getCita(cita: String) {
    return this.http.get<citas>(this.url + "verifi/" + cita);
  }

  deleteCita(cita: citas) {
    return this.http.delete<citas>(this.url + "deleteCita/" + cita.id_cita)
  }

  updateCita(cita: citas) {
    return this.http.put<citas>(this.url + "updateCita/" + cita.id_cita, cita);
  }

  getPacienteCita(pa_cedula: String) {
    return this.http.get<citas[]>(this.url + "getCita/" + pa_cedula);
  }

  //Estudio-Cita

  createEstCita(estuci: estucita) {
    return this.http.post<estucita>(this.url + "addEstuCita", estuci);
  }

  listAllECid_cita(id_cita: Number) {
    return this.http.get<estucita[]>(this.url + "listAllEstuCitas/" + id_cita);
  }

  deleteEstuCita(estu: estucita) {
    return this.http.delete<estucita>(this.url + "deleteEstuCita/" + estu.id_esci);
  }

  deleteEstuCita2(id_cita: Number) {
    return this.http.delete<estucita>(this.url + "deleteEstuCita2/" + id_cita);
  }

  updateEstuCita(estu: estucita) {
    return this.http.post<estucita>(this.url + "updateEstu", estu);
  }



  deleteAllEstudio() {
    return this.http.delete<reserva>(this.url + "deleteEst");
  }

  //Medisol

  getAllMedisol() {
    return this.http.get<medisol[]>(this.url + "listMedisol");
  }

  createMedisol(medisol: medisol) {
    return this.http.post<medisol>(this.url + "createMedisol", medisol);
  }

  updateMedisol(medi: medisol) {
    return this.http.put<medisol>(this.url + "updateMedi/" + medi.id_medisol, medi)
  }

  getMedisol(cedula: String) {
    return this.http.get<medisol>(this.url + "getDatoMedisol/" + cedula)
  }

  Listespecialidades() {
    return this.http.get<especialidades[]>(this.url + "/listEs");
  }

  //Reservas
  listReserva() {
    return this.http.get<reserva[]>(this.url + "listReserva");
  }

  saveReserva(reservas: reserva) {
    return this.http.post<reserva>(this.url + "addReserva", reservas);
  }

  getLibres(fecha: String) {
    return this.http.get<horas[]>(this.url + "findhorasLibreReserva/" + fecha);
  }

  updateReser(reser: reserva) {
    return this.http.put<reserva>(this.url + "updateReser/" + reser.id_reserva, reser);
  }

  deleteReser(id_reserva: Number) {
    return this.http.delete<reserva>(this.url + "deleteReser/" + id_reserva);
  }

  getReser(id_reserva: String) {
    return this.http.get<reserva>(this.url + "findid_reserva/" + id_reserva);
  }

  getVeriFecha(fecha: String) {
    return this.http.get<boolean>(this.url + "verificarFecha/" + fecha)
  }

  //Examenes
  getAllExamenes() {
    return this.http.get<examenes[]>(this.url + "listExamen");
  }

  createExamen(exa: examenes) {
    return this.http.post<examenes>(this.url + "addExamen", exa);
  }

  getCodigoExamen(codigo: String) {
    return this.http.get<examenes>(this.url + "findEstudiocodigo_estudio/" + codigo);
  }

  getExamenEstudio(id_estudio: String) {
    return this.http.get<examenes[]>(this.url + "/listExamenEstudio/" + id_estudio);
  }

  enableExamen(exa: examenes) {
    return this.http.put<examenes>(this.url + "enable/" + exa.id_examen, exa)
  }

  id_examenGet(id_examen: String) {
    return this.http.get<examenes>(this.url + "getExamen/" + id_examen)
  }

  updateExamen(exa: examenes) {
    return this.http.put<examenes>(this.url + "updateExamen/" + exa.id_examen, exa);
  }

  //Reser Total

  getAllReserTotoal() {
    return this.http.get<resertotal[]>(this.url + "listReserTotal");
  }

  getRepo(fecha1: String, fecha2: String, es: estudios) {
    return this.http.get<estucita[]>(this.url + "reporte/" + fecha1 + "/" + fecha2 + "/" + es.id_estudio);
  }

  getExamenes(id_estudi: String) {
    return this.http.get<examenes[]>(this.url + "Examenes/" + id_estudi);
  }

  getRepoExa(fecha1: String, fecha2: String, ex: examenes) {
    return this.http.get<estucita[]>(this.url + "reporteExamen/" + fecha1 + "/" + fecha2 + "/" + ex.id_examen);
  }


  //Trabjo
  getlistTrabajo() {
    return this.http.get<trabajo[]>(this.url + "listTrabjo");
  }

  addTrabajo(tr: trabajo) {
    return this.http.post<trabajo>(this.url + "addTrabajo", tr);
  }

  updateTrabajo(tr: trabajo) {
    return this.http.put<trabajo>(this.url + "updateTrabajo/" + tr.id_trabajo, tr);
  }

  getOneTrabajo(id_trabajo: String) {
    return this.http.get<trabajo>(this.url + "getOneTrabajo/" + id_trabajo);
  }

  getDoctor2(id_especialidad:Number, id_medisol: Number) {
    return this.http.get<trabajo[]>(this.url + "findDoctor2/" + id_especialidad + "/" + id_medisol);
  }

}

import { Usuario } from "./Usuario";
import { Visita } from "./Visita";

export interface Feedback {
  idFeedback?: number;
  texto: string;
  dataEnvio: string;
  usuario: Usuario;
  visita: Visita;
  
}
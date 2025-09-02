import { Usuario } from "./Usuario";

export interface Feedback {
  idFeedback?: number;
  texto: string;
  dataEnvio: string;
  usuario: Usuario;
}
import { Visitante } from "./Visitante";

export interface Feedback {
  idFeedback?: number;
  texto: string;
  dataEnvio: string;
  visitante: Visitante;
}
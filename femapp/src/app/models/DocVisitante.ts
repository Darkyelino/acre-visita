import { Visitante } from "./Visitante";

export interface DocVisitante {
  idDocumento?: number;
  tipo: string | null;
  numero: string | null;
  visitante: Visitante;
}
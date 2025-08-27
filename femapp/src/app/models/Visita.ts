import { Setor } from "./Setor";
import { Visitante } from "./Visitante";

export interface Visita {
  idVisita?: number;
  dataHoraEntrada: string | null;
  dataHoraAgendamento: string | null;
  status: string;
  visitante: Visitante;
  local: Setor;
}
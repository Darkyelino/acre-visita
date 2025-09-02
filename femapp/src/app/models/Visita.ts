import { Setor } from "./Setor";
import { Usuario } from "./Usuario";

export interface Visita {
  idVisita?: number;
  dataHoraEntrada: string | null;
  dataHoraAgendamento: string | null;
  status: string;
  usuario: Usuario;
  local: Setor;
}
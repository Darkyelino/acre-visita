import { Auditorio } from "./Auditorio";
import { Visitante } from "./Visitante";

export interface ReservaAuditorio {
  idReserva?: number;
  nomeEvento: string;
  data: string;
  horaInicio: string;
  horaFim: string;
  observacoes: string | null;
  status: 'PENDENTE' | 'APROVADA' | 'RECUSADA';
  visitante: Visitante;
  auditorio: Auditorio;
}

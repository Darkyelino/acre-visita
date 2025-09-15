import { Auditorio } from "./Auditorio";
import { Usuario } from "./Usuario";

export interface ReservaAuditorio {
  idReserva?: number;
  nomeEvento: string;
  data: string;
  horaInicio: string;
  horaFim: string;
  observacoes: string | null;
  status: 'PENDENTE' | 'APROVADA' | 'RECUSADA' | 'FINALIZADO';
  usuario: Usuario;
  auditorio: Auditorio;
}

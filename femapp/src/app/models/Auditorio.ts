import { Setor } from "./Setor";

export interface Auditorio {
  idAuditorio?: number;
  nomeAuditorio: string;
  disponibilidade: boolean;
  localAuditorio: Setor;
}
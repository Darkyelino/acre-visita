import { EPapel } from "./EPapel";
import { NacionalidadeVisitante } from "./NacionalidadeVisitante";
import { Setor } from "./Setor";

export interface Usuario {
  id?: number;

  // --- Campos Comuns ---
  nome: string;
  email: string;
  senha?: string;
  papel: EPapel;

  // --- Campos para Redefinição de Senha ---
  resetToken?: string;
  resetTokenExpiry?: string;

  // --- Campos Específicos (podem ser nulos) ---

  telefone?: string;
  nacionalidade?: NacionalidadeVisitante;
  setor?: Setor;
  ativo?: boolean;
}
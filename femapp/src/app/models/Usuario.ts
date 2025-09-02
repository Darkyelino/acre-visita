import { EPapel } from "./EPapel";
import { NacionalidadeVisitante } from "./NacionalidadeVisitante";
import { Setor } from "./Setor";

export interface Usuario {
  /** O ID do usuário, gerado pelo banco de dados. É opcional ('?') pois não existe ao criar um novo usuário. */
  id?: number;

  // --- Campos Comuns ---
  nome: string;
  email: string;
  /** A senha do usuário. É opcional para ser usada no cadastro, mas não em respostas da API. */
  senha?: string;
  papel: EPapel;

  // --- Campos Específicos (podem ser nulos) ---

  /** Telefone, usado principalmente por usuários com o papel de VISITANTE. */
  telefone?: string;
  /** Objeto de nacionalidade, usado por usuários com o papel de VISITANTE. */
  nacionalidade?: NacionalidadeVisitante;
  /** Objeto de setor, usado por usuários internos (ADM, COORDENADOR, ATENDENTE). */
  setor?: Setor;
}
import { Setor } from "./Setor";
import { Usuario } from "./Usuario";

export interface Armario {
  idArmario?: number;
  numeracao: number;
  usuario: Usuario | null;
  setor: Setor;
}
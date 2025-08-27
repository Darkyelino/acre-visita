import { NacionalidadeVisitante } from "./NacionalidadeVisitante";

export interface Visitante {
    idVisitante: number;
    nomeVisitante: string;
    emailVisitante: string;
    telefoneVisitante: string;
    senhaVisitante: string;
    nacionalidadeVisitante: NacionalidadeVisitante;
}

import { Concept } from "./concept";


export interface Sale {
    idUsuario: string;
    conceptos: Concept[]; //lista de tipo concepto
}
import { Archive } from "./archive";

export class Bordereau{
    bordereauId?: number;
    bordereauCode?: string;
    dateEnvoi?: string;
    analyseDemande ?: string;
    exigences ?: string;
    urgences ?: string;
    etatsBordereaux ?: string;
    dateReception ?: string;
    archive ?: Archive;
}
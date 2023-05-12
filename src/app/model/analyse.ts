

import { Elementt } from "./elementt";
import { Coupure } from "./coupure";
import { Echantillon } from "./echantillon";

export class Analyse {
    analyseId ?: number;
    valeurAnalyse ?: number;
    etatAnalyse ?: string;
    echantillon ?: Echantillon;
    coupure ?: Coupure;
    element ?: Elementt
}
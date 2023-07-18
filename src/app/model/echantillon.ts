import { Bordereau } from "./bordereau";
import { Geologie } from "./geologie";

export class Echantillon{
    echantillonId ?: number;
    depthFrom ?: number;
    depthTo ?: number;
    dateEnvoi ?: string;
    dateReception ?: Date;
    dateAnalyse ?: string;
    observation ?: string;
    urlDocs ?: string;
    notesGeologie ?: string;
    notesCentreRecherche ?: string;
    etatEchantillon ?: string;
    analyseGranulometrique ?: string;
    notesMineralogique ?: string;
    puissanceReelle ?: number;
    geologie ?: Geologie;
    bordereau ?: Bordereau;
    
}
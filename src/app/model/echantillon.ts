import { Bordereau } from "./bordereau";
import { Geologie } from "./geologie";

export class Echantillon{
    echantillonId ?: number;
    depthFrom ?: number;
    depthTo ?: number;
    dateEnvoi ?: string;
    dateReception ?: string;
    dateAnalyse ?: string;
    observation ?: string;
    urlDocs ?: string;
    notesGeologie ?: string;
    notesCentreRecherche ?: string;
    etatEchantillon ?: string;
    etatEchantillons ?: string;
    analyseGranulometrique ?: string;
    notesMineralogique ?: string;
    geologie ?: Geologie;
    bordereau ?: Bordereau;
}
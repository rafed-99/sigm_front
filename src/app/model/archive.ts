import { Bordereau } from "./bordereau";
import { Point } from "./point";

export class Archive{
    archiveId ?: number;
    archiveLibelle ?: string;
    archiveDate ?: string;
    archiveType ?: string;
    Points?: Point[];
    bordereaux?: Bordereau;
}
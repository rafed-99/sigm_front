
import { Couche } from "./couche";
import { Point } from "./point";

export class Geologie{
    geologieId ?: number;
    depthFrom ?: number;
    depthTo ?: number;
    puissance ?: number;
    puissanceReelle ?: number;
    descriptionLithologique ?: string;
    couche ?: Couche;
    point?:Point;
}
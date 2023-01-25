import { Niveau } from "./Niveau";

export default class NiveauCompetence {
    id: number;
    competence: string;
    niveau: Niveau;

    constructor(
        id: number,
        competence: string = "",
        niveau: Niveau,
    ) {
        this.id = id;
        this.competence = competence;
        this.niveau = niveau;
    }
}
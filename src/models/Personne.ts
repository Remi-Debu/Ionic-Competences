import NiveauCompetence from "./NiveauCompetence";

export default class Personne {
    id: number;
    nom: string;
    niveauCompetence: NiveauCompetence[];

    constructor(
        id: number,
        nom: string = "",
        niveauCompetence: NiveauCompetence[],
    ) {
        this.id = id;
        this.nom = nom;
        this.niveauCompetence = niveauCompetence;
    }
}
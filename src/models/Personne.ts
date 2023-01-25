import NiveauCompetence from "./NiveauCompetence";

export default class Personne {
    id: number;
    nom: string;
    niveauCompetences: NiveauCompetence[];

    constructor(
        id: number,
        nom: string = "",
        niveauCompetences: NiveauCompetence[],
    ) {
        this.id = id;
        this.nom = nom;
        this.niveauCompetences = niveauCompetences;
    }
}
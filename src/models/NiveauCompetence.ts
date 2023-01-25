export default class NiveauCompetence {
    id: number;
    competence: string;
    niveau: string;

    constructor(
        id: number,
        competence: string = "",
        niveau: string,
    ) {
        this.id = id;
        this.competence = competence;
        this.niveau = niveau;
    }
}
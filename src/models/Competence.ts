export default class Competence {
    id: number;
    titre: string;
    description: string;

    constructor(
        id: number,
        titre: string = "",
        description: string = "",
    ) {
        this.id = id;
        this.titre = titre;
        this.description = description;
    }
}
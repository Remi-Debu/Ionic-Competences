import Competence from "../models/Competence";

export default class CompetencesService {
    static getCompetences(): Promise<Competence[]> {
        return fetch('http://localhost:3001/competences')
            .then(response => response.json())
            .catch(error => this.handleError(error));
    }

    static getCompetence(id: number): Promise<Competence | null> {
        return fetch(`http://localhost:3001/competences/${id}`)
            .then(res => res.json())
            .then(data => this.isEmpty(data) ? null : data)
            .catch(err => this.handleError(err));
    }

    static addCompetence(competence: Competence): Promise<Competence> {
        return fetch('http://localhost:3001/competences', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(competence)
        })
            .then(response => response.json())
            .catch(error => this.handleError(error));
    }

    static updateCompetence(competence: Competence): Promise<Competence> {
        return fetch(`http://localhost:3001/competences/${competence.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(competence)
        })
            .then(response => response.json())
            .catch(error => this.handleError(error));
    }

    static deleteCompetence(competence: Competence): Promise<{}> {
        return fetch(`http://localhost:3001/competences/${competence.id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .catch(err => this.handleError(err));
    }

    static handleError(error: Error): void {
        console.error(error);
    }

    static isEmpty(data: Object): boolean {
        return Object.keys(data).length === 0;
    }
}
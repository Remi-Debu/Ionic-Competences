import Personne from "../models/Personne";

export default class PersonnesService {
    static getPersonnes(): Promise<Personne[]> {
        return fetch('http://localhost:3001/Personnes')
            .then(response => response.json())
            .catch(error => this.handleError(error));
    }

    static getPersonne(id: number): Promise<Personne | null> {
        return fetch(`http://localhost:3001/Personnes/${id}`)
            .then(res => res.json())
            .then(data => this.isEmpty(data) ? null : data)
            .catch(err => this.handleError(err));
    }

    static addPersonne(Personne: Personne): Promise<Personne> {
        return fetch('http://localhost:3001/Personnes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Personne)
        })
            .then(response => response.json())
            .catch(error => this.handleError(error));
    }

    static updatePersonne(Personne: Personne): Promise<Personne> {
        return fetch(`http://localhost:3001/Personnes/${Personne.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Personne)
        })
            .then(response => response.json())
            .catch(error => this.handleError(error));
    }

    static deletePersonne(Personne: Personne): Promise<{}> {
        return fetch(`http://localhost:3001/Personnes/${Personne.id}`, {
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
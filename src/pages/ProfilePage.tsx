import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonInput, IonButton, IonModal } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import NiveauCompetence from '../models/NiveauCompetence';
import Personne from '../models/Personne';
import PersonnesService from "../services/PersonnesService";

const PeoplePage: React.FC = () => {
    const [people, setPeople] = useState<Personne[]>([]);
    const [name, setName] = useState<string>("");
    const [competence, setCompetence] = useState<string>("");
    const [niveau, setNiveau] = useState<string>("");
    const [editing, setEditing] = useState<number | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {
        PersonnesService.getPersonnes().then(data => setPeople(data));
    }, []);

    // const addPerson = () => {
    //     PersonnesService.addPersonne({ name, competences }).then(data => setPeople([...people, data]));
    //     setName('');
    //     setCompetences([]);
    //     setShowModal(false);
    // }

    // const updatePerson = (id: number) => {
    //     PersonnesService.updatePersonne({ id, name, competences }).then(data => {
    //         setPeople(people.map(person => person.id === data.id ? data : person));
    //     });
    //     setName('');
    //     setCompetences([]);
    //     setEditing(null);
    // }

    // const deletePerson = (id: number) => {
    //     PersonnesService.deletePersonne({ id }).then(() => {
    //         setPeople(people.filter(person => person.id !== id));
    //     });
    // }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Profile</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                {people.map(person => (
                    <IonGrid key={person.id}>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel>{person.nom}</IonLabel>
                                </IonItem>
                            </IonCol>
                        </IonRow>

                        {person.niveauCompetences ?
                            person.niveauCompetences.map(comp => (
                                <IonRow>
                                    <IonCol>
                                        <IonItem>
                                            {comp.competence}
                                        </IonItem>
                                    </IonCol>
                                    <IonCol>
                                        <IonItem>
                                            {comp.niveau}
                                        </IonItem>
                                    </IonCol>

                                    <IonCol>
                                        <IonButton onClick={() => {
                                            setName(person.nom);
                                            setCompetence(comp.competence);
                                            setNiveau(comp.niveau);
                                            setShowModal(true);
                                            setEditing(person.id);
                                        }}>Modifier</IonButton>
                                        {/* <IonButton onClick={() => deletePerson(person.id)}>Supprimer</IonButton> */}
                                    </IonCol>
                                </IonRow>
                            ))
                            : []
                        }
                    </IonGrid>
                ))}

                <IonModal isOpen={showModal}>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Modifier compétence</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        <IonItem>
                            <IonLabel position="floating">Compétences</IonLabel>
                            <IonInput value={competence} onIonChange={e => setCompetence(e.detail.value!)} />
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Niveau</IonLabel>
                            <IonInput value={niveau} onIonChange={e => setNiveau(e.detail.value!)} />
                        </IonItem>
                        {/* <IonButton onClick={addPerson}>Ajouter</IonButton> */}
                        <IonButton onClick={() => setShowModal(false)}>Fermer</IonButton>
                    </IonContent>
                </IonModal>
            </IonContent>
        </IonPage >
    );
};

export default PeoplePage;



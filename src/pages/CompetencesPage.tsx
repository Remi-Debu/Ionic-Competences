import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonInput, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonModal } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import Competence from '../models/Competence';
import CompetencesService from '../services/CompetencesService';
import './Competences.css';

const CompetencesPage: React.FC = () => {
  const [competences, setCompetences] = useState<Competence[]>([]);
  const [titre, setTitre] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [editing, setEditing] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    CompetencesService.getCompetences().then(skills => setCompetences(skills));
  }, []);

  const addCompetence = () => {
    const id: number = competences.length + 1;
    CompetencesService.addCompetence({ id, titre, description }).then(data => setCompetences([...competences, data]));
    setTitre('');
    setDescription('');
    setShowModal(false);
  }

  const updateCompetence = (id: number) => {
    CompetencesService.updateCompetence({ id, titre, description }).then(data => {
      setCompetences(competences.map(competence => competence.id === data.id ? data : competence));
    });
    setTitre('');
    setDescription('');
    setShowModal(false);
    setEditing(null);
  }

  const deleteCompetence = (deleteCompetence: Competence) => {
    CompetencesService.deleteCompetence(deleteCompetence).then(() => {
      setCompetences(competences.filter(competence => competence.id !== deleteCompetence.id));
    });
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Compétences</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonButton expand='block' color='success' onClick={() => setShowModal(true)}>Nouvelle compétence</IonButton>
            </IonCol>
          </IonRow>

          {competences.map(competence => (
            <IonRow key={competence.id}>
              <IonCol>
                <IonCard>

                  <IonCardHeader>
                    <IonCardTitle>{competence.titre}</IonCardTitle>
                  </IonCardHeader>

                  <IonCardContent>{competence.description}</IonCardContent>

                  <IonRow class="ion-justify-content-between">
                    <IonCol>
                      <IonButton color="warning" onClick={() => {
                        setTitre(competence.titre);
                        setDescription(competence.description);
                        setShowModal(true);
                        setEditing(competence.id);
                      }}>Modifier</IonButton>
                    </IonCol>

                    <IonCol>
                      <IonButton color="danger" onClick={() => deleteCompetence(competence)}>Supprimer</IonButton>
                    </IonCol>
                  </IonRow>
                </IonCard>
              </IonCol>
            </IonRow>
          ))}
        </IonGrid>

        <IonModal isOpen={showModal}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Nouvelle compétence</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonContent>
            <IonItem>
              <IonLabel position="floating">Nom</IonLabel>
              <IonInput value={titre} onIonChange={e => setTitre(e.detail.value!)} />
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Description</IonLabel>
              <IonInput value={description} onIonChange={e => setDescription(e.detail.value!)} />
            </IonItem>

            {editing === null ?
              <IonButton onClick={addCompetence}>Ajouter</IonButton> :
              <IonButton onClick={() => updateCompetence(editing)}>Modifier</IonButton>
            }

            <IonButton onClick={() => {
              setTitre("");
              setDescription("");
              setShowModal(false)
              setEditing(null)
            }}>Retour</IonButton>
          </IonContent>
        </IonModal>

      </IonContent >
    </IonPage >
  );
};

export default CompetencesPage;


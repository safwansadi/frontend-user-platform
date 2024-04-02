import React, { useState, useEffect } from 'react';
import Card from './Card';
import styles from './Dashboard.module.css';
import { useAuth } from '../contexts';
import FormModal from './FormModal'; 
import { getMission, addMission ,updateMission, deleteMission } from '../api/api';

interface Mission {
  _id: string;
  title: string;
  status: string;
  description: string;
  joinLink: string;
}

const DashboardEditor = () => {
  const { isLoggedIn } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setAddIsModalOpen] = useState(false);

  const [selectedEvent, setSelectedEvent] = useState<Mission | null>(null);

  const [selectedDeleteEvent, setSelectedDeleteEvent] = useState<Mission | null>(null);

  
  const [missionData, setMissionData] = useState<Mission[]>([]);
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const missions = await getMission('api/mission');
      if (missions) {
        setMissionData(missions);
      }
    };
    fetchData();
  }, [update]);

  const handleEditClick = (event: Mission) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (event: Mission) => {
    // setSelectedDeleteEvent(event);
    await deleteMission(`api/mission/delete/${event?._id}`);
    setUpdate(prevUpdate => prevUpdate + 1);
  };

  const handleAddClick = () => {
    setAddIsModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setAddIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdateFormSubmit = async (updatedEvent: Mission) => {
    const postData = {
      title: updatedEvent.title,
      status: updatedEvent.status,
      description: updatedEvent.description,
      joinLink: updatedEvent.joinLink
    }
    await updateMission(`api/mission/edit/${updatedEvent._id}`, postData);
    setUpdate(prevUpdate => prevUpdate + 1);
    handleCloseModal();
  };

  const handleAddFormSubmit = async (updatedEvent: Mission) => {
    const postData = {
      title: updatedEvent.title,
      status: updatedEvent.status,
      description: updatedEvent.description,
      joinLink: updatedEvent.joinLink
    }
    console.log("updatedEvent from add handler",updatedEvent)
    await addMission(`api/mission`, postData);
    setUpdate(prevUpdate => prevUpdate + 1);
    handleCloseAddModal();
  };

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.heading}>Manage Dashboard</h1>
      <button className={styles.addButton} onClick={() => handleAddClick()}>Add New Mission</button>
      <div className={styles.cardContainer}>
        {missionData.map(mission => (
          <Card
            key={mission._id}
            title={mission.title}
            description={mission.description}
            joinLink={mission.joinLink}
            status={mission.status}
          > {" "}
            {isLoggedIn && <button className={styles.editButton} onClick={() => handleEditClick(mission)}>Edit</button>}
            {" "}
            {isLoggedIn && <button className={styles.deleteButton} onClick={() => handleDeleteClick(mission)}>Delete</button>}
          </Card>
        ))}
      </div>
      {isModalOpen && selectedEvent && (
        <FormModal
          key={selectedEvent._id}
          initialValue={selectedEvent} 
          onSubmit={handleUpdateFormSubmit}
          onClose={handleCloseModal}
        />
      )}
      {isAddModalOpen &&  (
        <FormModal initialValue={null} onSubmit={handleAddFormSubmit} onClose={handleCloseAddModal}/>
      )}
    </div>
  );
};

export default DashboardEditor;

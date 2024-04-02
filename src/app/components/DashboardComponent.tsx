"use client"
import React from 'react';
import { useState, useEffect } from 'react';
import Card from './Card';
import styles from './Dashboard.module.css';
import { getMission } from '../api/api';

interface Mission {
  _id: string;
  title: string;
  status:string;
  description: string;
  joinLink:string;
}

const DashboardComponent = () => {

  const [missionData, setMissionData] = useState<Mission[]>([]);  // Sample data for demonstration

  useEffect(()=>{
    const fetchData = async()=>{
      const missions = await getMission('api/mission?status=active')
      if(missions){
        setMissionData(missions)
      }
    }
    fetchData();
  },[])
 

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.heading}>Dashboard</h1>
      <div className={styles.cardContainer}>
        {missionData.map(mission => (
          <Card key={mission._id} title={mission.title} description={mission.description} joinLink={mission.joinLink} status={mission.status}>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardComponent;

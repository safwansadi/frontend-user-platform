import React, { ReactNode } from 'react';
import styles from './Card.module.css';

interface CardProps {
  title: string;
  description: string;
  joinLink: string;
  status:string;
  children?: ReactNode; // Allow children to be passed to the Card component
}

const Card: React.FC<CardProps> = ({ title, description, joinLink, status, children }) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{title}</h2>
      {status && (
        <p >
           Status: <b style={{ color: status === 'active' ? 'green' : 'red' }}>{status}</b>
        </p>
      )}
      <p className={styles.description}>{description}</p>
      <a href={joinLink} className={styles.joinButton} target="_blank">Join</a>
      {children} {/* Render children */}
    </div>
  );
};

export default Card;

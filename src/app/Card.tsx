import React from 'react';
import styled from 'styled-components';

interface CardProps {
  title: string;
  imageUrl: string;
}

const CardContainer = styled.div`
  box-sizing: border-box;
  width: 160px;
  height: 191px;
  background: #050505;
  border: 1px solid #141414;
  border-radius: 8px;
  margin: 10px;
  display: inline-block;
  overflow: hidden;
`;

const CardTitle = styled.h2`
  color: white;
  text-align: center;
`;

const CardImage = styled.img`
  width: 100%;
  height: auto;
  background: transparent; /* Set the background to transparent */
`;

const Card: React.FC<CardProps> = ({ title, imageUrl }) => {
  return (
    <CardContainer>
      <CardImage src={imageUrl} alt={title} />
      <CardTitle>{title}</CardTitle>
    </CardContainer>
  );
};

export default Card;

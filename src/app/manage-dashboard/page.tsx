// pages/dashboard.tsx
"use client"
import React from 'react';
import withAuth from '../auth/withAuth';
import DashboardEditor from '../components/DashboardEditor';

const Dashboard: React.FC = () => {

  return (
    <DashboardEditor/>
  );
};

export default withAuth(Dashboard); 

"use client"
import React, { useEffect } from 'react';
import { useAuth } from './contexts';
import { useRouter } from 'next/navigation';
import DashboardComponent from './components/DashboardComponent';

function Home() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     router.push("/login");
  //   } else {
  //     router.push("/dashboard");
  //   }
  // }, [isLoggedIn, router]);

  return (
    <DashboardComponent/>
  );
}

export default Home;

import React, { useMemo, useState } from 'react'
import Timer from '@/components/timer/timer';
import Dashboard from '@/components/dashboard/dashboard';

const getTimerEntries = async () => {
  const res = await fetch("http://localhost:3000/api/get", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  if (!res.ok) {
    throw new Error("Failed to fetch timer entries")
  }
  const body = await res.json();
  return body
}

const Home = async () => {
  return (
    <main className="flex justify-center flex-row">
      <Dashboard timerEntries={await getTimerEntries()} />
      <Timer />
    </main>
  );
}

export default Home

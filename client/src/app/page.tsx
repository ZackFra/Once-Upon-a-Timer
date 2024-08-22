import React from 'react'
import Tabs from '@/components/tabs/tabs';
import { getTimerEntries } from '@/api/timer';

const Home = async () => {
  const timerEntries = await getTimerEntries()
  return (
    <main className="flex justify-center flex-row">
      <Tabs timerEntries={timerEntries} />
    </main>
  );
}

export default Home

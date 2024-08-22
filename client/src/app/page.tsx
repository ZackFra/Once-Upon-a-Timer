"use client"
import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Timer from '@/components/timer/timer';
export default function Home() {
  return (
    <main className="flex justify-center">
      <Tabs className="mb-4 border-b border-gray-200 dark:border-gray-700">
        <TabList>
          <Tab className="inline-block p-4 border-b-2 rounded-t-lg">
            <button>Timer</button>
          </Tab>
          <Tab className="inline-block p-4 border-b-2 rounded-t-lg">
            <button>Dashboard</button>
          </Tab>
        </TabList>
        <TabPanel>
          <Timer />
        </TabPanel>
        <TabPanel>
          <h1>Dashboard</h1>
        </TabPanel>
      </Tabs>
    </main>
  );
}

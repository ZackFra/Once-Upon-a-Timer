"use client"
import React, { useEffect, useState } from "react"

interface TimerEntry {
    author: string
    description: string
    time: number
}

const Dashboard = ({ timerEntries }: { timerEntries: TimerEntry[] }) => {

    return (
        <div className="block">
            <h1>Dashboard</h1>
            <table>
                <thead>
                    <tr>
                        <th>Author</th>
                        <th>Description</th>
                        <th>Time Tracked</th>
                    </tr>
                </thead>
                <tbody>
                    {timerEntries.map((entry, i) => (
                        <tr key={i}>
                            <td>{entry.author}</td>
                            <td>{entry.description}</td>
                            <td>{entry.time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    )
}

export default Dashboard
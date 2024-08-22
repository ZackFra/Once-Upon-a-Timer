"use client"
import React, { useState } from "react"
import useTimer from "@/hooks/use-timer/use-timer"
const Timer = () => {
    const [isPaused, setIsPaused] = useState(false)
    const [text, setText] = useState("")
    const [fullName, setFullName] = useState("")
    const time = useTimer(isPaused)
    const onPause = () => {
        setIsPaused(!isPaused)
    }
    const onSave = () => {
        fetch("http://127.0.0.1:5000/insert", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                author: fullName,
                description: text,
                time
            })
        })
    }

    return (
        <div>
            <h1>Time Tracked: {getTime(time)}</h1>
            <br />
            <label
                htmlFor="fullName"
                className="block"
            >Full Name</label>
            <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="border border-gray-300 dark:border-gray-700 rounded-lg p-2 w-full"
            />
            <br />
            <label
                htmlFor="description"
                className="block"
            >
                Description
            </label>
            <textarea
                id="description"
                placeholder="Write your thoughts here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="border border-gray-300 dark:border-gray-700 rounded-lg p-2 w-full"
            />
            <br /><br />
            <div className="flex justify-around">
                <button
                    className="btn btn-primary text-white"
                    type="button"
                    onClick={onPause}>{isPaused ? "Resume" : "Pause"}
                </button>

                <button
                    type="submit"
                    onClick={onSave}
                    className="btn btn-success text-white"
                >Save</button>
            </div>
        </div >
    )
}

const getTime = (timeInSeconds: number): string => {
    if (timeInSeconds < 10) {
        return `00:00:${padLeftWithZero(timeInSeconds)}`
    } else if (timeInSeconds < 3600) {
        const minutes = padLeftWithZero(Math.floor(timeInSeconds / 60))
        const seconds = padLeftWithZero(timeInSeconds % 60)
        return `00:${minutes}:${seconds}`
    } else {
        const hours = padLeftWithZero(Math.floor(timeInSeconds / 3600))
        const minutes = padLeftWithZero(Math.floor((timeInSeconds % 3600) / 60))
        const seconds = padLeftWithZero(timeInSeconds % 60)
        return `${hours}:${minutes}:${seconds}`
    }
}

const padLeftWithZero = (num: number): string => {
    return ("" + num).padStart(2, "0")
}

export default Timer
package main

import (
	"database/sql"
	"github.com/gofiber/fiber/v3"
	_ "github.com/mattn/go-sqlite3"
)

type TimerEntry struct {
	time        int64
	author      string
	description string
}

const file string = "timer.db"

func main() {
	db, err := getDatabase()
	if err != nil {
		panic(err)
	}
	const create string = `
		CREATE TABLE IF NOT EXISTS timer (
			time INTEGER,
			author TEXT,
			description TEXT
		);`
	_, err = db.Exec(create)
	if err != nil {
		panic(err)
	}

	app := fiber.New()

	app.Post("/insert", func(c fiber.Ctx) error {
		entry := new(TimerEntry)
		if err := c.Bind().Body(&entry); err != nil {
			return c.Status(400).SendString(err.Error())
		}
		insertTimerEntry(*entry)
		return c.SendString("Inserted entry")
	})

	app.Get("/get", func(c fiber.Ctx) error {
		entries := getTimerEntries()
		return c.JSON(entries)
	})

	app.Listen(":5000")

}

func getDatabase() (*sql.DB, error) {
	db, err := sql.Open("sqlite3", file)
	return db, err
}

func insertTimerEntry(entry TimerEntry) {
	db, err := getDatabase()
	if err != nil {
		panic(err)
	}

	const insert string = `INSERT INTO timer 
		(time, author, description) VALUES (?, ?, ?);`
	_, err = db.Exec(insert, entry.time, entry.author, entry.description)
	if err != nil {
		panic(err)
	}
}

func getTimerEntries() []TimerEntry {
	db, err := getDatabase()
	if err != nil {
		panic(err)
	}

	const selectAll string = `
	SELECT time, author, description 
	FROM timer 
	GROUP BY author;`
	rows, err := db.Query(selectAll)
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	var entries []TimerEntry
	for rows.Next() {
		var entry TimerEntry
		err = rows.Scan(&entry.time, &entry.author, &entry.description)
		if err != nil {
			panic(err)
		}
		entries = append(entries, entry)
	}
	return entries
}
